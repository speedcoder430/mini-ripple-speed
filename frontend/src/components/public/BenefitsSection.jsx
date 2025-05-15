import React from "react";
import BenefitCard from "./BenefitsCard";

const BenefitsSection = () => {
    return (
        <section className="relative flex flex-col items-center self-stretch md:px-10 lg:px-24 w-full text-center z-[10] max-md:px-5 max-md:max-w-full">
            <div className="max-w-full w-[740px]">
                <h3 className="text-[20px] md:text-2xl font-semibold leading-none text-yellow-400 max-md:max-w-full font-['Amble'] md:font-['Jost']">
                    Who Benefits from MiniRipple?
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] md:tracking-[-1.5px] lg:tracking-wider text-neutral-50 md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal max-md:max-w-full">
                    Powerful Traffic Protection for Any Online Business
                </h2>
                <p className="mt-4 text-base text-neutral-300 font-['Jost'] max-md:max-w-full">
                    MiniRipple is designed to safeguard a variety of industries from
                    online threats
                </p>
            </div>

            <div className="mt-16 w-full text-xl font-bold tracking-tight leading-tight max-w-[1240px] text-slate-900 z-[10] max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
                    <BenefitCard
                        icon="/landing/benefits-section-1.png"
                        title="SaaS & Tech Platforms"
                        content="Secure user data and prevent automated abuse with advanced encryption, real-time threat detection, and AI-driven security protocols."
                        className="flex-1 shrink w-[234px] md:min-w-[40%]"
                    />
                    <BenefitCard
                        icon="/landing/benefits-section-2.png"
                        title="Media & Publishing"
                        content="Ensure real audience engagement by eliminating bot-driven traffic and guaranteeing that only genuine users interact with your website, app, or ads."
                        className="flex-1 shrink w-[234px] md:min-w-[40%]"
                    />
                    <BenefitCard
                        icon="/landing/benefits-section-3.png"
                        title="Gaming & Streaming"
                        content="Stop bot-driven exploits and ensure fair play by detecting and blocking automated threats in real time. Our advanced security system prevents malicious bots."
                        className="flex-1 shrink w-[234px] md:min-w-[40%]"
                    />
                    <BenefitCard
                        icon="/landing/benefits-section-4.png"
                        title="Marketplaces & Classifieds"
                        content="Stop spam listings, fake reviews, and bot-driven scams with powerful AI-driven detection and real-time filtering. Our advanced algorithms identify and block fraudulent content."
                        className="flex-1 shrink w-[234px] md:min-w-[40%]"
                    />
                </div>

                <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                    <BenefitCard
                        icon="/landing/benefits-section-5.png"
                        title="E-Commerce Stores"
                        content="Prevent fake orders and bot-driven cart manipulation with advanced fraud detection and real-time traffic analysis. Our system identifies and blocks malicious bots that attempt to place fraudulent orders, hoard inventory."
                        className="flex-1 shrink px-14 basis-0 max-md:px-5 md:min-w-[40%]"
                    />
                    <BenefitCard
                        icon="/landing/benefits-section-6.png"
                        title="Media & Publishing"
                        content="Ensure real audience engagement by eliminating bot-driven traffic and guaranteeing that every interaction on your platform comes from genuine users. Our advanced AI-powered detection system analyzes traffic ."
                        className="flex-1 shrink px-14 basis-0 max-md:px-5"
                    />
                    <BenefitCard
                        icon="/landing/benefits-section-7.png"
                        title="Digital Advertisers"
                        content="ad spend efficiency by detecting and blocking invalid traffic from bots, click farms, and fraudulent sources in real time. Our advanced AI-driven system analyzes user behavior, identifies suspicious activity."
                        className="flex-1 shrink px-14 basis-0 max-md:px-5"
                    />
                </div>
            </div>
            <div className="absolute w-[800px] h-[60px] flex-shrink-0 rounded-[677px] bg-[rgba(57,120,215,0.5)] blur-[100px] top-[120px] z-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </section>
    );
};

export default BenefitsSection;
