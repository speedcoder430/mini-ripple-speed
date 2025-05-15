import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const mockGAData = [
    { bounceRate: 0.15, sessionDuration: 0.65 },
    { bounceRate: 0.17, sessionDuration: 0.63 },
    { bounceRate: 0.20, sessionDuration: 0.60 },
    { bounceRate: 0.13, sessionDuration: 0.67 },
    { bounceRate: 0.16, sessionDuration: 0.64 },
];

const BotsVpnDetectionChart = ({ gaData = mockGAData }) => {
    const { avgBounceRate, avgSessionDuration } = useMemo(() => {
        const total = gaData.length;
        const totalBounce = gaData.reduce((sum, row) => sum + row.bounceRate, 0);
        const totalDuration = gaData.reduce((sum, row) => sum + row.sessionDuration, 0);
        return {
            avgBounceRate: totalBounce / total,
            avgSessionDuration: totalDuration / total,
        };
    }, [gaData]);

    const bouncePercent = (avgBounceRate * 100).toFixed(1);
    const sessionPercent = (avgSessionDuration * 100).toFixed(1);

    const chartData = {
        labels: ["Bounce Rate", "Session Duration"],
        datasets: [
            {
                data: [bouncePercent, sessionPercent],
                backgroundColor: ["#e6302d", "#e7992e"], // red & green
                borderWidth: 0,
                borderRadius: 30,
                spacing: -20,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
                },
            },
        },
    };

    return (
        <div className="relative w-[160px] h-[189px] mx-auto">
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-md text-gray-900 font-medium">Total</p>
                <p className="text-lg font-bold text-black">100%</p>
            </div>
        </div>
    );
};

export default BotsVpnDetectionChart;
