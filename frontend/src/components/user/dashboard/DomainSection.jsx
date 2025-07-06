// src/components/dashboard/DomainSection.jsx
import React, { useState, useEffect, useRef } from "react";
import DomainAddModal from "../../main/DomainAddModal";
import Button from "../../public/Button";
import axios from "axios";
import { useAuth } from "../../../middlewares/authContext";
import SnippetGuideModal from "./SnippetGuideModal";

const DomainSection = () => {
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [domain, setDomain] = useState(null);
    const [status, setStatus] = useState("none"); // none | pending | connected | failed
    const [loading, setLoading] = useState(false);
    const [showSnippetModal, setShowSnippetModal] = useState(false);

    const firstConnectionHandled = useRef(false); // 🛡️ Prevent modal on page reload

    const fetchDomainInfo = async () => {
        try {
            const token = await user?.getIdToken?.();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/info`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = res?.data?.data;

            if (data?.domain) {
                setDomain(data.domain);
                setStatus(data.status === "active" ? "connected" : "pending");

                if (data.status === "active" && !firstConnectionHandled.current) {
                    setShowSnippetModal(true);
                    firstConnectionHandled.current = true;
                }
            } else {
                setStatus("none");
            }
        } catch (err) {
            console.error("Failed to fetch domain info", err);
            setStatus("failed");
        }
    };

    useEffect(() => {
        if (user) fetchDomainInfo();
    }, [user]);

    const handleDomainSubmit = async (submittedDomain) => {
        setModalOpen(false);
        setStatus("pending");
        setLoading(true);

        try {
            const token = await user?.getIdToken?.();
            const endpoint = domain ? "change" : "connect";

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/${endpoint}`,
                {
                    domain: submittedDomain,
                    propertyName: "My Project", // 🔧 Replace or make dynamic later
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res?.data?.success) {
                setDomain(res.data.data.domain);
                setStatus("connected");
                setShowSnippetModal(true);
            } else {
                setStatus("failed");
            }
        } catch (error) {
            console.error("Domain connection failed", error);
            setStatus("failed");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "connected": return "text-green-600";
            case "pending": return "text-yellow-500";
            case "failed": return "text-red-600";
            default: return "text-gray-400";
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case "connected": return "✅";
            case "pending": return "⏳";
            case "failed": return "❌";
            default: return "⚠️";
        }
    };

    return (
        <>
            <section className="flex justify-between items-center px-6 mt-6 w-full font-['Jost'] max-md:flex-col max-md:items-start max-md:gap-3">
                <div className="flex items-center gap-3">
                    <span className={`text-xl font-medium flex items-center gap-2 ${getStatusColor()}`}>
                        {getStatusIcon()}
                        {domain ? (
                            <>
                                {domain} ({status.charAt(0).toUpperCase() + status.slice(1)})
                                <span
                                    className="ml-1 text-blue-500 cursor-pointer hover:text-blue-700 text-sm"
                                    title="View Tracking Snippet"
                                    onClick={() => setShowSnippetModal(true)}
                                >
                                    ℹ️
                                </span>
                            </>
                        ) : "No domain connected"}
                    </span>
                </div>

                <Button
                    variant="dark"
                    onClick={() => setModalOpen(true)}
                >
                    {domain ? "Update Domain" : "Add Domain"}
                </Button>
            </section>

            <DomainAddModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onDomainSubmit={handleDomainSubmit}
                defaultDomain={domain}
            />

            <SnippetGuideModal
                isOpen={showSnippetModal}
                onClose={() => setShowSnippetModal(false)}
            />
        </>
    );
};

export default DomainSection;
