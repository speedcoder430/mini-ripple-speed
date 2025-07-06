import React from "react";
import MostVisitedPagesChart from "./MostVisitedPages";
import useMostVisitedPages from "./useMostVisitedPages";

function PageVisits() {
    const { data, loading, error } = useMostVisitedPages();

    return (
        <article className="p-5 rounded-lg shadow-sm bg-neutral-50 h-[360px] w-[653px] max-md:max-w-full">
            <h3 className="text-sm font-bold tracking-tight leading-none text-slate-900">
                Most Visited Pages
            </h3>
            <div className="flex flex-wrap mt-5 w-full max-md:max-w-full">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-sm">Failed to load pages</p>
                ) : (
                    <MostVisitedPagesChart gaData={data} />
                )}
            </div>
        </article>
    );
}

export default PageVisits;

