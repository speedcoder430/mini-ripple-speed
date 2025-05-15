const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Registration failed
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Authentication failed
 */

/**
 * @swagger
 * /api/v1/users/forget-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to process request
 */

/**
 * @swagger
 * /api/v1/users/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset the user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: your_reset_token
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid or expired reset token
 *       500:
 *         description: Failed to reset password
 */

/**
 * @swagger
 * /api/v1/users/verify-email:
 *   get:
 *     tags: [Auth]
 *     summary: Verify user email
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_verification_token
 *     responses:
 *       200:
 *         description: Email successfully verified
 *       400:
 *         description: Invalid or expired verification token
 *       500:
 *         description: Failed to verify email
 */

/**
 * @swagger
 * /api/v1/users/google:
 *   post:
 *     tags: [Auth]
 *     summary: Google authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: your_google_id_token
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Missing ID token
 *       500:
 *         description: Authentication failed
 */

/**
 * @swagger
 * /api/v1/users/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth callback
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           example: your_auth_code
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: user@example.com
 *     responses:
 *       200:
 *         description: OAuth flow completed successfully
 *       400:
 *         description: Missing code
 *       500:
 *         description: OAuth flow failed
 */

/**
 * @swagger
 * /api/v1/users/get-user-data:
 *   get:
 *     tags: [Auth]
 *     summary: Get user data
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: user@example.com
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       400:
 *         description: Email query parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error while fetching user data
 */
const {
  signup,
  signin,
  forgetPassword,
  resetPassword,
  verifyEmail,
  googleAuth,
  googleOAuthCallback,
  getUserData,
} = require("../controllers/auth");

// Email/Password authentication routes
router.post("/signup", signup);
router.post("/login", signin);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email", verifyEmail);

// Google authentication route
router.post("/google", googleAuth);
router.get("/callback", googleOAuthCallback);
router.get("/get-user-data", getUserData);

module.exports = router;
