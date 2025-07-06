const mongoose = require('mongoose');

const userSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    Status: {
        type: String,
        enum: ['active', 'cancelled', 'trailing', 'expired'],
        default: 'active',
    },
    planId: {
        type: String,
        ref: 'SubscriptionPlan', 
        required: true
    },
    startDate: {
        type: Date, required: true
    },
    endDate: {
        type: Date, required: true
    },
    cancelDate: {
        type: Date
    },
    isActive: {
        type: Boolean, default: true
    },
    autoRenew: {
        type: Boolean, default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);
