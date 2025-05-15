import React from "react";
import TrafficByTimeOfDayChart from "./TrafficByTimeOfDayChart";

function TrafficHeatmap() {

    return (
        <section className="flex overflow-hidden flex-col px-5 py-6 mt-6 mr-6 ml-7 rounded-lg shadow-sm bg-neutral-50 h-[513px] max-md:mr-2.5 max-md:max-w-full">
            <h3 className="gap-2.5 self-start text-xs font-bold leading-none text-slate-900">
                Traffic by Time of Day
            </h3>
            <TrafficByTimeOfDayChart />
        </section>
    );
}

export default TrafficHeatmap;
