import React from "react";

const VpnToggle = ({ enabled, onToggle }) => (
    <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-black">Enable VPN</p>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={enabled} onChange={onToggle} />
            <div className="w-8 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-400 relative">
                <span className="absolute left-0 top-[-2px] bg-blue-600 h-5 w-5 rounded-full transition-transform peer-checked:translate-x-full" />
            </div>
        </label>
    </div>
);

export default VpnToggle;
