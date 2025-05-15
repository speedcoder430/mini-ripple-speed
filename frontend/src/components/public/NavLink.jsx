import React from "react";

const NavLink = ({ text, isSpaced = false }) => {
    return (
        <li
            className={`gap-3 self-stretch px-6 py-2.5 text-white w-full ${isSpaced ? "mt-3" : ""}`}
        >
            {text}
        </li>
    );
}

export default NavLink;
