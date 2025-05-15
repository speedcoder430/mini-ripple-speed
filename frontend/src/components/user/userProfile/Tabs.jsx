import React, { useState } from "react";
import TabItem from "./TabItem";

function Tabs() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "Profile Management", className: "" },
        { label: "Notification Preferences", className: "" },
        { label: "Password & Security Settings", className: "" },
        { label: "Language & Time Zone Preferences", className: "" }
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <nav
            className="flex flex-wrap gap-6 items-center px-6 py-5 mb-6 text-base text-blue-800 bg-blue-700 bg-opacity-20 font-['Jost'] max-md:px-5"
            role="tablist"
            aria-label="Account settings tabs"
        >
            {tabs.map((tab, index) => (
                <TabItem
                    key={index}
                    label={tab.label}
                    isActive={activeTab === index}
                    onClick={() => handleTabClick(index)}
                    className={tab.className}
                />
            ))}
        </nav>
    );
}

export default Tabs;
