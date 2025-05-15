import React from "react";

function SuccessButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="gap-2.5 self-stretch px-6 py-3.5 w-full text-base font-semibold leading-none rounded-md bg-slate-900 text-neutral-50 cursor-pointer"
        >
            {children}
        </button>
    );
}

export default SuccessButton;
