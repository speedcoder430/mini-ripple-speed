"use client";
import React from "react";

const PAGE_LIMIT = 8;

function IPTable({ data, onRemoveBlockedCountry, onRemoveBlockedIP }) {
    const emptyRows = PAGE_LIMIT - data.length;

    return (
        <div className="flex overflow-hidden flex-wrap items-start mt-6 mr-6 ml-6 rounded-md shadow-sm bg-neutral-50 max-md:mr-2.5">
            <TableColumn title="IP Id" items={data.map((item) => item.id)} emptyCount={emptyRows} />
            <TableColumn title="IP Address" items={data.map((item) => item.ipAddress)} emptyCount={emptyRows} />
            <TableColumn title="Added On" items={data.map((item) => item.addedOn)} width="w-[185px]" emptyCount={emptyRows} />
            <TableColumn title="Last Activity" items={data.map((item) => item.lastActivity)} emptyCount={emptyRows} />
            <TableColumn title="Location" items={data.map((item) => item.location)} emptyCount={emptyRows} />
            <TableColumn title="Status" items={data.map((item) => ({
                text: item.status,
                color: item.statusColor,
            }))} isStatus={true} emptyCount={emptyRows} />
            <ActionsColumn
                rows={data}
                rowCount={data.length}
                emptyCount={emptyRows}
                onRemoveBlockedCountry={onRemoveBlockedCountry}
                onRemoveBlockedIP={onRemoveBlockedIP}
            />

        </div>
    );
}


function TableColumn({ title, items, width = "flex-1 shrink basis-0", isStatus = false, emptyCount = 0 }) {
    const baseTextClass = "text-sm tracking-tight leading-none";
    const textClass = isStatus
        ? `${baseTextClass} text-blue-700 whitespace-nowrap`
        : `${baseTextClass} text-zinc-600`;

    return (
        <div className={`${textClass} ${width}`}>
            <div className="flex gap-10 items-center w-full font-bold bg-blue-200">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    {title}
                </div>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-10 items-center py-2.5 mt-1 w-full whitespace-nowrap bg-white"
                >
                    <div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5">
                        {isStatus ? <span className={item.color}>{item.text}</span> : item}
                    </div>
                </div>
            ))}

            {/* Render empty placeholders */}
            {Array.from({ length: emptyCount }).map((_, index) => (
                <div
                    key={`empty-${index}`}
                    className="flex gap-10 items-center py-[17px] mt-1 w-full whitespace-nowrap bg-white"
                >
                    <div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5 text-zinc-300"></div>
                </div>
            ))}
        </div>
    );
}

function ActionsColumn({ rows, rowCount, emptyCount, onRemoveBlockedCountry, onRemoveBlockedIP }) {
    return (
        <div className="flex relative flex-col flex-1 shrink items-start basis-0">
            <div className="flex z-0 gap-10 items-center self-stretch w-full text-sm font-bold tracking-tight leading-none whitespace-nowrap bg-blue-200 text-zinc-600">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    Actions
                </div>
            </div>

            {rows.map((row, index) => (
                <div key={index} className="bg-white pr-6 py-0 mt-1 w-full">
                    <div className="flex gap-2.5 items-center px-6 py-[19px]">
                        <button
                            onClick={() => {
                                if (onRemoveBlockedIP && row.ipAddress) {
                                    onRemoveBlockedIP(row.ipAddress);
                                } else if (onRemoveBlockedCountry && row.location) {
                                    onRemoveBlockedCountry(row.location);
                                }
                            }}
                            className="flex justify-center items-center px-2 py-1 rounded shadow-sm bg-red-100 hover:bg-red-200"
                            title="Remove from Blocked List"
                        >
                            <span className="text-red-700 text-lg">❌</span>
                        </button>
                    </div>
                </div>
            ))}

            {Array.from({ length: emptyCount }).map((_, index) => (
                <div key={`empty-action-${index}`} className="bg-white pr-6 py-0 mt-1 w-full">
                    <div className="flex items-center px-6 py-[37px] text-zinc-300"></div>
                </div>
            ))}
        </div>
    );
}



export default IPTable;
