import React from "react";
import { Link } from "react-router-dom";

const DemoSection = () => {
    return (
        <section id="demo-video" className="flex flex-col relative items-center px-4 md:px-0 md:mt-20 lg:mt-72 max-md:mt-40 rounded-2xl">
            <div className="max-w-full text-center md:w-[717px] rounded-2xl z-[10]">
                <h3 className="text-2xl font-semibold leading-none text-yellow-400 max-md:max-w-full font-['Jost']">
                    Demo Video
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] tracking-normal md:tracking-[-1.5px] lg:tracking-normal text-neutral-50 max-md:max-w-full font-['Jost'] md:font-['Amble'] font-bold lg:font-['Anton'] lg:font-normal">
                    See MiniRipple in Action
                </h2>
                <p className="mt-4 text-[16px] lg:text-[17px] text-neutral-300 font-['Jost'] max-md:max-w-full">
                    Experience how MiniRipple protects your business in real-time!
                </p>
            </div>
            <Link to="/landing/demo">
                <div className="object-contain mt-16 max-w-full shadow-[0_0_20px_2px_rgba(255,193,7,0.5)] aspect-[1.71] md:w-[485px] lg:w-[883px] rounded-xl lg:rounded-3xl border-[1px] md:border-[2px] border-solid border-yellow-400 z-[10] max-md:mt-10">
                    <img
                        src="/landing/demo-section-2.png"
                        alt="Demo-video-thumbnail"
                        className="rounded-xl md:rounded-none"
                    />
                </div>
            </Link>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#ffc10780] blur-[250px] left-[-800px] top-[-150px] z-[0]"></div>
        </section>
    );
};

export default DemoSection;
