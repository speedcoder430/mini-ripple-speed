import React from "react";
import NavLink from "./NavLink";
import Button from "./Button";
import { Link } from "react-router-dom";

const MobileNav = () => (
    <nav className="flex absolute right-0 top-[100%] w-[242px] p-[4px_10px] flex-col items-start gap-6 rounded-bl-[20px] border-2 border-[#FBD020] bg-[rgba(1,23,50)] shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15),0px_4px_4px_0px_rgba(0,0,0,0.30)] backdrop-blur-[100px]">
        <ul className="flex flex-col justify-center w-full whitespace-nowrap text-neutral-50">
            <Link to="/">
                <NavLink text="Home" isSpaced />
            </Link>
            <Link to="/pricing">
                <NavLink text="Pricing" isSpaced />
            </Link>
            <Link to="/support">
                <NavLink text="Support" isSpaced />
            </Link>
        </ul>
        <div className="flex flex-col mt-6 w-full">
            <Link to="/login">
                <ul>
                    <NavLink text="Login" isSpaced />
                </ul>
            </Link>
            <Link to="/register" className="mx-3 mb-6">
                <Button className="mt-6 w-[100px]" >Sign Up</Button>
            </Link>
        </div>
    </nav>
);

export default MobileNav;
