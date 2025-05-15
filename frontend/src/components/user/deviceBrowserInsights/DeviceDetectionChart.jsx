import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DeviceDetectionChart = ({ mobile = 0, desktop = 0, tablet = 0 }) => {
    const { total, mobilePercent, desktopPercent, tabletPercent } = useMemo(() => {
        const total = mobile + desktop + tablet;
        return {
            total,
            mobilePercent: total ? ((mobile / total) * 100).toFixed(1) : 0,
            desktopPercent: total ? ((desktop / total) * 100).toFixed(1) : 0,
            tabletPercent: total ? ((tablet / total) * 100).toFixed(1) : 0,
        };
    }, [mobile, desktop, tablet]);

    const chartData = {
        labels: ["Mobile", "Desktop", "Tablet"],
        datasets: [
            {
                data: [mobilePercent, desktopPercent, tabletPercent],
                backgroundColor: ["#00976c", "#da6925", "#416fd1"],
                borderWidth: 0,
                borderRadius: 30,
                spacing: -10,
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
                <p className="text-lg font-bold text-black">{total}</p>
            </div>
        </div>
    );
};

export default DeviceDetectionChart;
