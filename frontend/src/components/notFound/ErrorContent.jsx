import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function ErrorContent() {
    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            // Set the text content of the SVG to "404"
            svgRef.current.textContent = "404";
        }
    }, []);

    return (
        <section className="flex relative flex-col justify-center items-center top-[-140px]">
            <img
                src="/notFound/not-found.png"
                className="mt-0 h-[290px] w-[393px] max-sm:h-[220px] max-sm:w-[300px] z-[10]"
                alt="Feeling Blue"
            />
            <div className="flex flex-col items-center justify-center absolute z-[0] top-[180px] md:top-[150px]">
                <h1 className="font-[Amble] text-[128px] md:text-[370.482px] font-bold leading-none tracking-[-6.4px] md:tracking-[-18.524px] text-stroke text-white">
                    404
                </h1>
                <h1 className="mt-2 text-2xl text-slate-900 max-sm:text-xl text-center font-['Amble']">
                    Page Not Found
                </h1>
                <Link to="/">
                    <button className="px-6 py-3.5 mt-8 text-base font-bold rounded-md bg-slate-900 text-neutral-50 max-sm:px-4 max-sm:py-2.5 max-sm:text-sm">
                        Back To Home
                    </button>
                </Link>
            </div>
        </section>
    );
}

export default ErrorContent;
