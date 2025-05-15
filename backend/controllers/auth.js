const axios = require("axios");
const UserModel = require("../models/user.model");
const admin = require("../config/firebase-admin");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Sign up with email and password
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = new UserModel({
      email,
      password,
      name,
    });

    await user.save();

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = verificationToken;
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// Sign in with email and password
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

// Forgot password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `Please click <a href="${resetUrl}">here</a> to reset your password.`,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Hash token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Failed to reset password" });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification token" });
    }

    user.isEmailVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({ error: "Failed to verify email" });
  }
};

// Google authentication
exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) return res.status(400).json({ message: "Missing ID token" });

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture } = decodedToken;

    // Check if user exists in our database
    let user = await UserModel.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      user = new UserModel({
        email,
        name: name,
        picture: picture,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      token,
      googleToken: idToken,
      user: {
        id: user._id,
        email: user.email,
        name: name,
        picture: picture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

exports.googleOAuthCallback = async (req, res) => {
  try {
    const { code, email } = req.query;

    if (!code) return res.status(400).json({ message: "Missing code" });

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          googleAccessToken: access_token,
          googleRefreshToken: refresh_token,
        },
      }
    );

    return res.status(200).json({
      googleAccessToken: access_token,
      googleRefreshToken: refresh_token,
    });
  } catch (error) {
    console.error(
      "OAuth callback error:",
      error.response?.data || error.message
    );
    return res.status(500).json({ message: "OAuth flow failed" });
  }
};

exports.getUserData = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required." });
  }

  try {
    const user = await UserModel.findOne({ email }).select("-password"); // exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching user data." });
  }
};
