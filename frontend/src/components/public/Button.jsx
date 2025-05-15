import React from "react";

const Button = ({ children, variant = "primary", className = "", onClick }) => {
    const baseClasses = "px-4 md:px-6 py-3.5 text-[12.472px] font-semibold leading-none rounded-md";

    const variantClasses = {
        primary: "bg-yellow-400 text-slate-900",
        secondary: "text-yellow-400 border-solid border-[1.5px] border-yellow-400",
        blue: "bg-blue-700 text-neutral-50",
        dark: "bg-slate-900 text-neutral-50",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
