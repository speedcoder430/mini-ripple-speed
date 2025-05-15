const mongoose = require("mongoose");

const blockedIPSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  blockedAt: {
    type: Date,
    default: Date.now,
  },
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  propertyId: {
    type: String, // Use the custom propertyId (e.g. MR-xxxx)
    required: true,
  },
  expiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// 🔒 Compound index to ensure an IP can be blocked only once per property
blockedIPSchema.index({ ip: 1, propertyId: 1 }, { unique: true });

// Auto-disable expired blocks before saving
blockedIPSchema.pre("save", function (next) {
  if (this.expiresAt && this.expiresAt < new Date()) {
    this.isActive = false;
  }
  next();
});

module.exports = mongoose.model("BlockedIP", blockedIPSchema);
