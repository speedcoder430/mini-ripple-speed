const SubscriptionPlan = require("../models/subscriptionPlan.model");

// Map to convert keys to human-friendly labels
const trackLabelMap = {
  ip: "IP Address Tracking",
  os: "Operating System Tracking",
  device: "Device Type Tracking",
  browser: "Browser Type Tracking",
};

// Helper: format TrackType to labeled array
const formatTrackType = (trackObj) => {
  return Object.entries(trackObj).map(([key, status]) => ({
    key,
    label: trackLabelMap[key] || key,
    status
  }));
};

// Create Subscription Plan
exports.createPlan = async (req, res) => {
  try {
    const {
      name,
      days,
      price,
      propertyLimit,
      visitorLimit,
      trackType,
      autoGenerateYearly = false,
      yearlyDiscountPercent = 20
    } = req.body;

    if (!name || !days || !price || !propertyLimit || !visitorLimit || !Array.isArray(trackType)) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    // 🔁 Convert array to object for DB
    const trackTypeObj = {};
    for (const { key, status } of trackType) {
      trackTypeObj[key] = status;
    }

    // ✅ Base Plan
    const basePlan = new SubscriptionPlan({
      PlanType: { name, days: String(days) },
      Price: price,
      propertyLimit,
      visitorLimit,
      TrackType: trackTypeObj,
    });

    await basePlan.save();

    let yearlyPlan = null;

    if (autoGenerateYearly && Number(days) >= 28 && Number(days) <= 31) {
      const yearlyDays = 365;
      const yearlyPrice = +(price * 12 * (1 - yearlyDiscountPercent / 100)).toFixed(2);

      yearlyPlan = new SubscriptionPlan({
        PlanType: {
          name: `${name} Yearly`,
          days: String(yearlyDays),
        },
        Price: yearlyPrice,
        propertyLimit,
        visitorLimit,
        TrackType: trackTypeObj,
      });

      await yearlyPlan.save();
    }

    res.status(201).json({
      message: "Plan created successfully",
      basePlan,
      yearlyPlan,
    });

  } catch (err) {
    console.error("❌ Error creating plan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();

    const formattedPlans = plans.map(plan => {
      const planObj = plan.toObject();
      planObj.TrackType = formatTrackType(planObj.TrackType || {});
      return planObj;
    });

    res.status(200).json({ plans: formattedPlans });
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({ error: "Failed to fetch subscription plans" });
  }
};
