import React from "react";

const Button = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    style = {},
}) => {
    const baseClasses =
        "text-[12.472px] font-semibold leading-none rounded-md transition-all duration-200";

    const variantClasses = {
        primary: "bg-yellow-400 text-slate-900 px-4 md:px-6 py-3.5",
        secondary:
            "text-yellow-400 border-solid border-[1.5px] border-yellow-400 px-4 md:px-6 py-3.5",
        blue: "bg-blue-700 text-neutral-50 px-4 md:px-6 py-3.5",
        dark: "bg-slate-900 text-neutral-50 px-4 md:px-6 py-3.5",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
