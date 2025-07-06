const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSubscription',
        required: true
    },
    invoiceId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String, required: true
    },
    billingMethod: {
        type: String, required: true
    },
    billingDate: {
        type: Date, required: true
    },
    transactionId: {
        type: String
    },
    status: {
        type: String,
        const: ['Paid', 'Failed', 'Pending', 'Refunded'],
        default: 'Pending',
    },
    failureReason: { 
        type: String 
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Billing', billingSchema);
