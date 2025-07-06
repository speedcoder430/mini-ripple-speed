import React, { useState, useEffect } from "react";

const PricingSecuritySection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full flex items- justify-center pt-10 md:pt-0">
            <section className="max-w-full relative flex flex-col items-center justify-center mt-32 px-4 md:px-0 z-[30] max-md:mt-10">

                <div className="flex flex-wrap gap-6 items-center justify-between md:px-32 lg:px-0 mt-6 max-w-[1241px] max-md:max-w-full z-[20]">
                    <div className="flex flex-col items-start justify-between md:w-[530px] lg:w-[420px] xl:w-[530px]">
                        <p className="self-stretch font-['Jost'] text-2xl font-semibold leading-relaxed text-[#234BAA]">
                            Security
                        </p>
                        <h2 className="font-['Amble'] lg:font-['Anton'] text-[30px] lg:text-[40px] font-bold lg:font-normal tracking-[-1.5px] lg:tracking-[0.78px] text-[#011732] py-[14px]">
                            Why Choose MiniRipple for Your Protection?
                        </h2>
                        <p className="font-['Jost'] text-[16px] text-[#4F4F4F]">
                            Experience peace of mind with our transparent pricing. Choose the plan that fits your needs without any hidden fees.
                        </p>
                        <div className="flex flex-col justify-start self-stretch font-['Jost'] text-2xl font-bold leading-[28px] text-[#4F4F4F]">
                            <div className="flex flex-col md:flex-row md:items-center py-[14px]">
                                <div className="border-l-[3px] md:w-[50%] border-[#FBD020] px-6 md:mr-6 mb-4 md:mb-0 py-[10px]">
                                    No Hidden Fees. No Surprises. Just Security.
                                </div>
                                <div className="border-l-[3px] md:w-[50%] border-[#FBD020] px-6 py-[10px]">
                                    Pay Monthly or Yearly – You Decide.
                                </div>
                            </div>
                            <div className="border-l-[3px] border-[#FBD020] px-6 py-[10px]">
                                One-Time Setup Help Available for $20.
                            </div>
                        </div>
                    </div>
                    <div className="flex relative w-full md:w-[621px] lg:w-[420px] xl:w-[621px] h-[430px] md:h-[545px] md:pr-[70px] md:pl-[71px] lg:pr-0 lg:pl-0 xl:pr-[70px] xl:pl-[71px] flex-shrink-0 justify-center items-end rounded-[8px] bg-[#FAFAFA] border-2 border-[#FBD020]">
                        <img src="/landing/pricing-pricing-security-section.png" alt="Security" className="w-[380px] h-[475px] md:w-[480px] md:h-[600px] pt-4 flex-shrink-0 aspect-[4/5] bg-center bg-cover bg-no-repeat" />
                    </div>
                </div>
            </section>
            <div className="absolute top-[-220px] md:top-[-160px] lg:top-[-260px]">
                <div className="hidden w-full lg:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1220" viewBox={`0 0 ${width} 1220`} fill="none">
                        <path d={`M${width} 0C1099.5 539.574 523.5 76.5275 0 343.265V1205.03C688.5 812.411 965 1509.48 ${width} 1066.39V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1462" viewBox={`0 0 ${width} 1462`} fill="none">
                        <path d={`M${width} 0.735352C568.075 540.31 270.475 77.2628 0 344V1446.14C355.725 1053.52 498.583 1750.58 ${width} 1307.5V0.735352Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="block w-full md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1403" viewBox={`0 0 ${width} 1403`} fill="none">
                        <path d={`M${width} 0.735352C299.835 518.51 142.235 74.171 -0.999969 330.132V1387.74C187.381 1010.98 263.035 1679.89 ${width} 1254.7V0.735352Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-[-135px] md:top-[-90px] lg:top-[-180px]">
                <div className="hidden w-full lg:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1129" viewBox={`0 0 ${width} 1129`} fill="none">
                        <path d={`M${width} 0.5C1003.5 566.2 527 -32.5131 0 257.891V1083.78C685.5 631.667 965 1434.61 ${width} 987.537V0.5Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1378" viewBox={`0 0 ${width} 1378`} fill="none">
                        <path d={`M${width} 0.609375C518.475 566.309 272.283 -32.4038 0 258V1333C354.175 880.888 498.583 1683.83 ${width} 1236.76V0.609375Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="block w-full md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1319" viewBox={`0 0 ${width} 1319`} fill="none">
                        <path d={`M${width} 0.609375C273.569 542.066 143.193 -30.989 -0.999969 246.97V1275.9C186.56 843.164 263.035 1611.7 ${width} 1183.78V0.609375Z`} fill="#FAFAFA" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PricingSecuritySection;
