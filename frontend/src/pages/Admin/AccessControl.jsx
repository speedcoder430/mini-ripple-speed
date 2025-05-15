import React, { useState, useEffect, useRef } from "react";
import Topnav from "@/components/navbar/Topnav";
import Sidebar from "@/components/sidebar/Sidebar";
import AccessControlForm from "@/components/admin/accessControl/AccessControlForm";

function AccessControl() {
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
                    <AccessControlForm />
                </div>
            </div>
        </>
    );
}

export default AccessControl;
