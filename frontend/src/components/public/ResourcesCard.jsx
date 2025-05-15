import React from "react";

const ResourcesCard = ({
    image,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col flex-1 shrink items-center px-8 basis-0 min-w-[60%] md:min-w-80 lg:min-w-60 max-md:px-0">
            <article className="p-6 rounded-lg shadow-sm bg-neutral-50 max-w-[397px]">
                <img
                    src={image}
                    className="object-contain aspect-square w-[70px]"
                    alt="MiniRipple support"
                />
                <h2 className="mt-6 text-3xl font-bold tracking-tighter leading-9 text-slate-900">
                    {title}
                </h2>
                <p className="mt-6 text-sm tracking-tight leading-none text-neutral-600">
                    {description}
                </p>
            </article>
        </div>
    );
};

export default ResourcesCard;
