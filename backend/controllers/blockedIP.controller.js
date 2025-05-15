const BlockedIP = require("../models/BlockedIP");
const Property = require("../models/property.model");
const geoip = require("geoip-lite");
/**
 * Block an IP for a specific property
 */
exports.blockIP = async (req, res) => {
  try {
    const { ip, reason, propertyId, expiresAt } = req.body;
    const blockedBy = req.body.blockedBy || null; // or fallback user ID

    if (!ip || !reason || !propertyId || !blockedBy) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields." });
    }

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found." });
    }

    const existing = await BlockedIP.findOne({ ip, propertyId });

    if (existing && existing.isActive) {
      return res.status(409).json({
        success: false,
        error: "IP is already blocked for this property.",
      });
    }

    const block = await BlockedIP.findOneAndUpdate(
      { ip, propertyId },
      {
        ip,
        reason,
        propertyId,
        property: property._id, // 👈 Relationship field
        blockedBy,
        isActive: true,
        blockedAt: new Date(),
        expiresAt: expiresAt || null,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "IP blocked successfully",
      block,
    });
  } catch (err) {
    console.error("Error blocking IP:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Unblock an IP
 */
exports.unblockIP = async (req, res) => {
  try {
    const { ip, propertyId } = req.body;

    if (!ip || !propertyId) {
      return res
        .status(400)
        .json({ success: false, error: "IP and propertyId are required." });
    }

    const existing = await BlockedIP.findOne({ ip, propertyId });

    if (!existing || !existing.isActive) {
      return res
        .status(404)
        .json({ success: false, error: "IP is not currently blocked." });
    }

    existing.isActive = false;
    await existing.save();

    res
      .status(200)
      .json({ success: true, message: "IP unblocked successfully" });
  } catch (err) {
    console.error("Error unblocking IP:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Check if an IP is blocked
 */
exports.checkIPStatus = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "PropertyID is required." });
    }
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      req.ip;

    const geo = geoip.lookup(ip);
    const countryCode = geo?.country;

    const countryBlocked = await BlockedCountry.findOne({
      propertyId,
      countryCode,
    });

    const ipBlocked = await BlockedIP.findOne({
      ip,
      propertyId,
      isActive: true,
    });

    if (ipBlocked || countryBlocked) {
      return res.status(200).json({
        blocked: true,
        reason: blocked.reason,
        expiresAt: blocked.expiresAt,
        redirectUrl: "https://test-miniripple.onrender.com/blocked.html",
      });
    }

    res.status(200).json({ blocked: false });
  } catch (err) {
    console.error("Error checking IP:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all currently blocked IPs for a property
 */
exports.listBlockedIPs = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({ error: "propertyId is required." });
    }
    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const blockedIPs = await BlockedIP.find({
      propertyId,
      isActive: true,
    });
    console.log("pid", property._id);
    console.log("blockedIPs", blockedIPs);

    res.status(200).json({ success: true, blockedIPs });
  } catch (err) {
    console.error("Error fetching blocked IPs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
