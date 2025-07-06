// ✅ SnippetGuideModal.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Copy } from "lucide-react";
import Button from "../../public/Button";
import axios from "axios";
import { useAuth } from "../../../middlewares/authContext";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SnippetGuideModal = ({ isOpen, onClose }) => {
    const [snippet, setSnippet] = useState("");
    const [copied, setCopied] = useState(false);
    const [checking, setChecking] = useState(false);
    const [status, setStatus] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchSnippet = async () => {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                if (!currentUser) return;

                const token = await currentUser.getIdToken();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/tracking/snippet`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setSnippet(res.data?.data?.snippet || "");
            } catch (error) {
                console.error("Failed to fetch tracking snippet", error);
                setSnippet("// Failed to load tracking snippet.");
            }
        };


        fetchSnippet();
    }, [isOpen, user]);
    const handleCopy = () => {
        if (!snippet) return;

        navigator.clipboard.writeText(snippet).then(() => {
            setCopied(true);
            toast.success("📋 Snippet copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        });
    };
    const handleCheckIntegration = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/tracking/validate`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const isActive = res.data?.data?.status === "active";
            if (isActive) {
                toast.success("Tracking snippet is active!");
            } else {
                toast.info("Snippet not active yet.");
            }
        } catch (error) {
            console.error("Snippet validation failed", error);
            toast.error("Failed to validate snippet.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Tracking Snippet Integration Guide
                </h2>

                <p className="text-sm text-gray-700 mb-2">
                    Add the following script tag inside the <code className="text-[0.9em]">&lt;head&gt;</code> tag of your website:
                </p>

                <div className="relative bg-gray-100 rounded-md p-4 text-sm font-mono text-gray-800 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">{snippet}</pre>
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    >
                        <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                {status && (
                    <p className={`mt-4 text-sm ${status.startsWith("✅") ? "text-green-600" : "text-yellow-600"}`}>
                        {status}
                    </p>
                )}

                <div className="mt-6 flex justify-end">
                    <Button variant="blue" disabled={checking} onClick={handleCheckIntegration}>
                        {checking ? "Checking..." : "Check Integration"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default SnippetGuideModal;
