import React from "react";

const CoreFeatureCard = ({
    title,
    description,
    image,
    isImageTable = false,
}) => {
    return (
        <div className="flex flex-col flex-1 shrink items-center px-8 text-center basis-0 min-w-[60%] md:min-w-80 lg:min-w-60 max-md:px-0">
            {isImageTable ? (
                <div className="max-w-full text-sm leading-none shadow-[0px_26px_26px_rgba(0,0,0,0.25)] text-zinc-600 w-[242px]">
                    {image}
                </div>
            ) : (
                <img
                    src={image}
                    className="object-contain max-w-full aspect-[1.61] w-[300px]"
                    alt={title}
                />
            )}
            <h3
                className={`gap-2.5 self-stretch mt-4 text-xl font-bold font-['Amble'] tracking-tight leading-tight text-yellow-400 rounded-lg ${isImageTable ? "text-center" : ""}`}
            >
                {title}
            </h3>
            <p
                className={`self-stretch mt-6 text-base text-neutral-300 font-['Jost'] ${isImageTable ? "text-center" : ""}`}
            >
                {description}
            </p>
        </div>
    );
};

export default CoreFeatureCard;
