import React, { useState } from "react";
import Button from "./Button";

const PricingSection = () => {
    const [selectedPlan, setSelectedPlan] = useState("monthly");

    return (
        <section id="pricing" className="flex z-10 flex-col justify-center self-stretch md:p-2.5 pt-2 md:pt-32 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-center md:px-24 pb-8 w-full max-md:px-2 max-md:max-w-full">
                <div className="max-w-full text-center w-[717px]">
                    <h3 className="text-2xl font-semibold leading-none text-yellow-400 font-['Jost'] max-md:max-w-full">
                        Flexible Pricing
                    </h3>
                    <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] tracking-normal md:tracking-[-1.5px] lg:tracking-wider text-neutral-50 font-['Jost'] md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal space-[0.8px] max-md:max-w-full">
                        Pro-Level Protection for Only $00/Year
                    </h2>
                </div>

                <div className="overflow-hidden md:px-8 lg:px-20 pb-16 mt-16 max-w-full w-[598px] max-md:px-5 max-md:mt-10">
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
                        <div className="flex flex-col p-6 mt-6 w-full rounded-2xl border border-solid border-[#C6E0F7] shadow-[0_15px_20px_-2px_rgba(0,0,0,0.4)] text-slate-900 bg-neutral-50 max-md:px-5 max-md:max-w-full">
                            <h3 className="text-xl font-bold font-['Amble'] tracking-tight leading-tight">
                                {selectedPlan === "monthly" ? "Starter Plan" : "Pro Plan"}
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
                                        ? "Perfect for small projects"
                                        : "For growing businesses"}
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
                                        {selectedPlan === "monthly" ? "10K monthly events" : "100K monthly events"}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 items-center mt-3.5">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "Basic analytics" : "Advanced analytics"}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 items-center mt-3.5">
                                    <img
                                        src="/landing/pricing-section.svg"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                        alt="Check"
                                    />
                                    <div className="self-stretch my-auto">
                                        {selectedPlan === "monthly" ? "1 website" : "5 websites"}
                                    </div>
                                </div>
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
        </section>
    );
};

export default PricingSection;
