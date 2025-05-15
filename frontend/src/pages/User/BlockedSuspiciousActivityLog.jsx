import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import BlockedSuspiciousActivityLogForm from "@/components/user/blockedSuspiciousActivityLog/BlockedSuspiciousActivityLogForm";

function BlockedSuspiciousActivityLog() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef();
    const topnavRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                (!topnavRef.current || !topnavRef.current.contains(e.target))
            ) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [sidebarOpen]);

    return (
        <>
            <div className="relative min-h-svh flex items-start">
                <Sidebar ref={sidebarRef} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex-1">
                    <Topnav ref={topnavRef} onMenuClick={() => setSidebarOpen(true)} />
                    <BlockedSuspiciousActivityLogForm />
                </div>
            </div>
        </>
    );
}

export default BlockedSuspiciousActivityLog;
