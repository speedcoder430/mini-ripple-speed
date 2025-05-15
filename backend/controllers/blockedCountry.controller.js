const Property = require("../models/property.model");
const BlockedCountry = require("../models/blockedCountry");

exports.blockCountry = async (req, res) => {
  try {
    const { propertyId, countryCode, reason, blockedBy } = req.body;

    if (!propertyId || !countryCode || !blockedBy) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({ error: "Invalid propertyId" });
    }

    const existing = await BlockedCountry.findOne({ countryCode, propertyId });

    if (existing && existing.isActive) {
      return res
        .status(409)
        .json({ message: "Country is already blocked for this property." });
    }

    const blocked = await BlockedCountry.findOneAndUpdate(
      { countryCode, propertyId },
      {
        reason,
        blockedBy,
        isActive: true,
        property: property._id,
        propertyId,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, blocked });
  } catch (err) {
    console.error("Error blocking country:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Unblock a country
exports.unblockCountry = async (req, res) => {
  try {
    const { propertyId, countryCode } = req.body;

    if (!propertyId || !countryCode) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const property = await Property.findOne({ propertyId });
    if (!property) {
      return res.status(404).json({ error: "Invalid propertyId" });
    }

    const record = await BlockedCountry.findOne({ propertyId, countryCode });

    if (!record) {
      return res.status(404).json({ error: "No such block found." });
    }

    record.isActive = false;
    await record.save();

    res.json({ success: true, message: "Country unblocked successfully" });
  } catch (err) {
    console.error("Error unblocking country:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// List all blocked countries for a property
exports.listBlockedCountries = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const countries = await BlockedCountry.find({
      propertyId,
      isActive: true,
    }).populate("blockedBy", "email");

    res.json({ success: true, countries });
  } catch (err) {
    console.error("Error fetching blocked countries:", err);
    res.status(500).json({ error: "Server error" });
  }
};
