import React from "react";

function InputField({ label, icon, placeholder, type = "text", name, value, onChange }) {
    return (
        <div className="flex flex-col flex-1 shrink basis-0 h-[86px] min-w-60">
            <label className="gap-2.5 self-start py-0.5 text-sm tracking-tight leading-none text-zinc-600 font-['Amble']">
                {label}
            </label>
            <div className="flex justify-between items-center px-3 py-1 mt-2 w-full text-base rounded text-slate-900 border border-gray-200 font-['Jost']">
                <div className="flex flex-1 gap-2 items-center self-stretch my-auto w-[140px]">
                    <img
                        src={icon}
                        alt={`${label} icon`}
                        className="object-contain shrink-0 my-auto w-5 aspect-square"
                    />
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="py-4 px-2 flex-1 bg-slate-50 focus:outline-none focus:border-none focus:ring-0"
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    );
}

export default InputField;
