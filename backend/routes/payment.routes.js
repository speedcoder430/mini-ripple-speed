const express = require("express");
const router = express.Router();
const { createCheckoutSession  } = require("../controllers/payment.controller");
const firebaseAuth = require("../middleware/auth"); 

/**
 * @swagger
 * /api/v1/stripe/create-checkout-session:
 *   post:
 *     summary: Create Stripe Checkout Session
 *     description: Initiates a Stripe Checkout for the selected plan. Requires Firebase JWT token.
 *     tags:
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *                 example: "64fa66c3c3b7d0a9a0f1a111"
 *                 description: The ID of the selected subscription plan
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: Stripe Checkout URL
 *       401:
 *         description: Unauthorized – Firebase token is missing or invalid
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/payments/webhook:
 *   post:
 *     summary: Stripe webhook to handle payment events
 *     tags:
 *       - Stripe
 *     description: Receives Stripe payment events and updates DB on success.
 *     requestBody:
 *       description: Stripe event payload (raw body)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received and processed
 *       400:
 *         description: Invalid signature or error processing
 */


router.post("/create-checkout-session", firebaseAuth, createCheckoutSession);

// router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

module.exports = router;
