const VisitorSession = require('../models/visitorSession.model');
const Visitor = require('../models/visitor.model');

// Constants
const SESSION_THRESHOLD = 30; // Max sessions in 10 minutes
const UNIQUE_VISITOR_THRESHOLD = 3; // Max unique visitors per IP
const TIME_WINDOW_MINUTES = 10; // Time window for session counting
const BLOCK_WINDOW_HOURS = 1; // Time window for blocking repeat offenders

/**
 * Flag sessions with the given reason
 * @private
 */
async function flagSessions(sessionIds, reason) {
  if (sessionIds.length === 0) return;
  
  await VisitorSession.updateMany(
    { _id: { $in: sessionIds } },
    {
      $set: { isFlagged: true, isSuspicious: true },
      $addToSet: { flagReasons: reason }
    }
  );
}

/**
 * Check for repeat offenses and update blocking status
 * @private
 */
async function checkAndBlockRepeats(propertyId, ipData) {
  const blockWindowStart = new Date(Date.now() - BLOCK_WINDOW_HOURS * 60 * 60 * 1000);
  
  // Check for previous offenses in the block window
  const previousOffenses = await VisitorSession.countDocuments({
    property: propertyId,
    ip: ipData.ip,
    isFlagged: true,
    flagReasons: 'suspicious_ip',
    createdAt: { $gte: blockWindowStart, $lt: new Date(ipData.lastOffense) }
  });

  const isRepeatOffense = previousOffenses > 0;
  const shouldBlock = isRepeatOffense || 
                    ipData.sessionCount > SESSION_THRESHOLD * 2 || 
                    ipData.uniqueVisitorCount > UNIQUE_VISITOR_THRESHOLD * 2;

  // Update session flags
  if (shouldBlock) {
    await flagSessions(ipData.sessions.map(s => s._id), 'suspicious_ip');
    return {
      isBlocked: true,
      blockReason: isRepeatOffense ? 'repeat_offense' : 'excessive_activity'
    };
  } else {
    await flagSessions(ipData.sessions.map(s => s._id), 'suspicious_ip');
    return { isBlocked: false, blockReason: null };
  }
}

/**
 * Check for suspicious IP activity
 * @param {string} propertyId - The property ID to check
 * @param {string} [ip] - Optional specific IP to check
 * @returns {Promise<Array>} Array of suspicious IPs with details
 */
async function detectSuspiciousIps(propertyId, ip = null) {
  const timeWindowStart = new Date(Date.now() - TIME_WINDOW_MINUTES * 60 * 1000);
  
  // Build match conditions
  const matchConditions = {
    property: propertyId,
    createdAt: { $gte: timeWindowStart },
  };
  
  if (ip) {
    matchConditions.ip = ip;
  }

  // Get all sessions in the time window
  const sessions = await VisitorSession.aggregate([
    { $match: matchConditions },
    {
      $group: {
        _id: "$ip",
        sessionCount: { $sum: 1 },
        uniqueVisitors: { $addToSet: "$visitor" },
        suspiciousCount: {
          $sum: { $cond: [{ $or: [{ isBot: true }, { isSuspicious: true }] }, 1, 0] }
        },
        lastOffense: { $max: "$createdAt" },
        sessions: {
          $push: {
            _id: "$_id",
            visitor: "$visitor",
            isBot: "$isBot",
            isSuspicious: "$isSuspicious",
            riskScore: "$riskScore",
            createdAt: "$createdAt"
          }
        }
      }
    },
    {
      $match: {
        $or: [
          { sessionCount: { $gt: SESSION_THRESHOLD } },
          { $expr: { $gt: [{ $size: "$uniqueVisitors" }, UNIQUE_VISITOR_THRESHOLD] } }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        ip: "$_id",
        sessionCount: 1,
        uniqueVisitorCount: { $size: "$uniqueVisitors" },
        suspiciousPercentage: {
          $multiply: [
            { $cond: [{ $eq: ["$sessionCount", 0] }, 0, { $divide: ["$suspiciousCount", "$sessionCount"] }] },
            100
          ]
        },
        lastOffense: 1,
        isBlocked: { $literal: false }, // Will be updated by checkAndBlockRepeats
        blockReason: { $literal: null },
        sessions: 1
      }
    }
  ]);

  // Check for repeat offenses within the block window
  const results = await Promise.all(
    sessions.map(async (ipData) => {
      const repeatOffense = await checkAndBlockRepeats(propertyId, ipData);
      return { ...ipData, ...repeatOffense };
    })
  );

  return results;
}

/**
 * Get suspicious IPs for dashboard display
 * @param {string} propertyId - The property ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated results of suspicious IPs
 */
async function getSuspiciousIps(propertyId, options = {}) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const [ips, total] = await Promise.all([
    VisitorSession.aggregate([
      { $match: { property: propertyId, isFlagged: true } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'visitors',
          localField: 'visitor',
          foreignField: '_id',
          as: 'visitorInfo'
        }
      },
      { $unwind: { path: '$visitorInfo', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$ip',
          lastSeen: { $max: '$createdAt' },
          isBlocked: { $max: '$isBlocked' },
          flagReasons: { $addToSet: '$flagReasons' },
          visitorCount: { $addToSet: '$visitor' },
          sessions: { $push: '$$ROOT' }
        }
      },
      {
        $project: {
          _id: 0,
          ip: '$_id',
          lastSeen: 1,
          isBlocked: 1,
          flagReasons: { $reduce: {
            input: '$flagReasons',
            initialValue: [],
            in: { $setUnion: ['$$value', '$$this'] }
          }},
          uniqueVisitors: { $size: '$visitorCount' },
          sessionCount: { $size: '$sessions' },
          lastSession: { $arrayElemAt: ['$sessions', 0] }
        }
      },
      { $sort: { lastSeen: -1 } }
    ]),
    VisitorSession.countDocuments({ property: propertyId, isFlagged: true })
  ]);

  return {
    data: ips,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

module.exports = {
  detectSuspiciousIps,
  getSuspiciousIps
};
