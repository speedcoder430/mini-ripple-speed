import React from "react";
import ResourcesCard from "./ResourcesCard";
import Button from "./Button";


const SupportResourcesSection = () => {
    return (
        <section className="flex flex-col relative self-stretch md:px-20 lg:pt-28 w-full pb-[100px] max-md:px-5 max-md:py-8 max-md:max-w-full">
            <div className="self-center max-w-full text-center w-[717px] z-[10]">
                <h3 className="text-[20px] md:text-2xl font-semibold leading-none text-yellow-400 font-['Jost'] max-md:max-w-full">
                    Resources
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] tracking-normal md:tracking-[-1.5px] lg:tracking-wider text-blue-100 font-['Jost'] md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal max-md:max-w-full">
                    Explore Our Community and Learning Resources
                </h2>
                <p className="mt-4 text-[16px] lg:text-[17px] text-neutral-300 font-['Jost'] max-md:max-w-full">
                    Join our vibrant MiniRipple community to connect with other users and share experiences. Access a wealth of resources including tutorials, articles, and guides to enhance your MiniRipple experience.
                </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-start mt-20 mb-0 z-[10] max-md:mt-10 max-md:mb-2.5">
                <ResourcesCard
                    title="Join the MiniRipple Forum Today"
                    description="Engage with fellow users and get support."
                    image="/landing/resources-1.png"
                />

                <ResourcesCard
                    title="Discover Our Blog Articles and Tutorials"
                    description="Find valuable insights and tips to maximize MiniRipple."
                    image="/landing/resources-2.png"
                />

                <ResourcesCard
                    title="Watch Our Video Guides for Quick Help"
                    description="Visual learning made easy with our step-by-step videos."
                    image="/landing/resources-3.png"
                />
            </div>
            <div className="flex w-full justify-center mt-20">
                <Button variant="primary" className="mr-[24px]">Join</Button>
                <Button variant="secondary">Watch</Button>
            </div>
            <div className="absolute w-[677px] h-[84px] flex-shrink-0 rounded-[677px] bg-[rgba(57,120,215,0.5)] blur-[100px] top-[100px] lg:top-[190px] z-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </section>
    );
};

export default SupportResourcesSection;
