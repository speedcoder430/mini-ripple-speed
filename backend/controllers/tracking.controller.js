require("dotenv").config();

const Property = require("../models/property.model");
// Get tracking snippet
exports.getTrackingSnippet = async (req, res) => {
  try {
    // const userId = req.user._id; // Get user ID from auth middleware
    const userId = "64fa66c3c3b7d0a9a0f1a111";

    const property = await Property.findOne({ user: userId });

    if (!property) {
      throw new Error("Property not found");
    }

    if (property.status !== "active") {
      throw new Error("Property is not active");
    }

    const cdnUrl = process.env.CDN_URL;
    const snippet = `<script async src=${cdnUrl}?propertyId=${property.propertyId}"></script>`;

    res.json({
      success: true,
      data: {
        snippet,
        propertyId: property.propertyId,
      },
    });
  } catch (error) {
    console.error("[getTrackingSnippet] Error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Validate property and get tracking snippet
exports.validateAndGetSnippet = async (req, res) => {
  try {
    // const userId = req.user._id; // Get user ID from auth middleware
    const userId = "64fa66c3c3b7d0a9a0f1a111";

    const property = await Property.findOne({ user: userId });

    if (!property) {
      throw new Error("Property not found");
    }

    if (property.status !== "active") {
      throw new Error("Property is not active");
    }

    const cdnUrl = process.env.CDN_URL;
    const snippet = `<script async src=${cdnUrl}?propertyId=${property.propertyId}"></script>`;

    res.json({
      success: true,
      data: {
        snippet,
        propertyId: property.propertyId,
        status: property.status,
      },
    });
  } catch (error) {
    console.error("[validateAndGetSnippet] Error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
