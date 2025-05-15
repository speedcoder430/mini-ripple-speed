import React from "react";

function RoleLabel({ text }) {
    return (
        <span className="gap-2.5 self-start px-1 py-0.5 text-xs font-bold leading-none whitespace-nowrap bg-blue-500 rounded-sm text-neutral-50">
            {text}
        </span>
    );
}

export default RoleLabel;
