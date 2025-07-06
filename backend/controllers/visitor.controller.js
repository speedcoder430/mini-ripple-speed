const Visitor = require("../models/visitor.model");
const VisitorSession = require("../models/visitorSession.model");
const VisitorLog = require("../models/visitorLog.model");
const Property = require("../models/property.model");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const { detectBotLevel } = require("../services/botDetection.service");
const {detectVPN} = require("../services/vpnDetection.service");
const { shouldFlagVisitor } = require("../services/flaggedVisitor.service");

// Visitor Controller for tracking endpoints
exports.trackVisitor = async (req, res) => {
  try {
    const { visitorId, propertyId, domain, userAgent, language, timezone, referrer } = req.body;

    if (!visitorId || !propertyId || !userAgent) {
      return res.status(400).json({ success: false, error: "Missing required fields. like Visitor, Property Id, and user agent informations " });
    }

    const registeredProperty = await Property.findOne({ propertyId, domain });
    if (!registeredProperty || registeredProperty.status !== 'active') {
      return res.status(403).json({ success: false, error: "Property not active or registered for this domain." });
    }

    let visitor = await Visitor.findOne({ visitorId, propertyId });
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket?.remoteAddress || req.ip;
    const geo = geoip.lookup(ip);
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();
    
    if (!visitor) {
      visitor = await Visitor.create({
        visitorId,
        property: registeredProperty._id,
        propertyId,
        ip,
        device: deviceInfo.device?.type || "desktop",
        os: deviceInfo.os?.name,
        browser: deviceInfo.browser?.name,
        referrer,
        country: geo?.country,
        language,
        timezone,
      });
    } else {
      // Update IP and geography if visitor already exists
      visitor.ip = ip;
      visitor.country = geo?.country;
      visitor.language = language;
      visitor.timezone = timezone;
      await visitor.save();
    }
    res.status(201).json({ success: true, visitor, property: registeredProperty });
  } catch (err) {
    console.error("[trackVisitor]", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.createVisitorSession = async (req, res) => {
  try {
    const { visitorId, propertyId, sessionId, referrer } = req.body;
    if (!visitorId || !propertyId || !sessionId) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    const visitor = await Visitor.findOne({ visitorId, propertyId });
    const property = await Property.findOne({ propertyId });
    if (!visitor || !property) {
      return res.status(404).json({ success: false, error: "Visitor or property not found." });
    }
    
    let session = await VisitorSession.findOne({ sessionId });
    if (!session) {
      session = await VisitorSession.create({
        visitor: visitor._id,
        property: property._id,
        sessionId,
        referrer,
        startTime: new Date(),
      });
    }

    const vpnResult = await detectVPN(visitor.ip, visitor.timezone);
    session.isVPN = vpnResult.isVPN;
    res.status(201).json({ success: true, session, visitor, property });
  } catch (err) {
    console.error("[createVisitorSession]", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.logPageView = async (req, res) => {
  try {
    const { visitorId, sessionId, propertyId, url, url_title } = req.body;
    if (!visitorId || !sessionId || !propertyId || !url) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    const visitor = await Visitor.findOne({ visitorId, propertyId });
    const property = await Property.findOne({ propertyId });
    const session = await VisitorSession.findOne({ sessionId });
    
    if (!visitor || !property || !session) {
      return res.status(404).json({ success: false, error: "Visitor, property, or session not found." });
    }
    
    // Only store the route (pathname) part of the URL
    let route = url;
    try {
      route = new URL(url, 'http://dummy.base').pathname;
    } catch (e) {
      // fallback: if url is not absolute, use as is
      if (typeof url === 'string') {
        const qIdx = url.indexOf('?');
        route = qIdx >= 0 ? url.substring(0, qIdx) : url;
      }
    }
    const log = await VisitorLog.create({
      visitor: visitor._id,
      session: session._id,
      property: property._id,
      url: route,
      url_title
    });
    
    res.status(201).json({ success: true, log, visitor, property, session });
  } catch (err) {
    console.error("[logPageView]", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


exports.endVisitorSession = async (req, res) => {
  try {
    const { visitorId, sessionId, propertyId, pageViews, clicks, scrollDepth, idleTime , mouseMoves, focusChanges, honeypotTriggered, honeypotValue} = req.body;
    if (!visitorId || !sessionId || !propertyId) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }
    const session = await VisitorSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found." });
    }
    session.endTime = new Date();
    session.pageViews = pageViews;
    session.clicks = clicks;
    session.scrollDepth = scrollDepth;
    session.idleTime = idleTime;
    session.mouseMoves = mouseMoves;
    session.focusChanges = typeof focusChanges === "number" ? focusChanges : 0; // Ensure focusChanges is set, default to 0 if not provided
    session.honeypotTriggered = honeypotTriggered;
    session.honeypotValue = honeypotValue;

    await session.save();
    res.status(200).json({ success: true, session });
  } catch (err) {
    console.error("[endVisitorSession]", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.heartbeat = async (req, res) => {
  try {
  // Heartbeat endpoint to update session data periodically
    const { visitorId, sessionId, propertyId, pageViews, clicks, scrollDepth, idleTime, endTime, mouseMoves, honeypotTriggered, honeypotValue, focusChanges, userAgent } = req.body;
    if (!visitorId || !sessionId || !propertyId) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }
    const session = await VisitorSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found." });
    }
    session.pageViews = pageViews;
    session.clicks = clicks;
    session.scrollDepth = scrollDepth;
    session.idleTime = idleTime;
    session.endTime = endTime ? new Date(endTime) : new Date();
    session.mouseMoves = mouseMoves;
    session.focusChanges = typeof focusChanges === "number" ? focusChanges : 0; // Ensure focusChanges is set, default to 0 if not provided
    session.honeypotTriggered = honeypotTriggered;
    session.honeypotValue = honeypotValue;
    // Run bot detection on this heartbeat
    const botDetectionResult = detectBotLevel({
      userAgent,
      honeypotValue,
      honeypotTriggered,
      mouseMoves,
      clicks,
      scrollDepth,
      idleTime,
      sessionStartTime: session.startTime,
      endTime
    });

    session.isBot = botDetectionResult.isBot;
    session.riskScore = botDetectionResult.riskScore;

    // Run VPN detection for timezone mismatch
    let vpnDetectionResult = { isVPN: session.isVPN, timezoneMismatch: false };
    try {
      // Use session IP and timezone from Visitor if available, fallback to session
      const visitor = await Visitor.findOne({ _id: session.visitor });
      if (visitor && visitor.ip && visitor.timezone) {
        vpnDetectionResult = await detectVPN(visitor.ip, visitor.timezone);
        session.isVPN = vpnDetectionResult.isVPN;
      }
    } catch(e) {
      // fallback: keep previous session.isVPN
    }

    // Flagged visitor logic
    const flagResult = shouldFlagVisitor(session, vpnDetectionResult);
    session.isFlagged = flagResult.isFlagged;
    session.flagReasons = flagResult.flagReasons;

    await session.save();
    res.status(200).json({ success: true, session });
  } catch (err) {
    console.error("[heartbeat]", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
