import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "./Button";
import TopNavBar from "./TopNavBar";
import MobileNav from "./MobileNav";

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    const [showTopNav, setShowTopNav] = useState(false);
    const topNavRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileNavRef = useRef(null);
    const mobileToggleButtonRef = useRef(null);

    const handleCloseMobileMenu = () => setShowMobileMenu(false);

    const navItemClass = (matchPath) =>
        `gap-3 self-stretch px-4 md:py-8 lg:py-8 h-full whitespace-nowrap max-md:px-5 ${path === matchPath
            ? "text-white font-semibold bg-blue-700 bg-opacity-20 border-b-[6px] border-b-[#245BD1]"
            : "text-neutral-50 hover:bg-blue-600 hover:bg-opacity-10"
        }`;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                mobileNavRef.current &&
                !mobileNavRef.current.contains(event.target) &&
                mobileToggleButtonRef.current && !mobileToggleButtonRef.current.contains(event.target)
            ) {
                setShowMobileMenu(false);
            }
        }

        if (showMobileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileMenu]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                topNavRef.current &&
                !topNavRef.current.contains(event.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(event.target)
            ) {
                setShowTopNav(false);
            }
        }

        if (showTopNav) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showTopNav]);

    return (
        <nav className="flex flex-wrap w-full md:w-full lg:w-[95%] sm:gap-0 md:gap-6 lg:gap-10 justify-center items-center md:px-5 lg:px-6 md:mx-0 lg:mx-6 text-base rounded-none md:rounded-none border-b-[#FBD020] border-b-[2px] md:border-b-[#FBD020] md:border-b-[2px] lg:border-none lg:rounded-3xl shadow-md shadow-[#0007] bg-[#011732B3] backdrop-blur-xl fixed top-0 md:top-0 lg:top-[38px] z-[100] font-['Jost'] max-w-[1240px] max-md:px-5 max-md:max-w-full">
            <div
                ref={toggleButtonRef}
                className="hidden sm:hidden md:block lg:hidden"
                onClick={() => setShowTopNav(prev => !prev)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                    <path d="M37.5 32.8125C38.2223 32.8129 38.9167 33.0911 39.4395 33.5895C39.9622 34.088 40.2731 34.7684 40.3079 35.4898C40.3426 36.2113 40.0984 36.9184 39.6259 37.4648C39.1535 38.0111 38.4889 38.3547 37.77 38.4244L37.5 38.4375H7.5C6.77772 38.4371 6.08326 38.1589 5.56053 37.6605C5.03779 37.162 4.72685 36.4816 4.69214 35.7602C4.65743 35.0387 4.90161 34.3316 5.37408 33.7852C5.84655 33.2389 6.51109 32.8953 7.23 32.8256L7.5 32.8125H37.5ZM37.5 19.6875C38.2459 19.6875 38.9613 19.9838 39.4887 20.5113C40.0162 21.0387 40.3125 21.7541 40.3125 22.5C40.3125 23.2459 40.0162 23.9613 39.4887 24.4887C38.9613 25.0162 38.2459 25.3125 37.5 25.3125H7.5C6.75408 25.3125 6.03871 25.0162 5.51126 24.4887C4.98382 23.9613 4.6875 23.2459 4.6875 22.5C4.6875 21.7541 4.98382 21.0387 5.51126 20.5113C6.03871 19.9838 6.75408 19.6875 7.5 19.6875H37.5ZM37.5 6.5625C38.2459 6.5625 38.9613 6.85882 39.4887 7.38626C40.0162 7.91371 40.3125 8.62908 40.3125 9.375C40.3125 10.1209 40.0162 10.8363 39.4887 11.3637C38.9613 11.8912 38.2459 12.1875 37.5 12.1875H7.5C6.75408 12.1875 6.03871 11.8912 5.51126 11.3637C4.98382 10.8363 4.6875 10.1209 4.6875 9.375C4.6875 8.62908 4.98382 7.91371 5.51126 7.38626C6.03871 6.85882 6.75408 6.5625 7.5 6.5625H37.5Z" fill="#DFEDFA" />
                </svg>
            </div>
            <div className="flex-1 md:flex-1 lg:flex-grow-0">
                <Link to="/">
                    <img
                        src="/landing/logo.png"
                        className="object-contain shrink-0 my-auto mr-[94px] aspect-[3.88] max-w-[120px]"
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="hidden lg:flex overflow-hidden flex-wrap pr-6 h-full rounded-3xl border-2 border-solid border-[#FBD020] min-w-60 max-md:max-w-full">
                <div className="flex my-auto whitespace-nowrap min-w-60">
                    <Link to="/" className={navItemClass("/")}>
                        Home
                    </Link>
                    <Link to="/pricing" className={navItemClass("/pricing")}>
                        Pricing
                    </Link>
                    <Link to="/support" className={navItemClass("/support")}>
                        Support
                    </Link>
                </div>
                <div className="flex gap-6 h-full">
                    <Link to="/login" className={navItemClass("/login")}>
                        Login
                    </Link>
                    <Link to="/register" className="self-stretch my-auto text-600 text-[#011732]">
                        <Button variant="primary">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="hidden sm:hidden md:flex lg:hidden gap-6 h-full">
                <Link to="/login" className={navItemClass("/login")}>
                    Login
                </Link>
                <Button variant="primary" className="self-stretch my-auto text-600 text-[#011732]">
                    Sign Up
                </Button>
            </div>
            <div
                ref={topNavRef}
                className={`transition-all duration-300 ease-in-out absolute top-[100%] left-0 z-50 ${showTopNav ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
                    }`}
            >
                <TopNavBar />
            </div>
            <div ref={mobileToggleButtonRef} className="block md:hidden py-4" onClick={() => setShowMobileMenu(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M23.3332 20.4168C23.7826 20.4171 24.2147 20.5902 24.54 20.9003C24.8652 21.2104 25.0587 21.6338 25.0803 22.0827C25.1019 22.5316 24.9499 22.9716 24.656 23.3116C24.362 23.6515 23.9485 23.8653 23.5012 23.9087L23.3332 23.9168H4.6665C4.21708 23.9166 3.78498 23.7435 3.45972 23.4334C3.13446 23.1232 2.94099 22.6998 2.91939 22.2509C2.89779 21.802 3.04973 21.362 3.34371 21.0221C3.63769 20.6822 4.05118 20.4684 4.4985 20.425L4.6665 20.4168H23.3332ZM23.3332 12.2502C23.7973 12.2502 24.2424 12.4345 24.5706 12.7627C24.8988 13.0909 25.0832 13.536 25.0832 14.0002C25.0832 14.4643 24.8988 14.9094 24.5706 15.2376C24.2424 15.5658 23.7973 15.7502 23.3332 15.7502H4.6665C4.20238 15.7502 3.75726 15.5658 3.42907 15.2376C3.10088 14.9094 2.9165 14.4643 2.9165 14.0002C2.9165 13.536 3.10088 13.0909 3.42907 12.7627C3.75726 12.4345 4.20238 12.2502 4.6665 12.2502H23.3332ZM23.3332 4.0835C23.7973 4.0835 24.2424 4.26787 24.5706 4.59606C24.8988 4.92425 25.0832 5.36937 25.0832 5.8335C25.0832 6.29762 24.8988 6.74274 24.5706 7.07093C24.2424 7.39912 23.7973 7.5835 23.3332 7.5835H4.6665C4.20238 7.5835 3.75726 7.39912 3.42907 7.07093C3.10088 6.74274 2.9165 6.29762 2.9165 5.8335C2.9165 5.36937 3.10088 4.92425 3.42907 4.59606C3.75726 4.26787 4.20238 4.0835 4.6665 4.0835H23.3332Z" fill="#F5FAFF" />
                </svg>
            </div>
            <div
                ref={mobileNavRef}
                className={`transition-all duration-300 ease-in-out fixed top-[100%] right-0 z-50 w-full max-w-[242px] ${showMobileMenu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[-242px] pointer-events-none"
                    }`}
            >
                <MobileNav onClose={handleCloseMobileMenu} />
            </div>
        </nav>
    );
};

export default Navbar;
