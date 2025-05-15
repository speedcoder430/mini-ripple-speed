import React from "react";
import MetricsCards from "./MetricsCards";
import TrafficSection from "./UserStatistics";
import APIUsageStatistics from "./APIUsageStatistics";

function AdminDashboardForm() {
    return (
        <div className="flex-1">
            <MetricsCards />
            <TrafficSection />
            <APIUsageStatistics />
        </div>

    );
}

export default AdminDashboardForm;
