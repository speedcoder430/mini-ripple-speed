// routes/userSubscription.routes.js
const express = require("express");
const router = express.Router();
const { getCurrentSubscription } = require("../controllers/userSubscriptionController");
const firebaseAuth = require("../middleware/auth");


/**
 * @swagger
 * /api/v1/user-subscription/current:
 *   get:
 *     summary: Get the current active subscription of the logged-in user
 *     tags: [User Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the active subscription details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     planName:
 *                       type: string
 *                     durationDays:
 *                       type: string
 *                     price:
 *                       type: number
 *                     propertyLimit:
 *                       type: number
 *                     visitorLimit:
 *                       type: number
 *                     trackFeatures:
 *                       type: object
 *                       properties:
 *                         ip:
 *                           type: string
 *                         os:
 *                           type: string
 *                         device:
 *                           type: string
 *                         browser:
 *                           type: string
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                     autoRenew:
 *                       type: boolean
 *                     status:
 *                       type: string
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: No active subscription found
 *       500:
 *         description: Internal server error
 */



router.get("/current", firebaseAuth, getCurrentSubscription);

module.exports = router;
