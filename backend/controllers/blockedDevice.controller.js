const BlockedDevice = require("../models/blockedDevice.model");
const Property = require("../models/property.model");

const ALLOWED_DEVICE_TYPES = ["desktop", "mobile", "tablet"];

// Set (or update) block for a single device type
exports.setDeviceBlock = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { deviceType, reason } = req.body;

    if (!deviceType) {
      return res.status(400).json({
        success: false,
        error: "deviceType is required.",
      });
    }

    if (!ALLOWED_DEVICE_TYPES.includes(deviceType)) {
      return res.status(400).json({
        success: false,
        error: `deviceType must be one of: ${ALLOWED_DEVICE_TYPES.join(", ")}`,
      });
    }

    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    // Check if already blocked
    const existingBlock = await BlockedDevice.findOne({
      propertyId,
      deviceType,
      isBlocked: true,
    });

    if (existingBlock) {
      return res.status(409).json({
        success: false,
        message: `Device type "${deviceType}" is already blocked for this property.`
      });
    }

    const rule = await BlockedDevice.findOneAndUpdate(
      { propertyId, deviceType },
      {
        $set: {
          propertyId,
          deviceType,
          property: property._id,
          reason,
          isBlocked: true,
        },
      },
      { upsert: true, new: true }
    );
    const simplifiedRule = {
      deviceType: rule.deviceType,
      reason: rule.reason,
      isBlocked: rule.isBlocked,
      blockedAt: rule.updatedAt,
    };
    
    return res.status(200).json({ success: true, data: simplifiedRule });  
  } catch (error) {
    console.error("Error setting device block:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all blocked devices for a property
exports.getDeviceBlock = async (req, res) => {
  try {

    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    const blocks = await BlockedDevice.find({
      propertyId,
      isBlocked: true,
    });

    const simplifiedBlocks = blocks.map(block => ({
      deviceType: block.deviceType,
      reason: block.reason,
      isBlocked: block.isBlocked,
      blockedAt: block.updatedAt,
    }));
    
    return res.status(200).json({ success: true, blocks: simplifiedBlocks });
  } catch (error) {
    console.error("Error fetching device blocks:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete specific device type block
exports.deleteDeviceBlock = async (req, res) => {
  try {

    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { deviceType } = req.body;

    if (!deviceType) {
      return res.status(400).json({
        success: false,
        error: "deviceType is required.",
      });
    }

    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    const result = await BlockedDevice.findOneAndDelete({
      propertyId: propertyId,
      deviceType,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Block rule not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Device block removed." });
  } catch (error) {
    console.error("Error deleting device block:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
