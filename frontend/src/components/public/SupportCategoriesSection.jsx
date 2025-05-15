import React, { useState, useEffect } from "react";
import Button from "./Button";
import SupportHelpCategorySection from "./SupportHelpCategorySection";

const SupportCategoriesSection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full flex justify-center xl:pt-10 md:pt-0">
            <section className="max-w-full relative flex flex-col items-start justify-center sm:mb-64 md:mt-20 lg:mt-8 xl:mt-32 px-4 md:px-0 z-[30] max-md:mt-20">
                <div className="flex flex-wrap lg:flex-col xl:flex-row gap-6 items-center justify-start xl:justify-between lg:px-0 mt-6 max-md:w-full xl:max-w-[1241px] z-[20]">
                    <div className="flex flex-col items-start justify-start xl:justify-between w-full xl:w-[530px]">
                        <p className="self-stretch font-['Jost'] text-2xl font-semibold leading-relaxed text-[#234BAA]">
                            Support
                        </p>
                        <h2 className="font-['Amble'] lg:font-['Anton'] text-[30px] lg:text-[40px] font-bold lg:font-normal tracking-[-1.5px] lg:tracking-[0.78px] text-[#011732] py-[14px]">
                            Explore Our Support Categories for Quick Solutions
                        </h2>
                        <p className="font-['Jost'] text-[16px] text-[#4F4F4F]">
                            We understand that getting started can be challenging. Our support categories are designed to help you navigate common issues with ease.                        </p>
                        <div className="flex flex-col justify-start self-stretch font-['Jost'] text-2xl font-bold leading-[28px] text-[#4F4F4F]">
                            <div className="flex flex-row items-center py-[14px]">
                                <Button variant="primary" className="mr-6">Explore</Button>
                                <Button variant="secondary">Learn More</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex relative w-full xl:w-[680px] md:h-[545px] flex-shrink-0 justify-center items-center rounded-[8px]">
                        <SupportHelpCategorySection />
                    </div>
                </div>
            </section>
            <div className="absolute top-[-220px] md:top-[-260px] lg:top-[-260px] z-[20]">
                <div className="hidden w-full xl:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1220" viewBox={`0 0 ${width} 1220`} fill="none">
                        <path d={`M${width} 0C1099.5 539.574 523.5 76.5275 0 343.265V1205.03C688.5 812.411 965 1509.48 ${width} 1066.39V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="hidden w-full lg:block xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1420" viewBox={`0 0 ${width} 1420`} fill="none">
                        <path d={`M${width} 0C1099.5 539.574 523.5 76.5275 0 343.265V1305.03C688.5 912.411 965 1609.48 ${width} 1166.39V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1462" viewBox={`0 0 ${width} 1462`} fill="none">
                        <path d={`M${width} 0.735352C568.075 540.31 270.475 77.2628 0 344V1446.14C355.725 1053.52 498.583 1750.58 ${width} 1307.5V0.735352Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="hidden w-full sm:block md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1912" viewBox={`0 0 ${width} 1912`} fill="none">
                        <path d={`M${width} 0.735352C568.075 540.31 270.475 77.2628 0 344V1896.14C355.725 1503.52 498.583 2200.58 ${width} 1707.5V0.735352Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="block w-full sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="2003" viewBox={`0 0 ${width} 2003`} fill="none">
                        <path d={`M${width} 0.735352C299.835 518.51 142.235 74.171 -0.999969 330.132V1987.74C187.381 1610.98 263.035 2279.89 ${width} 1854.7V0.735352Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-[-135px] md:top-[-190px] lg:top-[-180px] z-[20]">
                <div className="hidden w-full xl:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1129" viewBox={`0 0 ${width} 1129`} fill="none">
                        <path d={`M${width} 0.5C1003.5 566.2 527 -32.5131 0 257.891V1083.78C685.5 631.667 965 1434.61 ${width} 987.537V0.5Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="hidden w-full lg:block xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1329" viewBox={`0 0 ${width} 1329`} fill="none">
                        <path d={`M${width} 0.5C1003.5 566.2 527 -32.5131 0 257.891V1183.78C685.5 731.667 965 1534.61 ${width} 1087.537V0.5Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1378" viewBox={`0 0 ${width} 1378`} fill="none">
                        <path d={`M${width} 0.609375C518.475 566.309 272.283 -32.4038 0 258V1333C354.175 880.888 498.583 1683.83 ${width} 1236.76V0.609375Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="hidden w-full sm:block md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1828" viewBox={`0 0 ${width} 1828`} fill="none">
                        <path d={`M${width} 0.609375C518.475 566.309 272.283 -32.4038 0 258V1783C354.175 1330.888 498.583 2133.83 ${width} 1686.76V0.609375Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="block w-full sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1919" viewBox={`0 0 ${width} 1919`} fill="none">
                        <path d={`M${width} 0.609375C273.569 542.066 143.193 -30.989 -0.999969 246.97V1875.9C186.56 1443.164 263.035 2211.7 ${width} 1783.78V0.609375Z`} fill="#FAFAFA" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SupportCategoriesSection;
