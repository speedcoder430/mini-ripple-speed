import React from "react";

function MetricCard({
    icon,
    title,
    value,
    percentage,
    trend,
    trendIcon,
    trendColor,
    bgColor,
}) {
    return (
        <article
            className={`flex flex-col flex-1 shrink self-stretch p-5 my-auto ${bgColor} rounded-lg shadow-sm basis-0 min-w-60`}
        >
            <div className="flex gap-2.5 items-center self-start text-base text-slate-900">
                <img
                    src={icon}
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    alt={title}
                />
                <h3 className="self-stretch my-auto font-['Jost']">{title}</h3>
            </div>
            <div className="flex gap-6 items-center mt-5 w-full whitespace-nowrap">
                <p className="flex-1 shrink self-stretch my-auto text-2xl font-semibold leading-none basis-3 text-slate-900 font-['Jost']">
                    {value}
                </p>
                <div
                    className={`flex gap-1 items-center self-stretch px-1.5 py-1 my-auto text-sm tracking-tight leading-none ${trendColor} rounded-sm`}
                >
                    <span className="self-stretch my-auto">{percentage}</span>
                    <img
                        src={trendIcon}
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                        alt={trend === "up" ? "Trending up" : "Trending down"}
                    />
                </div>
            </div>
            <p className="mt-5 text-sm tracking-tight leading-none text-slate-900 font-['Amble']">
                From Jan 01, 2025 - Mar 31, 2025
            </p>
        </article>
    );
}

export default MetricCard;
