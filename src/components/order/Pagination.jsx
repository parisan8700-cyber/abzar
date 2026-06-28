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

    return (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

            <button
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-yellow-400 hover:text-white transition disabled:opacity-40"
            >
                <ChevronRight size={18} />
            </button>

            {pages.map((page) => (

                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold transition

                        ${currentPage === page
                            ? "bg-yellow-400 text-white shadow-lg"
                            : "bg-white border hover:bg-gray-100"
                        }

                    `}
                >
                    {page}
                </button>

            ))}

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