import React from "react";
import HelpCategoryCard from "./HelpCategoryCard";

const SupportHelpCategorySection = () => {
    const helpCategories = [
        {
            id: 1,
            icon: "/support-category-section-1.png",
            title: "Getting Started with MiniRipple",
            description:
                "Find step-by-step guides to set up MiniRipple effortlessly.",
        },
        {
            id: 2,
            icon: "/support-category-section-2.png",
            title: "Account & Billing Assistance",
            description:
                "Get help with subscriptions, payments, and account management.",
        },
        {
            id: 3,
            icon: "/support-category-section-3.png",
            title: "Troubleshooting Common Errors",
            description:
                "Resolve common issues quickly with our troubleshooting tips.",
        },
        {
            id: 4,
            icon: "/support-category-section-4.png",
            title: "Understanding Security & Privacy",
            description: "Learn about MiniRipple's commitment to your security.",
        },
    ];

    return (
        <>
            <link
                rel="stylesheet"
                href="/landing/tabler-icons.min.css"
            />
            <section className="flex flex-wrap gap-6 m-auto w-full lg:max-w-[633px] max-md:justify-center max-md:flex-col max-md:items-center max-sm:max-w-screen-sm">
                {helpCategories.map((category) => (
                    <HelpCategoryCard
                        key={category.id}
                        icon={category.icon}
                        title={category.title}
                        description={category.description}
                    />
                ))}
            </section>
        </>
    );
};

export default SupportHelpCategorySection;
