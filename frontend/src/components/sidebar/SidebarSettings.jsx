import React from "react";
import { useLocation } from "react-router-dom";
import SidebarNavItem from "./SidebarNavItem";

const SidebarSettings = ({ isCollapsed = false }) => {
    const location = useLocation();

    return (
        <section
            className={`${isCollapsed ? "px-0" : "px-5"} mt-48 w-full text-sm tracking-tight leading-none text-neutral-300 transition-all duration-300`}
        >
            <div
                className={`w-full bg-blue-700 bg-opacity-20 ${isCollapsed ? "" : "rounded-lg"} transition-all duration-300`}
            >
                {
                    location.pathname.includes("admin") ? (
                        <SidebarNavItem
                            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/07a0d539f713485c89d8da6a2747ca95b272ad66?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                            text="Admin Settings"
                            isActive={location.pathname === "/admin/profile"}
                            isCollapsed={isCollapsed}
                            path="/admin/profile"
                        />
                    ) : (
                        <SidebarNavItem
                            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/07a0d539f713485c89d8da6a2747ca95b272ad66?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                            text="Settings"
                            isActive={location.pathname === "/user/profile"}
                            isCollapsed={isCollapsed}
                            path="/user/profile"
                        />
                    )
                }
                <SidebarNavItem
                    icon="https://cdn.builder.io/api/v1/image/assets/TEMP/d43d8b7ed8032487e0f92789ffe35970813b903a?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                    text="Log Out"
                    isCollapsed={isCollapsed}
                    path="/login"
                />
            </div>
        </section>
    );
};

export default SidebarSettings;
