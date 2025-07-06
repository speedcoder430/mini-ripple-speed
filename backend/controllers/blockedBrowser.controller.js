const BlockedBrowser = require("../models/blockedBrowser.model");
const Property = require("../models/property.model");

const ALLOWED_BROWSERS = ["chrome", "firefox", "safari", "edge", "opera", "brave"];

// Set (or update) block for a browser
exports.setBrowserBlock = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { browserName, reason } = req.body;

    const lowBrowserName = browserName.toLowerCase();

    if (!lowBrowserName) {
      return res.status(400).json({
        success: false,
        error: "browserName is required.",
      });
    }

    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found.",
      });
    }

    const existingBlock = await BlockedBrowser.findOne({
      propertyId,
      lowBrowserName,
      isBlocked: true,
    });

    if (existingBlock) {
      return res.status(409).json({
        success: false,
        message: `Browser "${lowBrowserName}" is already blocked for this property.`,
      });
    }

    const rule = await BlockedBrowser.findOneAndUpdate(
      { propertyId, browserName },
      {
        $set: {
          propertyId,
          browserName: lowBrowserName,
          property: property._id,
          reason,
          isBlocked: true,
        },
      },
      { upsert: true, new: true }
    );

    const simplifiedRule = {
      browserName: rule.browserName,
      reason: rule.reason,
      isBlocked: rule.isBlocked,
      blockedAt: rule.updatedAt,
    };
    
    return res.status(200).json({ success: true, data: simplifiedRule });
  } catch (error) {
    console.error("Error setting browser block:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all blocked browsers for a property
exports.getBlockedBrowsers = async (req, res) => {
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

    const blocks = await BlockedBrowser.find({
      propertyId,
      isBlocked: true,
    });

    const simplifiedBlocks = blocks.map(block => ({
      browserName: block.browserName,
      reason: block.reason,
      isBlocked: block.isBlocked,
      blockedAt: block.updatedAt,
    }));
    
    return res.status(200).json({ success: true, blocks: simplifiedBlocks });
  } catch (error) {
    console.error("Error fetching browser blocks:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete specific browser block
exports.deleteBrowserBlock = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const { browserName } = req.body;

    if (!browserName) {
      return res.status(400).json({
        success: false,
        error: "browserName is required.",
      });
    }

    const result = await BlockedBrowser.findOneAndDelete({
      propertyId,
      browserName,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Block rule not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Browser block removed." });
  } catch (error) {
    console.error("Error deleting browser block:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
