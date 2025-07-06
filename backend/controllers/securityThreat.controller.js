const mongoose = require('mongoose');
const VisitorSession = require('../models/visitorSession.model');
const Property = require('../models/property.model');
const { calculateRisk } = require('../services/riskCalculation.service');
const suspiciousIpDetector = require('../services/suspiciousIpDetector.service');


// --- Helper Functions ---
const getBotCounts = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  const [today, thisWeek, thisMonth] = await Promise.all([
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: todayStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: weekStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: monthStart, $lte: now }
    })
  ]);

  return { today, thisWeek, thisMonth };
};

const getVpnCounts = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  const [today, thisWeek, thisMonth] = await Promise.all([
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: todayStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: weekStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: monthStart, $lte: now }
    })
  ]);

  return { today, thisWeek, thisMonth };
};

const getAbnormalSessionsCount = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  // For now, return zeros as we're focusing on fixing the function context
  return {
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  };
};

async function getMetrics(propertyId) {
  try {
    const property = await Property.findOne({ propertyId });
    if (!property) throw new Error('Property not found');
    
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week (Sunday)
    
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get all metrics in parallel
    const [abnormalTraffic, botCounts, vpnCounts] = await Promise.all([
      getAbnormalSessionsCount(property._id, { todayStart, weekStart, monthStart, now }),
      getBotCounts(property._id, { todayStart, weekStart, monthStart, now }),
      getVpnCounts(property._id, { todayStart, weekStart, monthStart, now })
    ]);

    return { 
      bots: botCounts,
      vpns: vpnCounts,
      abnormalSessions: abnormalTraffic
    };
  } catch (error) {
    console.error('Error in getMetrics:', error);
    throw error;
  }
}

/**
 * Get bot counts for today, this week, and this month
 */
exports.getBotCounts = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  const [today, thisWeek, thisMonth] = await Promise.all([
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: todayStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: weekStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isBot: true,
      createdAt: { $gte: monthStart, $lte: now }
    })
  ]);

  return { today, thisWeek, thisMonth };
};

/**
 * Get VPN counts for today, this week, and this month
 */
exports.getVpnCounts = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  const [today, thisWeek, thisMonth] = await Promise.all([
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: todayStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: weekStart, $lte: now }
    }),
    VisitorSession.countDocuments({ 
      property: propertyId, 
      isVPN: true,
      createdAt: { $gte: monthStart, $lte: now }
    })
  ]);

  return { today, thisWeek, thisMonth };
};

/**
 * Gets abnormal session counts for today, this week, and this month
 */
exports.getAbnormalSessionsCount = async (propertyId, { todayStart, weekStart, monthStart, now }) => {
  // Get historical averages for comparison
  const historicalAverages = await this.calculateHistoricalAverages(propertyId);
  
  // Get abnormal session counts for each period
  const [todayCount, weekCount, monthCount] = await Promise.all([
    this.countAbnormalSessions(propertyId, todayStart, now, historicalAverages),
    this.countAbnormalSessions(propertyId, weekStart, now, historicalAverages),
    this.countAbnormalSessions(propertyId, monthStart, now, historicalAverages)
  ]);
  
  return {
    today: todayCount,
    thisWeek: weekCount,
    thisMonth: monthCount
  };
};

/**
 * Calculate historical hourly averages for comparison
 */
exports.calculateHistoricalAverages = async (propertyId) => {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const historicalData = await VisitorSession.aggregate([
    {
      $match: {
        property: propertyId,
        createdAt: { $gte: thirtyDaysAgo, $lt: now }
      }
    },
    {
      $group: {
        _id: {
          hour: { $hour: "$createdAt" },
          dayOfWeek: { $dayOfWeek: "$createdAt" }
        },
        avgSessions: { $avg: 1 }
      }
    }
  ]);
  
  const averages = {};
  historicalData.forEach(item => {
    const key = `${item._id.dayOfWeek}-${item._id.hour}`;
    averages[key] = item.avgSessions;
  });
  
  return averages;
};

/**
 * Count abnormal sessions in a date range
 */
