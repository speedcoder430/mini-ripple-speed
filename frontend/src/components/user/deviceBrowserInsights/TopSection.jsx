import React, { useState } from "react";
import { useDeviceFilter } from "./DeviceFilterProvider";

const devices = ["Mobile", "Tablet", "Desktop", "Other"];
const browsers = ["Chrome", "Firefox", "Edge", "Opera", "Safari", "Other"];

const TopSection = () => {
    const {
        blockedDevices,
        blockedBrowsers,
        addDevice,
        removeDevice,
        addBrowser,
        removeBrowser,
    } = useDeviceFilter();

    const [deviceSearch, setDeviceSearch] = useState("");
    const [browserSearch, setBrowserSearch] = useState("");
    const [deviceDropdownOpen, setDeviceDropdownOpen] = useState(false);
    const [browserDropdownOpen, setBrowserDropdownOpen] = useState(false);

    return (
        <div className="flex flex-wrap gap-3 px-6 bg-gradient-to-r from-blue-start to-blue-end py-3 my-3">
            {/* Devices */}
            <div className="relative flex flex-col gap-1.5 min-w-[240px]">
                <p className="text-base text-slate-900">Blocked Devices</p>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Select device types..."
                        value={deviceSearch}
                        onChange={(e) => setDeviceSearch(e.target.value)}
                        onFocus={() => setDeviceDropdownOpen(true)}
                    />
                    {deviceDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto">
                            {devices
                                .filter((d) => d.toLowerCase().includes(deviceSearch.toLowerCase()))
                                .map((device) => (
                                    <div
                                        key={device}
                                        className="px-4 py-2 text-sm text-slate-900 hover:bg-blue-100 cursor-pointer"
                                        onMouseDown={() => {
                                            addDevice(device);
                                            setDeviceSearch("");
                                            setDeviceDropdownOpen(false);
                                        }}
                                    >
                                        {device}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Selected Devices Tags */}
                {blockedDevices.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {blockedDevices.map((device) => (
                            <div
                                key={device}
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-800"
                            >
                                {device}
                                <button
                                    onClick={() => removeDevice(device)}
                                    className="text-blue-800 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Browsers */}
            <div className="relative flex flex-col gap-1.5 min-w-[240px]">
                <p className="text-base text-slate-900">Blocked Browsers</p>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Select browsers..."
                        value={browserSearch}
                        onChange={(e) => setBrowserSearch(e.target.value)}
                        onFocus={() => setBrowserDropdownOpen(true)}
                    />
                    {browserDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto">
                            {browsers
                                .filter((b) => b.toLowerCase().includes(browserSearch.toLowerCase()))
                                .map((browser) => (
                                    <div
                                        key={browser}
                                        className="px-4 py-2 text-sm text-slate-900 hover:bg-blue-100 cursor-pointer"
                                        onMouseDown={() => {
                                            addBrowser(browser);
                                            setBrowserSearch("");
                                            setBrowserDropdownOpen(false);
                                        }}
                                    >
                                        {browser}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Selected Browsers Tags */}
                {blockedBrowsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {blockedBrowsers.map((browser) => (
                            <div
                                key={browser}
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-800"
                            >
                                {browser}
                                <button
                                    onClick={() => removeBrowser(browser)}
                                    className="text-blue-800 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default TopSection;
