import React from "react";
import MetricCard from "./MetricCard";

function MetricsCards() {
    const metrics = [
        {
            title: "Total Visits",
            icon: "/page/trafficAnalytics/metric-card-1.svg",
            value: "1674",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "purple",
            bgColor: "bg-purple-100 border-purple-200 border-2",
        },
        {
            title: "Unique Visitors",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/121a526b80ba049c37517dd6e5bbe6f080bb2de7?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            value: "527",
            change: "5.5%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b01e29215068376159551b30e0856479a40a75a0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "neutral",
            bgColor: "bg-blue-100 border-blue-200 border-2",
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
