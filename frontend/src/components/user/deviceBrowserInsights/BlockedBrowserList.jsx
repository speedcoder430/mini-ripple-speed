import React from "react";
import BlockedBrowserListTable from "./BlockedBrowserListTable";
import { useDeviceFilter } from "./DeviceFilterProvider";

function BlockedBrowserList() {
    const { blockedBrowsers } = useDeviceFilter();

    return (
        <article className="overflow-hidden flex-1 rounded-lg shadow-sm bg-neutral-50 text-slate-900 min-w-[415px]">
            <h3 className="flex-1 shrink gap-2.5 self-stretch px-6 py-3 w-full text-sm font-bold tracking-tight leading-none basis-0 max-md:px-5">
                List of Blocked Browsers
            </h3>
            <BlockedBrowserListTable blockedBrowsers={blockedBrowsers} />
        </article>
    );
}

export default BlockedBrowserList;