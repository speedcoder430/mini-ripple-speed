const BlockedIP = require('../models/blockedIP.model');
const BlockedCountry = require('../models/blockedCountry.model');
const Visitor = require('../models/visitor.model');
const Property = require('../models/property.model');
const VisitorSession = require('../models/visitorSession.model');


// --- Controller Functions ---

/**
 * Format date as dd-MM-yyyy
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Get count of suspicious IPs from the last 24 hours
 */
async function getDailySuspiciousIPCount(propertyId) {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    
    // Get IPs with suspicious patterns in the last 24 hours
    const suspiciousIPs = await VisitorSession.aggregate([
      {
        $match: {
          $or: [
            { property: propertyId },
            { propertyId: propertyId.toString() } 
          ],
          updatedAt: { $gte: oneDayAgo }
        }
      },
      {
        $group: {
          _id: '$ip',
          sessionCount: { $sum: 1 },
          uniqueVisitorCount: { $addToSet: '$visitor' },
          hasSuspiciousActivity: {
            $max: {
              $cond: [
                { $or: [{ $eq: ['$isBot', true] }, { $eq: ['$isSuspicious', true] }] },
                true,
                false
              ]
            }
          }
        }
      },
      {
        $addFields: {
          uniqueVisitorCount: { $size: '$uniqueVisitorCount' }
        }
      },
      {
        $match: {
          $or: [
            { sessionCount: { $gt: 30 } }, // More than 30 sessions in 24h
            { uniqueVisitorCount: { $gt: 5 } }, // More than 5 unique visitors
            { hasSuspiciousActivity: true } // Any suspicious/bot activity
          ]
        }
      }
    ]);


    return suspiciousIPs.length;
  } catch (error) {
    console.error('Error counting daily suspicious IPs:', error);
    return 0;
  }
}

/**
 * Get metrics for the metrics cards
 */
