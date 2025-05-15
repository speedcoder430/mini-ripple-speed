import React from "react";

const TabItem = ({ label, isActive, onClick, className = "" }) => {
    const baseClasses = "gap-2.5 self-stretch px-3 py-1.5 my-auto rounded";
    const activeClasses = "bg-blue-800 text-neutral-50";
    const inactiveClasses = "text-blue-800 border border-solid border-[color:var(--Blue-800,#234BAA)]";

    return (
        <button
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
            onClick={onClick}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
        >
            {label}
        </button>
    );
};

export default TabItem;