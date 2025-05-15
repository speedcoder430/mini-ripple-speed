import React from "react";
import SuspiciousActivityAlertsTable from "./SuspiciousActivityAlertsTable";

function SuspiciousActivity() {
    const activities = [
        {
            ip: "192.168.1.10",
            type: "VPN",
            datetime: "2025-03-20 12:45",
            status: "Flagged",
        },
        {
            ip: "203.45.67.89",
            type: "Bot",
            datetime: "2025-03-20 13:10",
            status: "Blocked",
        },
        {
            ip: "178.22.33.44",
            type: "Suspicious IP",
            datetime: "2025-03-20 14:30",
            status: "Flagged",
        },
        {
            ip: "203.45.67.89",
            type: "Bot",
            datetime: "2025-03-20 13:10",
            status: "Blocked",
        },
        {
            ip: "45.67.89.123",
            type: "VPN",
            datetime: "2025-03-20 15:00",
            status: "Blocked",
        },
    ];

    return (
        <article className="overflow-hidden flex-1 rounded-lg shadow-sm bg-neutral-50 text-slate-900 min-w-[415px]">
            <h3 className="flex-1 shrink gap-2.5 self-stretch px-6 py-3 w-full text-sm font-bold tracking-tight leading-none basis-0 max-md:px-5">
                Suspicious Activity Alerts
            </h3>
            <SuspiciousActivityAlertsTable />
        </article>
    );
}

export default SuspiciousActivity;
