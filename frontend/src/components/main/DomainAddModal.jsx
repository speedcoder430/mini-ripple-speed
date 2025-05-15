import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DomainAddModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div>{children}</div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={onClose} className="bg-gray-500 mr-2">
                        Close
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default DomainAddModal;
