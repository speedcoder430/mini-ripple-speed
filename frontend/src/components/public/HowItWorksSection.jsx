import React, { useState, useEffect } from "react";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorksSection = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full flex items- justify-center">
            <section className="max-w-full relative flex flex-col items-center justify-center px-4 md:px-0 z-[30] max-md:mt-10">
                <div className="mt-32 max-w-full text-center w-[717px] max-md:mt-10 z-[20]">
                    <h3 className="text-2xl font-semibold leading-none font-['Amble'] md:font-['Jost'] text-blue-800 max-md:max-w-full">
                        How It Works
                    </h3>
                    <h2 className="mt-3.5 text-2xl md:text-[30px] tracking-normal md:tracking-[-1.5px] lg:text-[40px] lg:tracking-normal text-slate-900 md:font-['Amble'] font-bold lg:font-['Anton'] lg:font-normal max-md:max-w-full">
                        Integrate, Detect, Block In Real-Time
                    </h2>
                    <p className="mt-3.5 text-base md:text-[17px] text-neutral-600 font-['Jost'] max-md:max-w-full">
                        MiniRipple operates seamlessly to protect your digital assets with a simple three-step process
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 items-center justify-center mt-6 w-full max-w-[1240px] max-md:max-w-full z-[20]">
                    <HowItWorksCard
                        title="Integrate"
                        description="Effortlessly connect MiniRipple with your website, app, or ad platform in just a few simple steps—no complex setup required. Our seamless integration process ensures that you can start protecting your digital assets immediately without the need for extensive technical expertise."
                        chartComponent={<img src="/landing/how-it-works-card-1.png" />}
                    />

                    <HowItWorksCard
                        title="Detect"
                        description="Advanced algorithms analyze traffic patterns, identifying malicious bots and fraudulent activities in real time with high precision. By leveraging machine learning, behavioral analysis, and anomaly detection, our system continuously adapts to emerging threats, ensuring proactive protection against cyber attacks."
                        chartComponent={<img src="/landing/how-it-works-card-2.png" />}
                    />

                    <HowItWorksCard
                        title="Block"
                        description="Automatically prevents harmful traffic, ensuring only legitimate users interact with your platform by leveraging real-time threat detection and AI-driven analysis. Our advanced security measures block malicious bots, fraudulent clicks, and automated attacks before they can cause harm, protecting your website, app, or ad campaigns from disruptions."
                        chartComponent={<img src="/landing/how-it-works-card-3.png" />}
                    />
                </div>
            </section>
            <div className="absolute top-[-120px] md:top-[-180px] lg:top-[-260px] z-[20]">
                <div className="hidden w-full lg:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1413" viewBox={`0 0 ${width} 1413`} fill="none">
                        <path d={`M0 0C340.5 624.935 916.5 88.6342 ${width} 397.569V1395.67C751.5 940.935 475 1748.28 0 1235.1V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="2169" viewBox={`0 0 ${width} 2169`} fill="none">
                        <path d={`M0 0.5C224.616 586.266 469.815 -33.6842 ${width} 267.021V1622.21C388.253 1294.055 244.427 1985.48 0 1622.55V0.5Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="block w-full md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="2233" viewBox={`0 0 ${width} 2233`} fill="none">
                        <path d={`M0 0C150.5 371 250.128 -75.4633 ${width} 200.019V2217.18C205.097 1811.69 129.635 2531.61 0 2074V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-[-90px] md:top-[-260px] lg:top-[-180px] z-[20]">
                <div className="hidden w-full lg:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="1413" viewBox={`0 0 ${width} 1413`} fill="none">
                        <path d={`M0 0.5C436.5 663.021 913 -38.1635 ${width} 301.944V1269.19C754.5 739.693 475 1680.07 0 1156.47V0.5Z`} fill="#FAFAFA" />
                    </svg>
                </div>
                <div className="hidden w-full md:block lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="2260" viewBox={`0 0 ${width} 2260`} fill="none">
                        <path d={`M0 0C175.216 557.266 471.616 79.0366 ${width} 354.519V1754.54C386.709 1429.048 250.427 2060.97 0 1701.36V0Z`} fill="#FAFAFA" fillOpacity="0.2" />
                    </svg>
                </div>
                <div className="block w-full md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width={width} height="2204" viewBox={`0 0 ${width} 2204`} fill="none">
                        <path d={`M0 0C138.5 417.5 249.173 -130.184 ${width} 170.521V2158C205.916 1689.85 129.635 2521.28 0 2058.34V0Z`} fill="#FAFAFA" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
