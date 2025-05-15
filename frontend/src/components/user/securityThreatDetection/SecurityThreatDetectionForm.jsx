import React from "react";
import MetricsCards from "./MetricsCards";
import ChartSection from "./ChartSection";
import TrafficAnomaliesRiskAnalysis from "./TrafficAnomaliesRiskAnalysis";

function SecurityThreatDetectionForm() {
    return (
        <>
            <MetricsCards />
            <ChartSection />
            <div className="flex flex-wrap gap-5 items-start mt-6 mr-6 ml-7 max-md:mr-2.5">
                <TrafficAnomaliesRiskAnalysis />
            </div>
        </>
    );
}

export default SecurityThreatDetectionForm;
