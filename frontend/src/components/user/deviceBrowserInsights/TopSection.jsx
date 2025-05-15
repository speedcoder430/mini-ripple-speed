import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const devices = ["No Device", "Mobile", "Tablet", "Desktop"];
const browsers = ["No Browser", "Chrome", "Firefox", "Edge", "Opera", "Safari"];

const TopSection = () => {
    const [selectedDevice, setSelectedDevice] = useState("No Device");
    const [selectedBrowser, setSelectedBrowser] = useState("No Browser");
    const [openDropdown, setOpenDropdown] = useState(null); // 'device' or 'browser'

    const toggleDropdown = (type) => {
        setOpenDropdown(prev => (prev === type ? null : type));
    };

    const handleDeviceSelect = (device) => {
        setSelectedDevice(device);
        setOpenDropdown(null);
    };

    const handleBrowserSelect = (browser) => {
        setSelectedBrowser(browser);
        setOpenDropdown(null);
    };

    return (
        <div className="flex flex-wrap gap-5 justify-between pr-6 mt-6 w-full max-md:mr-2.5 max-md:max-w-full">
            <div className="flex flex-wrap gap-3 px-6 bg-gradient-to-r from-blue-start to-blue-end font-['Jost'] w-50% max-md:max-w-full">
                {/* Device Dropdown */}
                <div className="relative flex gap-1.5 items-center">
                    <p className="text-base text-slate-900">Blocked</p>
                    <div className="relative">
                        <div
                            className="flex gap-2 items-center px-5 rounded cursor-pointer min-h-[46px]"
                            onClick={() => toggleDropdown("device")}
                        >
                            <p className="text-base font-semibold leading-none text-slate-900 w-[100px]">
                                {selectedDevice}
                            </p>
                            <img
                                src="/page/visitorIpManagement/main-form-12.svg"
                                className={`w-2.5 transition-transform ${openDropdown === "device" ? "rotate-180" : ""}`}
                                alt="Dropdown arrow"
                            />
                        </div>

                        {openDropdown === "device" && (
                            <div className="absolute z-10 mt-3 bg-white shadow-md rounded w-full max-h-60 overflow-y-auto">
                                {devices.map((device) => (
                                    <div
                                        key={device}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                        onClick={() => handleDeviceSelect(device)}
                                    >
                                        {device}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-[2px] max-h-9/12 bg-gray-300 my-2 mr-4"></div>

                {/* Browser Dropdown */}
                <div className="relative flex gap-1.5 items-center">
                    <p className="text-base text-slate-900">Blocked</p>
                    <div className="relative">
                        <div
                            className="flex gap-2 items-center px-5 rounded cursor-pointer min-h-[46px]"
                            onClick={() => toggleDropdown("browser")}
                        >
                            <p className="text-base font-semibold leading-none text-slate-900 w-[100px]">
                                {selectedBrowser}
                            </p>
                            <img
                                src="/page/visitorIpManagement/main-form-12.svg"
                                className={`w-2.5 transition-transform ${openDropdown === "browser" ? "rotate-180" : ""}`}
                                alt="Dropdown arrow"
                            />
                        </div>

                        {openDropdown === "browser" && (
                            <div className="absolute z-10 mt-3 bg-white shadow-md rounded w-full max-h-60 overflow-y-auto">
                                {browsers.map((browser) => (
                                    <div
                                        key={browser}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                        onClick={() => handleBrowserSelect(browser)}
                                    >
                                        {browser}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSection;
