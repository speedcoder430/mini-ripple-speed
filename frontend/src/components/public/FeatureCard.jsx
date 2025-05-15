import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const FeatureCard = ({
    icon,
    title,
    description,
    buttonText = "Free Trial",
    buttonVariant = "primary",
    link,
}) => {
    return (
        <div className="flex flex-col items-center px-5 py-8 rounded-2xl shadow-sm w-[400px] md:w-[300px] lg:w-[397px] font-['Jost']">
            <img
                src={icon}
                className="object-contain max-w-full shadow-2xl aspect-square rounded-[51px] w-[100px]"
                alt={title}
            />
            <div className="self-stretch mt-6 w-full text-center">
                <h3 className="text-2xl font-semibold leading-none text-neutral-50">
                    {title}
                </h3>
                <p className="mt-6 text-base text-slate-400">{description}</p>
            </div>
            <Link to={link} className="flex w-full">
                <Button variant={buttonVariant} className="w-full px-[24px] py-[14px] md:self-stretch mt-6">
                    {buttonText}
                </Button>
            </Link>
        </div>
    );
};

export default FeatureCard;
