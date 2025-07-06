const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const SubscriptionPlan = require("../models/subscriptionPlan.model");
const UserSubscription = require("../models/userSubscription.model");


exports.createCheckoutSession = async (req, res) => {
    const { planId } = req.body;
    const user = req.user; // ✅ Injected from Firebase auth middleware

    console.log("👉 Incoming user:", user?.uid || user?._id);
    console.log("👉 Plan ID:", planId);

    try {
        // ✅ Validate Plan ID
        if (!planId) {
            return res.status(400).json({ error: "Plan ID is required" });
        }

        // ✅ Fetch the selected plan
        const plan = await SubscriptionPlan.findById(planId);
        if (!plan) {
            console.log("❌ Plan not found");
            return res.status(404).json({ error: "Plan not found" });
        }

        // ✅ Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: user.email || undefined, // optional
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${plan.PlanType.name} Plan`,
                            description: `Props: ${plan.propertyLimit}, Visitors: ${plan.visitorLimit}, Track: IP ${plan.TrackType.ip ? '✔️' : '❌'}, OS ${plan.TrackType.os ? '✔️' : '❌'}`,
                        },
                        unit_amount: Math.round(plan.Price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.uid?.toString() || user._id?.toString(), // Firebase UID or fallback
                planId: plan._id.toString(),
            },
            success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment=cancelled`,
        });

        console.log("✅ Stripe session created:", session.id);
        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("❌ Stripe checkout error:", err);
        res.status(500).json({ error: "Stripe checkout failed" });
    }
};


exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, // ✅ Use req.body if using express.raw()
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        
        console.log("🔥 Webhook event received:", event.type);
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const planId = session.metadata.planId;

        console.log("📦 Metadata:", session.metadata);

        try {
            const plan = await SubscriptionPlan.findById(planId);
            if (!plan) {
                console.error("❌ Plan not found:", planId);
                return res.status(404).send("Plan not found");
            }

            const now = new Date();
            const endDate = new Date(now.getTime() + parseInt(plan.PlanType.days) * 24 * 60 * 60 * 1000);

            const updated = await UserSubscription.findOneAndUpdate(
                { userId },
                {
                    userId,
                    planId,
                    Status: "active",
                    startDate: now,
                    endDate,
                    isActive: true,
                    autoRenew: true,
                },
                { upsert: true, new: true }
            );

            console.log("✅ Subscription successfully updated:", updated);
        } catch (err) {
            console.error("❌ Error saving subscription:", err.message, err);
        }
    }

    res.status(200).send("Webhook received");
};
