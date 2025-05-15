import React from "react";

function DomainSection() {
    return (
        <section className="flex flex-wrap gap-10 justify-between items-center px-6 mt-6 w-full font-['Jost'] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-6 items-center self-stretch my-auto max-md:max-w-full">
                <h2 className="self-stretch my-auto text-2xl tracking-tighter leading-none text-blue-500 font-['Amble']">
                    domainname.com
                </h2>
                <button className="gap-2.5 self-stretch px-3 py-1.5 my-auto text-base bg-blue-800 rounded text-neutral-50">
                    Change Domain
                </button>
            </div>
            <button className="gap-2.5 self-stretch px-6 py-3.5 my-auto text-base font-semibold leading-none rounded-md bg-slate-900 text-neutral-50 max-md:px-5">
                Connect Your Domain
            </button>
        </section>
    );
}

export default DomainSection;
