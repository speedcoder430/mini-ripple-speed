const BlockedCountry = require("../models/blockedCountry");

// Get all blocked countries
exports.getBlockedCountries = async (req, res) => {
  try {
    const blockedCountries = await BlockedCountry.find({});
    res.json(blockedCountries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blocked countries" });
  }
};

// Block a country
exports.blockCountry = async (req, res) => {
  try {
    const { countryCode, countryName, reason } = req.body;

    if (!countryCode || !countryName) {
      return res
        .status(400)
        .json({ error: "Country code and name are required" });
    }

    const existingBlock = await BlockedCountry.findOne({ countryCode });
    if (existingBlock) {
      existingBlock.isBlocked = true;
      existingBlock.reason = reason;
      existingBlock.blockedAt = new Date();
      existingBlock.blockedBy = req.user.email;
      existingBlock.overrideExpiry = null;
      await existingBlock.save();
      return res.json(existingBlock);
    }

    const blockedCountry = new BlockedCountry({
      countryCode: countryCode.toUpperCase(),
      countryName,
      reason,
      blockedBy: req.user.email,
    });

    await blockedCountry.save();
    res.status(201).json(blockedCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to block country" });
  }
};

// Unblock a country
exports.unblockCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;
    const blockedCountry = await BlockedCountry.findOne({
      countryCode: countryCode.toUpperCase(),
    });

    if (!blockedCountry) {
      return res.status(404).json({ error: "Country block not found" });
    }

    blockedCountry.isBlocked = false;
    await blockedCountry.save();
    res.json(blockedCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to unblock country" });
  }
};

// Add temporary override
exports.addOverride = async (req, res) => {
  try {
    const { countryCode } = req.params;
    const { duration } = req.body; // Duration in hours

    if (!duration || duration <= 0) {
      return res.status(400).json({ error: "Valid duration is required" });
    }

    const blockedCountry = await BlockedCountry.findOne({
      countryCode: countryCode.toUpperCase(),
    });
    if (!blockedCountry) {
      return res.status(404).json({ error: "Country block not found" });
    }

    const overrideExpiry = new Date();
    overrideExpiry.setHours(overrideExpiry.getHours() + duration);

    blockedCountry.overrideExpiry = overrideExpiry;
    await blockedCountry.save();

    res.json(blockedCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add override" });
  }
};
