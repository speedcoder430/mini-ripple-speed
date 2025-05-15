import React, { useMemo } from "react";
import TrafficTrendsChart from "./TrafficTrendsChart";
import ReferralTrafficChart from "./ReferralTrafficChart";

function TrafficSection() {
    return (
        <section className="flex flex-wrap gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <TrafficTrends />
            <ReferralTraffic />
        </section>
    );
}

function TrafficTrends() {

    const myData = [
        { dateHour: "2025042301", lastOneDay: "34", lastSevenDays: "56" },
        { dateHour: "2025042302", lastOneDay: "45", lastSevenDays: "65" },
        { dateHour: "2025042401", lastOneDay: "25", lastSevenDays: "43" },
        { dateHour: "2025042402", lastOneDay: "60", lastSevenDays: "88" },
        { dateHour: "2025042501", lastOneDay: "32", lastSevenDays: "59" },
        { dateHour: "2025042502", lastOneDay: "28", lastSevenDays: "51" },
        { dateHour: "2025042601", lastOneDay: "50", lastSevenDays: "70" },
        { dateHour: "2025042602", lastOneDay: "47", lastSevenDays: "66" },
        { dateHour: "2025042701", lastOneDay: "34", lastSevenDays: "56" },
        { dateHour: "2025042702", lastOneDay: "45", lastSevenDays: "65" },
        { dateHour: "2025042801", lastOneDay: "25", lastSevenDays: "43" },
        { dateHour: "2025042802", lastOneDay: "60", lastSevenDays: "88" },
        { dateHour: "2025042901", lastOneDay: "32", lastSevenDays: "59" },
        { dateHour: "2025042902", lastOneDay: "28", lastSevenDays: "51" },
        { dateHour: "2025043001", lastOneDay: "50", lastSevenDays: "70" },
        { dateHour: "2025043002", lastOneDay: "47", lastSevenDays: "66" },
    ];

    return (
        <article className="flex overflow-hidden flex-col grow shrink justify-center p-5 rounded-lg shadow-sm bg-neutral-50 min-w-60 w-[646px] min-h-[287px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                <h3 className="self-stretch my-auto font-bold text-neutral-950">
                    Traffic Trends
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
                metricKeys={["lastOneDay", "lastSevenDays"]}
                metricLabels={["Last 24 hrs", "Last 7 Days"]}
            />
        </article>
    );
}

function ReferralTraffic() {
    const referralMockData = [
        { sessionSource: "google", sessions: "100" },
        { sessionSource: "facebook", sessions: "50" },
        { sessionSource: "(direct)", sessions: "150" },
        { sessionSource: "twitter", sessions: "30" },
        { sessionSource: "bing", sessions: "40" },
    ];

    const { direct, organic, social } = useMemo(() => {
        let organic = 0;
        let social = 0;
        let direct = 0;

        const organicSources = ["google", "bing", "yahoo"];
        const socialSources = ["facebook", "twitter", "instagram", "linkedin", "t.co"];

        referralMockData.forEach((row) => {
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

        return { direct, organic, social };
    }, [referralMockData]);

    return (
        <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 rounded-lg shadow-sm bg-neutral-50 min-w-60 w-[278px] min-h-[287px]">
            <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
                Referral Traffic{" "}
                <span className="font-normal text-[rgba(77,81,88,1)]">
                    (Sources of Traffic)
                </span>
            </h3>
            <ReferralTrafficChart gaData={referralMockData} />
            <div className="flex gap-10 justify-between items-center mt-0 w-full whitespace-nowrap">
                <div className="self-stretch my-auto">
                    <p className="text-zinc-600">Direct</p>
                    <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                        <span className="flex shrink-0 self-stretch my-auto w-2.5 h-2.5 rounded-xl bg-slate-900" />
                        <span className="self-stretch my-auto">{direct}</span>
                    </div>
                </div>
                <div className="flex flex-col self-stretch my-auto">
                    <p className="text-zinc-600">Organic</p>
                    <div className="flex gap-2 items-center self-start mt-1 font-bold text-gray-900">
                        <span className="flex shrink-0 self-stretch my-auto w-2.5 h-2.5 bg-amber-600 rounded-xl" />
                        <span className="self-stretch my-auto">{organic}</span>
                    </div>
                </div>
                <div className="self-stretch my-auto">
                    <p className="text-zinc-600">Social</p>
                    <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                        <span className="flex shrink-0 self-stretch my-auto w-2.5 h-2.5 bg-blue-500 rounded-xl" />
                        <span className="self-stretch my-auto">{social}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default TrafficSection;
