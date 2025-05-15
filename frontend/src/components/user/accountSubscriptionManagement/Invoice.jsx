"use client";
import React from "react";

function InvoiceNumber({ fileName }) {
    return (
        <div className="flex items-center text-slate-900 font-['Amble']">{fileName}</div>
    );
}

function InvoiceDate({ date }) {
    return (
        <div className="flex gap-1 items-center tracking-tight">
            <strong className="font-bold text-zinc-600 font-['Amble']">Date:</strong>
            <time className="text-slate-900 font-['Amble']">{date}</time>
        </div>
    );
}

function DownloadButton() {
    return (
        <button
            className="px-3 py-1.5 bg-blue-800 rounded text-neutral-50 font-['Jost']"
            aria-label="Download Invoice"
        >
            Download
        </button>
    );
}

function Invoice({ fileName, date }) {
    return (
        <article className="flex flex-col md:flex-row gap-4 justify-between items-center p-6 text-sm rounded-lg shadow-sm bg-neutral-50">
            <div className="flex gap-2.5 items-center tracking-tight whitespace-nowrap text-slate-900">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cd522fc9cdfb7bf4bb032ccfa6700695eed265f?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                    className="w-6 aspect-square"
                    alt="Invoice icon"
                />
                <InvoiceNumber fileName={fileName} />
            </div>
            <InvoiceDate date={date} />
            <DownloadButton />
        </article>
    );
}

export default Invoice;
