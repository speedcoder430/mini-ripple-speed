// Device & Browser Insights Helpers
const mongoose = require('mongoose');
const Visitor = require('../models/visitor.model');
const VisitorSession = require('../models/visitorSession.model');
const BlockedCountry = require('../models/blockedCountry.model');
const BlockedBrowser = require('../models/blockedBrowser.model');
const Property = require('../models/property.model');

// Device Usage Metrics
async function fetchDeviceUsageMetrics(propertyId) {
  try {
    // First get the property to get its _id
    const property = await Property.findOne({ propertyId: propertyId });
    if (!property) {
      throw new Error('Property not found');
    }
    
    const deviceStats = await Visitor.aggregate([
      { $match: { property: property._id } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
    ]);
    const total = deviceStats.reduce((acc, cur) => acc + cur.count, 0) || 1;
    const statsMap = Object.fromEntries(deviceStats.map(d => [d._id || 'Unknown', d.count]));
    return [
      {
        title: 'Desktop',
        value: ((statsMap['desktop'] || 0) / total * 100).toFixed(1) + '%',
      },
      {
        title: 'Mobile',
        value: ((statsMap['mobile'] || 0) / total * 100).toFixed(1) + '%',
      },
      {
        title: 'Tablet',
        value: ((statsMap['tablet'] || 0) / total * 100).toFixed(1) + '%',
      },
    ];
  } catch (error) {
    console.error('Error in fetchDeviceUsageMetrics:', error);
    throw error;
  }
}

// Device Session Summary
async function fetchDeviceSessionSummary(propertyId) {
  try {
    // First find the property to get the MongoDB _id
    const property = await Property.findOne({ propertyId });
    if (!property) {
      throw new Error('Property not found');
    }
    
    const days = 30;
    const data = await VisitorSession.aggregate([
      { $match: { property: property._id } },
      { $project: {
        device: 1,
        date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      }},
      { $group: {
        _id: { date: '$date', device: '$device' },
        count: { $sum: 1 },
      }},
    ]);
    
    const grouped = {};
    data.forEach(row => {
      const day = row._id.date;
      if (!grouped[day]) grouped[day] = { mobile: 0, desktop: 0, tablet: 0 };
      grouped[day][row._id.device || 'desktop'] += row.count;
    });
    
    // Get last 30 days sorted by date ascending
    const sortedDays = Object.keys(grouped).sort();
    const last30 = sortedDays.slice(-days).map(day => grouped[day]);
    
    // Calculate total
    const total = last30.reduce((acc, cur) => {
      acc.mobile += cur.mobile || 0;
      acc.desktop += cur.desktop || 0;
      acc.tablet += cur.tablet || 0;
      return acc;
    }, { mobile: 0, desktop: 0, tablet: 0 });
    
    return total;
  } catch (error) {
    console.error('Error in fetchDeviceSessionSummary:', error);
    throw error;
  }
}

// Browser Usage
async function fetchBrowserUsage(propertyId) {
  try {
    // First find the property to get the MongoDB _id
    const property = await Property.findOne({ propertyId });
    if (!property) {
      throw new Error('Property not found');
    }
    
    // Current month range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const data = await Visitor.aggregate([
      { $match: {
          property: property._id,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
    ]);
    
    const browsers = ['chrome', 'safari', 'edge', 'firefox', 'opera', 'other'];
    const total = Object.fromEntries(browsers.map(b => [b, 0]));
    
    data.forEach(row => {
      const browser = (row._id || '').toLowerCase();
      if (total[browser] !== undefined) total[browser] += row.count;
      else total['other'] += row.count;
    });
    
    return total;
  } catch (error) {
    console.error('Error in fetchBrowserUsage:', error);
    throw error;
  }
}

// Blocked Countries
async function fetchBlockedCountries(propertyId) {
  try {
    // First find the property to get the MongoDB _id
    const property = await Property.findOne({ propertyId });
    if (!property) {
      throw new Error('Property not found');
    }
    
    const blocked = await BlockedCountry.find({ property: property._id, isActive: true });
    return blocked.map(entry => ({
      countryCode: entry.countryCode,
      reason: entry.reason || 'No reason provided',
      date: entry.createdAt ? entry.createdAt.toISOString().split('T')[0] : 'Unknown',
      status: entry.isActive ? 'Blocked' : 'Inactive',
    }));
  } catch (error) {
    console.error('Error in fetchBlockedCountries:', error);
    throw error;
  }
}

// Blocked Browsers
async function fetchBlockedBrowsers(propertyId) {
  try {
    // First find the property to get the MongoDB _id
    const property = await Property.findOne({ propertyId });
    if (!property) {
      throw new Error('Property not found');
    }
    
    const blocked = await BlockedBrowser.find({ property: property._id, isBlocked: true });
    return blocked.map(entry => ({
      browserName: entry.browserName,
      reason: entry.reason || 'No reason provided',
      date: entry.createdAt ? entry.createdAt.toISOString().split('T')[0] : 'Unknown',
      status: entry.isBlocked ? 'Blocked' : 'Inactive',
    }));
  } catch (error) {
    console.error('Error in fetchBlockedBrowsers:', error);
    throw error;
  }
}

exports.getDeviceUsageMetrics = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const result = await fetchDeviceUsageMetrics(propertyId);
    res.json(result);
  } catch (error) {
    console.error('Device usage metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch device usage metrics' });
  }
};

exports.getDeviceSessionSummary = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const result = await fetchDeviceSessionSummary(propertyId);
    res.json(result); // { mobile: ..., desktop: ..., tablet: ... }
  } catch (error) {
    console.error('Device session summary error:', error);
    res.status(500).json({ error: 'Failed to fetch device session summary' });
  }
};

exports.getBrowserUsage = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const result = await fetchBrowserUsage(propertyId);
    res.json(result); // { chrome: ..., safari: ..., ... }
  } catch (error) {
    console.error('Browser usage error:', error);
    res.status(500).json({ error: 'Failed to fetch browser usage data' });
  }
};

exports.getBlockedCountries = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const result = await fetchBlockedCountries(propertyId);
    res.json(result);
  } catch (error) {
    console.error('Blocked countries error:', error);
    res.status(500).json({ error: 'Failed to fetch blocked countries' });
  }
};

exports.getBlockedBrowsers = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const result = await fetchBlockedBrowsers(propertyId);
    res.json(result);
  } catch (error) {
    console.error('Blocked browsers error:', error);
    res.status(500).json({ error: 'Failed to fetch blocked browsers' });
  }
};

// Summary endpoint
exports.getInsightsSummary = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;
    const [
      deviceUsageMetrics,
      deviceSessionSummary,
      browserUsage,
      blockedCountries,
      blockedBrowsers
    ] = await Promise.all([
      fetchDeviceUsageMetrics(propertyId),
      fetchDeviceSessionSummary(propertyId),
      fetchBrowserUsage(propertyId),
      fetchBlockedCountries(propertyId),
      fetchBlockedBrowsers(propertyId)
    ]);
    res.json({
      deviceUsageMetrics,
      deviceSessionSummary,
      browserUsage,
      blockedCountries,
      blockedBrowsers
    });
  } catch (error) {
    console.error('Insights summary error:', error);
    res.status(500).json({ error: 'Failed to fetch insights summary' });
  }
};
