import React from "react";
import CoreFeatureCard from "./CoreFeatureCard";


const CoreFeaturesSection = () => {
    return (
        <section className="flex flex-col relative self-stretch md:px-20 pt-28 w-full pb-[100px] max-md:px-5 max-md:py-8 max-md:max-w-full">
            <div className="self-center max-w-full text-center w-[717px] z-[10]">
                <h3 className="text-[20px] md:text-2xl font-semibold leading-none text-yellow-400 font-['Jost'] max-md:max-w-full">
                    Core Features
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] tracking-normal md:tracking-[-1.5px] lg:tracking-wider text-blue-100 font-['Jost'] md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal max-md:max-w-full">
                    Advanced Traffic Blocking Capabilities
                </h2>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-start mt-20 mb-0 z-[10] max-md:mt-10 max-md:mb-2.5">
                <CoreFeatureCard
                    title="VPN Detection"
                    description="Identify and block suspicious VPN traffic to prevent fraud, unauthorized access, and bot-driven activities. Our advanced detection system analyzes IP addresses, traffic patterns, and geolocation data in real time to differentiate between legitimate users and those masking their identities through VPNs or proxies."
                    image="/landing/core-features-section-1.png"
                />

                <CoreFeatureCard
                    title="IP Blocking"
                    description="Protect your platform by identifying and blocking malicious IP addresses in real time. Our advanced IP blocking system prevents unauthorized access, bot attacks, fraudulent activities, and spam by restricting traffic from known threat sources, VPNs, proxies, and suspicious regions."
                    image="/landing/core-features-section-2.png"
                />

                <CoreFeatureCard
                    title="Analytics Dashboard"
                    description="Gain deep insights into your traffic and security performance with a powerful, real-time Analytics Dashboard. Track key metrics such as traffic sources, user engagement, bot activity, fraudulent attempts, and blocked threats in an intuitive, easy-to-use interface."
                    image="/landing/core-features-section-3.png"
                />
            </div>
            <div className="absolute w-[677px] h-[84px] flex-shrink-0 rounded-[677px] bg-[rgba(57,120,215,0.5)] blur-[100px] top-[190px] z-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[3077px] h-[380px] flex-shrink-0 bg-[rgba(57,120,215,0.1)] blur-[200px] z-[0] left-[-100] top-[100px]"></div>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#ffc10780] blur-[250px] right-[-400px] top-[-200px] z-[0]"></div>
        </section>
    );
};

export default CoreFeaturesSection;
