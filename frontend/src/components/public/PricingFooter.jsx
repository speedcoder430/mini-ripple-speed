import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FooterLinkSection = ({ title, links, url }) => {
    return (
        <div className="w-full mb-[20px] md:mb-0 md:w-[164px] font-['Jost'] min-w-[40%] md:min-w-[15%] lg:min-w-[15%]">
            <h3 className="gap-1 self-stretch px-6 pr-0 py-3 w-full font-semibold leading-none text-start text-yellow-400 max-md:px-5">
                {title}
            </h3>
            <div className="w-full text-neutral-50 px-6">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={url[index]}
                        className="gap-3 self-stretch py-1.5 w-full whitespace-nowrap rounded-md max-md:px-5 block"
                    >
                        {link}
                    </a>
                ))}
            </div>
        </div>
    );
};

const PricingFooter = () => {
    const quickLinks = [
        "Home",
        "Features",
        "Pricing",
        "Demo Video",
        "Customer Stories",
        "Contact Us",
    ];
    const resourceLinks = [
        "Blog & Insights",
        "Help Center",
        "FAQs",
        "Security Reports",
    ];
    const companyLinks = [
        "About Us",
        "Careers",
        "Partnerships",
        "Terms & Privacy",
    ];
    const quickLinksUrls = [
        "/",
        "#features",
        "#pricing",
        "#demo-video",
        "#testimonial",
        "/support",
    ];

    const resourceLinksUrls = [
        "/blog-insights",
        "/help-center",
        "#faq",
        "/security-reports",
    ];
    const companyLinksUrls = [
        "/about-us",
        "/careers",
        "/partnerships",
        "/terms-privacy",
    ];
    const connectLinksUrls = [
        "/twitter",
        "/linkedin",
        "/facebook",
        "/youtube"
    ];
    const connectLinks = ["X (Twitter)", "LinkedIn", "Facebook", "YouTube"];

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <footer className={`flex relative flex-col px-10 pt-16 text-base z-[30] top-[-140px] md:top-[-140px] max-md:max-w-full bg-[#011732]`} style={{width: width}}>
            <div className="flex gap-6 items-start self-center z-[10] max-md:max-w-full">
                <Link to="/">
                    <img
                        src="/landing/logo.png"
                        className="object-contain shrink-0 aspect-[3.88] w-[120px]"
                        alt="Logo"
                    />
                </Link>
                <div className="flex flex-wrap md:gap-10 lg:gap-20 items-start min-w-60 max-md:min-w-full">
                    <FooterLinkSection title="Quick Links" links={quickLinks} url={quickLinksUrls} />
                    <FooterLinkSection title="Resources" links={resourceLinks} url={resourceLinksUrls} />
                    <FooterLinkSection title="Company" links={companyLinks} url={companyLinksUrls} />
                    <FooterLinkSection title="Connect With Us" links={connectLinks} url={connectLinksUrls} />
                </div>
            </div>
            <div className="flex-1 shrink gap-2.5 self-stretch pt-16 pb-0.5 mt-16 w-full text-center border-t-2 border-solid basis-0 border-t-[rgba(36,91,209,0.20)] text-slate-400 z-[10] max-md:mt-10 max-md:max-w-full">
                © 2025 MiniRipple – All Rights Reserved.
            </div>
            <div className="absolute w-[1900px] h-[200px] blur-[180px] bg-[#000B1A] bottom-[-200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[0]"></div>
        </footer>
    );
};

export default PricingFooter;
