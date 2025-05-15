const VisitorLog = require("../models/visitorLog.model");
const Property = require("../models/property.model");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const { isbot } = require("isbot");

// Create or skip logging a unique visitor
exports.trackVisitor = async (req, res) => {
  try {
    const {
      visitorId,
      propertyId,
      domain,
      userAgent,
      screen,
      language,
      timezone,
      referrer,
    } = req.body;

    if (!visitorId || !propertyId || !userAgent) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields." });
    }
    // ✅ Check if the propertyId and domain match
    const registeredProperty = await Property.findOne({ propertyId, domain });

    if (!registeredProperty) {
      return res.status(403).json({
        success: false,
        error: "Property not registered for this domain.",
      });
    }

    // Check if already exists (unique visitor)
    const exists = await VisitorLog.findOne({ visitorId, propertyId });
    if (exists) {
      return res
        .status(200)
        .json({ success: true, message: "Visitor already logged." });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      req.ip;
    const geo = geoip.lookup(ip);
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();

    const visitor = await VisitorLog.create({
      visitorId,
      propertyId,
      property: registeredProperty._id,
      ip,
      country: geo?.country,
      userAgent,
      browser: deviceInfo.browser?.name,
      os: deviceInfo.os?.name,
      device: deviceInfo.device?.type || "desktop",
      screen,
      language,
      timezone,
      referrer,
      isBot: isbot(userAgent),
      isVPN: false, // Optional: add VPN check logic
    });

    res.status(201).json({ success: true, visitor });
  } catch (err) {
    console.error("Error logging visitor:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get single visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await VisitorLog.findById(req.params.id);
    if (!visitor) {
      return res
        .status(404)
        .json({ success: false, error: "Visitor not found." });
    }
    res.status(200).json({ success: true, visitor });
  } catch (err) {
    console.error("Error fetching visitor:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getVisitorsByPropertyId = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res
        .status(400)
        .json({ success: false, error: "Property ID is required." });
    }

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }
    const visitors = await VisitorLog.find({ property: property._id }).populate(
      "property"
    );

    res.status(200).json({
      success: true,
      count: visitors.length,
      visitors,
    });
  } catch (error) {
    console.error("Error fetching visitors by propertyId:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
