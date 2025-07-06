import React from "react";
import BlockedCountryListTable from "./BlockedCountryListTable";
import { useDeviceFilter } from "./DeviceFilterProvider";

function BlockedCountryList() {
  const { blockedDevices } = useDeviceFilter();

  return (
    <article className="overflow-hidden flex-1 rounded-lg shadow-sm bg-neutral-50 text-slate-900 min-w-[415px]">
      <h3 className="px-6 py-3 text-sm font-bold tracking-tight leading-none">List of Blocked Devices</h3>
      <BlockedCountryListTable blockedDevices={blockedDevices} />
    </article>
  );
}

export default BlockedCountryList;
