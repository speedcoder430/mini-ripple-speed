import React from "react";
import MetricCard from "./MetricCard";

function MetricsCards() {
    const metrics = [
        {
            title: "Total Blocked IPs",
            icon: "/page/blockedSuspiciousActivityLog/metrics-card-1.svg",
            value: "120",
            change: "5.2%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e234bf25d9196f569daf775dde2b90de8840974?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "negative",
            bgColor: "bg-red-100 border-red-200 border-2",
        },
        {
            title: "Auto-Blocked",
            icon: "/page/blockedSuspiciousActivityLog/metrics-card-2.svg",
            value: "85",
            change: "4.0%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b01e29215068376159551b30e0856479a40a75a0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "neutral",
            bgColor: "bg-blue-100 border-blue-200 border-2",
        },
        {
            title: "Manually Blocked",
            icon: "/page/blockedSuspiciousActivityLog/metrics-card-3.svg",
            value: "40",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "warning",
            bgColor: "bg-[#FFF4D3] border-[#FFE6A5] border-2",
        },
        {
            title: "Flagged Visitors",
            icon: "/page/blockedSuspiciousActivityLog/metrics-card-4.svg",
            value: "60",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "warning",
            bgColor: "bg-yellow-100 border-yellow-200 border-2",
        },
        {
            title: "Repeat Offenders",
            icon: "/page/blockedSuspiciousActivityLog/metrics-card-5.svg",
            value: "25",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
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
