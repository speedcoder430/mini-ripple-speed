import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const PricingHeroSection = () => {
    return (
        <section className="flex overflow-hidden flex-col px-0 md:px-20 py-24 mt-[44px] md:mt-[72px] lg:mt-[128px] w-full max-w-[1368px] rounded-none md:rounded-[34px] shadow-xl shadow-[#0003] bg-[linear-gradient(199deg,_#3978D7_-7.08%,_#011732_87.63%)] relative z-[30] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col self-center w-full max-w-[1101px] z-20">
                <div className="flex flex-col w-full text-center max-md:max-w-full">
                    <h1 className="md:text-[40px] lg:text-[80px] md:leading-normal lg:leading-[95px] text-slate-50 font-['Anton'] tracking-[1.6px] self-stretch max-md:max-w-full max-md:text-2xl max-md:leading-[32px]" style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        Simple, Affordable, and Powerful Website Protection
                    </h1>
                    <h2 className="self-center mt-7 text-[20px] md:text-2xl lg:text-3xl leading-tight text-blue-200 font-['Jost'] max-md:max-w-full">
                        Experience comprehensive security with our all-in-one plan. Choose between monthly or yearly billing to suit your needs.
                    </h2>
                </div>
                <div className="flex gap-6 items-center self-center mt-11 text-base font-semibold font-['Jost'] leading-none max-md:mt-10">
                    <Link to="/login">
                        <Button variant="blue">Get Started Now</Button>
                    </Link>
                </div>
            </div>
            <div className="absolute top-[-550px] w-[864px] h-[864px] rounded-full bg-[#FFC10780] left-1/2 transform -translate-x-1/2 blur-[120px] z-10"></div>
        </section>
    );
};

export default PricingHeroSection;
