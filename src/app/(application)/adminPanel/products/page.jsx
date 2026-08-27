
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";
import {
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // جستجو
    const [search, setSearch] = useState("");

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await Fetch.get("/api/products");
                setProducts(res.data);
            } catch (err) {
                toast.error("خطا در دریافت محصولات");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // فیلتر محصولات بر اساس جستجو
    const filteredProducts = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        if (!searchValue) {
            return products;
        }

        return products.filter((product) => {
            const productName = product.name?.toLowerCase() || "";

            const categories =
                product.categories
                    ?.map((cat) =>
                        cat.parent
                            ? cat.parent.name
                            : cat.name
                    )
                    .join(" ")
                    .toLowerCase() || "";

            return (
                productName.includes(searchValue) ||
                categories.includes(searchValue)
            );
        });
    }, [products, search]);

    // وقتی عبارت جستجو تغییر کرد، برگرد به صفحه اول
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // تعداد صفحات بر اساس نتایج فیلترشده
    const totalPages = Math.ceil(
        filteredProducts.length / ITEMS_PER_PAGE
    );

    // محصولات صفحه فعلی
    const currentProducts = useMemo(() => {
        const start =
            (currentPage - 1) * ITEMS_PER_PAGE;

        return filteredProducts.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setDeleteId(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        try {
            await Fetch.delete(
                `/api/products/${deleteId}`,
                { token: true }
            );

            setProducts((prev) =>
                prev.filter(
                    (p) => p._id !== deleteId
                )
            );

            toast.success("محصول با موفقیت حذف شد");
        } catch (err) {
            toast.error("خطا در حذف محصول");
        } finally {
            cancelDelete();
        }
    };

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(
                    1,
                    2,
                    3,
                    "...",
                    totalPages
                );
            } else if (
                currentPage >= totalPages - 2
            ) {
                pages.push(
                    1,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage,
                    "...",
                    totalPages
                );
            }
        }

        return pages;
    };


    const goToPage = () => {
        const page = Number(pageInput);

        if (!pageInput || isNaN(page)) {
            toast.error("شماره صفحه را وارد کنید");
            return;
        }

        if (page < 1 || page > totalPages) {
            toast.error(`شماره صفحه باید بین ۱ تا ${totalPages} باشد`);
            return;
        }

        setCurrentPage(page);
        setPageInput("");
    };


    const handlePageInputKeyDown = (e) => {
        if (e.key === "Enter") {
            goToPage();
        }
    };

    return (
        <div
            className="min-h-screen p-6"
            dir="rtl"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

                <h1 className="text-3xl font-extrabold drop-shadow-md text-center sm:text-right">
                    مدیریت محصولات
                </h1>

                <Link
                    href="/adminPanel/products/new"
                    className="
                        bg-yellow-400
                        hover:bg-yellow-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        text-center
                        font-semibold
                        shadow-md
                        transition
                        duration-300
                    "
                >
                    محصول جدید +
                </Link>

            </div>

            {/* Search */}
            <div className="mb-6">

                <div className="relative w-full">

                    <Search
                        size={20}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            pointer-events-none
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="جستجوی محصول..."
                        className="
                            w-full
                            h-12
                            pr-11
                            pl-4
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            outline-none
                            text-sm
                            transition
                            focus:border-yellow-400
                            focus:ring-2
                            focus:ring-yellow-100
                            shadow-sm
                        "
                    />

                </div>

            </div>

            {/* Products */}
            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-white bg-white">

                    <table className="min-w-full text-gray-800 text-sm">

                        <thead className="bg-yellow-400 text-white">

                            <tr>

                                <th className="text-right py-4 px-6 font-semibold">
                                    نام
                                </th>

                                <th className="text-right py-4 px-6 font-semibold">
                                    قیمت
                                </th>

                                <th className="text-right py-4 px-6 font-semibold">
                                    موجودی
                                </th>

                                <th className="text-right py-4 px-6 font-semibold">
                                    دسته‌بندی
                                </th>

                                <th className="text-right py-4 px-6 font-semibold">
                                    عملیات
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentProducts.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        {search.trim()
                                            ? "محصولی با این عبارت پیدا نشد"
                                            : "محصولی یافت نشد"}
                                    </td>

                                </tr>

                            )}

                            {currentProducts.map((product) => (

                                <tr
                                    key={product._id}
                                    className="
                                        border-t
                                        border-gray-200
                                        hover:bg-[#fff8df]
                                        transition
                                    "
                                >

                                    <td className="py-3 px-6 font-bold">
                                        {product.name}
                                    </td>

                                    <td className="py-3 px-6 font-semibold">
                                        {product.price?.toLocaleString()} تومان
                                    </td>

                                    <td className="py-3 px-6">
                                        {product.stock <= 0 ? (
                                            <span className="text-red-600 font-bold">
                                                اتمام موجودی
                                            </span>
                                        ) : (
                                            <span className="text-green-600 font-bold">
                                                {product.stock.toLocaleString("fa-IR")} عدد
                                            </span>
                                        )}
                                    </td>

                                    <td className="py-3 px-6">

                                        {[
                                            ...new Set(
                                                product.categories?.map(
                                                    (cat) =>
                                                        cat.parent
                                                            ? cat.parent.name
                                                            : cat.name
                                                )
                                            ),
                                        ].join("، ") || "-"}

                                    </td>

                                    <td className="py-3 px-6">

                                        <div className="flex gap-5">

                                            <button
                                                onClick={() =>
                                                    openDeleteModal(
                                                        product._id
                                                    )
                                                }
                                                className="
                                                    text-red-600
                                                    font-semibold
                                                    hover:underline
                                                    transition
                                                "
                                            >
                                                حذف
                                            </button>

                                            <Link
                                                href={`/adminPanel/products/edit/${product._id}`}
                                                className="
                                                    text-yellow-500
                                                    font-semibold
                                                    hover:underline
                                                    transition
                                                "
                                            >
                                                ویرایش
                                            </Link>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (

                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">

                    <div className="bg-white rounded-2xl p-8 w-[350px] max-w-full mx-4 shadow-2xl text-center">

                        <p className="mb-8 text-xl font-semibold text-gray-900">
                            آیا از حذف محصول مطمئن هستید؟
                        </p>

                        <div className="flex justify-center gap-6">

                            <button
                                onClick={confirmDelete}
                                className="
                                    flex-1
                                    py-3
                                    rounded-lg
                                    bg-red-600
                                    text-white
                                    font-semibold
                                    hover:bg-red-700
                                    transition
                                "
                                autoFocus
                            >
                                حذف
                            </button>

                            <button
                                onClick={cancelDelete}
                                className="
                                    flex-1
                                    py-3
                                    rounded-lg
                                    bg-gray-200
                                    text-gray-700
                                    font-semibold
                                    hover:bg-gray-300
                                    transition
                                "
                            >
                                انصراف
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* Pagination */}
            {/* Pagination */}
            {totalPages > 1 && (

                <div className="mt-8 flex flex-col items-center gap-5">

                    {/* Pagination Buttons */}
                    <div className="flex justify-center items-center gap-2 flex-wrap">

                        {/* Previous */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="
                    w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    bg-white
                    disabled:opacity-40
                    hover:bg-yellow-400
                    hover:text-white
                    transition
                "
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* Page Numbers */}
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
                                    key={index}
                                    onClick={() =>
                                        setCurrentPage(page)
                                    }
                                    className={`
                            w-10
                            h-10
                            rounded-xl
                            transition-all
                            ${currentPage === page
                                            ? "bg-yellow-400 text-white shadow-lg scale-105"
                                            : "bg-white border hover:bg-yellow-100"
                                        }
                        `}
                                >
                                    {page}
                                </button>

                            )
                        )}

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="
                    w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    bg-white
                    disabled:opacity-40
                    hover:bg-yellow-400
                    hover:text-white
                    transition
                "
                        >
                            <ChevronLeft size={18} />
                        </button>

                    </div>

                    {/* Go To Page */}
                    <div className="flex items-center gap-2">

                        <span className="text-sm text-gray-600">
                            برو به صفحه:
                        </span>

                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={pageInput}
                            onChange={(e) =>
                                setPageInput(e.target.value)
                            }
                            onKeyDown={handlePageInputKeyDown}
                            placeholder={currentPage.toString()}
                            className="
                    w-20
                    h-10
                    px-3
                    text-center
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    outline-none
                    text-sm
                    focus:border-yellow-400
                    focus:ring-2
                    focus:ring-yellow-100
                    shadow-sm
                "
                        />

                        <button
                            type="button"
                            onClick={goToPage}
                            className="
                    h-10
                    px-4
                    rounded-xl
                    bg-yellow-400
                    text-white
                    font-semibold
                    hover:bg-yellow-500
                    transition
                    shadow-sm
                "
                        >
                            برو
                        </button>

                        <span className="text-sm text-gray-500">
                            از {totalPages}
                        </span>

                    </div>

                </div>

            )}

        </div>
    );
}
