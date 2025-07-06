const Property = require("../models/property.model");
const BlockedCountry = require("../models/blockedCountry.model");

exports.blockCountry = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });

    const { countryCode, reason } = req.body;

    const blockedBy = userId;
    if (!countryCode) {
      return res
        .status(400)
        .json({ success: false, error: "Missing Country Code." });
    }

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid propertyId" });
    }

    const existing = await BlockedCountry.findOne({
      countryCode,
      propertyId: property.propertyId,
    });

    if (existing && existing.isActive) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Country is already blocked for this property.",
        });
    }

    const blocked = await BlockedCountry.findOneAndUpdate(
      { countryCode, propertyId: property.propertyId },
      {
        reason,
        blockedBy,
        isActive: true,
        property: property._id,
        propertyId: property.propertyId,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "Country blocked successfully",
      data: {
        countryCode: blocked.countryCode,
        reason: blocked.reason,
        isActive: blocked.isActive,
        propertyId: blocked.propertyId,
      },
    });
  } catch (err) {
    console.error("Error blocking country:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Unblock a country
exports.unblockCountry = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });

    const { countryCode } = req.body;

    if (!countryCode) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Missing The Country Code to Unblock.",
        });
    }

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid propertyId" });
    }

    const record = await BlockedCountry.findOne({
      propertyId: property.propertyId,
      countryCode,
      isActive: true,
    });

    if (!record) {
      return res
        .status(404)
        .json({ success: false, error: "No such country block found." });
    }

    record.isActive = false;
    await record.save();

    res.json({ success: true, message: "Country unblocked successfully" });
  } catch (err) {
    console.error("Error unblocking country:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// List all blocked countries for a property
exports.listBlockedCountries = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const property = await Property.findOne({ user: userId });
    const propertyId = property.propertyId;

    const countries = await BlockedCountry.find({
      propertyId,
      isActive: true,
    });

    const simplifiedCountries = countries.map(c => ({
      countryCode: c.countryCode,
      reason: c.reason,
      blockedAt: c.updatedAt
    }));
    
    res.json({ success: true, data: simplifiedCountries });

  } catch (err) {
    console.error("Error fetching blocked countries:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
