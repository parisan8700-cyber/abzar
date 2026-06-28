"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    setCurrentPage,
    totalPages,
}) {

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, i) => i + 1
            );
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-yellow-400 hover:text-white transition disabled:opacity-40"
            >
                <ChevronRight size={18} />
            </button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span
                        key={index}
                        className="px-2 text-gray-500"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-bold transition
                ${currentPage === page
                                ? "bg-yellow-400 text-white shadow-lg"
                                : "bg-white border hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-yellow-400 hover:text-white transition disabled:opacity-40"
            >
                <ChevronLeft size={18} />
            </button>

        </div>
    );
}