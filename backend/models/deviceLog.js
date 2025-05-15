const mongoose = require('mongoose');

const deviceLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    deviceType: {
        type: String,
        enum: ['mobile', 'tablet', 'desktop'],
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    deviceDetails: {
        browser: String,
        browserVersion: String,
        os: String,
        osVersion: String,
        device: String,
        vendor: String
    },
    ipAddress: String,
    accessAttemptAt: {
        type: Date,
        default: Date.now
    },
    wasBlocked: {
        type: Boolean,
        required: true
    }
});

// Create indexes for faster queries
deviceLogSchema.index({ userId: 1, accessAttemptAt: -1 });
deviceLogSchema.index({ wasBlocked: 1 });

const DeviceLog = mongoose.model('DeviceLog', deviceLogSchema);
module.exports = DeviceLog; 