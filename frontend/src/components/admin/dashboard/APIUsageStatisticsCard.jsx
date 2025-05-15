import React from "react";
import APIUsageStatisticsChart from "./APIUsageStatisticsChart";

function APIUsageStatisticsCard() {
    return (
        <article className="p-5 rounded-lg shadow-sm bg-neutral-50 h-[413px] flex-1 max-md:max-w-full">
            <h3 className="text-sm font-bold tracking-tight leading-none text-slate-900">
                API Usage Statistics
            </h3>
            <div className="flex flex-wrap mt-5 w-full max-md:max-w-full">
                <APIUsageStatisticsChart />
            </div>
        </article>
    );
}

export default APIUsageStatisticsCard;
