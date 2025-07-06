const mongoose = require("mongoose");

const blockedCountrySchema = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
    index: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 2,
  },
  reason:  {
    type: String
  },
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

// Unique per property + country combination
blockedCountrySchema.index({ countryCode: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model("BlockedCountry", blockedCountrySchema);
