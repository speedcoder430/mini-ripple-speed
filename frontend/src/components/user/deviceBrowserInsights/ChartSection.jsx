import React, { useMemo } from "react";
import BrowserUsageChart from "./BrowserUsageChart";
import DeviceDetectionChart from "./DeviceDetectionChart";

function ChartSection() {
    return (
        <section className="flex gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <DeviceDetectionSummary />
            <BarChart />
        </section>
    );
}

function BarChart() {

    return (
        <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 mb-6 rounded-lg shadow-sm bg-neutral-50 w-7/12 h-[320px]">
            <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
                Browser Usage
            </h3>
            <BrowserUsageChart />
        </article>
    );
}

function DeviceDetectionSummary() {
    const sessionMetrics = [
        { mobile: 18, desktop: 10, tablet: 16 },
        { mobile: 90, desktop: 8, tablet: 12 },
        { mobile: 5, desktop: 11, tablet: 14 },
        { mobile: 22, desktop: 9, tablet: 17 },
        { mobile: 10, desktop: 10, tablet: 13 },
    ];

    const {
        totalMobile,
        totalDesktop,
        totalTablet,
    } = useMemo(() => {
        const totalMobile = sessionMetrics.reduce((acc, cur) => acc + (cur.mobile || 0), 0);
        const totalDesktop = sessionMetrics.reduce((acc, cur) => acc + (cur.desktop || 0), 0);
        const totalTablet = sessionMetrics.reduce((acc, cur) => acc + (cur.tablet || 0), 0);
        const totalSessions = totalMobile + totalDesktop + totalTablet;

        return {
            totalMobile,
            totalDesktop,
            totalTablet,
            totalSessions,
        };
    }, [sessionMetrics]);

    return (
        <article className="flex flex-col px-5 py-4 rounded-lg shadow-sm bg-neutral-50 w-5/12 h-[320px]">
            <h3 className="font-bold text-slate-900 mb-4">Device Breakdown
                <span className="text-slate-600 font-normal"> (Mobile, Desktop, Tablet)</span>
            </h3>
            <DeviceDetectionChart
                mobile={totalMobile}
                desktop={totalDesktop}
                tablet={totalTablet}
            />
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                    <p className="text-zinc-600">Mobile</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#00976c]" />
                        <span>{totalMobile}</span>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600">Desktop</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#da6925]" />
                        <span>{totalDesktop}</span>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600">Tablet</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#416fd1]" />
                        <span>{totalTablet}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ChartSection;
