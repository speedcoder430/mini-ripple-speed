import React, { forwardRef } from "react";
import NotificationIcon from "./NotificationIcon";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { auth } from "../../../firebase";
const Topnav = forwardRef(({ title, onMenuClick }, ref) => {
    const location = useLocation();
    var user = localStorage.getItem("user") || "";
    console.log(user)
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    var userData = {};
    if (user) {
        userData = JSON.parse(user);
    }
    const username = userData?.name || userData?.displayName ||"Unnamed";
    console.log(username);
    console.log(user);
    
    var title = "";
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
        title = "Dashboard Overview"
    } else if (location.pathname === "/traffic-analytics" || location.pathname === "/traffic-analytics/") {
        title = "Traffic Analytics"
    } else if (location.pathname === "/security-threat-detection" || location.pathname === "/security-threat-detection/") {
        title = "Security & Threat Detection"
    } else if (location.pathname === "/visitor-ip-management" || location.pathname === "/visitor-ip-management/") {
        title = "Visitor & IP Management"
    } else if (location.pathname === "/device-browser-insights" || location.pathname === "/device-browser-insights/") {
        title = "Device & Browser Insights"
    } else if (location.pathname === "/blocked-suspicious-activity" || location.pathname === "/blocked-suspicious-activity/") {
        title = "Blocked & Suspicious Activity Log"
    } else if (location.pathname === "/account-subscription" || location.pathname === "/account-subscription/") {
        title = "Account & Subscription Management"
    } else if (location.pathname === "/user/profile" || location.pathname === "/user/profile/") {
        title = "Settings"
    } else if (location.pathname === "/admin/dashboard" || location.pathname === "/admin/dashboard/") {
        title = "Admin Dashboard Overview"
    } else if (location.pathname === "/admin/user-management" || location.pathname === "/admin/user-management/") {
        title = "User Management"
    } else if (location.pathname === "/admin/access-control" || location.pathname === "/admin/access-control/") {
        title = "Access Control"
    } else if (location.pathname === "/admin/tickets" || location.pathname === "/admin/tickets/") {
        title = "Tickets"
    } else if (location.pathname === "/admin/system-logs" || location.pathname === "/admin/system-logs/") {
        title = "System Logs"
    } else if (location.pathname === "/admin/profile" || location.pathname === "/admin/profile/") {
        title = "Admin Settings"
    }

    return (
        <div ref={ref} className="flex sticky top-0 z-[30]">
            <nav className="flex flex-col lg:hidden justify-center items-end px-2 bg-slate-900 max-w-[75px]" onClick={onMenuClick}>
                <img
                    src="/landing/top-navbar-1.svg"
                    alt="Menu icon"
                    className="object-contain h-full aspect-[1.72]"
                />
            </nav>
            <header className="flex flex-wrap flex-1 gap-10 justify-between items-center px-6 py-4 lg:py-6 bg-white/20 backdrop-blur-md shadow-[0px_4px_8px_rgba(0,0,0,0.1)] max-md:px-5">
                <h1 className="gap-2 self-stretch my-auto text-xl font-bold tracking-tight leading-tight text-center text-slate-900 font-['Amble']">
                    {title}
                </h1>
                <section className="flex gap-8 items-center self-stretch my-auto">
                    <NotificationIcon />
                    <UserProfile
                        avatarSrc={userData?.avatar || ""}
                        userName={username}
                        userRole={userData?.role || "User"}
                        dropdownIconSrc=""
                    />
                </section>
            </header >
        </div>
    );
});

export default Topnav;
