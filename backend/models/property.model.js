const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
});

module.exports = mongoose.model("Property", propertySchema);
