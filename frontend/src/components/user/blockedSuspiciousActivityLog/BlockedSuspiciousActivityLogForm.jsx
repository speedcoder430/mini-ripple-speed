import React from "react";
import MetricsCards from "./MetricsCards";
import SearchForm from "./SearchForm";
import BlockedIpsList from "./BlockedIpsList";
import BarChart from "./BarChart";

function BlockedSuspiciousActivityLogForm() {
    return (
        <>
            <MetricsCards />
            <SearchForm />
            <div className="flex flex-wrap gap-5 items-start mt-6 mr-6 ml-7 max-md:mr-2.5">
                <BlockedIpsList />
            </div>
            <BarChart />
        </>
    );
}

export default BlockedSuspiciousActivityLogForm;
