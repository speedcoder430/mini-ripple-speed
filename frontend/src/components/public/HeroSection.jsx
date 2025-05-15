import React from "react";
import Button from "./Button";
import MetricsCard from "./MetricsCard";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="flex overflow-hidden flex-col px-0 md:px-20 pt-24 mt-[44px] md:mt-[72px] lg:mt-[128px] w-full max-w-[1368px] rounded-none md:rounded-[34px] shadow-xl shadow-[#0003] bg-[linear-gradient(199deg,_#3978D7_-7.08%,_#011732_87.63%)] relative z-[3] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col self-center w-full max-w-[1101px] z-20">
                <div className="flex flex-col w-full text-center max-md:max-w-full">
                    <h1 className="md:text-[40px] lg:text-[80px] md:leading-normal lg:leading-[95px] text-slate-50 font-['Anton'] tracking-[1.6px] self-stretch max-md:max-w-full max-md:text-2xl max-md:leading-[32px]" style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        Stop Unwanted Traffic in Its Tracks
                    </h1>
                    <h2 className="self-center mt-7 text-[20px] md:text-2xl lg:text-3xl leading-tight text-blue-200 font-['Jost'] max-md:max-w-full">
                        Advanced IP, VPN, Device & Browser Blocking SaaS
                    </h2>
                </div>
                <div className="flex gap-6 items-center self-center mt-11 text-base font-semibold font-['Jost'] leading-none max-md:mt-10">
                    <Link to="/dashboard">
                        <Button variant="blue">Get Started Free</Button>
                    </Link>
                    <Link to="/demo">
                        <Button variant="secondary">View Demo</Button>
                    </Link>
                </div>
            </div>
            <div className="flex md:self-end justify-center mt-3 w-full max-w-[1141px] mr-4 xl:justify-start max-md:mt-10 max-md:max-w-full">
                <div className="hidden relative flex-col items-start self-end pt-12 pb-28 mt-36 aspect-[0.696] w-[172px] md:hidden lg:hidden xl:flex max-md:pb-24 max-md:mt-10 max-md:-mr-2">
                    <img
                        src="/landing/hero-section-1.png"
                        className="object-cover absolute inset-0 size-full z-[5]"
                        alt="Background"
                    />
                    <MetricsCard
                        title="Total Visits"
                        value="1674"
                        percentageChange="4.3%"
                        timeframe="From Jan 01, 2025 - Mar 31, 2025"
                        icon="/landing/hero-section-2.svg"
                        className="absolute"
                        borderColor="z-[10] absolute w-[195px] left-[-12px] top-[52px] shadow-xl shadow-[#0003]"
                    />
                </div>
                <div className="flex relative flex-col px-12 pb-48 items-center md:items-start min-h-[240px] md:min-h-[450px] min-w-[425px] md:min-w-[737px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
                    <img
                        src="/landing/Dashboard-laptop-1.png"
                        className="object-contain absolute inset-0 size-full min-h-[280px] md:min-h-[517px]"
                        alt="Background"
                    />
                    <div className="flex absolute top-[55px] md:top-[135px] left-[-100px] sm:left-[50px] scale-[52%] md:scale-100 gap-3.5 items-center py-5 pr-4 pl-5 rounded-2xl bg-neutral-50 shadow-xl shadow-[#0003]">
                        <MetricsCard
                            title="Active Users"
                            value="3500"
                            percentageChange="5.2%"
                            percentageType="increase"
                            timeframe="This month March 2025"
                            bgColor="bg-teal-100"
                            borderColor="border-[#A7F3DB]"
                            textColor="text-emerald-600"
                            bgPercentage="bg-emerald-200"
                            icon="/landing/hero-section-3.svg"
                            className="flex-1 shrink self-stretch p-3 my-auto w-[111.225px]"
                        />
                        <MetricsCard
                            title="VPN Users"
                            value="234"
                            percentageChange="4.0%"
                            percentageType="increase"
                            timeframe="This month March 2025"
                            bgColor="bg-blue-100"
                            borderColor="border-[#C6E0F7]"
                            textColor="text-blue-500"
                            bgPercentage="bg-blue-200"
                            icon="/landing/hero-section-4.svg"
                            className="flex-1 shrink self-stretch p-3 my-auto w-[111.225px]"
                        />
                        <MetricsCard
                            title="Repeated Visitors"
                            value="285"
                            percentageChange="4.3%"
                            percentageType="increase"
                            timeframe="This month March 2025"
                            bgColor="bg-yellow-100"
                            borderColor="border-[#FFF885]"
                            textColor="text-amber-500"
                            bgPercentage="bg-yellow-200"
                            icon="/landing/hero-section-5.svg"
                            className="grow shrink self-stretch p-3 my-auto w-[111.225px]"
                        />
                        <MetricsCard
                            title="Bots Detected"
                            value="674"
                            percentageChange="4.3%"
                            percentageType="decrease"
                            timeframe="This month March 2025"
                            bgColor="bg-red-100"
                            borderColor="border-[#FBCDCD]"
                            textColor="text-red-600"
                            bgPercentage="bg-red-200"
                            icon="/landing/hero-section-6.svg"
                            className="flex-1 shrink self-stretch p-3 my-auto w-[111.225px]"
                        />
                        <MetricsCard
                            title="Most Used Browser"
                            value="8"
                            percentageChange="4.3%"
                            percentageType="increase"
                            timeframe="This month March 2025"
                            bgColor="bg-violet-100"
                            borderColor="border-[#E2D6FE]"
                            textColor="text-violet-600"
                            bgPercentage="bg-violet-200"
                            icon="/landing/hero-section-7.svg"
                            className="grow shrink self-stretch py-3 pr-2.5 pl-3 my-auto w-[111.225px]"
                        />
                    </div>
                </div>
                <img
                    src="/landing/hero-section-8.png"
                    className="absolute hidden object-contain shrink-0 self-start mt-36 max-w-full aspect-[1.15] w-[320px] z-20 right-[70px] bottom-[-25px] max-md:mt-10 md:hidden lg:hidden xl:block"
                    alt="Illustration"
                />
            </div>
            <div className="absolute top-[-550px] w-[864px] h-[864px] rounded-full bg-[#01173280] left-1/2 transform -translate-x-1/2 blur-[120px] z-10"></div>
        </section>
    );
};

export default HeroSection;
