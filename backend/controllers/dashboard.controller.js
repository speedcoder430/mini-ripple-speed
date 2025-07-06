const mongoose = require('mongoose');
const Visitor = require('../models/visitor.model');
const VisitorSession = require('../models/visitorSession.model');
const VisitorLog = require('../models/visitorLog.model');
const BlockedIP = require('../models/blockedIP.model');
const Property = require('../models/property.model');
const { categorizeReferral } = require('../utils/referral/referralCategorizer');


// Get domain information
const getDomainInfo = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  return {
    name: property.domain,
    status: property.status === 'active' ? 'active' : 'inactive'
  };
};

// Get metrics data
const getMetrics = async (propertyId) => {
  // First find the property to get its ID
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id; // Use the internal _id for queries
  // --- LIVE WINDOW LOGIC (last 5 minutes) ---
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  // 1. Find all live sessions (using updatedAt if available, else endTime)
  const liveSessions = await VisitorSession.find({
    property: mongoPropertyId,
    $or: [
      { updatedAt: { $gte: fiveMinutesAgo } },
      { endTime: { $gte: fiveMinutesAgo } }
    ]
  }).select('visitor isVPN');

  // 2. Unique live visitor IDs
  const liveVisitorIds = [...new Set(liveSessions.map(s => s.visitor.toString()))];

  // 3. VPN Users (unique)
  const vpnVisitorIds = [...new Set(
    liveSessions.filter(s => s.isVPN).map(s => s.visitor.toString())
  )];

  // 4. Repeated Visitors (efficient aggregation)
  const repeatedVisitorsAgg = await VisitorSession.aggregate([
    { $match: { property: mongoPropertyId, visitor: { $in: liveVisitorIds.map(id => new mongoose.Types.ObjectId(id)) } } },
    { $group: { _id: '$visitor', count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
    { $count: 'repeated' }
  ]);
  const repeatedVisitors = repeatedVisitorsAgg[0]?.repeated || 0;

  // --- KEEP OTHER METRICS UNCHANGED ---

  // Bots detected (live, last 5 minutes)
  const botsDetected = await VisitorSession.countDocuments({
    property: mongoPropertyId,
    isBot: true,
    $or: [
      { updatedAt: { $gte: fiveMinutesAgo } },
      { endTime: { $gte: fiveMinutesAgo } }
    ]
  });

  // Most used browser (last 30 days)
  const browserStats = await Visitor.aggregate([
    { $match: { property: mongoPropertyId } },
    { $group: { _id: '$browser', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);

  return {
    activeUsers: { value: liveVisitorIds.length },
    vpnUsers: { value: vpnVisitorIds.length },
    repeatedVisitors: { value: repeatedVisitors },
    botsDetected: { value: botsDetected },
    mostUsedBrowser: {
      value: browserStats[0]?._id || 'Unknown',
      count: browserStats[0]?.count || 0
    }
  };
};


// Get traffic trends
const getTrafficTrends = async (propertyId, timeframe = 'month') => {
  // First find the property to get its ID
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id; // Use the internal _id for queries
  let dateRange;
  
  switch(timeframe) {
    case 'day':
      dateRange = 1;
      break;
    case 'week':
      dateRange = 7;
      break;
    case 'month':
    default:
      dateRange = 30;
      break;
  }
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - dateRange);
  
  // Group by hour for day view, by day for week/month view
  const groupByFormat = timeframe === 'day' ? 
    { $dateToString: { format: "%Y%m%d%H", date: "$createdAt" } } :
    { $dateToString: { format: "%Y%m%d", date: "$createdAt" } };
  
  const sessions = await VisitorSession.aggregate([
    { 
      $match: { 
        property: mongoPropertyId,
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: groupByFormat,
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  // Format data for response
  const data = sessions.map(item => {
    const dateHour = item._id;
    // Calculate lastOneDay and lastSevenDays based on the current data
    return {
      dateHour,
      lastOneDay: item.count,
      lastSevenDays: Math.round(item.count * 1.5) // Simplified calculation for demo
    };
  });
  
  return {
    timeframe,
    data
  };
};

// Get referral traffic
const getReferralTraffic = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id;
  // Get visitors by referrer
  const sources = await Visitor.aggregate([
    { $match: { property: mongoPropertyId } },
    { $group: { _id: '$referrer', visitors: { $sum: 1 } } },
    { $sort: { visitors: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, sessionSource: '$_id', visitors: 1 } }
  ]);

  let summary = { direct: 0, organic: 0, social: 0 , other: 0};

  // Categorize each source using the utility
  const categorizedSources = sources.map(source => {
    let ref = source.sessionSource;
    let category = categorizeReferral(ref);
    if (!ref || ref === '' || ref === '(direct)') ref = '(direct)';
    summary[category] += source.visitors;
    return {
      visitorSource: ref,
      visitors: source.visitors,
      category
    };
  });

  const total = categorizedSources.reduce((sum, src) => sum + src.visitors, 0);
  return { summary, sources: categorizedSources, total };

};

// Get visitors by country
const getVisitorsByCountry = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id;
  const countries = await Visitor.aggregate([
    { $match: { property: mongoPropertyId } },
    { $group: { _id: '$country', activeUsers: { $sum: 1 } } },
    { $sort: { activeUsers: -1 } },
    { $limit: 5 },
    { 
      $project: { 
        _id: 0, 
        country: '$_id',
        activeUsers: 1
      } 
    }
  ]);
  
  const total = await Visitor.countDocuments({ property: mongoPropertyId });
  
  // Add percentage for each country
  const countriesWithPercent = countries.map(c => ({
    ...c,
    percentage: total > 0 ? Math.round((c.activeUsers / total) * 100) : 0
  }));

  return {
    total,
    countries: countriesWithPercent
  };

};

// Get most visited pages
const getMostVisitedPages = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id;
  const pages = await VisitorLog.aggregate([
    { $match: { property: mongoPropertyId } },
    { $group: { _id: '$url', screenPageViews: { $sum: 1 }, title: { $first: '$url_title' } } },
    { $sort: { screenPageViews: -1 } },
    { $limit: 5 },
    { 
      $project: { 
        _id: 0, 
        pagePath: '$_id', 
        screenPageViews: 1,
        pageName: { $ifNull: ['$title', '$_id'] }
      } 
    }
  ]);
  
  return { pages };
};

// Get suspicious activities
const getSuspiciousActivities = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id;
  // Combine suspicious sessions and blocked IPs
  // Use isFlagged and flagReasons for suspicious sessions
  const suspiciousSessions = await VisitorSession.find(
    { 
      property: mongoPropertyId,
      isFlagged: true
    },
    { _id: 0, visitor: 1, isBot: 1, isVPN: 1, createdAt: 1, flagReasons: 1 }
  ).populate('visitor', 'ip');
  
  const blockedIPs = await BlockedIP.find(
    { property: mongoPropertyId },
    { _id: 0, ip: 1, reason: 1, createdAt: 1 }
  );
  
  // Format alerts
  const alerts = [
    ...suspiciousSessions.map(session => ({
      ip: session.visitor?.ip || 'Unknown',
      type: (session.flagReasons && session.flagReasons.length > 0)
        ? session.flagReasons.join(', ')
        : (session.isBot ? 'Bot' : (session.isVPN ? 'VPN' : 'Suspicious Activity')),
      date: session.createdAt ,
      status: 'Flagged'
    })),
    ...blockedIPs.map(blocked => ({
      ip: blocked.ip,
      type: blocked.reason || 'Blocked IP',
      date: blocked.createdAt,
      status: 'Blocked'
    }))
  ].slice(0, 10); // Limit to 10 most recent
  
  return { alerts };
};

// Get traffic by day of week (Sunday to Saturday) with hourly breakdown
const trafficDayByTime = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  const mongoPropertyId = property._id;
  try {
    // Calculate start (Sunday) and end (Saturday) of current week
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sun) - 6 (Sat)
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - currentDay);
    sunday.setHours(0, 0, 0, 0);
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    saturday.setHours(23, 59, 59, 999);

    // Aggregate sessions by day of week and hour for this week
    const weeklyTraffic = await VisitorSession.aggregate([
      { $match: {
          property: mongoPropertyId,
          createdAt: { $gte: sunday, $lte: saturday }
        }
      },
      {
        $project: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }, // 1=Sunday, 7=Saturday
          hour: { $hour: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { dayOfWeek: "$dayOfWeek", hour: "$hour" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.dayOfWeek": 1, "_id.hour": 1 } }
    ]);

    // For each day, build 2-hour interval breakdown in 12-hour AM/PM format
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const result = days.map((day, i) => {
      // Build 24-hour array for this day
      const hours = Array(24).fill(0);
      weeklyTraffic.forEach(item => {
        if (item._id.dayOfWeek - 1 === i && item._id.hour >= 0 && item._id.hour < 24) {
          hours[item._id.hour] = item.count;
        }
      });
      // Build 2-hour intervals in 12-hour format
      const formatHour = (h) => {
        let hour12 = h % 12;
        hour12 = hour12 === 0 ? 12 : hour12;
        const period = h < 12 ? 'AM' : 'PM';
        return `${hour12}${period}`;
      };
      const intervals = [];
      for (let j = 0; j < 24; j += 2) {
        intervals.push({ hour: formatHour(j), count: hours[j] + hours[j + 1] });
      }
      return {
        day,
        count: hours.reduce((a, b) => a + b, 0),
        hours: intervals
      };
    });
    return result;
  } catch (error) {
    console.error('Error getting weekly traffic:', error);
    throw new Error('Failed to retrieve weekly traffic');
  }
};

// Express handler for traffic by time of day
exports.trafficDayByTime = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const trafficByTime = await trafficDayByTime(propertyId);
    res.json({ success: true, data: trafficByTime });
  } catch (error) {
    console.error('Dashboard trafficDayByTime error:', error);
    res.status(500).json({ error: 'Failed to fetch traffic by time of day' });
  }
};

// Get all dashboard data in a single request
exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    // Fetch all data in parallel
    const [domain, metrics, trafficTrends, referralTraffic, visitorsByCountry, mostVisitedPages, suspiciousActivities, peakTrafficHours] = 
      await Promise.all([
        getDomainInfo(propertyId),
        getMetrics(propertyId),
        getTrafficTrends(propertyId, 'month'),
        getReferralTraffic(propertyId),
        getVisitorsByCountry(propertyId),
        getMostVisitedPages(propertyId),
        getSuspiciousActivities(propertyId),
        trafficDayByTime(propertyId)
      ]);
    
    // Return combined data
    res.json({
      domain,
      metrics,
      trafficTrends,
      referralTraffic,
      visitorsByCountry,
      mostVisitedPages,
      suspiciousActivities,
      peakTrafficHours
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// Individual endpoints for each section
exports.getDomain = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const domain = await getDomainInfo(propertyId);
    res.json(domain);
  } catch (error) {
    console.error('Dashboard domain error:', error);
    res.status(500).json({ error: 'Failed to fetch domain data' });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const metrics = await getMetrics(propertyId);
    res.json(metrics);
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch metrics data' });
  }
};

exports.getTrafficTrends = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { timeframe = 'month' } = req.query;
    const trafficTrends = await getTrafficTrends(propertyId, timeframe);
    res.json(trafficTrends);
  } catch (error) {
    console.error('Dashboard traffic trends error:', error);
    res.status(500).json({ error: 'Failed to fetch traffic trends data' });
  }
};

exports.getReferralTraffic = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const referralTraffic = await getReferralTraffic(propertyId);
    res.json(referralTraffic);
  } catch (error) {
    console.error('Dashboard referral traffic error:', error);
    res.status(500).json({ error: 'Failed to fetch referral traffic data' });
  }
};

exports.getVisitorsByCountry = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const visitorsByCountry = await getVisitorsByCountry(propertyId);
    res.json(visitorsByCountry);
  } catch (error) {
    console.error('Dashboard visitors by country error:', error);
    res.status(500).json({ error: 'Failed to fetch visitors by country data' });
  }
};

exports.getMostVisitedPages = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const mostVisitedPages = await getMostVisitedPages(propertyId);
    res.json(mostVisitedPages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch most visited pages data' });
  }
};

exports.getSuspiciousActivities = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const suspiciousActivities = await getSuspiciousActivities(propertyId);
    res.json(suspiciousActivities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suspicious activities data' });
  }
};
