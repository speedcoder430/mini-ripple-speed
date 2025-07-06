import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import axios from "axios";
const metricConfigs = {
    "activeUsers": {
        title: "Active Users",
        icon: "/page/dashboard/metrics-card-1.svg",
        changeIcon: "/page/dashboard/metrics-card-2.svg",
        changeType: "positive",
        bgColor: "bg-teal-100 border-teal-200 border-2",
    },
    "vpnUsers": {
        title: "VPN Users",
        icon: "/page/dashboard/metrics-card-3.svg",
        changeIcon: "/page/dashboard/metrics-card-4.svg",
        changeType: "neutral",
        bgColor: "bg-blue-100 border-blue-200 border-2",
    },
    "repeatedVisitors": {
        title: "Repeated Visitors",
        icon: "/page/dashboard/metrics-card-5.svg",
        changeIcon: "/page/dashboard/metrics-card-6.svg",
        changeType: "warning",
        bgColor: "bg-yellow-100 border-yellow-200 border-2",
    },
    "botsDetected": {
        title: "Bots Detected",
        icon: "/page/dashboard/metrics-card-7.svg",
        changeIcon: "/page/dashboard/metrics-card-8.svg",
        changeType: "negative",
        bgColor: "bg-red-100 border-red-200 border-2",
    },
    "mostUsedBrowser": {
        title: "Most Used Browser",
        icon: "/page/dashboard/metrics-card-9.svg",
        changeIcon: "/page/dashboard/metrics-card-10.svg",
        changeType: "purple",
        bgColor: "bg-violet-100 border-violet-200 border-2",
    },
};

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/dashboard/metrics`);
                const apiData = res.data;
                const mappedMetrics = Object.entries(apiData).map(([key, value]) => {
                    const config = metricConfigs[key];
                    if (!config) return null;

                    return {
                        title: config.title,
                        icon: config.icon,
                        changeIcon: config.changeIcon,
                        changeType: config.changeType,
                        bgColor: config.bgColor,
                        value: value?.value ?? "-",
                        change: value?.change ?? "0%",
                    };
                }).filter(Boolean);

                setMetrics(mappedMetrics);
            } catch (err) {
                console.error("Failed to fetch dashboard metrics:", err);
                setError("Unable to load dashboard metrics.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (isLoading) {
        return <div className="px-6 py-10">Loading metrics...</div>;
    }

    if (error) {
        return <div className="px-6 py-10 text-red-600">{error}</div>;
    }

    return (
        <section className="flex flex-wrap gap-6 items-center mt-6 mr-6 ml-6 max-md:mr-2.5">
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </section>
    );
}


export default MetricsCards;
