import React from "react";
import DomainSection from "./DomainSection";
import MetricsCards from "./MetricsCards";
import TrafficSection from "./TrafficsSection";
import CountryVisitors from "./CountryVisitors";
import PageVisits from "./PageVisits";
import SuspiciousActivity from "./SuspiciousActivity";
import VisitorStats from "./VisitorStats";
import TrafficHeatmap from "./TrafficHeatmap";

function UserDashboard() {
    return (
        <div>
            <DomainSection />
            <MetricsCards />
            <TrafficSection />
            <CountryVisitors />
            <div className="flex flex-wrap gap-5 justify-center items-start mt-6 mr-6 ml-7 max-md:mr-2.5">
                <PageVisits />
                <SuspiciousActivity />
            </div>
            <VisitorStats/>
            <TrafficHeatmap />
        </div>

    );
}

export default UserDashboard;
