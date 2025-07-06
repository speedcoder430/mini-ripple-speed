import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import ManagementCard from "./ManagementCard";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function StarterPlan() {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) return;

                const idToken = await user.getIdToken();

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/user-subscription/current`,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                setSubscription(res.data.subscription);
            } catch (error) {
                console.warn("No active subscription found or error:", error.message);
                setSubscription(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    if (loading) return null;

    const hasPlan = !!subscription;

    const handlePlanClick = () => {
        navigate("/pricing");
    };

    const endDate = hasPlan ? new Date(subscription.subscriptionMeta.endDate) : null;
    const today = new Date();
    const timeDiff = endDate ? endDate.getTime() - today.getTime() : 0;
    const daysLeft = endDate ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
    const isExpiring = daysLeft <= 1;

    return (
        <section className="flex flex-wrap gap-6 px-6">
            <PlanCard
                planName={hasPlan ? subscription.plan.name : "No Active Plan"}
                features={hasPlan ? [
                    `${subscription.plan.propertyLimit} properties`,
                    `${subscription.plan.visitorLimit} monthly visitors`,
                    // ...Object.entries(subscription.plan.trackFeatures || {}).map(
                    //     ([key, val]) => `${key}: ${val ? "✔️" : "❌"}`
                    // )
                ] : []}
                price={hasPlan ? subscription.plan.price : ""}
                duration={hasPlan ? `${subscription.plan.durationDays}d` : ""}
                buttonText={hasPlan && subscription.subscriptionMeta.status === "active" ? "Manage Plan" : "Purchase Plan"}
                ManagePlan={() => handlePlanClick()}
            />

            {/* {hasPlan && (
                <ManagementCard
                    nextPaymentDate={new Date(subscription.subscriptionMeta.endDate).toLocaleDateString()}
                    buttonText={
                        subscription.subscriptionMeta.autoRenew
                            ? "Manage Subscription"
                            : "Renew Plan"
                    }
                    imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/973e0b7a0c555aac4a2a483bc3abd1a608983f08?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                />
            )} */}


            <ManagementCard
                hasPlan={hasPlan}
                nextPaymentDate={hasPlan ? endDate.toLocaleDateString() : ""}
                buttonText={
                    hasPlan
                        ? isExpiring
                            ? "Renew Plan"
                            : `⏳ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`
                        : ""
                }
                isExpiring={isExpiring}
                imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/973e0b7a0c555aac4a2a483bc3abd1a608983f08?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                onButtonClick={async () => {
                    if (!isExpiring) {
                        alert(`⏳ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in expiry`);
                        return;
                    }

                    try {
                        const auth = getAuth();
                        const user = auth.currentUser;
                        if (!user) return alert("User not logged in");

                        const idToken = await user.getIdToken();

                        // Call backend to create Stripe checkout session
                        const res = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/v1/payments/create-checkout-session`,
                            {
                                planId: subscription.plan._id, // Use current plan ID for renewal
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${idToken}`,
                                },
                            }
                        );

                        const { url } = res.data;
                        window.location.href = url; // Redirect to Stripe Checkout
                    } catch (err) {
                        console.error("Failed to create checkout session:", err);
                        alert("Something went wrong. Please try again later.");
                    }
                }}

            />
        </section>
    );
}

export default StarterPlan;
