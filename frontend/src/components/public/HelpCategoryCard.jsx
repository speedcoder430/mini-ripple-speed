import React from "react";


const HelpCategoryCard = ({ icon, title, description }) => {
    return (
        <article className="flex flex-col items-start p-6 rounded-lg bg-neutral-50 shadow-[0_0_8px_rgba(0,0,0,0.08)] w-[304px] max-md:w-[45%] max-sm:w-full max-sm:max-w-[300px]">
            <figure className="flex justify-center items-center mb-6 h-[70px] w-[70px]">
                <img src={icon} alt={`${title} Icon`} />
            </figure>
            <h3 className="mb-2 text-3xl leading-9 text-slate-900 font-['Amble'] font-bold tracking-[-1.5px]">
                {title}
            </h3>
            <p className="text-sm leading-5 text-neutral-600">{description}</p>
        </article>
    );
};

export default HelpCategoryCard;
