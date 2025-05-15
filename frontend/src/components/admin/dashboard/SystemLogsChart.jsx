import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// ? Mock data
const mockGAData = [
    { sessionSource: "google", sessions: "120" },
    { sessionSource: "bing", sessions: "40" },
    { sessionSource: "facebook", sessions: "75" },
    { sessionSource: "twitter", sessions: "60" },
    { sessionSource: "(direct)", sessions: "100" },
    { sessionSource: "t.co", sessions: "20" },
    { sessionSource: "linkedin", sessions: "30" },
];

const SystemLogsChart = ({ gaData = mockGAData }) => {
    const [referralData, setReferralData] = useState([0, 0, 0]); // [Organic, Social, Direct]

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        let organic = 0;
        let social = 0;
        let direct = 0;

        const organicSources = ["google", "bing", "yahoo"];
        const socialSources = ["facebook", "twitter", "instagram", "linkedin", "t.co"];

        gaData.forEach((row) => {
            const source = (row.sessionSource || "").toLowerCase();
            const sessions = parseInt(row.sessions) || 0;

            if (source === "(direct)") {
                direct += sessions;
            } else if (socialSources.some((s) => source.includes(s))) {
                social += sessions;
            } else if (organicSources.some((s) => source.includes(s))) {
                organic += sessions;
            }
        });

        setReferralData([organic, social, direct]);
    }, [gaData]);

    const total = referralData.reduce((sum, val) => sum + val, 0);
    const [organic, social, direct] = referralData;

    const data = {
        labels: ["Admin login", "Role changes", "User modifications"],
        datasets: [
            {
                data: referralData,
                backgroundColor: ["#D2691E", "#3B82F6", "#001E3C"],
                borderWidth: 0,
                borderRadius: 40,
                spacing: -24,
            },
        ],
    };

    const options = {
        cutout: "68%",
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="flex items-center flex-col justify-center rounded-lg flex-1 w-full h-full">
            <div className="relative">
                <div className="w-[150px]">
                    <Doughnut data={data} options={options} />
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                    <h3 className="font-bold text-gray-500 text-sm">Total</h3>
                    <p className="font-bold text-xl text-gray-700">{total}</p>
                </div>
            </div>
        </div>
    );
};

export default SystemLogsChart;
