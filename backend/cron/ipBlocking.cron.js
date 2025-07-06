const cron = require('node-cron');
const BlockedIP = require('../models/blockedIP.model');
const VisitorSession = require('../models/visitorSession.model');
const Property = require('../models/property.model');

// Configuration
const CONFIG = {
  SESSION_THRESHOLD: 30, // More than 30 sessions in 24h
  VISITOR_THRESHOLD: 5,  // More than 5 unique visitors in 24h
  CHECK_INTERVAL: '*/456 * * * * *' // Every 5 seconds
};

// State
let isRunning = false;
let task = null;

// Initialize the IP blocking service
function init() {
  if (task) return; // Already initialized
  
  scheduleAutoBlocking();
}

// Schedule the auto-blocking task
function scheduleAutoBlocking() {
  if (task) {
    task.stop();
  }

  task = cron.schedule(CONFIG.CHECK_INTERVAL, () => {
    autoBlockSuspiciousIPsForAllProperties().catch(console.error);
  }, {
    scheduled: true,
    timezone: 'UTC'
  });

  
  
  // Run immediately on startup
  autoBlockSuspiciousIPsForAllProperties().catch(console.error);
}

// Auto-block suspicious IPs for all active properties
async function autoBlockSuspiciousIPsForAllProperties() {
  if (isRunning) {
    console.log('Auto-blocking task already running, skipping');
    return;
  }

  isRunning = true;

  try {
    const properties = await Property.find({ status: 'active' });

    let totalBlocked = 0;
    
    for (const property of properties) {
      try {
        const blockedIPs = await autoBlockSuspiciousIPs(property.propertyId);
        if (blockedIPs.length > 0) {
          totalBlocked += blockedIPs.length;
        }
      } catch (error) {
        console.error(`Error processing property ${property._id}:`, error);
      }
    }

    console.log(`IP auto-blocking completed. Total IPs blocked: ${totalBlocked}`);
    return { success: true, blockedCount: totalBlocked };
  } catch (error) {
    console.error('Error in auto-blocking task:', error);
    return { success: false, error: error.message };
  } finally {
    isRunning = false;
  }
}

async function autoBlockSuspiciousIPs(propertyId) {
  try {
    
    // Find the property to get both _id and propertyId
    const property = await Property.findOne({ propertyId });
    if (!property) {
      console.error(`Property not found with Property ID: ${propertyId}`);
      return [];
    }

    // Find IPs with suspicious activity
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    
    const suspiciousIPs = await VisitorSession.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { property: property._id },
                { propertyId: property.propertyId }
              ]
            },
            { visitor: { $exists: true, $ne: null } },
            { updatedAt: { $gte: oneDayAgo } }
          ]
        }
      },
      {
        $lookup: {
          from: 'visitors',
          localField: 'visitor',
          foreignField: '_id',
          as: 'visitorData'
        }
      },
      { $unwind: '$visitorData' },
      {
        $match: {
          'visitorData.ip': { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: '$visitorData.ip',
          sessionCount: { $sum: 1 },
          uniqueVisitorCount: { $addToSet: '$visitor' }
        }
      },
      {
        $addFields: {
          uniqueVisitorCount: { $size: '$uniqueVisitorCount' },
          exceedsSessionLimit: { $gt: ['$sessionCount', CONFIG.SESSION_THRESHOLD] },
          exceedsVisitorLimit: { $gt: ['$uniqueVisitorCount', CONFIG.VISITOR_THRESHOLD] }
        }
      },
      {
        $match: {
          $or: [
            { exceedsSessionLimit: true },
            { exceedsVisitorLimit: true }
          ]
        }
      }
    ]);

    if (suspiciousIPs.length === 0) {
      return [];
    }

    const blockPromises = suspiciousIPs
      .filter(ipInfo => {
        if (!ipInfo._id) {
          console.log('Skipping entry with null/undefined IP');
          return false;
        }
        return true;
      })
      .map(async (ipInfo) => {
        const ip = ipInfo._id;
        const reasons = [];
        
        if (ipInfo.exceedsSessionLimit) {
          reasons.push(`High session count (${ipInfo.sessionCount} in 24h)`);
        }
        if (ipInfo.exceedsVisitorLimit) {
          reasons.push(`Multiple unique visitors (${ipInfo.uniqueVisitorCount} in 24h)`);
        }

        const reason = `Automatic block: ${reasons.join('; ')}`;        
        try {
          // Check if IP is already blocked for this property
          const existingBlock = await BlockedIP.findOne({
            ip,
            $or: [
              { property: property._id },
              { propertyId: property.propertyId }
            ],
            isActive: true,
            $or: [
              { expiresAt: { $exists: false } },
              { expiresAt: { $gt: new Date() } }
            ]
          });

          if (existingBlock) {
            return existingBlock;
          }

          // Create and save new block
          const now = new Date();
          const block = new BlockedIP({
            ip,
            property: property._id,
            propertyId: property.propertyId,
            blockType: 'auto',
            reason,
            isActive: true,
            blockedAt: now,
            expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          });
          
          const savedBlock = await block.save();
          return savedBlock;
        } catch (error) {
          throw error; // Re-throw to be caught by the outer try-catch
        }
      });

    const results = await Promise.all(blockPromises);
    return results.filter(Boolean); // Filter out any null/undefined results
    
  } catch (error) {
    console.error('Error in autoBlockSuspiciousIPs:', error);
    throw error;
  }
}
// Stop the service
function stop() {
  if (task) {
    task.stop();
    task = null;
    }
}

// Handle process termination
process.on('SIGINT', () => {
  stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stop();
  process.exit(0);
});

// Export the public API
module.exports = {
  init,
  stop,
};
