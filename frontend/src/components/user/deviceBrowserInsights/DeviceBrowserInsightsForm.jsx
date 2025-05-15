import React from "react";
import TopSection from "./TopSection";
import MetricsCards from "./MetricsCards";
import ChartSection from "./ChartSection";
import BlockedCountryList from "./BlockedCountryList";
import BlockedBrowserList from "./BlockedBrowserList";

function DeviceBrowserInsightsForm() {
    return (
        <>
            <TopSection />
            <MetricsCards />
            <ChartSection />
            <div className="flex flex-wrap gap-5 items-start mt-6 mr-6 ml-7 mb-8 max-md:mr-2.5">
                <BlockedCountryList />
                <BlockedBrowserList />
            </div>
        </>
    );
}

export default DeviceBrowserInsightsForm;
