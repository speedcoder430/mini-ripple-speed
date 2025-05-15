import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav
            className="flex flex-wrap gap-2 items-start self-end px-5 py-2.5 mt-6 mr-6 rounded shadow-sm bg-neutral-50 max-md:mr-2.5 max-md:max-w-full"
            aria-label="Pagination"
        >
            <button
                className="flex gap-1.5 justify-center items-center py-1.5 pr-2.5 text-sm font-bold tracking-tight leading-none whitespace-nowrap rounded shadow-sm bg-neutral-50 text-zinc-600"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/54a7650a6df24178434ffc54a8cae312150a9689?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    alt="Previous page"
                />
                <span className="self-stretch my-auto">Previous</span>
            </button>

            {pageNumbers.map((item, idx) =>
                item === "..." ? (
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/25c05ef34a532329029c18d398d44fb49f2ab3d3?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                        className="object-contain self-stretch my-auto w-6 mx-[6px] aspect-square"
                        alt="More pages"
                    />
                ) : (
                    <button
                        key={idx}
                        onClick={() => onPageChange(item)}
                        className={`w-[36px] h-[35px] py-1.5 rounded text-sm font-bold ${currentPage === item
                            ? "bg-blue-800 text-white"
                            : "bg-neutral-100 text-zinc-600"
                            }`}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                className="flex gap-1.5 justify-center items-center py-1.5 pl-2.5 text-sm font-bold tracking-tight leading-none whitespace-nowrap rounded shadow-sm bg-neutral-50 text-zinc-600"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <span className="self-stretch my-auto">Next</span>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b5842ef7eefb59fa4d2837fdac946ae1090c25e?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    alt="Next page"
                />
            </button>
        </nav>
    );
}

export default Pagination;
