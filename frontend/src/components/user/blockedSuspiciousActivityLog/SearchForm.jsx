import React, { useState } from "react";

const filterOptions = ["All", "IP Address", "Added On", "Last Activity", "Location"];

function SearchForm() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");

    const toggleFilterDropdown = () => setShowFilterDropdown(prev => !prev);
    const handleFilterSelect = (option) => {
        setSelectedFilter(option);
        setShowFilterDropdown(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex flex-wrap gap-5 justify-between mt-5 px-6 w-full max-md:mr-2.5 max-md:max-w-full">
            <div className="flex flex-wrap gap-6 items-start self-start max-md:max-w-full">
                <div className="flex rounded-[6px] overflow-hidden border-2 border-blue-800">
                    <div className="flex items-center justify-center rounded-br-[4px] rounded-tr-[4px] px-4 bg-blue-800">
                        <img
                            src="/page/visitorIpManagement/main-form-9.svg"
                            className="w-[15px]"
                            alt="Search"
                        />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="flex-1 p-2.5 text-sm text-[#4D5158]"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={toggleFilterDropdown}
                        className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
                    >
                        <img
                            src="/page/visitorIpManagement/main-form-10.svg"
                            className="w-5"
                            alt="Filter"
                        />
                        {selectedFilter}
                    </button>
                    {showFilterDropdown && (
                        <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                            {filterOptions.map((option) => (
                                <div
                                    key={option}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                    onClick={() => handleFilterSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default SearchForm;