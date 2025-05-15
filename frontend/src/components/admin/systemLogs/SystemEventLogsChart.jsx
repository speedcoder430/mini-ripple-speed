"use client";
import React from "react";

const PAGE_LIMIT = 8;

function SystemEventLogsChart({ data }) {
    const emptyRows = PAGE_LIMIT - data.length;

    const getStatusColor = (status) => {
        switch (status) {
            case "Success":
                return "text-green-600";
            case "Warning":
                return "text-orange-500";
            case "Failed":
                return "text-red-600";
            case "Critical":
                return "text-purple-400";
            default:
                return "text-blue-600";
        }
    };

    return (
        <div className="flex overflow-hidden flex-wrap items-start mt-6 mr-6 ml-6 rounded-md shadow-sm font-['Amble'] bg-neutral-50 max-md:mr-2.5">
            <TableColumn title="Event Type" items={data.map((item) => item.eventType)} emptyCount={emptyRows} />
            <TableColumn title="Description" items={data.map((item) => item.description)} emptyCount={emptyRows} />
            <TableColumn title="Timestamp" items={data.map((item) => item.timestamp)} emptyCount={emptyRows} />
            <TableColumn title="Performed By" items={data.map((item) => item.performedBy)} width="w-[185px]" emptyCount={emptyRows} />
            <TableColumn
                title="Status"
                items={data.map((item) => ({
                    text: item.status,
                    color: getStatusColor(item.status),
                }))}
                isStatus={true}
                emptyCount={emptyRows}
            />
        </div>
    );
}

function TableColumn({ title, items, width = "flex-1 shrink basis-0", isStatus = false, emptyCount = 0 }) {
    const baseTextClass = "text-sm tracking-tight leading-none";
    const textClass = isStatus
        ? `${baseTextClass} text-zinc-600 whitespace-nowrap`
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

export default SystemEventLogsChart;
