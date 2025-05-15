import React from "react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

const TopNavBar = () => {
    return (
        <nav className="rounded-br-[20px] border-2 border-[#FBD020] bg-[#011732] shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15),0px_4px_4px_rgba(0,0,0,0.30)] backdrop-blur-[100px] flex w-[242px] py-6 flex-col items-start gap-6">
            <ul className="flex flex-col justify-center w-full">
                <Link to="/">
                    <NavLink text="Home" />
                </Link>
                <Link to="/pricing">
                    <NavLink text="Pricing" isSpaced />
                </Link>
                <Link to="/support">
                    <NavLink text="Support" isSpaced />
                </Link>
            </ul>
            <div className="flex gap-6 mt-6 w-full min-h-[46px]" />
        </nav>
    );
}

export default TopNavBar;
