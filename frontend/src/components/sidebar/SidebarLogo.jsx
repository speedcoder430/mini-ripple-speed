import React from "react";
import { Link } from "react-router-dom";

const SidebarLogo = ({ isCollapsed, toggleSidebar }) => {
    return (
        <header
            className={`flex relative flex-col px-6 justify-center rounded-2xl ${isCollapsed ? "items-start py-0 lg:px-0 justify-center" : "items-start lg:px-6 py-6 lg:justify-start"} w-full h-[77px] bg-slate-900`}
        >
            <Link to="/" className="hidden lg:block">
                {isCollapsed ?
                    (
                        <img
                            src="/landing/logo-2.png"
                            className="object-contain z-0 aspect-[3.88] w-[90px] h-[25px]"
                            alt="Logo"
                        />
                    ) : (
                        <img
                            src="/landing/logo.png"
                            className="object-contain z-0 aspect-[3.88] w-[120px]"
                            alt="Logo"
                        />
                    )}
            </Link>
            <Link to="/" className="block lg:hidden">
                <img
                    src="/landing/logo.png"
                    className="object-contain z-0 aspect-[3.88] w-[120px]"
                    alt="Logo"
                />
            </Link>
            <button
                onClick={toggleSidebar}
                className="hidden lg:flex object-contain absolute -right-4 top-2/4 z-0 w-8 h-8 -translate-y-2/4 aspect-[1/1] translate-x-[0%] cursor-pointer"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/79cd8de5d2f1847c936350ba8fcdaa91b0996785?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                    className="w-full h-full"
                    alt=""
                />
            </button>
        </header>
    );
};

export default SidebarLogo;
