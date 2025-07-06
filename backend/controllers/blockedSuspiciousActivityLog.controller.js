const BlockedIP = require('../models/blockedIP.model');
const Property = require('../models/property.model');
const VisitorSession = require('../models/visitorSession.model');
// --- Service Functions (internal, not exported) ---

// Get metrics for blocked IPs (for metrics cards)
async function getBlockedIpMetrics(propertyId) {
  // Only count currently active blocks for totalBlocked
  const totalBlocked = await BlockedIP.countDocuments({ propertyId, isActive: true });
  // Manual/auto blocked are subsets of currently active
  const [manualBlocked, autoBlocked] = await Promise.all([
    BlockedIP.countDocuments({ propertyId, isActive: true, blockType: 'manual' }),
    BlockedIP.countDocuments({ propertyId, isActive: true, blockType: 'auto' })
  ]);
  // Flagged visitors: unique visitors with at least one flagged session
  const flaggedVisitorIds = await VisitorSession.distinct('visitor', { propertyId: propertyId, isFlagged: true });
  const flaggedVisitors = flaggedVisitorIds.length;
  // Repeat offenders: use the same logic as securityThreat.controller.js
  const repeatOffenders = await getRepeatOffendersCount(propertyId);
  return {
    totalBlocked,
    manualBlocked,
    autoBlocked,
    flaggedVisitors,
    repeatOffenders
  };
}

// Helper: repeat offenders logic from securityThreat.controller.js
async function getRepeatOffendersCount(propertyId) {
      // --- Offender aggregation logic (EXACTLY as in securityThreat.controller.js:getRepeatedOffendersData) ---
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
    
  // Repeat offenders: visitors with > 1 flagged session
  return offenders.length;
}

// Get paginated/filterable list of blocked IPs
async function getBlockedIpsList(propertyId, query) {
  const {
    page = 1,
    limit = 20,
    blockType,
    reason,
    status, // 'active' | 'expired'
    search,
    dateFrom,
    dateTo
  } = query;
  const filter = { propertyId };
  if (blockType) filter.blockType = blockType;
  if (reason) filter.reason = reason;
  if (status === 'active') filter.isActive = true;
  if (status === 'expired') filter.isActive = false;
  if (search) filter.ip = { $regex: search, $options: 'i' };
  if (dateFrom || dateTo) {
    filter.blockedAt = {};
    if (dateFrom) filter.blockedAt.$gte = new Date(dateFrom);
    if (dateTo) filter.blockedAt.$lte = new Date(dateTo);
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [ips, total] = await Promise.all([
    BlockedIP.find(filter)
      .sort({ blockedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    BlockedIP.countDocuments(filter)
  ]);
  return {
    ips: ips.map(ip => ({
      ip: ip.ip,
      reason: ip.reason,
      isActive: ip.isActive,
      blockedAt: ip.updatedAt,
      blockType: ip.blockType,
      expiresAt: ip.expiresAt,
    })),    
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    }
  };
}

// Get offender stats for charts (breakdown by reason/type and flagged/repeat offenders)
async function getOffenderStats(propertyId) {

    // --- Offender aggregation logic (EXACTLY as in securityThreat.controller.js:getRepeatedOffendersData) ---
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

  // Only include IPs that are both flagged and repeated offenders (already filtered above)
  // Limit to 10
  // Only include offenders whose visitorId has at least one flagged session
  const flaggedVisitorIds = await VisitorSession.distinct('visitor', { isFlagged: true });
  const flaggedVisitorSet = new Set(flaggedVisitorIds.map(id => id.toString()));
  const topOffenders = offenders
    .filter(o => o.ip && o.visitorId && flaggedVisitorSet.has(o.visitorId.toString()))
    .slice(0, 10)
    .map(o => ({
      visitorId: o.visitorId,
      ip: o.ip,
      offenseCount: o.offenseCount,
      maxRiskScore: o.maxRiskScore
    }));



  // Return only a simple array of top 10 IPs that are both top offenders and highly flagged
  return {
    ips: topOffenders.map(o => o.ip)
  };

}


// --- Controller Route Handlers ---

// Summary endpoint for blocked suspicious activity log
async function getSummary(propertyIdOrObj) {
  let property;
  if (typeof propertyIdOrObj === 'object' && propertyIdOrObj._id) {
    property = propertyIdOrObj;
  } else {
    property = await Property.findOne({ propertyId: propertyIdOrObj });
    if (!property) throw new Error('Property not found');
  }
  const [metrics, offenderStats, blockedIpsList] = await Promise.all([
    getBlockedIpMetrics(property.propertyId),
    getOffenderStats(property.propertyId),
    getBlockedIpsList(property.propertyId, { page: 1, limit: 5 }) // BlockedIP uses propertyId string
  ]);
  return {
    metrics,
    latestBlocked: blockedIpsList.ips ? blockedIpsList.ips : (blockedIpsList.data || blockedIpsList.results || []),
    offenderStats
  };
}

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const property = await Property.findOne({ user: userId });
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    const summary = await getSummary(property); // Pass property object
    res.json({ success: true, summary });
  } catch (error) {
    console.error('Error in getSummary:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch summary' });
  }
};

exports.getBlockedIpMetrics = async (req, res) => {
  try {
    const userId = req.user._id;
    const property = await Property.findOne({ user: userId });
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    const metrics = await getBlockedIpMetrics(property.propertyId); // Pass property object
    res.json({ success: true, metrics });
  } catch (error) {
    console.error('Error in getBlockedIpMetrics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch blocked IP metrics' });
  }
};

exports.getBlockedIpsList = async (req, res) => {
  try {
    const userId = req.user._id;
    const property = await Property.findOne({ user: userId });
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    const result = await getBlockedIpsList(property.propertyId, req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error in getBlockedIpsList:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch blocked IPs list' });
  }
};

exports.getOffenderStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const property = await Property.findOne({ user: userId });
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    const stats = await getOffenderStats(property.propertyId);
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error in getOffenderStats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch offender stats' });
  }
};