exports.countAbnormalSessions = async (propertyId, startDate, endDate, historicalAverages) => {
  // Get all sessions in the date range
  const allSessions = await VisitorSession.aggregate([
    {
      $match: {
        property: propertyId,
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $project: {
        hour: { $hour: "$createdAt" },
        dayOfWeek: { $dayOfWeek: "$createdAt" },
        _id: 1
      }
    },
    { $sort: { createdAt: 1 } }
  ]);

  // Group sessions by hour to calculate hourly rates
  const hourlySessions = {};
  allSessions.forEach(session => {
    const hourKey = `${session.dayOfWeek}-${session.hour}`;
    if (!hourlySessions[hourKey]) {
      hourlySessions[hourKey] = {
        count: 0,
        sessionIds: []
      };
    }
    hourlySessions[hourKey].count++;
    hourlySessions[hourKey].sessionIds.push(session._id);
  });

  // Identify abnormal hours
  const abnormalSessionIds = new Set();
  
  for (const [hourKey, hourData] of Object.entries(hourlySessions)) {
    const historicalAvg = historicalAverages[hourKey] || 0;
    const currentCount = hourData.count;
    
    // Check if this hour is abnormal
    if (currentCount > (historicalAvg * 2) || 
        (historicalAvg > 10 && currentCount > (historicalAvg * 1.3))) {
      // Add all session IDs from this hour to the abnormal set
      hourData.sessionIds.forEach(id => abnormalSessionIds.add(id.toString()));
    }
  }

  return abnormalSessionIds.size;
};

async function getBotsVpnSummaryData(propertyId) {
  const property = await Property.findOne({ propertyId });
  if (!property) throw new Error('Property not found');
  
  const sessions = await VisitorSession.find({ property: property._id }).sort({ createdAt: -1 }).limit(100);
  const totalSessions = sessions.length;
  const botsRatio = totalSessions ? sessions.filter(s => s.isBot).length / totalSessions : 0;
  const vpnRatio = totalSessions ? sessions.filter(s => s.isVPN).length / totalSessions : 0;

  return { botsRatio, vpnRatio, totalSessions };
}

async function getRepeatedOffendersData(propertyId) {
  const property = await Property.findOne({ propertyId });
  if (!property) throw new Error('Property not found');
  
  const windowStart = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48h ago

  // 1. Get all suspicious sessions in window, with visitorId/ip
  const suspiciousSessions = await VisitorSession.find({
    property: property._id,
    isSuspicious: true,
    createdAt: { $gte: windowStart }
  })
  .select('visitorId createdAt riskScore honeypotTriggered flagReasons')
  .populate('visitorId', 'ip');  // populate the 'ip' field from Visitor

  // 2. Group by visitorId if present, else by ip
  const offenderMap = new Map();

  suspiciousSessions.forEach(session => {
    const key = session.visitorId ? `visitorId:${session.visitorId}` : `ip:${session.ip}`;
    if (!offenderMap.has(key)) {
      offenderMap.set(key, {
        visitorId: session.visitorId || null,
        ip: session.ip || null,
        offenses: [],
      });
    }
    offenderMap.get(key).offenses.push({
      createdAt: session.createdAt,
      riskScore: session.riskScore,
      honeypotTriggered: session.honeypotTriggered,
      flagReasons: session.flagReasons,
    });
  });

  // 3. Filter offenders with ≥3 offenses
  const offenders = [];
  for (const offender of offenderMap.values()) {
    if (offender.offenses.length >= 3) {
      // Calculate aggregate risk score
      const maxRisk = Math.max(...offender.offenses.map(o => o.riskScore || 0));
      offenders.push({
        visitorId: offender.visitorId,
        ip: offender.ip,
        offenseCount: offender.offenses.length,
        offenses: offender.offenses,
        maxRiskScore: maxRisk,
      });
    }
  }

  // 4. Sort by offense count descending
  offenders.sort((a, b) => b.offenseCount - a.offenseCount);

  // 5. Get additional metrics for the frontend
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get all visitor sessions for metrics
  const allSessions = await VisitorSession.aggregate([
    { 
      $match: { 
        property: property._id,
        createdAt: { $gte: oneMonthAgo }
      } 
    },
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
        _id: { $ifNull: ['$visitor', '$ip'] },
        ip: { $first: '$ip' },
        visitorId: { $first: '$visitor' },
        sessionCount: { $sum: 1 },
        lastVisit: { $max: '$createdAt' },
        firstVisit: { $min: '$createdAt' }
      }
    }
  ]);

  // Calculate metrics
  let frequentVisitors = 0;
  let repeatVisitors = 0;
  let loyalUsers = 0;

  allSessions.forEach(visitor => {
    // Count frequent visitors (many sessions in a short time)
    if (visitor.sessionCount > 5) {
      frequentVisitors++;
    }

    // Count repeat visitors (more than one session)
    if (visitor.sessionCount > 1) {
      repeatVisitors++;
    }

    // Count loyal users (returning over a long period)
    const visitSpan = (visitor.lastVisit - visitor.firstVisit) / (1000 * 60 * 60 * 24); // in days
    if (visitSpan > 7 && visitor.sessionCount > 3) {
      loyalUsers++;
    }
  });

  // Return both the detailed offenders list and the metrics
  return {
    //offenders,
    repeatedOffenders: offenders.length,  // Use the actual count of repeated offenders
    frequentVisitors,
    repeatVisitors,
    loyalUsers
  };
}


