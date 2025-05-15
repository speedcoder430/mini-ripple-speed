const DeviceBlock = require("../models/deviceBlock.model");
const Property = require("../models/property.model");

const ALLOWED_DEVICE_TYPES = ["desktop", "mobile", "tablet"];

// Set (or update) block for a single device type
exports.setDeviceBlock = async (req, res) => {
  try {
    const { propertyId, deviceType } = req.body;

    if (!propertyId || !deviceType) {
      return res.status(400).json({
        success: false,
        error: "propertyId and deviceType are required.",
      });
    }

    if (!ALLOWED_DEVICE_TYPES.includes(deviceType)) {
      return res.status(400).json({
        success: false,
        error: `deviceType must be one of: ${ALLOWED_DEVICE_TYPES.join(", ")}`,
      });
    }

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    // Check if already blocked
    const existingBlock = await DeviceBlock.findOne({
      propertyId,
      deviceType,
      isBlocked: true,
    });

    if (existingBlock) {
      return res.status(409).json({
        success: false,
        message: `Device type "${deviceType}" is already blocked for this property.`,
        block: existingBlock,
      });
    }

    const rule = await DeviceBlock.findOneAndUpdate(
      { propertyId, deviceType },
      {
        $set: {
          propertyId,
          deviceType,
          property: property._id,
          isBlocked: true,
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, rule });
  } catch (error) {
    console.error("Error setting device block:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all blocked devices for a property
exports.getDeviceBlock = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    const blocks = await DeviceBlock.find({
      propertyId,
      isBlocked: true,
    }).populate("property", "domain");

    return res.status(200).json({ success: true, blocks });
  } catch (error) {
    console.error("Error fetching device blocks:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete specific device type block
exports.deleteDeviceBlock = async (req, res) => {
  try {
    const { propertyId, deviceType } = req.body;

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    const result = await DeviceBlock.findOneAndDelete({
      propertyId,
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
