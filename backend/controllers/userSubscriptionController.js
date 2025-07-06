// controllers/userSubscription.controller.js
const SubscriptionPlan = require("../models/subscriptionPlan.model");
const UserSubscription = require("../models/userSubscription.model")

exports.getCurrentSubscription = async (req, res) => {
    try {
        const userId = req.user.uid; // ✅ Firebase UID

        const subscription = await UserSubscription.findOne({
            userId,
            isActive: true,
            Status: "active",
        }).populate("planId");

        if (!subscription) {
            return res.status(404).json({ message: "No active subscription found." });
        }

        const plan = subscription.planId;

        if (!plan) {
            return res.status(404).json({ message: "Plan details not found." });
        }

        const responseData = {
            plan: {
                name: plan.PlanType.name,
                durationDays: plan.PlanType.days,
                price: plan.Price,
                propertyLimit: plan.propertyLimit,
                visitorLimit: plan.visitorLimit,
                trackFeatures: plan.TrackType,
            },
            subscriptionMeta: {
                startDate: subscription.startDate,
                endDate: subscription.endDate,
                autoRenew: subscription.autoRenew,
                status: subscription.Status,
            }
        };

        return res.status(200).json({ subscription: responseData });

    } catch (error) {
        console.error("❌ Failed to fetch subscription:", error);
        return res.status(500).json({ message: "Server error fetching subscription." });
    }
};
