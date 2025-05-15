import React, { useState, useEffect } from "react";
import FaqItem from "./FaqItem";
import Button from "./Button";
import { Link } from "react-router-dom";

const faqData = [
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes, no long-term commitment!",
    },
    {
        question: "What happens if I need help integrating?",
        answer:
            "You can purchase our $20 setup service.",
    },
    {
        question: "Do you offer refunds?",
        answer:
            "Refund policy details.",
    },
];

const PricingFaqSection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <section id="faq" className={`flex relative flex-col items-center px-6 md:px-0 pt-[480px] pb-40 bg-blue-700 bg-opacity-20 top-[-140px] max-md:pt-[200px] max-md:max-w-full`} style={{ width: width }}>

            <div className="max-w-full mt-24 md:mt-3 text-center w-[717px] z-10">
                <h3 className="text-[40px] leading-none text-yellow-400 font-['Anton'] mb-6 max-md:max-w-full">
                    FAQs
                </h3>
                <h2 className="mt-4 text-[16px] font-['Jost'] md:font-['Jost'] tracking-normal md:tracking-wider font-semibold md:font-normal text-neutral-50 max-md:max-w-full">
                    Here are answers to some common questions about our pricing and services.
                </h2>
            </div>

            <div className="mt-16 max-w-full w-[818px] z-10 px-0 md:px-6 max-md:mt-10">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <div className="max-w-full mt-24 md:mt-3 text-center w-[717px] z-10 pt-[48px]">
                <h3 className="text-[24px] leading-none text-yellow-400 font-['Jost'] font-semibold mb-6 max-md:max-w-full">
                    Still have questions?
                </h3>
                <h2 className="mt-4 text-[16px] font-['Jost'] md:font-['Jost'] tracking-normal md:tracking-wider font-semibold md:font-normal text-neutral-50 max-md:max-w-full">
                    Reach out to our support team anytime!
                </h2>
                <Link to="/support">
                    <Button variant="primary" className="text-[16px] px-[24px] py-[14px] md:self-stretch mt-6 font-semibold">
                        Contact Us
                    </Button>
                </Link>
            </div>
            <div className="absolute left-[-450px] top-[700px] z-[0]">
                <div className="w-[684px] h-[684px] flex-shrink-0 rounded-[684px] bg-[rgba(25,118,210,0.5)] blur-[250px] z-[0]"></div>
            </div>
            <div className="absolute right-0 top-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="1373" height="1746" viewBox="0 0 1373 1746" fill="none">
                    <g filter="url(#filter0_f_1_2648)">
                        <path d="M1373 1245V501.17C1373 500.316 1372 499.855 1371.35 500.41L501.059 1244.24C500.353 1244.84 500.78 1246 501.709 1246H1372C1372.55 1246 1373 1245.55 1373 1245Z" fill="black" fillOpacity="0.5" />
                    </g>
                    <defs>
                        <filter id="filter0_f_1_2648" x="0.707031" y="0.168457" width="1872.29" height="1745.83" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_1_2648" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </section>
    );
};

export default PricingFaqSection;
