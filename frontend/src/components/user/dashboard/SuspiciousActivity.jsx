import React from "react";
import SuspiciousActivityAlertsTable from "./SuspiciousActivityAlertsTable";
import useSuspiciousActivities from "./useSuspiciousActivities";

function SuspiciousActivity() {
    const { data, loading, error } = useSuspiciousActivities();

    return (
        <article className="overflow-hidden flex-1 rounded-lg shadow-sm bg-neutral-50 text-slate-900 min-w-[415px]">
            <h3 className="flex-1 shrink gap-2.5 self-stretch px-6 py-3 w-full text-sm font-bold tracking-tight leading-none basis-0 max-md:px-5">
                Suspicious Activity Alerts
            </h3>
            {loading ? (
                <p className="text-sm text-gray-500 px-6 pb-4">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500 px-6 pb-4">Failed to load suspicious activity.</p>
            ) : (
                <SuspiciousActivityAlertsTable gaData={data} />
            )}
        </article>
    );
}

export default SuspiciousActivity;
