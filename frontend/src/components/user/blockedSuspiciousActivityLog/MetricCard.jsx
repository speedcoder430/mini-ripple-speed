import React from "react";

function MetricCard({
    title,
    icon,
    value,
    change,
    changeIcon,
    changeType,
    bgColor,
}) {
    // Define color classes based on change type
    const getChangeClasses = () => {
        switch (changeType) {
            case "positive":
                return "text-emerald-600 bg-emerald-200";
            case "neutral":
                return "text-blue-500 bg-blue-200";
            case "warning":
                return "text-amber-500 bg-yellow-200";
            case "negative":
                return "text-red-600 bg-red-200";
            case "purple":
                return "text-violet-600 bg-violet-200";
            default:
                return "text-emerald-600 bg-emerald-200";
        }
    };

    return (
        <article
            className={`flex flex-col flex-1 shrink self-stretch p-5 my-auto ${bgColor} rounded-lg shadow-sm basis-0`}
        >
            <div className="flex gap-2.5 items-center self-start text-base text-slate-900">
                <img
                    src={icon}
                    alt={`${title} icon`}
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                />
                <span className="self-stretch my-auto font-['Jost']">{title}</span>
            </div>
            <div className="flex gap-6 items-center mt-5 w-full whitespace-nowrap">
                <span className="flex-1 shrink self-stretch my-auto text-2xl font-semibold leading-none basis-3 text-slate-900 font-['Jost']">
                    {value}
                </span>
                <div
                    className={`flex gap-1 items-center self-stretch px-1.5 py-1 my-auto text-sm tracking-tight leading-none ${getChangeClasses()} rounded-sm`}
                >
                    <span className="self-stretch my-auto font-['Amble']">{change}</span>
                    <img
                        src={changeIcon}
                        alt="Change indicator"
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                    />
                </div>
            </div>
            <p className="mt-5 text-sm tracking-tight leading-none text-slate-900 font-['Amble']">
                This month March 2025
            </p>
        </article>
    );
}

export default MetricCard;
