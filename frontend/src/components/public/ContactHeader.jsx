import React from "react";

function ContactHeader() {
    return (
        <div className="z-[10]">
            <h2 className="mb-4 text-2xl font-semibold font-['Jost'] leading-7 text-yellow-400 max-md:text-2xl max-sm:text-xl">
                Help
            </h2>
            <h1 className="mb-4 text-[40px] tracking-wider text-neutral-50 font-['Anton'] max-md:text-4xl max-sm:text-3xl">
                Contact Our Support Team
            </h1>
            <p className="mb-4 text-base text-neutral-300 font-['Jost'] max-md:text-base max-sm:text-sm">
                We're here to assist you with any issues or questions you may have.
            </p>
        </div>
    );
}

export default ContactHeader;