import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import validator from "validator";
import Button from "../../components/public/Button";

const DomainAddModal = ({ isOpen, onClose, onDomainSubmit, defaultDomain = "" }) => {
    const [domain, setDomain] = useState(defaultDomain);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isOpen) return null;

    const cleanedDomain = (domain || "").trim().toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");

    const isUpdating = !!defaultDomain && defaultDomain !== cleanedDomain;

    const handleSubmit = () => {
        if (!validator.isFQDN(cleanedDomain)) {
            setError("Please enter a valid domain like 'example.com' or 'www.example@abc.com'");
            return;
        }

        if (isUpdating && !showConfirm) {
            setShowConfirm(true);
            return;
        }

        setError("");
        onDomainSubmit(cleanedDomain); // Proceed after confirmation
    };

    const cancelUpdate = () => {
        setShowConfirm(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {defaultDomain ? "Update Domain" : "Connect Your Domain"}
                </h2>

                <input
                    type="text"
                    value={domain}
                    onChange={(e) => {
                        setDomain(e.target.value);
                        setShowConfirm(false); // Reset confirmation on edit
                    }}
                    placeholder="e.g. yoursite.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />

                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

                {showConfirm && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md text-sm">
                        ⚠️ Updating the domain will <strong>replace the existing one</strong>. Your <strong>tracking snippets</strong> will be update on the new domain.
                    </div>
                )}

                <div className="mt-4 flex justify-end gap-3">
                    {showConfirm && (
                        <Button variant="gray" onClick={cancelUpdate}>Cancel</Button>
                    )}
                    <Button variant="blue" onClick={handleSubmit}>
                        {showConfirm ? "Confirm & Submit" : "Submit"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default DomainAddModal;
