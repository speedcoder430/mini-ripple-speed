const mongoose = require('mongoose');

const trackTypeSchema = new mongoose.Schema({
    ip: String,
    os: String,
    device: String,
    browser: String,
}, {
    _id: false
});
const planTypeSchema = new mongoose.Schema({
    name: String,
    days: String,
});

const subscriptionPlanSchema = new mongoose.Schema({
    PlanType: {
        type: planTypeSchema,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    propertyLimit: {
        type: Number,
        required: true
    },
    visitorLimit: {
        type: Number,
        required: true
    },
    TrackType: {
        type: trackTypeSchema, default: {}
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
