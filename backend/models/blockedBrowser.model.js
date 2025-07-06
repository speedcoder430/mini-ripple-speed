// models/BlockedBrowser.js
const mongoose = require('mongoose');

const blockedBrowserSchema = new mongoose.Schema(
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
      browserName: {
        type: String,
        required: true,
        index:true
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
  

blockedBrowserSchema.index({ property: 1, browserName: 1 }, { unique: true });

module.exports = mongoose.model('BlockedBrowser', blockedBrowserSchema);