async function getAnomaliesData(propertyId) {
  const property = await Property.findOne({ propertyId });
  if (!property) throw new Error('Property not found');
  
  // Get recent sessions with anomalies
  const anomalies = await VisitorSession.find({
    property: property._id, 
  }).sort({ createdAt: -1 }).limit(50);
  return anomalies.filter(s => s.isBot || s.isVPN || s.isAbnormal).map(s => ({
    ip: s.ip,
    type: s.isBot ? 'Bot' : s.isVPN ? 'VPN' : 'Abnormal',
    datetime: s.createdAt,
    riskScore: s.riskScore,
    honeypotTriggered: s.honeypotTriggered,
    status: s.isBlocked ? 'Blocked' : 'Flagged'
  }));
}

// Get security threat metrics cards (bots, VPN, abnormal traffic)
exports.getMetricsCards = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const metrics = await getMetrics(propertyId);
    res.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('SecurityThreat getMetricsCards error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch security threat metrics' });
  }
};

// Get bot and VPN detection summary (for chart)
exports.getBotsVpnSummary = async (req, res) => {
  try { 
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const summary = await getBotsVpnSummaryData(propertyId);
    res.json({ success: true, ...summary });
  } catch (error) {
    console.error('SecurityThreat getBotsVpnSummary error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bots/VPN summary' });
  }
};

// Get repeated offenders & high-frequency visitors
exports.getRepeatedOffendersAndHighFrequencyVisitors = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const offendersWithRisk = await getRepeatedOffendersData(propertyId);
    res.json({ success: true, data: offendersWithRisk });
  } catch (error) {
    console.error('SecurityThreat getRepeatedOffenders error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch repeated offenders' });
  }
};

// Get traffic anomalies & risk analysis table
exports.getTrafficAnomalies = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const anomalies = await getAnomaliesData(propertyId);
    res.json({ success: true, anomalies });
  } catch (error) {
    console.error('SecurityThreat getTrafficAnomalies error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch traffic anomalies' });
  }
};

// Get suspicious IPs
exports.getSuspiciousIps = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await suspiciousIpDetector.getSuspiciousIps(propertyId, {
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.json(result);
  } catch (error) {
    console.error('Error getting suspicious IPs:', error);
    res.status(500).json({ message: 'Error getting suspicious IPs' });
  }
};

// Get security threat summary (all metrics, offenders, anomalies, blocks)
exports.getSecurityThreatSummary = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const mongoPropertyId = propertyId;
    
    // Get all metrics in parallel
    const [metrics, botsVpnSummary, offenders, anomalies] = await Promise.all([
      getMetrics(mongoPropertyId),
      getBotsVpnSummaryData(mongoPropertyId),
      getRepeatedOffendersData(mongoPropertyId),
      getAnomaliesData(mongoPropertyId)
    ]);

    res.json({
      metrics,
      botsVpnSummary,
      offenders,
      anomalies
    });
  } catch (error) {
    console.error('Error getting security threat summary:', error);
    res.status(500).json({ message: 'Error getting security threat summary' });
  }
};

// Run suspicious IP detection
exports.runSuspiciousIpDetection = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const mongoPropertyId = propertyId;
    const { ip } = req.query;
    
    const result = await suspiciousIpDetector.detectSuspiciousIps(mongoPropertyId, ip);
    res.json(result);
  } catch (error) {
    console.error('Error running suspicious IP detection:', error);
    res.status(500).json({ message: 'Error running suspicious IP detection' });
  }
};
