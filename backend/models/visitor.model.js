const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // 👈 Relationship
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
    },
    device: String,
    os: String,
    browser: String,
    referrer: String,
    country: String,
    language: String,
    timezone: String,
  },
  { timestamps: true }
);

// Enforce uniqueness per property per visitor
visitorSchema.index({ visitorId: 1, propertyId: 1 }, { unique: true });

// Auto-expire logs after 30 days
visitorSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

module.exports = mongoose.model("Visitor", visitorSchema);
