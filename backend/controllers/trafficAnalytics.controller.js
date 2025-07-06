const mongoose = require('mongoose');
const Visitor = require('../models/visitor.model');
const VisitorSession = require('../models/visitorSession.model');
const VisitorLog = require('../models/visitorLog.model');
const Property = require('../models/property.model');
const { categorizeReferral } = require('../utils/referral/referralCategorizer');

// Helper function to get basic analytics metrics
const getBasicMetrics = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  
  try {
    // Get total visits and unique visitors
    const totalVisits = await VisitorSession.countDocuments({ property: property._id });
    const uniqueVisitors = await Visitor.countDocuments({ property: property._id });

    return {
      totalVisits,
      uniqueVisitors
    };
  } catch (error) {
    console.error('Error getting basic metrics:', error);
    throw new Error('Failed to retrieve basic analytics metrics');
  }
};

// Get peak traffic hours
const getPeakTrafficHours = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
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
          property: property._id,
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
    console.error('Error getting peak traffic hours:', error);
    throw new Error('Failed to retrieve peak traffic hours data');
  }
};

// Get repeated visits from the same IP (aggregate sessions by IP via Visitor and VisitorSession)
const getRepeatedVisits = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }

  try {
    const repeatedVisits = await VisitorSession.aggregate([
      { $match: { property: property._id } },
      {
        $lookup: {
          from: "visitors",
          localField: "visitor", // Use visitorId (string) for join
          foreignField: "_id", // Use visitorId (string) for join
          as: "visitorInfo"
        }
      },
      { $unwind: "$visitorInfo" },
      {
        $group: {
          _id: "$visitorInfo.ip", // Group by IP from Visitor
          count: { $sum: 1 } // Count sessions per IP
        }
      },
      { $sort: { count: -1 } }, // Sort by session count descending
      { $limit: 10 }, // Top 10 IPs
      {
        $project: {
          ip: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);
    // Format the result
    return repeatedVisits;
  } catch (error) {
    console.error('Error getting repeated visits:', error);
    throw new Error('Failed to retrieve repeated visits data');
  }
};

// Get bounce rate and session duration
const getBounceRateAndSession = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  try {
    // Total sessions
    const totalSessions = await VisitorSession.countDocuments({ property: property._id });
    // Bounce sessions (only one page view/action)
    const bounceSessions = await VisitorSession.aggregate([
      { $match: { property: property._id } },
      {
        $lookup: {
          from: "visitorlogs",
          localField: "_id",
          foreignField: "session",
          as: "logs"
        }
      },
      {
        $match: {
          "logs": { $size: 1 } // Sessions with only one log entry
        }
      },
      { $count: "count" }
    ]);
    // Calculate bounce rate
    const bounceCount = bounceSessions.length > 0 ? bounceSessions[0].count : 0;
    const bounceRate = totalSessions > 0 ? bounceCount / totalSessions : 0;
    // Calculate average session duration
    const sessionsWithDuration = await VisitorSession.aggregate([
      { $match: {
        property: property._id,
        endTime: { $exists: true, $ne: null }
      }},
      {
        $project: {
          duration: { $subtract: ["$endTime", "$createdAt"] }
        }
      },
      {
        $group: {
          _id: null,
          averageDuration: { $avg: "$duration" }
        }
      }
    ]);
    // Convert duration from milliseconds to seconds
    const avgDurationMs = sessionsWithDuration.length > 0 ? sessionsWithDuration[0].averageDuration : 0;
    const avgDurationSeconds = Math.round(avgDurationMs / 1000);
    return {
      bounceRate: bounceRate.toFixed(2),
      averageSessionDuration: avgDurationSeconds
    };
  } catch (error) {
    console.error('Error getting bounce rate and session duration:', error);
    throw new Error('Failed to retrieve bounce rate and session data');
  }
};

// Get real-time vs returning users
const getRealTimeVsReturningUsers = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');
  }
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Get all active sessions in the last 5 minutes
    const realTimeSessions = await VisitorSession.aggregate([
      {
        $match: {
          property: property._id,
          $or: [
            { updatedAt: { $gte: fiveMinutesAgo } },
            { endTime: { $gte: fiveMinutesAgo } }
          ]
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
      { $unwind: '$visitorInfo' },
      {
        $group: {
          _id: '$visitor',
          sessionCount: { $sum: 1 },
          visitorInfo: { $first: '$visitorInfo' }
        }
      }
    ]);

    const realTimeUserCount = realTimeSessions.length;
    
    // Count returning users (users with more than one session in real-time data)
    const returningUsers = realTimeSessions.filter(session => session.visitorInfo.sessionCount > 1).length;
    const newUsers = realTimeUserCount - returningUsers;

    // Calculate percentages
    const returningPercentage = realTimeUserCount > 0 
      ? ((returningUsers / realTimeUserCount) * 100).toFixed(1) 
      : 0;
    const newPercentage = realTimeUserCount > 0 
      ? ((newUsers / realTimeUserCount) * 100).toFixed(1) 
      : 0;

    return {
      realTimeUsers: realTimeUserCount,
      realTimePercentage: realTimeUserCount > 0 ? '100%' : '0%',
      returningUsers: returningUsers,
      returningPercentage: returningPercentage + '%',
      newUsers: newUsers,
      newPercentage: newPercentage + '%'
    };
  } catch (error) {
    console.error('Error getting real-time vs returning users:', error);
    throw new Error('Failed to retrieve user return data');
  }
};

