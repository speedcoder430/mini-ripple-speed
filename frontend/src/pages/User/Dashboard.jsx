import React, { useState, useEffect, useRef } from "react";
import UserDashboard from "@/components/user/dashboard/UserDashboard";
import Sidebar from "@/components/sidebar/Sidebar";
import Topnav from "@/components/navbar/Topnav";
import SuccessModal from "../../components/auth/SuccessModal";
import CancelModal from "../../components/auth/CancelModal";
import { useLocation } from "react-router-dom";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef();
    const topnavRef = useRef();
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [showPaymentCancelled, setShowPaymentCancelled] = useState(false);
    const location = useLocation();

    // ✅ Check payment status from URL
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentStatus = query.get("payment");
        console.log("paymentStatus : ", paymentStatus);

        if (paymentStatus === "success") {
            setShowPaymentSuccess(true);
        } else if (paymentStatus === "cancelled") {
            setShowPaymentCancelled(true);
        }

        // ✅ Clean URL after checking once
        if (paymentStatus) {
            setTimeout(() => {
                window.history.replaceState(null, "", "/dashboard");
            }, 100);
        }

    }, [location.search]);

    useEffect(() => {
        if (showPaymentSuccess || showPaymentCancelled) {
            const timer = setTimeout(() => {
                setShowPaymentSuccess(false);
                setShowPaymentCancelled(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showPaymentSuccess, showPaymentCancelled]);

    // ✅ Hide sidebar on outside click
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
        };
    }, [sidebarOpen]);

    return (
        <>
            <div className="relative min-h-svh flex items-start">
                <Sidebar ref={sidebarRef} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex-1">
                    <Topnav ref={topnavRef} onMenuClick={() => setSidebarOpen(true)} />
                    <UserDashboard />
                </div>
            </div>

            {showPaymentSuccess && (
                <>
                    {console.log("✅ Showing Success Modal")}
                    <div className="fixed z-[9999] inset-0 bg-black/60 flex justify-center items-center">
                        <SuccessModal message="Payment completed successfully!" />
                    </div>
                </>
            )}

            {showPaymentCancelled && (
                <div className="fixed z-[9999] inset-0 bg-black/60 flex justify-center items-center">
                    <CancelModal message="Payment was cancelled." />
                </div>
            )}
        </>
    );
}

export default Dashboard;
