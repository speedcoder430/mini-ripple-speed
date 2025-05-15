import React from "react";

function InfoCard({ imageSrc, title, description }) {
    return (
        <article className="flex-1 shrink rounded-lg py-[16px] pr-[24px] basis-0 min-w-60 font-['Jost']">
            <img
                src={imageSrc}
                className="object-contain aspect-square w-[50px]"
                alt={title}
            />
            <h2 className="mt-4 text-2xl font-semibold leading-none text-yellow-400">
                {title}
            </h2>
            <p className="mt-4 text-base text-slate-400">{description}</p>
        </article>
    );
}

export default InfoCard;
