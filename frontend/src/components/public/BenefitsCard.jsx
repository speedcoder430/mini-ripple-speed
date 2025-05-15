import React from "react";

const BenefitCard = ({ icon, title, content, className = "" }) => {
    return (
        <div
            className={`group relative overflow-hidden flex flex-col justify-center items-center py-16 rounded-2xl z-[50] bg-neutral-50 min-w-[60%] md:min-w-72 lg:min-w-72 transition-all duration-500 ease-in-out cursor-default group-hover:shadow-[0_0_20px_2px_rgba(255,193,7,0.5)] ${className}`}
        >
            {/* Image and Title */}
            <div className="flex flex-col items-center px-4 pt-6 pb-7 transform transition-all duration-500 ease-in-out group-hover:-translate-y-20">
                <img
                    src={icon}
                    className="object-contain self-center max-w-full aspect-square w-[100px]"
                    alt={title}
                />
                <h3 className="mt-6 text-xl font-bold font-['Amble'] tracking-tight leading-tight text-center text-slate-900">
                    {title}
                </h3>
            </div>

            {/* Content */}
            <div
                className="absolute bottom-10 px-6 text-center font-normal font-['Jost'] text-[17px] opacity-0 translate-y-10 text-white group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-black transition-all duration-700 ease-in-out"
            >
                {content}
            </div>
        </div>
    );
};

export default BenefitCard;
