const express = require("express");
const router = express.Router();
/**
 * @swagger
 * /api/v1/plans/create-plan:
 *   post:
 *     tags: [Subscription Plans]
 *     summary: Create a subscription plan
 *     description: Creates a monthly or yearly subscription plan. Optionally auto-generates a linked yearly plan from a monthly one.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - days
 *               - price
 *               - propertyLimit
 *               - visitorLimit
 *               - trackType
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pro
 *               days:
 *                 type: integer
 *                 example: 30
 *               price:
 *                 type: number
 *                 example: 19.99
 *               propertyLimit:
 *                 type: integer
 *                 example: 10
 *               visitorLimit:
 *                 type: integer
 *                 example: 20000
 *               trackType:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                       example: ip
 *                     label:
 *                       type: string
 *                       example: IP Address Tracking
 *                     status:
 *                       type: string
 *                       enum: [Enabled, Disabled]
 *                       example: Enabled
 *               autoGenerateYearly:
 *                 type: boolean
 *                 example: true
 *               yearlyDiscountPercent:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan created successfully
 *                 basePlan:
 *                   $ref: '#/components/schemas/SubscriptionPlan'
 *                 yearlyPlan:
 *                   $ref: '#/components/schemas/SubscriptionPlan'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/plans:
 *   get:
 *     tags: [Subscription Plans]
 *     summary: Get all subscription plans
 *     description: Fetches all available subscription plans including demo and paid plans.
 *     responses:
 *       200:
 *         description: List of subscription plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   PlanType:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Basic
 *                       days:
 *                         type: string
 *                         example: 30
 *                   Price:
 *                     type: number
 *                     example: 19.99
 *                   propertyLimit:
 *                     type: number
 *                     example: 3
 *                   visitorLimit:
 *                     type: number
 *                     example: 100
 *                   TrackType:
 *                     type: object
 *                     properties:
 *                       ip:
 *                         type: string
 *                         example: Enabled
 *                       os:
 *                         type: string
 *                         example: Disabled
 *                       device:
 *                         type: string
 *                         example: Disabled
 *                       browser:
 *                         type: string
 *                         example: Disabled
 *       500:
 *         description: Failed to fetch subscription plans
 */

const { createPlan, getAllPlans } = require("../controllers/subscriptionPlanController");

router.post("/create-plan", createPlan);
router.get("/", getAllPlans); 

module.exports = router;
