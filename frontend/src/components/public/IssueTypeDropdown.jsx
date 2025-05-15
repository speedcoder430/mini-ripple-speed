import React, { useState } from "react";

function IssueTypeDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative mb-6">
            <button
                type="button"
                className="flex items-center justify-between px-2.5 py-1.5 bg-yellow-400 rounded w-[141px]"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-xs font-medium tracking-normal text-slate-900 max-md:text-base max-sm:text-sm">
                    Issue Type
                </span>
                <DropdownIcon />
            </button>

            {isOpen && (
                <ul
                    className="absolute top-full left-0 mt-1 w-[141px] bg-[#011732] text-white rounded shadow-lg z-10"
                    role="listbox"
                >
                    <li
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
                        role="option"
                        onClick={() => setIsOpen(false)}
                    >
                        Setup & Installation
                    </li>
                    <li
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
                        role="option"
                        onClick={() => setIsOpen(false)}
                    >
                        Account & Billing
                    </li>
                    <li
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
                        role="option"
                        onClick={() => setIsOpen(false)}
                    >
                        Technical Issue
                    </li>
                    <li
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
                        role="option"
                        onClick={() => setIsOpen(false)}
                    >
                        Feature Request
                    </li>
                    <li
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
                        role="option"
                        onClick={() => setIsOpen(false)}
                    >
                        Other
                    </li>
                </ul>
            )}
        </div>
    );
}

function DropdownIcon() {
    return (
        <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dropdown-icon"
            style={{ width: "14px", height: "18px", marginLeft: "8px" }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.54662 11.6543C7.40597 11.7949 7.21524 11.8739 7.01637 11.8739C6.8175 11.8739 6.62677 11.7949 6.48612 11.6543L2.24337 7.41154C2.17174 7.34235 2.1146 7.25959 2.07529 7.16809C2.03599 7.07659 2.0153 6.97817 2.01443 6.87859C2.01357 6.779 2.03254 6.68024 2.07025 6.58807C2.10797 6.4959 2.16365 6.41216 2.23407 6.34174C2.30449 6.27132 2.38823 6.21563 2.4804 6.17792C2.57258 6.14021 2.67134 6.12123 2.77092 6.1221C2.87051 6.12296 2.96892 6.14365 3.06042 6.18296C3.15193 6.22227 3.23469 6.2794 3.30387 6.35104L7.01637 10.0635L10.7289 6.35104C10.8703 6.21442 11.0598 6.13882 11.2564 6.14053C11.4531 6.14224 11.6412 6.22112 11.7802 6.36017C11.9193 6.49923 11.9982 6.68734 11.9999 6.88399C12.0016 7.08063 11.926 7.27009 11.7894 7.41154L7.54662 11.6543Z"
                fill="#011732"
            />
        </svg>
    );
}

export default IssueTypeDropdown;
