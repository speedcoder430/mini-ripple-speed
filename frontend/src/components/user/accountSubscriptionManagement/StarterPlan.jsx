import React from "react";
import PlanCard from "./PlanCard";
import ManagementCard from "./ManagementCard";

function StarterPlan() {
    return (
        <section className="flex flex-wrap gap-6 px-6">
            <PlanCard
                planName="Starter plan"
                features={[
                    "10K monthly events",
                    "Basic analytics",
                    "1 website"
                ]}
                price="0"
                buttonText="Upgrade Plan"
            />
            <ManagementCard
                nextPaymentDate="April 25, 2025"
                buttonText="Manage Payment"
                imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/973e0b7a0c555aac4a2a483bc3abd1a608983f08?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
            />
        </section>
    );
}

export default StarterPlan;