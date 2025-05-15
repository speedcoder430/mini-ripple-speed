import React from "react";
import MetricCard from "./MetricCard";

function MetricsCards() {
    const metrics = [
        {
            title: "Total Bot Detected",
            icon: "/page/securityThreatDetection/metrics-card-1.svg",
            value: "126",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e234bf25d9196f569daf775dde2b90de8840974?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "negative",
            bgColor: "bg-red-100 border-red-200 border-2",
        },
        {
            title: "Total VPN Detected",
            icon: "/page/securityThreatDetection/metrics-card-2.svg",
            value: "653",
            change: "5.5%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "warning",
            bgColor: "bg-yellow-100 border-yellow-200 border-2",
        },
        {
            title: "Abnormal Traffic Detected",
            icon: "/page/securityThreatDetection/metrics-card-3.svg",
            value: "1928",
            change: "5.5%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "purple",
            bgColor: "bg-purple-100 border-purple-200 border-2",
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
