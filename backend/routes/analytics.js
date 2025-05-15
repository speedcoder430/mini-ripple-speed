const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: API for Google Analytics data fetching
 */

/**
 * @swagger
 * /api/v1/analytics/fetch-ga-data:
 *   post:
 *     tags: [Analytics]
 *     summary: Fetch Google Analytics data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GARequest'
 *     responses:
 *       200:
 *         description: Successfully fetched GA data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to fetch GA data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/analytics/fetch-domain:
 *   post:
 *     tags: [Analytics]
 *     summary: Get connected domains for a property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GARequest'
 *     responses:
 *       200:
 *         description: Successfully fetched connected domains
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainResponse'
 *       400:
 *         description: Missing access token or property ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to fetch domains
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const {
  fetchGAData,
  getConnectedDomains,
} = require("../controllers/analyticsController");

// Email/Password authentication routes
router.post("/fetch-ga-data", fetchGAData);
router.post("/fetch-domain", getConnectedDomains);

module.exports = router;
