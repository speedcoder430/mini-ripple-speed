import React, { useState, useRef, useEffect } from "react";

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className="flex flex-col relative justify-center py-3 mt-4 w-full rounded-lg bg-neutral-50 first:mt-0 transition-all">
            <button
                className="flex flex-wrap gap-2.5 items-center px-6 py-2.5 w-full text-left max-md:px-5 max-md:max-w-full"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h3 className="flex-1 shrink self-stretch my-auto basis-0 text-xl font-bold font-['Amble'] tracking-tight leading-tight text-slate-900 max-md:max-w-full">
                    {question}
                </h3>
                <img
                    src="/landing/faqitem.svg"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square transition-transform duration-300"
                    alt={isOpen ? "Collapse" : "Expand"}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
            </button>

            <div
                ref={contentRef}
                style={{ maxHeight: `${height}px` }}
                className="transition-max-height duration-500 ease-in-out overflow-hidden px-6 max-md:px-5"
            >
                <div className="pb-2.5 text-base text-neutral-600 font-['Jost']">{answer}</div>
            </div>
        </div>
    );
};

export default FaqItem;
