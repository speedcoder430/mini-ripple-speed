import React from "react";
import CheckItem from "./CheckItem";

function PlanCard({ planName, features, price, buttonText }) {
    return (
        <article className="flex flex-wrap flex-1 gap-10 justify-between items-end p-6 my-auto rounded-lg shadow-sm bg-neutral-50 h-[190px] font-['Jost'] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col my-auto text-base w-[154px]">
                <span className="gap-2.5 self-start px-3 py-1.5 font-semibold leading-none rounded bg-slate-900 text-neutral-50">
                    {planName}
                </span>
                <div className="flex flex-col items-start mt-3 w-full text-slate-900">
                    {features.map((feature, index) => (
                        <CheckItem key={index} text={feature} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col font-semibold w-[155px]">
                <div className="flex items-start self-end text-2xl leading-none whitespace-nowrap text-zinc-600 font-['Jost']">
                    <span className="py-3 text-zinc-600 w-[15px]">
                        $
                    </span>
                    <span className="text-7xl tracking-widest leading-none text-slate-900 font-['Anton'] max-md:text-4xl">
                        {price}
                    </span>
                    <span className="gap-2.5 self-stretch py-3 text-zinc-600">
                        /mo
                    </span>
                </div>
                <button className="gap-2.5 self-stretch px-6 py-3.5 w-full text-base leading-none rounded-md bg-slate-900 mt-3 text-neutral-50 max-md:px-5">
                    {buttonText}
                </button>
            </div>
        </article>
    );
}

export default PlanCard;
