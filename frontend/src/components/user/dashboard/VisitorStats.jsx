import React from "react";
import VisitorSessionDurationChart from "./VisitorSessionDuration";
import DeviceUsageStatisticsChart from "./DeviceUsageStatisticsChart";

function VisitorStats() {
    return (
        <section className="flex flex-wrap flex-1 justify-center gap-5 items-end mx-6 mt-3 max-md:mr-2.5">
            <VisitorSession />
            <DeviceUsage />
        </section>
    );
}

function VisitorSession() {
    return (
        <article className="overflow-hidden text-base font-bold tracking-wide rounded-lg shadow-sm bg-neutral-50 min-w-60 text-neutral-900 w-[653px] min-h-[337px] max-md:max-w-full">
            <div className="flex gap-6 items-start px-6 py-3 w-full max-md:px-5 max-md:max-w-full">
                <h3 className="flex-1 shrink gap-2.5 w-full basis-0 min-w-60 max-md:max-w-full">
                    Visitor Session Duration
                </h3>
            </div>
            <VisitorSessionDurationChart />
        </article>
    );
}

function DeviceUsage() {
    return (
        <article className="px-5 pt-2.5 pb-5 rounded-lg shadow-sm bg-neutral-50 min-h-[337px] w-[415px] flex-1">
            <h3 className="text-sm font-bold tracking-tight leading-none text-slate-900">
                Device Usage Statistics
            </h3>
            <DeviceUsageStatisticsChart />
        </article>
    );
}

export default VisitorStats;
