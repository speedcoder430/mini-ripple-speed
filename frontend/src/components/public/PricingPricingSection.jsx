import React, { useState } from "react";
import Button from "./Button";

const PricingPricingSection = () => {
    const [selectedPlan, setSelectedPlan] = useState("monthly");

    return (
        <section id="pricing" className="flex relative z-10 flex-col justify-center self-stretch md:p-2.5 pt-2 md:pt-32 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-center md:px-24 pb-8 w-full max-md:px-2 max-md:max-w-full">
                <div className="max-w-full text-center w-[717px]">
                    <h3 className="text-2xl font-semibold leading-none text-yellow-400 font-['Jost'] max-md:max-w-full">
                        Affordable
                    </h3>
                    <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] tracking-normal md:tracking-[-1.5px] lg:tracking-wider text-neutral-50 font-['Jost'] md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal space-[0.8px] max-md:max-w-full">
                        Pricing Plans
                    </h2>
                    <p className="text-[#D2D2D2] text-center font-['Jost'] text-[16px] mt-4">
                        Choose the best plan for your website's security.
                    </p>
                </div>

                <div className="overflow-hidden md:px-8 lg:px-20 pb-16 mt-16 max-w-full w-[598px] z-[10] max-md:px-5 max-md:mt-10">
                    <div className="flex flex-col items-center justify-center max-md:max-w-full">
                        <div className="flex gap-6 items-center justify-center p-3 text-base font-semibold leading-none rounded-2xl bg-blue-700 bg-opacity-20 font-['Jost'] max-md:max-w-[345px]">
                            <Button
                                onClick={() => setSelectedPlan("monthly")}
                                variant={selectedPlan === "monthly" ? "primary" : "secondary"}
                            >
                                Monthly Membership
                            </Button>
                            <Button
                                onClick={() => setSelectedPlan("yearly")}
                                variant={selectedPlan === "yearly" ? "primary" : "secondary"}
                            >
                                Yearly Membership
                            </Button>
                        </div>

                        {/* Plan Card */}
                        <div className={`flex flex-col p-6 mt-6 ${selectedPlan === "monthly" ? "mb-[62px]" : "mb-0"} w-full rounded-2xl border border-solid border-[#C6E0F7] shadow-[0_15px_20px_-2px_rgba(0,0,0,0.4)] text-slate-900 bg-neutral-50 max-md:px-5 max-md:max-w-full`}>
                            <h3 className="text-xl font-bold font-['Amble'] tracking-tight leading-tight">
                                {selectedPlan === "monthly" ? "MiniRipple Protection Plan" : "MiniRipple Protection Plan"}
                            </h3>

                            <div className="flex flex-col self-start mt-5 text-zinc-600">
                                <div className="flex items-center self-start text-2xl font-semibold font-['Jost'] leading-none whitespace-nowrap">
                                    <div className="self-stretch my-auto w-[15px]">$</div>
                                    <div className="self-stretch my-auto text-4xl font-['Anton'] tracking-wider text-slate-900">
                                        {selectedPlan === "monthly" ? "12" : "59"}
                                    </div>
                                    <div className="gap-2.5 self-stretch my-auto">/{selectedPlan === "monthly" ? "mo" : "yr"}</div>
                                </div>
                                <div className="mt-5 text-base font-['Jost']">
                                    {selectedPlan === "monthly"
                                        ? ""
                                        : "Save 10%"}
                                </div>
                            </div>

                            <div className="flex flex-col items-start mt-5 w-full text-base font-medium font-['Jost']">
                                <div className="flex gap-1.5 items-center">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "Full Website Security & Traffic Control" : "Full Website Security & Traffic Control"}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 items-center mt-3.5">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "Block Bots, VPNs, and Suspicious Traffic" : "Block Bots, VPNs, and Suspicious Traffic"}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 items-center mt-3.5">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "Real-Time Analytics & Insights" : "Real-Time Analytics & Insights"}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 items-center mt-3.5">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "Country, Device & Browser Filtering" : "Country, Device & Browser Filtering"}
                                    </div>
                                </div>
                                {selectedPlan === "monthly" ? (<></>) : (

                                    <div className="flex gap-1.5 items-center mt-3.5">
                                        <img
                                            src="/landing/pricing-section.svg"
                                            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                            alt="Check"
                                        />
                                        <div className="self-stretch my-auto">
                                            One-Time Purchase, Lifetime Protection
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="dark"
                                className="self-stretch mt-5 max-w-full w-[145px] font-['Jost'] font-semibold"
                            >
                                {selectedPlan === "monthly" ? "Get Started" : "Start Free Trial"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-[677px] h-[84px] flex-shrink-0 rounded-[677px] bg-[rgba(57,120,215,0.5)] blur-[100px] top-[190px] z-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[684px] h-[684px] rounded-full flex-shrink-0 z-[0] left-[-40px] top-[-460px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="865" height="1746" viewBox="0 0 865 1746" fill="none">
                    <g filter="url(#filter0_f_1_2621)">
                        <path d="M-508 1245V501.17C-508 500.316 -506.999 499.855 -506.35 500.41L363.941 1244.24C364.647 1244.84 364.22 1246 363.291 1246H-507C-507.552 1246 -508 1245.55 -508 1245Z" fill="#FFC107" fillOpacity="0.5" />
                    </g>
                    <defs>
                        <filter id="filter0_f_1_2621" x="-1008" y="0.168457" width="1872.29" height="1745.83" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_1_2621" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#1976D280] blur-[250px] right-[-400px] top-[-200px] z-[0]"></div>
        </section>
    );
};

export default PricingPricingSection;
