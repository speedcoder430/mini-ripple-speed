import React from "react";

function ActionButton({ text, variant = "blue", onClick, className = "" }) {
    const variantStyles = {
        blue: "text-blue-800 border-[#234BAA]",
        red: "text-red-600 border-[#DC2626]"
    };

    return (
        <button
            className={`gap-2.5 self-stretch px-3 py-1.5 w-full rounded border-2 border-solid ${variantStyles[variant]} ${className}`}
            onClick={onClick}
            type="button"
        >
            {text}
        </button>
    );
}

export default ActionButton;
