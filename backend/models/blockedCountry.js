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
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 2,
  },
  reason: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  blockedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BlockedCountry", blockedCountrySchema);
