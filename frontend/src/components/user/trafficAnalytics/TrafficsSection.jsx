import React, { useMemo } from "react";
import TrafficTrendsChart from "../dashboard/TrafficTrendsChart";
import RepeatedVisitsFromTheSameIpChart from "./RepeatedVisitsFromTheSameIpChart";
import PeakTrafficHoursChart from "./PeakTrafficHoursChart";
import BounceRateSessionChart from "./BounceRateSessionChart";

function TrafficSection() {
    return (
        <section className="flex gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <div className="w-7/12 flex flex-col">
                <TrafficTrends />
                <section className="flex overflow-hidden flex-col px-5 py-6 mt-6 rounded-lg shadow-sm bg-neutral-50 h-[365px] max-md:mr-2.5 max-md:max-w-full">
                    <h3 className="gap-2.5 self-start text-xs font-bold leading-none text-slate-900">
                        Peak Traffic Hours
                    </h3>
                    <PeakTrafficHoursChart />
                </section>
            </div>
            <div className="w-5/12">
                <BarChart />
                <BounceRateSessionDuration />
            </div>
        </section>
    );
}

function TrafficTrends() {

    const myData = [
        { dateHour: "2025042301", totalVisits: "34", uniqueVisitors: "56" },
        { dateHour: "2025042302", totalVisits: "45", uniqueVisitors: "65" },
        { dateHour: "2025042401", totalVisits: "25", uniqueVisitors: "43" },
        { dateHour: "2025042402", totalVisits: "60", uniqueVisitors: "88" },
        { dateHour: "2025042501", totalVisits: "32", uniqueVisitors: "59" },
        { dateHour: "2025042502", totalVisits: "28", uniqueVisitors: "51" },
        { dateHour: "2025042601", totalVisits: "50", uniqueVisitors: "70" },
        { dateHour: "2025042602", totalVisits: "47", uniqueVisitors: "66" },
        { dateHour: "2025042701", totalVisits: "34", uniqueVisitors: "56" },
        { dateHour: "2025042702", totalVisits: "45", uniqueVisitors: "65" },
        { dateHour: "2025042801", totalVisits: "25", uniqueVisitors: "43" },
        { dateHour: "2025042802", totalVisits: "60", uniqueVisitors: "88" },
        { dateHour: "2025042901", totalVisits: "32", uniqueVisitors: "59" },
        { dateHour: "2025042902", totalVisits: "28", uniqueVisitors: "51" },
        { dateHour: "2025043001", totalVisits: "50", uniqueVisitors: "70" },
        { dateHour: "2025043002", totalVisits: "47", uniqueVisitors: "66" },
    ];

    return (
        <article className="flex overflow-hidden flex-col grow shrink justify-center p-5 rounded-lg shadow-sm bg-neutral-50 max-w-full h-[313px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                <h3 className="self-stretch my-auto font-bold text-neutral-950">
                    Total Visits & Unique Visitors
                </h3>
                <div className="flex gap-2.5 items-center self-stretch my-auto text-zinc-600">
                    <span className="self-stretch my-auto">This Month</span>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db8dd0b04e4cc6108ea3ba89fa8843ffd12ebe3?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                        alt="Filter dropdown"
                        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                </div>
            </div>
            <TrafficTrendsChart
                gaData={myData}
                metricKeys={["totalVisits", "uniqueVisitors"]}
                metricLabels={["Total Visits", "Unique Visitors"]}
                lineColors={["#713aed", "#3978d7"]}
            />
        </article>
    );
}

function BarChart() {

    return (
        <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 mb-6 rounded-lg shadow-sm bg-neutral-50 w-full min-h-[287px]">
            <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
                Repeated Visits from the Same IP
            </h3>
            <RepeatedVisitsFromTheSameIpChart />
        </article>
    );
}

function BounceRateSessionDuration() {
    const sessionMetrics = [
        { bounceRate: 0.05 },
        { bounceRate: 0.10 },
        { bounceRate: 0.07 },
        { bounceRate: 0.04 },
        { bounceRate: 0.06 },
    ];

    const { avgBounceRateNum, bouncePercent, sessionPercent } = useMemo(() => {
        const total = sessionMetrics.length;
        const totalBounce = sessionMetrics.reduce((acc, cur) => acc + cur.bounceRate, 0);
        const avgBounce = total ? totalBounce / total : 0;
        const bounce = (avgBounce * 100).toFixed(1);
        const session = (100 - bounce).toFixed(1);
        return {
            avgBounceRateNum: avgBounce,
            bouncePercent: bounce + "%",
            sessionPercent: session + "%",
        };
    }, [sessionMetrics]);

    return (
        <article className="flex flex-col px-5 py-4 rounded-lg shadow-sm bg-neutral-50 w-full min-h-[220px]">
            <h3 className="font-bold text-slate-900 mb-4">Bounce Rate | Session Duration</h3>
            <BounceRateSessionChart bounceRate={avgBounceRateNum} />
            <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                <div>
                    <p className="text-zinc-600">Bounce Rate</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#011732]" />
                        <span>{bouncePercent}</span>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600">Session Duration</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#3978d7]" />
                        <span>{sessionPercent}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}


export default TrafficSection;
