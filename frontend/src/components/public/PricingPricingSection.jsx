import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../middlewares/authContext";
import { getAuth } from "firebase/auth";
import { redirectToStripeCheckout } from "../../helper/useStripeCheckout";

const PricingPricingSection = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [selectedPlanType, setSelectedPlanType] = useState("monthly");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/plans`
                );
                setPlans(Array.isArray(data.plans) ? data.plans : []);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchPlans();
    }, []);

    // const filteredPlans = plans.filter((plan) => {
    //     const name = plan.PlanType.name.toLowerCase();
    //     return selectedPlanType === "monthly"
    //         ? name.includes("month")
    //         : name.includes("year");
    // });

    const filteredPlans = plans.filter((plan) => {
        const days = Number(plan.PlanType.days || 0);
        return selectedPlanType === "monthly"
            ? days >= 28 && days <= 31
            : days >= 360 && days <= 370;
    });

    const getDurationLabel = (days) => {
        return days >= 360 ? "yr" : "mo";
    };


    const handleGetStarted = async (planId) => {
        try {
            if (!user) {
                localStorage.setItem("selectedPlanId", planId);
                navigate("/login");
                return;
            }

            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("No Firebase user found");
                return;
            }

            setLoading(true);
            await redirectToStripeCheckout({ planId, user: currentUser });
        } catch (err) {
            console.error("Stripe checkout error:", err);
            alert("Failed to start payment process.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="pricing" className="relative z-10 w-full pt-2 md:pt-32">
            <div className="flex flex-col items-center md:px-24 pb-8">
                <div className="text-center max-w-full w-[717px]">
                    <h3 className="text-2xl font-semibold text-yellow-400 font-['Jost']">
                        Affordable
                    </h3>
                    <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] font-semibold text-neutral-50 font-['Jost']">
                        Pricing Plans
                    </h2>
                    <p className="text-[#D2D2D2] font-['Jost'] text-[16px] mt-4">
                        Choose the best plan for your website's security.
                    </p>
                </div>

                <div className="flex gap-6 items-center justify-center p-3 mt-12 text-base font-semibold leading-none rounded-2xl bg-blue-700 bg-opacity-20 font-['Jost']">
                    <Button
                        onClick={() => setSelectedPlanType("monthly")}
                        variant={selectedPlanType === "monthly" ? "primary" : "secondary"}
                    >
                        Monthly Membership
                    </Button>
                    <Button
                        onClick={() => setSelectedPlanType("yearly")}
                        variant={selectedPlanType === "yearly" ? "primary" : "secondary"}
                    >
                        Yearly Membership
                    </Button>
                </div>

                <div className="w-full max-w-[600px] mt-10 px-5 md:px-8 lg:px-20">
                    <div className="grid gap-8">
                        {filteredPlans.map((plan) => (
                            <div
                                key={plan._id}
                                className={`relative z-30 flex flex-col p-6 rounded-2xl border transition-all duration-300 border-[#C6E0F7] shadow-md bg-neutral-50 text-slate-900`}
                            >
                                <h3 className="text-xl font-bold font-['Amble']">{plan.PlanType.name}</h3>

                                <div className="mt-5 text-zinc-600">
                                    <div className="flex items-center text-2xl font-semibold">
                                        <span className="text-[16px]">$</span>
                                        <span className="text-4xl font-['Anton'] text-slate-900 ml-1">{plan.Price}</span>
                                        {/* <span className="ml-2">/{plan.PlanType.days} days</span> */}
                                        <span className="ml-2">/{getDurationLabel(plan.PlanType.days)}</span>
                                    </div>
                                    {plan.Price > 0 && plan.PlanType.name.toLowerCase().includes("year") && (
                                        <div className="mt-2 text-base text-green-600">Save 10%</div>
                                    )}
                                </div>

                                <FeatureList plan={plan} />

                                <Button
                                    onClick={() => handleGetStarted(plan._id)}
                                    variant={selectedPlanId === plan._id ? "primary" : "dark"}
                                    className="mt-5 w-[145px] font-['Jost'] font-semibold"
                                >
                                    {plan.Price === 0 ? "Start Free Trial" : "Get Started"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BlurEffect />
        </section>
    );
};

const FeatureList = ({ plan }) => {
    const staticFeatures = [
        "Full Website Security & Traffic Control",
        "Block Bots, VPNs, and Suspicious Traffic",
        "Real-Time Analytics & Insights",
    ];

    return (
        <div className="flex flex-col items-start mt-5 text-base font-medium font-['Jost']">
            {staticFeatures.map((text, idx) => (
                <Feature key={idx} text={text} included />
            ))}

            {
                plan.PlanType.name.toLowerCase().includes("lifetime") &&
                (
                    <Feature text="One-Time Purchase, Lifetime Protection" included />
                )}

            {plan.TrackType?.map((track, index) => (
                <Feature
                    key={track.key || index}
                    text={track.label}
                    included={track.status === "Enabled"}
                />
            ))}

            <Feature text={`Properties Allowed: ${plan.propertyLimit}`} included />
            <Feature text={`Visitors Allowed: ${plan.visitorLimit}`} included />
        </div>
    );
};

const Feature = ({ text, included }) => (
    <div className="flex items-center gap-2 mt-3.5 text-sm">
        <span className="text-lg">{included ? "✅" : "❌"}</span>
        <span className={included ? "text-slate-900" : "text-gray-400 line-through"}>{text}</span>
    </div>
);

const BlurEffect = () => (
    <>
        <div className="absolute w-[684px] h-[684px] rounded-full bg-[#1976D280] blur-[250px] right-[-400px] top-[-200px] z-0 pointer-events-none" />
        <div className="absolute w-[677px] h-[84px] rounded-[677px] bg-[rgba(57,120,215,0.5)] blur-[100px] top-[190px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
    </>
);

export default PricingPricingSection;
