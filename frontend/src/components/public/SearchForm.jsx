import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex justify-between items-center rounded-md border-blue-800 border-solid border-[1.5px] w-[487px] max-md:w-full max-sm:w-full">
      <button aria-label="Search" className="flex-shrink-0">
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        className="gap-2.5 self-stretch p-2.5 text-sm tracking-tight leading-5 flex-[1_0_0] placeholder-[#4D5158] max-sm:w-full bg-transparent outline-none font-['Amble']"
      />
    </div>
  );
};

export default SearchForm;