exports.getMetrics = async (req, res) => {
  try {
    const property = await Property.findOne({ user: req.user._id });
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Get all metrics in parallel
    const [
      blockedCountries, 
      vpnTraffic, 
      blockedIPs, 
      dailySuspiciousIPs
    ] = await Promise.all([
      // Blocked countries count
      BlockedCountry.countDocuments({ 
        $or: [
          { property: property._id },
          { propertyId: property.propertyId }
        ],
        isActive: true 
      }),
      
      VisitorSession.countDocuments({
        $or: [
          { property: property._id },
          { propertyId: property.propertyId }
        ],
        isVPN: true,
        startTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }),
      
      BlockedIP.countDocuments({
        $or: [
          { property: property._id },
          { propertyId: property.propertyId }
        ],
        isActive: true
      }),
      getDailySuspiciousIPCount(property._id)
    ]);

    res.json({
      success: true,
      data: { blockedCountries, vpnTraffic, blockedIPs, dailySuspiciousIPs }
    });
  } catch (err) {
    console.error('Error in getMetrics:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch metrics',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }
};

/**
 * Get all visitors with their details
 */
exports.getVisitors = async (req, res) => {
  try {
    const property = await Property.findOne({ user: req.user._id });
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Get all blocked IPs for this property first (for efficient checking)
    const blockedIPs = await BlockedIP.find({
      $or: [
        { property: property._id },
        { propertyId: property.propertyId }
      ],
      isActive: true
    }).distinct('ip');

    // Get all visitors with their latest session
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const visitors = await Visitor.aggregate([
      {
        $match: {
          $or: [
            { property: property._id },
            { propertyId: property.propertyId }
          ]
        }
      },
      {
        $lookup: {
          from: 'visitorsessions',
          localField: '_id',
          foreignField: 'visitor',
          as: 'sessions',
          pipeline: [
            {
              $match: {
                updatedAt: { $gte: thirtyDaysAgo }
              }
            },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 }
          ]
        }
      },
      { $match: { 'sessions.0': { $exists: true } } },
      { $sort: { 'sessions.0.updatedAt': -1 } }
    ]);

    // Format the response
    const formattedVisitors = visitors.map(visitor => ({
      id: visitor.visitorId,
      ipAddress: visitor.ip,
      addedOn: formatDate(visitor.createdAt),
      lastActivity: formatDate(visitor.sessions[0]?.updatedAt || visitor.updatedAt),
      location: visitor.country || 'Unknown',
      status: blockedIPs.includes(visitor.ip) ? 'Blocked' : 'Active',
      statusColor: blockedIPs.includes(visitor.ip) ? 'text-red-500' : 'text-blue-700'
    }));

    res.json({
      success: true,
      data: formattedVisitors
    });
  } catch (err) {
    console.error('Error in getVisitors:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch visitors',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }
};

/**
 * Get summary of visitor IP management
 */
exports.getVisitorIpManagementSummary = async (req, res) => {
  try {
    // Get property using both _id and propertyId formats
    const property = await Property.findOne({ user: req.user._id });
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Get metrics in parallel
    const [metrics, visitors] = await Promise.all([
      // Get all metrics
      (async () => {
        try {
          const [blockedCountries, vpnTraffic, blockedIPs, dailySuspiciousIPs] = await Promise.all([
            // Count blocked countries for this property
            BlockedCountry.countDocuments({ 
              $or: [
                { property: property._id },
                { propertyId: property.propertyId }
              ],
              isActive: true 
            }),
            
            // Count VPN traffic from visitor sessions
            VisitorSession.countDocuments({
              $or: [
                { property: property._id },
                { propertyId: property.propertyId }
              ],
              isVPN: true,
              startTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
            }),
            
            // Count blocked IPs for this property
            BlockedIP.countDocuments({
              $or: [
                { property: property._id },
                { propertyId: property.propertyId }
              ],
              isActive: true
            }),
            
            getDailySuspiciousIPCount(property._id)
          ]);
          
          return { blockedCountries, vpnTraffic, blockedIPs, dailySuspiciousIPs };
        } catch (error) {
          console.error('Error fetching metrics:', error);
          return { blockedCountries: 0, vpnTraffic: 0, blockedIPs: 0, dailySuspiciousIPs: 0 };
        }
      })(),
      
      // Get all visitors with activity in the last 30 days
      (async () => {
        try {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          // Get all visitors with sessions in the last 30 days
          const recentVisitors = await Visitor.aggregate([
            {
              $match: {
                $or: [
                  { property: property._id },
                  { propertyId: property.propertyId }
                ]
              }
            },
            {
              $lookup: {
                from: 'visitorsessions',
                localField: '_id',
                foreignField: 'visitor',
                as: 'sessions',
                pipeline: [
                  {
                    $match: {
                      startTime: { $gte: thirtyDaysAgo }
                    }
                  },
                  { $sort: { startTime: -1 } },
                  { $limit: 1 } // Just get the most recent session for each visitor
                ]
              }
            },
            { $match: { 'sessions.0': { $exists: true } } }, // Only include visitors with recent sessions
            { $sort: { 'sessions.0.startTime': -1 } } // Sort by most recent session
          ]);
          
          // Get all blocked IPs for this property
          const blockedIPs = await BlockedIP.find({
            $or: [
              { property: property._id },
              { propertyId: property.propertyId }
            ],
            isActive: true
          }).distinct('ip');
          
          // Format the response with formatted dates
          return recentVisitors.map(visitor => ({
            id: visitor.visitorId,
            ipAddress: visitor.ip,
            addedOn: formatDate(visitor.createdAt),
            lastActivity: formatDate(visitor.sessions[0]?.updatedAt || visitor.updatedAt),
            location: visitor.country || 'Unknown',
            status: blockedIPs.includes(visitor.ip) ? 'Blocked' : 'Active',
            statusColor: blockedIPs.includes(visitor.ip) ? 'text-red-500' : 'text-blue-700'
          }));
          
        } catch (error) {
          console.error('Error fetching recent visitors:', error);
          return [];
        }
      })()
    ]);
    
    // Format the response
    const response = {
      metrics: {
        blockedCountries: metrics.blockedCountries,
        vpnTraffic: metrics.vpnTraffic,
        blockedIPs: metrics.blockedIPs,
        dailySuspiciousIPs: metrics.dailySuspiciousIPs
      },
      recentVisitors: visitors
    };
    
    res.json({
      success: true,
      data: response
    });
  } catch (err) {
    console.error('Error in getVisitorIpManagementSummary:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch visitor IP management summary',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }
};
