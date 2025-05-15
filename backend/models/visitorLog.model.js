const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
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
    country: String,
    userAgent: String,
    browser: String,
    os: String,
    device: String,
    screen: String,
    language: String,
    timezone: String,
    referrer: String,
    isBot: { type: Boolean, default: false },
    isVPN: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Enforce uniqueness per property per visitor
visitorLogSchema.index({ visitorId: 1, propertyId: 1 }, { unique: true });

// Auto-expire logs after 30 days
visitorLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

module.exports = mongoose.model("VisitorLog", visitorLogSchema);
