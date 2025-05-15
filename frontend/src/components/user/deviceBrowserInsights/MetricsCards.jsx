import React from "react";
import MetricCard from "./MetricCard";

function MetricsCards() {
    const metrics = [
        {
            title: "Desktop",
            icon: "/page/deviceBrowserInsights/metrics-card-1.svg",
            value: "60%",
            change: "4.3%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "warning",
            bgColor: "bg-yellow-100 border-yellow-200 border-2",
        },
        {
            title: "Mobile",
            icon: "/page/deviceBrowserInsights/metrics-card-2.svg",
            value: "35%",
            change: "5.5%",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/47c10d3a3e9efb825935c5d5ef59bb93e7eef5f9?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "positive",
            bgColor: "bg-teal-100 border-teal-200 border-2",
        },
        {
            title: "Tablet",
            icon: "/page/deviceBrowserInsights/metrics-card-3.svg",
            value: "5%",
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
