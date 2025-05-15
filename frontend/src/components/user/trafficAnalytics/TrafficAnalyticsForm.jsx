import React from "react";
import MetricsCards from "./MetricsCards";
import TrafficSection from "./TrafficsSection";
import ExternalSection from "./ExternalSection";

function TrafficAnalyticsForm() {
    return (
        <div className="flex-1 mb-8">
            <MetricsCards />
            <TrafficSection />
            <ExternalSection />
        </div>
    );
}

export default TrafficAnalyticsForm;
