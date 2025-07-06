const mongoose = require("mongoose");

const deviceBlockSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // 👈 Enables population
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
      index: true,
    },
    deviceType: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      required: true,
    },
    reason:  {
      type: String
    },
    isBlocked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure uniqueness per deviceType and property
deviceBlockSchema.index({ propertyId: 1, deviceType: 1 }, { unique: true });

module.exports = mongoose.model("DeviceBlock", deviceBlockSchema);