// Get referral domains and external traffic
const getReferralDomains = async (propertyId) => {
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    throw new Error('Property not found');  
  }
  
  try {
    // Get sessions by source
    const sources = await VisitorSession.aggregate([
      { $match: { 
        property: property._id,
        referrer: { $exists: true, $ne: null, $ne: "" }
      }},
      { $group: { _id: '$referrer', sessions: { $sum: 1 } } },
      { $sort: { sessions: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, domain: '$_id', sessions: 1 } }
    ]);

    // Categorize sources
    const categorizedSources = sources.map(source => {
      const category = categorizeReferral(source.domain);
      return {
        domain: source.domain,
        sessions: source.sessions,
        category
      };
    });

    return categorizedSources;
  } catch (error) {
    console.error('Error getting referral domains:', error);
    throw new Error('Failed to retrieve referral domain data');
  }
};

// Controller methods for API endpoints
exports.getBasicMetrics = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const metrics = await getBasicMetrics(propertyId);
    res.json({ success: true, ...metrics });
  } catch (error) {
    console.error('Error in getBasicMetrics controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPeakTrafficHours = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const data = await getPeakTrafficHours(propertyId);
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Error in getPeakTrafficHours controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRepeatedVisits = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const data = await getRepeatedVisits(propertyId);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getRepeatedVisits controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBounceRateAndSession = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const data = await getBounceRateAndSession(propertyId);
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Error in getBounceRateAndSession controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRealTimeVsReturningUsers = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const data = await getRealTimeVsReturningUsers(propertyId)
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Error in getRealTimeVsReturningUsers controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getReferralDomains = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    const data = await getReferralDomains(propertyId);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getReferralDomains controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Main traffic analytics endpoint
exports.getTrafficAnalytics = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    
    // Gather all traffic analytics data in one response
    const [
      basicMetrics,
      peakTrafficHours,
      repeatedVisits,
      bounceAndSession,
      realTimeVsReturningUsers,
      referralDomains
    ] = await Promise.all([
      getBasicMetrics(propertyId),
      getPeakTrafficHours(propertyId),
      getRepeatedVisits(propertyId),
      getBounceRateAndSession(propertyId),
      getRealTimeVsReturningUsers(propertyId),
      getReferralDomains(propertyId)
    ]);

    res.json({
      success: true,
      basicMetrics,
      peakTrafficHours,
      repeatedVisits,
      bounceAndSession,
      realTimeVsReturningUsers,
      referralDomains
    });
  } catch (error) {
    console.error('Error in getTrafficAnalytics controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
