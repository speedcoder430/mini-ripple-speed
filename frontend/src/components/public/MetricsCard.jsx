import React from "react";

const MetricsCard = ({
    title,
    value,
    percentageChange,
    percentageType = "increase",
    timeframe,
    bgColor = "bg-violet-100",
    borderColor = "border-[#E2D6FE]",
    textColor = "text-violet-600",
    bgPercentage = "bg-violet-200",
    icon,
}) => {
    return (
        <div
            className={`flex flex-col p-[11px] ${bgColor} rounded border-solid border-[0.597px] w-[110px] ${borderColor}`}
        >
            <div className="flex gap-x-1.5 items-center self-start text-slate-900 mb-2">
                {icon && (
                    <img
                        src={icon}
                        className="object-contain shrink-0 self-stretch w-3 h-3 aspect-square"
                        alt={title}
                    />
                )}
                <div className="self-stretch text-[8.5px] font-['Jost'] font-[400] h-3">{title}</div>
            </div>
            <div className="flex gap-2 items-center mt-1 w-full whitespace-nowrap">
                <div className="flex-1 shrink self-stretch my-auto text-2xl font-['Jost'] font-bold text-[13px] leading-none basis-0 text-slate-900">
                    {value}
                </div>
                {percentageChange && (
                    <div
                        className={`flex gap-0.5 items-center self-stretch py-0.5 px-1 my-auto text-[8px] tracking-tight leading-none ${textColor} ${bgPercentage} rounded-sm`}
                    >
                        <div className="self-stretch my-auto">{percentageChange}</div>
                        <img
                            src={
                                percentageType === "increase"
                                    ? "/metricscard-1.svg"
                                    : "/metricscard-2.svg"
                            }
                            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.91]"
                            alt={percentageType}
                        />
                    </div>
                )}
            </div>
            <div className="mt-2.5 tracking-tight leading-none text-slate-900 text-[8px]">
                {timeframe}
            </div>
        </div>
    );
};

export default MetricsCard;
