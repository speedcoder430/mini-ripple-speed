import React from "react";
import MostVisitedPagesChart from "./MostVisitedPages";

function PageVisits() {
    return (
        <article className="p-5 rounded-lg shadow-sm bg-neutral-50 h-[360px] w-[653px] max-md:max-w-full">
            <h3 className="text-sm font-bold tracking-tight leading-none text-slate-900">
                Most Visited Pages
            </h3>
            <div className="flex flex-wrap mt-5 w-full max-md:max-w-full">
                <MostVisitedPagesChart />
            </div>
        </article>
    );
}

export default PageVisits;
