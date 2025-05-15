import React, { useState, useEffect } from "react";
import FaqItem from "./FaqItem";

const faqData = [
    {
        question: "What is MiniRipple?",
        answer:
            "MiniRipple is an advanced security solution that protects your digital assets from malicious traffic, bots, and click fraud. It uses sophisticated algorithms to detect and block unwanted visitors in real-time.",
    },
    {
        question: "How does MiniRipple detect fraudulent activity?",
        answer:
            "MiniRipple uses a combination of machine learning, behavioral analysis, and pattern recognition to identify suspicious traffic. It analyzes IP addresses, browser fingerprints, user behavior, and other signals to detect bots and fraudulent activities.",
    },
    {
        question: "Is MiniRipple easy to integrate?",
        answer:
            "Yes! MiniRipple is designed for simple integration with just a few lines of code. Most websites can be protected in minutes with our straightforward implementation process.",
    },
    {
        question: "Can MiniRipple protect my ad campaigns from click fraud?",
        answer:
            "Absolutely. MiniRipple specializes in detecting and preventing click fraud, helping you save your advertising budget by ensuring only legitimate users interact with your ads.",
    },
    {
        question: "Will MiniRipple slow down my website?",
        answer:
            "No, MiniRipple is optimized for performance and operates with minimal impact on your website's loading speed. Our lightweight solution works in the background without affecting user experience.",
    },
    {
        question: "Does MiniRipple provide real-time analytics?",
        answer:
            "Yes, MiniRipple offers a comprehensive dashboard with real-time analytics on traffic patterns, blocked threats, and security incidents, giving you complete visibility into your protection status.",
    },
    {
        question: "What industries benefit from MiniRipple?",
        answer:
            "MiniRipple is valuable for any online business, but particularly benefits e-commerce, SaaS platforms, digital advertising, media sites, gaming, and marketplaces that need protection from bots and fraudulent traffic.",
    },
    {
        question: "Can I customize MiniRipple's security settings?",
        answer:
            "Yes, MiniRipple offers flexible configuration options that allow you to customize protection levels, whitelist trusted sources, and set specific rules based on your business needs.",
    },
    {
        question: "Do I need technical expertise to use MiniRipple?",
        answer:
            "No technical expertise is required. While MiniRipple offers advanced features for developers, its user-friendly interface makes it accessible to users of all technical levels.",
    },
    {
        question: "Is there a free trial available?",
        answer:
            "Yes, we offer a free trial so you can experience MiniRipple's protection capabilities before committing to a subscription. Sign up on our website to get started.",
    },
];

const FaqSection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <section id="faq" className={`flex relative flex-col items-center px-6 md:px-0 pt-60 pb-24 bg-blue-700 bg-opacity-20 top-[-140px] max-md:pt-24 max-md:max-w-full`} style={{width: width}}>
            <div className="flex absolute inset-x-0 z-0 self-start w-full rounded-[100%] bg-neutral-50 h-[203px] md:h-[250px] lg:h-[356px] shadow-[0_20px_18px_-2px_rgba(0,0,0,0.2)] top-[-100px] md:top-[-100px] lg:top-[-210px] max-md:max-w-full" />

            <div className="max-w-full mt-24 md:mt-3 text-center w-[717px] z-10">
                <h3 className="text-2xl font-semibold leading-none text-yellow-400 font-['Jost'] max-md:max-w-full">
                    Frequently Asked Questions
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[40px] font-['Jost'] md:font-['Anton'] tracking-normal md:tracking-wider font-semibold md:font-normal text-neutral-50 max-md:max-w-full">
                    Your Top Questions Answered
                </h2>
            </div>

            <div className="mt-16 max-w-full w-[818px] z-10 px-0 md:px-6 max-md:mt-10">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <div className="absolute right-[-50px] top-[-100px] z-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="1043" height="1746" viewBox="0 0 1043 1746" fill="none" >
                    <g filter="url(#filter0_f_1_1605)">
                        <path d="M1373 1245V501.17C1373 500.316 1372 499.855 1371.35 500.41L501.059 1244.24C500.353 1244.84 500.78 1246 501.709 1246H1372C1372.55 1246 1373 1245.55 1373 1245Z" fill="#FFC107" fillOpacity="0.2" />
                    </g>
                    <defs>
                        <filter id="filter0_f_1_1605" x="0.707031" y="0.168213" width="1872.29" height="1745.83" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_1_1605" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </section>
    );
};

export default FaqSection;
