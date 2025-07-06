const BlockedIP = require("../models/blockedIP.model");
const Property = require("../models/property.model");
const DeviceBlocked = require("../models/blockedDevice.model");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");

exports.blockIP = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { ip, reason, expiresAt } = req.body;
    const blockedBy = userId;

    if (!ip || !reason) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields." });
    }

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

    const simplifiedBlock = {
      ip: block.ip,
      reason: block.reason,
      isActive: block.isActive,
      blockedAt: block.updatedAt,
      blockType: block.blockType,
      expiresAt: block.expiresAt,
    };
    
    res.status(201).json({
      success: true,
      message: "IP blocked successfully",
      data: simplifiedBlock,
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
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { ip } = req.body;

    if (!ip) {
      return res
        .status(400)
        .json({ success: false, error: "IP is required." });
    }

    const existing = await BlockedIP.findOne({ ip, propertyId });

    if (!existing || !existing.isActive) {
      return res
        .status(404)
        .json({ success: false, error: "IP is not currently blocked." });
    }

    existing.isActive = false;
    await existing.save();

    const simplifiedBlock = {
      ip: existing.ip,
      reason: existing.reason,
      isActive: existing.isActive,
      blockedAt: existing.updatedAt,
      blockType: existing.blockType,
      expiresAt: existing.expiresAt,
    };
    
    res
      .status(200)
      .json({ success: true, message: "IP unblocked successfully", data: simplifiedBlock });
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
    const { propertyId, userAgent } = req.body;
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();
    const deviceType = deviceInfo.device?.type
 

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

    const deviceBlocked = await DeviceBlocked.findOne({
      deviceType,
      isBlocked: true,
    });

    if (ipBlocked) {
      return res.status(200).json({
        blocked: true,
        reason: ipBlocked.reason,
        expiresAt: ipBlocked.expiresAt,
        redirectUrl: "https://test-miniripple.onrender.com/blocked.html",
      });
    }

    if (countryBlocked) {
      return res.status(200).json({
        blocked: true,
        reason: "You are not allowed to access the site from this country",
        redirectUrl: "https://test-miniripple.onrender.com/blocked.html"
      });
    }
    if (deviceBlocked) {
      return res.status(200).json({
        blocked: true,
        reason: "Device blocked",
        redirectUrl: "https://test-miniripple.onrender.com/blocked.html"
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

    const userId = req.user._id; // Get user ID from auth middleware
    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    if (!property) {
      return res.status(404).json({ success: false, error: "Property not found" });
    }

    const blockedIPs = await BlockedIP.find({
      propertyId,
      isActive: true,
    });
    
    const simplifiedBlockedIPs = blockedIPs.map(block => ({
      ip: block.ip,
      reason: block.reason,
      isActive: block.isActive,
      blockedAt: block.updatedAt,
      blockType: block.blockType,
      expiresAt: block.expiresAt,
    }));
    
    res.status(200).json({ success: true, data: simplifiedBlockedIPs });
  } catch (err) {
    console.error("Error fetching blocked IPs:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
