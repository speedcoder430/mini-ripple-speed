import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { format, parse } from "date-fns";

const TrafficTrendsChart = ({
    gaData = [],
    metricKeys = ["metric1", "metric2"],
    metricLabels = ["Last 24 hrs", "Last 7 Days"],
    lineColors = ["#FFB800", "#2E2E2E"],
}) => {
    const [seriesData, setSeriesData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (
            !Array.isArray(gaData) ||
            metricKeys.length !== 2 ||
            metricLabels.length !== 2
        )
            return;

        try {
            const trafficByDate = {};

            gaData.forEach((row) => {
                const fullDate = parse(row.dateHour, "yyyyMMddHH", new Date());
                const date = format(fullDate, "yyyy-MM-dd");
                const val1 = parseInt(row[metricKeys[0]]) || 0;
                const val2 = parseInt(row[metricKeys[1]]) || 0;

                if (!trafficByDate[date]) {
                    trafficByDate[date] = { val1: 0, val2: 0 };
                }

                trafficByDate[date].val1 += val1;
                trafficByDate[date].val2 += val2;
            });

            const sortedDates = Object.keys(trafficByDate).sort();
            const series1 = sortedDates.map((date) => trafficByDate[date].val1);
            const series2 = sortedDates.map((date) => trafficByDate[date].val2);

            setCategories(sortedDates);
            setSeriesData([
                { name: metricLabels[0], data: series1 },
                { name: metricLabels[1], data: series2 },
            ]);
        } catch (err) {
            console.error("Traffic chart formatting error:", err);
        }
    }, [gaData, metricKeys, metricLabels]);

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                height: 300,
                type: "line",
                toolbar: { show: false },
            },
            legend: { show: false },
            colors: lineColors,
            stroke: {
                width: 2,
                curve: "smooth",
            },
            xaxis: {
                type: "category",
                categories: categories,
                labels: {
                    formatter: (value) => {
                        try {
                            return format(parse(value, "yyyy-MM-dd", new Date()), "MMM d");
                        } catch {
                            return value;
                        }
                    },
                },
            },
            markers: {
                size: 0,
                hover: {
                    size: 5,
                    sizeOffset: 4,
                },
            },
            tooltip: {
                style: {
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                },
                fillSeriesColor: false,
            },
            grid: {
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: false } },
            },
        },
    };

    return (
        <div className="h-full w-full flex-1">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={"100%"}
                width={"100%"}
            />
        </div>
    );
};

export default TrafficTrendsChart;
