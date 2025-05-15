import React from "react";

const SupportInfoSection = () => {
    return (
        <section id="supportinfo" className="flex relative z-10 justify-center self-stretch md:p-2.5 pt-2 mb-32 md:pt-32 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-between md:px-32 lg:px-0 mt-6 px-[24px] max-md:max-w-full z-[20]">
                <div className="flex flex-col items-start justify-between md:w-[600px] lg:w-[420px] xl:w-[555px]">
                    <h2 className="font-['Amble'] lg:font-['Anton'] text-[30px] lg:text-[40px] font-bold lg:font-normal tracking-[-1.5px] lg:tracking-[0.78px] text-[#C6E0F7] py-[14px]">
                        Quickly Find Answers to Your Questions with Our Search Bar
                    </h2>
                    <p className="font-['Jost'] text-[16px] text-[#8192AB]">
                        Our intuitive search bar allows you to easily locate FAQs and articles. Type in your query and get instant access to helpful resources.
                    </p>
                    <div className="flex flex-col justify-start self-stretch font-['Jost']">
                        <div className="flex flex-col md:flex-row items-start py-[14px]">
                            <div className="md:w-[50%] text-[16px] md:mr-6 mb-4 md:mb-0 py-[10px] text-[#8192AB]">
                                <h3 className="text-[#FBD020] text-[24px] leading-[28px] font-semibold pb-4">
                                    Search Easily
                                </h3>
                                Find the information you need in seconds with our streamlined search feature.
                            </div>
                            <div className="md:w-[50%] text-[16px] md:mr-6 mb-4 md:mb-0 py-[10px] text-[#8192AB]">
                                <h3 className="text-[#FBD020] text-[24px] leading-[28px] font-semibold pb-4">
                                    Get Answers
                                </h3>
                                Access a wealth of knowledge at your fingertips to resolve your issues.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex relative object-none overflow-hidden w-full md:w-[621px] lg:w-[420px] xl:w-[621px] h-[430px] md:h-[541px] flex-shrink-0 justify-center items-center rounded-[8px] bg-[#FAFAFA] border-2 border-[#FBD020]">
                    <img src="/landing/support-info-section.png" alt="SupportInfo" className="w-[380px] h-[475px] md:w-[825px] md:h-[550px] object-none flex-shrink-0 aspect-[2/3] bg-center bg-cover bg-no-repeat" />
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

export default SupportInfoSection;
