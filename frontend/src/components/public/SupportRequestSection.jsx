import React from "react";
import InfoCard from "./InfoCard";
import Button from "./Button";

const SupportRequestSection = () => {
    return (
        <section id="supportinfo" className="flex flex-col px-6 sm:px-0 lg:flex-row relative z-10 justify-center items-center md:self-stretch pb-8 md:p-2.5 pt-2 mb-36 md:pt-[320px] lg:pt-[80px] sm:w-[80%] md:w-full mt-72 sm:mt-10 max-md:max-w-full">
            <div className="flex relative object-none overflow-hidden w-full md:w-[621px] lg:w-[420px] xl:w-[621px] h-[430px] md:h-[541px] flex-shrink-0 justify-center items-center rounded-[8px] bg-[#FAFAFA] border-2 border-[#FBD020]">
                <img src="/landing/support-request-section-1.png" alt="SupportInfo" className="w-[380px] h-[475px] md:w-[825px] md:h-[550px] object-none flex-shrink-0 aspect-[2/3] bg-center bg-cover bg-no-repeat" />
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-between md:px-32 lg:px-0 mt-6 px-0 sm:ml-12 max-md:max-w-full z-[20]">
                <div className="flex flex-col items-start justify-between md:w-[600px] lg:w-[420px] xl:w-[555px]">
                    <h2 className="font-['Amble'] lg:font-['Anton'] text-[30px] lg:text-[40px] font-bold lg:font-normal tracking-[-1.5px] lg:tracking-[0.78px] text-[#C6E0F7] py-[14px]">
                        Need Assistance with Your Website Integration?
                    </h2>
                    <p className="font-['Jost'] text-[16px] text-[#8192AB]">
                        If you're facing challenges integrating MiniRipple with your website, we are here to help. Our expert team can assist you in getting everything set up smoothly.
                    </p>
                    <div className="flex flex-col justify-start self-stretch font-['Jost']">
                        <div className="flex flex-col md:flex-row items-start py-[14px]">
                            <InfoCard
                                imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/92e01ce40c1f1abf7cab1b1bce182e190011947a?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                                title="Setup Help"
                                description="One-time setup assistance is available for just $20."
                            />
                            <InfoCard
                                imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/6348357ec7967c4026e1a97352dd943d1cc24337?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                                title="Get Started"
                                description="Click below to request your setup assistance today."
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <Button variant="primary" className="mr-6">Help</Button>
                        <Button variant="secondary">Request</Button>
                    </div>
                </div>
            </div>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#FFC10780] blur-[250px] z-[-1] left-[-480px] top-[600px]"></div>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#1976D280] blur-[250px] right-[-400px] top-[-200px] z-[0]"></div>
        </section>
    );
};

export default SupportRequestSection;
