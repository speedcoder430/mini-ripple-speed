// Dashboard.jsx
import React, { useEffect, useState } from "react";
import DomainSection from "./DomainSection";
import MetricsCards from "./MetricsCards";
import TrafficSection from "./TrafficsSection";
import CountryVisitors from "./CountryVisitors";
import PageVisits from "./PageVisits";
import SuspiciousActivity from "./SuspiciousActivity";
import VisitorStats from "./VisitorStats";
import TrafficHeatmap from "./TrafficHeatmap";
import { useDomainStatus } from "../../../helper/useDomainStatus";
import axios from "axios";

function UserDashboard() {
    const { isConnected: isDomainActive, status } = useDomainStatus();
    const [dashboardSummary, setDashboardSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isDomainActive) return;

        const fetchDashboardSummary = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/summary`
                );
                setDashboardSummary(response.data);
            } catch (err) {
                setError("Failed to load dashboard data.");
                console.error("Dashboard Summary Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardSummary();
    }, [status, isDomainActive]);

    return (
        <div>
            <DomainSection />

            {!isDomainActive ? (
                <div className="text-center mt-10 text-yellow-600 font-medium">
                    🔒 Please connect your domain to view full dashboard.
                </div>
            ) : loading ? (
                <div className="text-center mt-10 text-gray-500 font-medium">
                    ⏳ Loading your dashboard...
                </div>
            ) : error ? (
                <div className="text-center mt-10 text-red-600 font-medium">
                    ❌ {error}
                </div>
            ) : (
                <>
                    <MetricsCards />
                    <TrafficSection data={dashboardSummary?.trafficTrends} />
                    <CountryVisitors data={dashboardSummary?.visitorCountries} />
                    <div className="flex flex-wrap gap-5 justify-center items-start mt-6 mr-6 ml-7 max-md:mr-2.5">
                        <PageVisits data={dashboardSummary?.mostVisitedPages} />
                        <SuspiciousActivity data={dashboardSummary?.suspiciousActivities} />
                    </div>
                    <VisitorStats data={dashboardSummary?.referralTraffic} />
                    <TrafficHeatmap data={dashboardSummary?.heatmap} />
                </>
            )}
        </div>
    );
}

export default UserDashboard;
