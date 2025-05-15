import React from "react";
import Invoice from "./Invoice";

const PAGE_LIMIT = 5;

function InvoiceTable({ data }) {
    const emptyRows = PAGE_LIMIT - data.length;

    return (
        <div className="flex flex-col gap-2 mt-6 mx-6 rounded-md shadow-sm bg-neutral-50 p-4 max-md:mx-2.5">
            <div className="text-blue-950 font-bold text-lg mb-2 font-['Amble']">Billing History & Invoices</div>

            {data.map((item, index) => (
                <Invoice key={index} fileName={item.fileName} date={item.date} />
            ))}

            {Array.from({ length: emptyRows }).map((_, index) => (
                <div
                    key={`empty-${index}`}
                    className="h-[80px] bg-white rounded shadow-sm opacity-30"
                ></div>
            ))}
        </div>
    );
}

export default InvoiceTable;
