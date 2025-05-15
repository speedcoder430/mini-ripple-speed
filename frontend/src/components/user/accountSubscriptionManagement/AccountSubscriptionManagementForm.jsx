import React, { useState } from "react";
import TopTitle from "./TopTitle";
import StarterPlan from "./StarterPlan";
import Tabs from "./Tabs";
import Pagination from "./Pagination";
import InvoiceTable from "./InvoiceTable";

const allInvoices = [
    { fileName: "Invoice-001.pdf", date: "2025-05-01" },
    { fileName: "Invoice-002.pdf", date: "2025-05-02" },
    { fileName: "Invoice-003.pdf", date: "2025-05-03" },
    { fileName: "Invoice-004.pdf", date: "2025-05-04" },
    { fileName: "Invoice-005.pdf", date: "2025-05-05" },
    { fileName: "Invoice-006.pdf", date: "2025-05-06" },
    { fileName: "Invoice-007.pdf", date: "2025-05-07" },
    { fileName: "Invoice-008.pdf", date: "2025-05-08" },
    { fileName: "Invoice-009.pdf", date: "2025-05-09" },
];

const PAGE_LIMIT = 5;

function AccountSubscriptionManagementForm() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allInvoices.length / PAGE_LIMIT);
    const currentData = allInvoices.slice(
        (currentPage - 1) * PAGE_LIMIT,
        currentPage * PAGE_LIMIT
    );

    return (
        <>
            <TopTitle />
            <StarterPlan />
            <Tabs />
            <InvoiceTable data={currentData} />
            <div className="flex w-full justify-end">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
}

export default AccountSubscriptionManagementForm;
