import React from "react";
import OffendersChart from "./OffendersChart";

function BarChart() {

    return (
        <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 mb-6 rounded-lg shadow-sm bg-neutral-50 w-8/12 min-h-[287px]">
            <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
                Flagged Visitors & Repeat Offenders
            </h3>
            <OffendersChart />
        </article>
    );
}

export default BarChart;