const mongoose = require('mongoose');
const { isIP } = require('net');

const blockedIPSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: [true, 'IP address is required'],
      trim: true,
      index: true,
      validate: {
        validator: (v) => isIP(v) !== 0,
        message: (props) => `${props.value} is not a valid IP address`
      }
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property reference is required'],
      index: true
    },

    propertyId: {
      type: String,
      required: [true, 'Property ID is required'],
      index: true
    },

    reason: {
      type: String,
      required: [true, 'Block reason is required'],
      trim: true,
    },

    blockedAt: {
      type: Date,
      default: Date.now,
      index: true,
      immutable: true
    },

    blockType: {
      type: String,
      enum: {
        values: ['auto', 'manual'],
        message: 'Block type must be either "auto" or "manual"'
      },
      default: 'manual',
      index: true
    },

    expiresAt: {
      type: Date,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
  },
  {
    timestamps: true,
  }
);

blockedIPSchema.index(
  { ip: 1, propertyId: 1 },
  { 
    unique: true,
    partialFilterExpression: { isActive: true }
  }
);

blockedIPSchema.pre('save', function(next) {
  // Auto-deactivate expired blocks
  if (this.expiresAt && this.expiresAt < new Date()) {
    this.isActive = false;
  }
  
  // Ensure propertyId is always a string
  if (this.property && !this.propertyId) {
    this.propertyId = this.property.toString();
  }
  
  next();
});

const BlockedIP = mongoose.model('BlockedIP', blockedIPSchema);

module.exports = BlockedIP;
