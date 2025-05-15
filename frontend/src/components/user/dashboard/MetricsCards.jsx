import React from "react";
import MetricCard from "./MetricCard";

function MetricsCards() {
    const metrics = [
        {
            title: "Active Users",
            icon: "/page/dashboard/metrics-card-1.svg",
            value: "3500",
            change: "5.2%",
            changeIcon: "/page/dashboard/metrics-card-2.svg",
            changeType: "positive",
            bgColor: "bg-teal-100 border-teal-200 border-2",
        },
        {
            title: "VPN Users",
            icon: "/page/dashboard/metrics-card-3.svg",
            value: "234",
            change: "4.0%",
            changeIcon: "/page/dashboard/metrics-card-4.svg",
            changeType: "neutral",
            bgColor: "bg-blue-100 border-blue-200 border-2",
        },
        {
            title: "Repeated Visitors",
            icon: "/page/dashboard/metrics-card-5.svg",
            value: "285",
            change: "4.3%",
            changeIcon: "/page/dashboard/metrics-card-6.svg",
            changeType: "warning",
            bgColor: "bg-yellow-100 border-yellow-200 border-2",
        },
        {
            title: "Bots Detected",
            icon: "/page/dashboard/metrics-card-7.svg",
            value: "674",
            change: "4.3%",
            changeIcon: "/page/dashboard/metrics-card-8.svg",
            changeType: "negative",
            bgColor: "bg-red-100 border-red-200 border-2",
        },
        {
            title: "Most Used Browser",
            icon: "/page/dashboard/metrics-card-9.svg",
            value: "8",
            change: "4.3%",
            changeIcon: "/page/dashboard/metrics-card-10.svg",
            changeType: "purple",
            bgColor: "bg-violet-100 border-violet-200 border-2",
        },
    ];

    return (
        <section className="flex flex-wrap gap-6 items-center mt-6 mr-6 ml-6 max-md:mr-2.5">
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </section>
    );
}

export default MetricsCards;
