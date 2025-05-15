import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { format, parse } from "date-fns";

const defaultGAData = [
    { dateHour: "2025042301", metric1: "34", metric2: "56" },
    { dateHour: "2025042302", metric1: "45", metric2: "65" },
    { dateHour: "2025042401", metric1: "25", metric2: "43" },
    { dateHour: "2025042402", metric1: "60", metric2: "88" },
    { dateHour: "2025042501", metric1: "32", metric2: "59" },
    { dateHour: "2025042502", metric1: "28", metric2: "51" },
    { dateHour: "2025042601", metric1: "50", metric2: "70" },
    { dateHour: "2025042602", metric1: "47", metric2: "66" },
];

const UserStatisticsChart = ({
    gaData = defaultGAData,
    metricKeys = ["metric1", "metric2"],
    metricLabels = ["Metric 1", "Metric 2"],
    lineColors = ["#3978d7", "#059669"],
}) => {
    const [seriesData, setSeriesData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        try {
            if (!Array.isArray(gaData) || metricKeys.length !== 2 || metricLabels.length !== 2) return;

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
            const series1 = [];
            const series2 = [];

            sortedDates.forEach((date) => {
                series1.push(trafficByDate[date].val1);
                series2.push(trafficByDate[date].val2);
            });

            setCategories(sortedDates);
            setSeriesData([
                { name: metricLabels[0], data: series1 },
                { name: metricLabels[1], data: series2 },
            ]);
        } catch (err) {
            console.error("Failed to process GA data:", err);
        }
    }, [gaData]);

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                height: 300,
                type: "line",
                toolbar: {
                    show: false,
                },
            },
            legend: {
                show: false,
            },
            colors: [...lineColors],
            stroke: {
                width: 2,
                curve: "smooth",
            },
            xaxis: {
                type: "category",
                categories: categories,
                labels: {
                    formatter: function (value) {
                        try {
                            const dateObj = parse(value, "yyyy-MM-dd", new Date());
                            return format(dateObj, "MMM d");
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

export default UserStatisticsChart;
