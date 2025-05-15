import React, { useState } from "react";

const Dropdown = ({ label, options, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded cursor-pointer bg-white"
                onClick={() => setOpen(!open)}
            >
                <span>{label}</span>
                <img
                    src="..."
                    className={`w-3 transition-transform ${open ? "rotate-180" : ""}`}
                    alt="Dropdown"
                />
            </button>
            {open && (
                <div className="absolute z-10 mt-2 w-full bg-white border shadow-lg rounded max-h-60 overflow-y-auto">
                    {options.map((item) => (
                        <div
                            key={item}
                            onClick={() => {
                                onSelect(item);
                                setOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-slate-900 hover:bg-blue-100 cursor-pointer"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
