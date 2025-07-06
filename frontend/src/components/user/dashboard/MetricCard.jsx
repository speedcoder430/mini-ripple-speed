import React from "react";

// Helper to get current month/year in "Month YYYY" format
const getCurrentMonthYear = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "long", year: "numeric" });
};

function MetricCard({
    title = "Untitled Metric",
    icon = "",
    value = "—",
    change = "—",
    changeIcon = "",
    changeType = "neutral",
    bgColor = "bg-gray-100 border-gray-200 border-2",
}) {
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
                return "text-slate-500 bg-slate-200";
        }
    };

    return (
        <article
            className={`flex flex-col flex-1 shrink self-stretch p-5 my-auto ${bgColor} rounded-lg shadow-sm basis-0 lg:min-w-[320px] xl:min-w-[320px] 2xl:min-w-[200px]`}
        >
            <div className="flex gap-2.5 items-center self-start text-base text-slate-900">
                {icon && (
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className="w-5 aspect-square object-contain shrink-0"
                    />
                )}
                <span className="font-semibold">{title}</span>
            </div>

            <div className="flex gap-6 items-center mt-5 w-full whitespace-nowrap">
                <span className="flex-1 text-2xl font-semibold text-slate-900">
                    {value}
                </span>
                <div
                    className={`flex gap-1 items-center px-1.5 py-1 text-sm rounded-sm ${getChangeClasses()}`}
                >
                    <span>{change}</span>
                    {changeIcon && (
                        <img
                            src={changeIcon}
                            alt="Change indicator"
                            className="w-[18px] aspect-square object-contain"
                        />
                    )}
                </div>
            </div>

            <p className="mt-5 text-sm text-slate-700">
                This month {getCurrentMonthYear()}
            </p>
        </article>
    );
}

export default MetricCard;
