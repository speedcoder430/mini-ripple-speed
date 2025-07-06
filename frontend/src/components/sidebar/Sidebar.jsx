import React, { useState, forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarLogo from "./SidebarLogo";
import SidebarNavItem from "./SidebarNavItem";
import SidebarSettings from "./SidebarSettings";
import { useAuth } from "@/middlewares/authContext";
import { useDomainStatus } from "@/helper/useDomainStatus";
const Sidebar = forwardRef(({ isOpen, setIsOpen }, ref) => {
    const location = useLocation();
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const storedValue = localStorage.getItem("sidebarCollapsed");
        return storedValue === "true"; // default to false if not found
    });
    const { isConnected: isDomainActive, status } = useDomainStatus();


    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebarCollapsed", newState.toString());
    };

    const handleNavClick = () => {
        if (!isDomainActive) return;
        navigate(path);
        setIsOpen(false);
    }

    const alwaysAccessiblePaths = [
        "/account-subscription",
        "/login",
        "/user/profile",
        "/admin/profile",
    ];

    const userNavigationItems = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/642c11f827f32debc803b90e90f2ff552274334f",
            text: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e62bf788518ae4d69cc6ce9bc3b7a766b8420ff",
            text: "Traffic Analytics",
            path: "/traffic-analytics",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb90a9f1d39286cd0b96bd6adee7b983bd708022",
            text: "Security & Threat Detection",
            path: "/security-threat-detection",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8e00f057a9d60f2846d26eb5d7e4fe8cb98b7049",
            text: "Visitor & IP Management",
            path: "/visitor-ip-management",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d100e1e4f63673cd48e5d6509d91e767e3bcec40",
            text: "Device & Browser Insights",
            path: "/device-browser-insights",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/89afaf3730efd638a62f97dbef157c51d0fefcb0",
            text: "Blocked & Suspicious Activity Log",
            path: "/blocked-suspicious-activity",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/03b983e4d01ec95a2b0320810990d9a481a15366",
            text: "Account & Subscription Management",
            path: "/account-subscription",
        },
    ];

    const adminNavigationItems = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/642c11f827f32debc803b90e90f2ff552274334f",
            text: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            icon: "/admin/sidebar/sidebar-1.svg",
            text: "User Management",
            path: "/admin/user-management",
        },
        {
            icon: "/admin/sidebar/sidebar-2.svg",
            text: "Access Control",
            path: "/admin/access-control",
        },
        {
            icon: "/admin/sidebar/sidebar-3.svg",
            text: "Tickets",
            path: "/admin/tickets",
        },
        {
            icon: "/admin/sidebar/sidebar-4.svg",
            text: "System Logs",
            path: "/admin/system-logs",
        },
    ];

    return (
        <aside
            ref={ref}
            className={`fixed lg:sticky top-0 transition-all duration-300 ease-in-out w-[303px] lg:left-0 pb-8 bg-slate-900 flex flex-col rounded-tr-2xl rounded-br-2xl lg:rounded-none items-end min-h-svh z-[50]
                ${isCollapsed ? "lg:w-[64px]" : "lg:w-[313px]"}
                ${isOpen ? "left-[0px]" : "left-[-313px]"}`}
        >
            <div className="w-full">
                <SidebarLogo isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <nav className="w-full">
                    {(location.pathname.includes("admin") ? adminNavigationItems : userNavigationItems).map((item, index) => (
                        <SidebarNavItem
                            key={index}
                            {...item}
                            isCollapsed={isCollapsed}
                            isActive={
                                location.pathname === item.path ||
                                location.pathname === `${item.path}/`
                            }
                            path={item.path}
                            disabled={!isDomainActive && !alwaysAccessiblePaths.includes(item.path)}
                            onClick={handleNavClick}
                        />

                    ))}
                </nav>
                {status !== "active" && (
                    <div className="text-center mt-4 px-4 text-sm text-yellow-400">
                        🔒 Please connect your domain to unlock all features.
                    </div>
                )}


                <SidebarSettings  isCollapsed={isCollapsed} isDomainActive={isDomainActive}  />
            </div>
        </aside>
    );
});


export default Sidebar;
