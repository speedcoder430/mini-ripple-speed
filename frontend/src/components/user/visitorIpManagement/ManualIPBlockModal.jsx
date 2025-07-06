import React, { useState } from "react";
import axios from "axios";

const ManualIPBlockModal = ({ open, onClose, propertyId, blockedBy, onBlock }) => {
    const [ipAddress, setIpAddress] = useState("");
    const [reason, setReason] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const isValidIP = (ip) =>
        /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/.test(ip);

    const handleSave = async () => {
        if (!isValidIP(ipAddress)) return;

        try {
            const payload = {
                ip: ipAddress,
                propertyId,
                blockedBy,
                reason: reason || "Manual block",
                expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // default +30 days
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/blocked-ip/block`, payload);

            onBlock(ipAddress); // optional local update
            setIpAddress("");
            setReason("");
            setExpiresAt("");
            onClose();
        } catch (error) {
            console.error("Failed to block IP:", error);
            alert("Failed to block IP. See console for details.");
        }
    };

    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800">Block an IP Address</h2>

                    <input
                        type="text"
                        placeholder="Enter IP address (e.g., 192.168.0.1)"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        className="w-full p-2 border rounded-md border-blue-400 text-sm mb-3"
                    />

                    {!isValidIP(ipAddress) && ipAddress.length > 0 && (
                        <p className="text-sm text-red-500 mb-2">Invalid IP format</p>
                    )}

                    <input
                        type="text"
                        placeholder="Reason (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full p-2 border rounded-md border-blue-400 text-sm mb-3"
                    />

                    <input
                        type="datetime-local"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className="w-full p-2 border rounded-md border-blue-400 text-sm mb-4"
                        title="Block will expire on this date/time"
                    />


                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-100">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800"
                            disabled={!isValidIP(ipAddress)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ManualIPBlockModal;
