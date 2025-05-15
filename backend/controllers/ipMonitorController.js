const BlockedIP = require("../models/BlockedIP");
const BlockedCountry = require("../models/blockedCountry");
const geoip = require("geoip-lite");

/**
 * @swagger
 * /api/check-ip:
 *   post:
 *     summary: Check if an IP address is blocked
 *     description: Checks if an IP is blocked directly or through country blocking
 *     tags: [IP Monitoring]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ip
 *             properties:
 *               ip:
 *                 type: string
 *                 description: IP address to check
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               url:
 *                 type: string
 *               userAgent:
 *                 type: string
 *     responses:
 *       200:
 *         description: IP check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blocked:
 *                   type: boolean
 *                 redirectUrl:
 *                   type: string
 *                   description: URL to redirect blocked users to
 *                 reason:
 *                   type: string
 *                   description: Reason for blocking (if blocked)
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.checkIP = async (req, res) => {
  try {
    const { ip, timestamp, url, userAgent } = req.body;

    // Check if IP is blocked
    const blockedIP = await BlockedIP.findOne({ ip, isActive: true });

    if (blockedIP) {
      return res.json({
        blocked: true,
        redirectUrl: process.env.BLOCKED_PAGE_URL,
        reason: blockedIP.reason,
      });
    }

    // Get country from IP
    const geo = geoip.lookup(ip);
    if (geo) {
      // Check if country is blocked from database
      const blockedCountry = await BlockedCountry.findOne({
        countryCode: geo.country,
        isActive: true,
      });

      if (blockedCountry) {
        // Create a new blocked IP entry for this country-blocked IP
        const newBlockedIP = new BlockedIP({
          ip,
          reason: `Country blocked: ${geo.country} - ${
            blockedCountry.reason || "No reason specified"
          }`,
          blockedBy: "system",
          isActive: true,
          country: geo.country,
        });
        await newBlockedIP.save();

        return res.json({
          blocked: true,
          redirectUrl: process.env.BLOCKED_PAGE_URL,
          reason: `Access denied from country: ${geo.country}${
            blockedCountry.reason ? ` (${blockedCountry.reason})` : ""
          }`,
        });
      }
    }

    // Log the visit (you might want to store this in a separate collection)
    console.log(
      `IP ${ip} visited ${url} at ${timestamp} from country: ${
        geo?.country || "unknown"
      }`
    );

    res.json({ blocked: false });
  } catch (error) {
    console.error("Error checking IP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/block-ip:
 *   post:
 *     summary: Block an IP address
 *     description: Add an IP address to the block list
 *     tags: [IP Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ip
 *             properties:
 *               ip:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: IP blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 blockedIP:
 *                   $ref: '#/components/schemas/BlockedIP'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.blockIP = async (req, res) => {
  try {
    const { ip, reason } = req.body;

    const blockedIP = new BlockedIP({
      ip,
      reason,
      blockedBy: req.user?.id || "system", // Assuming you have user authentication
      isActive: true,
    });

    await blockedIP.save();
    res.json({ message: "IP blocked successfully", blockedIP });
  } catch (error) {
    console.error("Error blocking IP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/unblock-ip/{ip}:
 *   delete:
 *     summary: Unblock an IP address
 *     description: Remove an IP address from the block list
 *     tags: [IP Management]
 *     parameters:
 *       - in: path
 *         name: ip
 *         required: true
 *         schema:
 *           type: string
 *         description: IP address to unblock
 *     responses:
 *       200:
 *         description: IP unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: IP not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.unblockIP = async (req, res) => {
  try {
    const { ip } = req.params;

    const blockedIP = await BlockedIP.findOne({ ip });
    if (!blockedIP) {
      return res.status(404).json({ error: "IP not found in blocked list" });
    }

    blockedIP.isActive = false;
    await blockedIP.save();

    res.json({ message: "IP unblocked successfully" });
  } catch (error) {
    console.error("Error unblocking IP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/blocked-ips:
 *   get:
 *     summary: Get all blocked IPs
 *     description: Retrieve a list of all currently blocked IP addresses
 *     tags: [IP Management]
 *     responses:
 *       200:
 *         description: List of blocked IPs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlockedIP'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.getBlockedIPs = async (req, res) => {
  try {
    const blockedIPs = await BlockedIP.find({ isActive: true });
    res.json(blockedIPs);
  } catch (error) {
    console.error("Error getting blocked IPs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getIPs = async (req, res) => {
  try {
    const blockedIPs = await BlockedIP.find({});
    res.json(blockedIPs);
  } catch (error) {
    console.error("Error getting blocked IPs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBlockStatus = async (req, res) => {
  try {
    const { ip } = req.body;

    const blockedIP = await BlockedIP.findOne({ ip });
    if (!blockedIP) {
      return res.status(404).json({ error: "IP not found in blocked list" });
    }

    // Toggle the isActive status
    blockedIP.isActive = !blockedIP.isActive;
    await blockedIP.save();

    res.json({
      message: `IP block status ${
        blockedIP.isActive ? "activated" : "deactivated"
      } successfully`,
      ip: blockedIP.ip,
      isActive: blockedIP.isActive,
    });
  } catch (error) {
    console.error("Error updating IP block status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/block-country:
 *   post:
 *     summary: Block a country
 *     description: Add a country to the block list
 *     tags: [Country Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - countryCode
 *             properties:
 *               countryCode:
 *                 type: string
 *                 description: ISO 3166-1 alpha-2 country code
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Country blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 blockedCountry:
 *                   $ref: '#/components/schemas/BlockedCountry'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.blockCountry = async (req, res) => {
  try {
    const { countryCode, reason } = req.body;

    const blockedCountry = new BlockedCountry({
      countryCode: countryCode.toUpperCase(),
      reason,
      blockedBy: req.user?.id || "system",
      isActive: true,
    });

    await blockedCountry.save();
    res.json({ message: "Country blocked successfully", blockedCountry });
  } catch (error) {
    console.error("Error blocking country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/unblock-country/{countryCode}:
 *   delete:
 *     summary: Unblock a country
 *     description: Remove a country from the block list
 *     tags: [Country Management]
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *         description: ISO 3166-1 alpha-2 country code
 *     responses:
 *       200:
 *         description: Country unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Country not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.unblockCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const blockedCountry = await BlockedCountry.findOne({
      countryCode: countryCode.toUpperCase(),
    });
    if (!blockedCountry) {
      return res
        .status(404)
        .json({ error: "Country not found in blocked list" });
    }

    blockedCountry.isActive = false;
    await blockedCountry.save();

    res.json({ message: "Country unblocked successfully" });
  } catch (error) {
    console.error("Error unblocking country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/blocked-countries:
 *   get:
 *     summary: Get all blocked countries
 *     description: Retrieve a list of all currently blocked countries
 *     tags: [Country Management]
 *     responses:
 *       200:
 *         description: List of blocked countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlockedCountry'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.getBlockedCountries = async (req, res) => {
  try {
    const blockedCountries = await BlockedCountry.find({ isActive: true });
    res.json(blockedCountries);
  } catch (error) {
    console.error("Error getting blocked countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await BlockedCountry.find({});
    res.json(countries);
  } catch (error) {
    console.error("Error getting countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
