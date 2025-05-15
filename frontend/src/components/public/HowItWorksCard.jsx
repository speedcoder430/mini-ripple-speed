import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const HowItWorksCard = ({
    title,
    description,
    chartComponent,
    buttonText = "View Demo",
}) => {
    return (
        <div className="flex flex-col flex-1 items-start shrink p-3 md:p-6 basis-0 min-w-[300px] max-w-[380px] md:min-w-80 lg:min-w-60 md:min-h-[580px] max-md:px-5">
            <div className="flex overflow-hidden flex-col self-center max-w-full text-sm tracking-tight leading-none rounded-md shadow-xl min-h-[200px] w-[220px]">
                {chartComponent}
            </div>
            <div className="flex flex-col mt-6 w-full text-base text-slate-900">
                <h3 className="text-xl font-bold tracking-tight leading-tight text-center font-['Amble']">
                    {title}
                </h3>
                <p className="mt-6 text-center text-neutral-600 font-['Jost']">{description}</p>
                <Link to="/dashboard" className="flex w-full justify-center">
                    <Button variant="primary" className="self-center mt-6 font-['Jost']">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HowItWorksCard;
