import React, { useState, useEffect } from "react";

const WhyChooseSection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="flex relative flex-col justify-start items-center self-stretch pt-20 mt-0 w-full min-h-[1300px] max-md:max-w-full z-[0]">
            <div className="absolute hidden lg:block top-[-180px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1465" viewBox={`0 0 ${width} 1465`} fill="none">
                    <path d={`M0 0C340.5 647.934 916.5 91.8961 ${width} 412.201V1447.03C751.5 975.564 475 1812.62 0 1280.55V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                </svg>
            </div>
            <div className="absolute hidden lg:block top-[-100px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1385" viewBox={`0 0 ${width} 1385`} fill="none">
                    <path d={`M0 0C436.5 694.806 913 -40.5476 ${width} 316.134V1330.51C754.5 775.214 475 1761.41 0 1212.3V0Z`} fill="#FAFAFA" />
                </svg>
            </div>
            <div className="absolute hidden md:block lg:hidden top-[-180px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1515" viewBox={`0 0 ${width} 1515`} fill="none">
                    <path d={`M0 0.5C224.616 759.843 469.815 -43.8138 ${width} 345.997V1454.59C388.253 847.719 244.427 1925.52 0 1325.41V0.5Z`} fill="#FAFAFA" />
                </svg>
            </div>
            <div className="absolute hidden md:block lg:hidden top-[-260px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1606" viewBox={`0 0 ${width} 1606`} fill="none">
                    <path d={`M0 0C175.216 710.296 471.616 100.741 ${width} 451.874V1586.3C386.709 1069.46 244.427 1987.08 0 1403.8V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                </svg>
            </div>
            <div className="absolute block md:hidden top-[-40px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1863" viewBox={`0 0 ${width} 1863`} fill="none">
                    <path d={`M0 0C150.5 309.516 250.128 -62.9572 ${width} 166.871V1849.74C205.097 1511.45 129.635 2112.06 0 1730.29V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                </svg>
            </div>
            <div className="absolute block md:hidden top-[-10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1834" viewBox={`0 0 ${width} 1834`} fill="none">
                    <path d={`M0 0C138.5 347.41 249.173 -108.329 ${width} 141.894V1795.71C205.916 1406.16 129.635 2098 0 1712.79V0Z`} fill="#FAFAFA" />
                </svg>
            </div>
            <div className="flex overflow-hidden relative flex-col justify-center items-center md:px-2 lg:px-20 pb-2 pt-0 w-full fill-neutral-50 min-h-[1120px] max-md:px-5 max-md:py-24 max-md:max-w-full">
                <div className="flex relative flex-col items-center justify-center w-full max-w-[1003px] max-md:mb-2.5 max-md:max-w-full">
                    <div className="self-center max-w-full text-center md:w-full lg:w-[717px]">
                        <h3 className="text-[20px] md:text-2xl font-semibold font-['Amble'] md:font-['Jost'] leading-snug text-blue-800 max-md:max-w-full">
                            Why Choose MiniRipple?
                        </h3>
                        <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] md:font-['Amble'] font-bold lg:font-['Anton'] lg:font-normal leading-[28px] md:leading-normal md:tracking-[-1.5px] lg:tracking-wider text-slate-900 max-md:max-w-full">
                            Cutting-Edge Technology, Simplified Security
                        </h2>
                    </div>
                    <div className="p-6 pt-6 mt-4 text-[30px] tracking-tighter leading-snug md:leading-9 rounded-2xl bg-neutral-50 text-neutral-600 max-w-[955px] font-['Jost'] spacing-[-1.5px] shadow-md shadow-[#0003] max-md:px-5 max-md:max-w-full">
                        <p>
                            At MiniRipple, we combine the latest advancements in technology
                            with robust security measures to ensure your data and transactions
                            are always protected. Our intuitive platform makes it easy to
                            harness powerful features without compromising on safety.
                        </p>
                        <br />
                        <h3 className="font-bold tracking-[-1.5px] text-[rgba(1,23,50,1)] font-['Amble']">
                            Seamless User Experience
                        </h3>
                        <br />
                        <p>
                            We prioritize usability, providing a smooth and intuitive
                            interface that caters to both beginners and experts. No
                            complicated setups—just straightforward, hassle-free performance.
                        </p>
                        <br />
                        <h3 className="font-bold tracking-[-1.5px] text-[rgba(1,23,50,1)] font-['Amble']">
                            Fast and Reliable Performance
                        </h3>
                        <br />
                        <p>
                            MiniRipple is built for speed and reliability, handling large
                            volumes of transactions without a hitch. Say goodbye to delays and
                            downtime—experience consistent and efficient operation every time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
