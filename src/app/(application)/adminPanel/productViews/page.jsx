"use client";

import React, { useEffect, useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";

import MiniLoading from "@/components/shared/loading/MiniLoading";

import Fetch from "@/utils/Fetch";

import toast from "react-hot-toast";

const SEARCH_LIMIT = 10;

const RANGE_OPTIONS = [
    { value: "today", label: "امروز" },
    { value: "yesterday", label: "دیروز" },
    { value: "7days", label: "۷ روز گذشته" },
    { value: "30days", label: "۳۰ روز گذشته" },
    { value: "3months", label: "۳ ماه گذشته" },
    { value: "6months", label: "۶ ماه گذشته" },
    { value: "1year", label: "۱ سال گذشته" },
    { value: "all", label: "همه زمان‌ها" },
];

const BASE_URL = "/api/admin/product-analytics";

const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("fa-IR");
};

const getImageUrl = (image) => {
    if (!image) return null;

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    if (image.startsWith("/")) {
        return image;
    }

    return `/ ${image} `;

};

export default function ProductViewsPage() {
    const [range, setRange] = useState("30days");


    const [topProducts, setTopProducts] = useState([]);

    const [bottomProducts, setBottomProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchInput, setSearchInput] = useState("");

    const [search, setSearch] = useState("");

    const [searchProducts, setSearchProducts] = useState([]);

    const [searchLoading, setSearchLoading] = useState(false);

    const [searchPage, setSearchPage] = useState(1);

    const [searchTotalPages, setSearchTotalPages] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | دریافت ۵ پربازدید و ۵ کم‌بازدید
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const loadMainAnalytics = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams();

                params.set("range", range);
                params.set("page", "1");
                params.set("limit", "5");

                /*
                 * پربازدیدترین‌ها
                 */

                const topResponse = await Fetch.get(
                    `${BASE_URL}/products?${params.toString()}`
                );

                /*
                 * کم‌بازدیدترین‌ها
                 */

                const bottomParams = new URLSearchParams();

                bottomParams.set("range", range);
                bottomParams.set("limit", "5");

                const bottomResponse = await Fetch.get(
                    `${BASE_URL}/bottom-products?${bottomParams.toString()}`
                );

                setTopProducts(
                    topResponse?.data?.data || []
                );

                setBottomProducts(
                    bottomResponse?.data?.data || []
                );
            } catch (error) {
                console.error(
                    "PRODUCT VIEWS ANALYTICS ERROR:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "خطا در دریافت آمار بازدید محصولات"
                );

                setTopProducts([]);

                setBottomProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadMainAnalytics();
    }, [range]);

    /*
    |--------------------------------------------------------------------------
    | Debounce جستجو
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim());

            setSearchPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);

    /*
    |--------------------------------------------------------------------------
    | جستجوی محصولات
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const loadSearchResults = async () => {
            if (!search) {
                setSearchProducts([]);

                setSearchTotalPages(1);

                return;
            }

            try {
                setSearchLoading(true);

                const params = new URLSearchParams();

                params.set("range", range);

                params.set(
                    "page",
                    searchPage.toString()
                );

                params.set(
                    "limit",
                    SEARCH_LIMIT.toString()
                );

                params.set("search", search);

                const response = await Fetch.get(
                    `${BASE_URL}/products?${params.toString()}`
                );

                setSearchProducts(
                    response?.data?.data || []
                );

                setSearchTotalPages(
                    response?.data?.pagination?.totalPages ||
                    1
                );
            } catch (error) {
                console.error(
                    "PRODUCT SEARCH ANALYTICS ERROR:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "خطا در جستجوی محصولات"
                );

                setSearchProducts([]);

                setSearchTotalPages(1);
            } finally {
                setSearchLoading(false);
            }
        };

        loadSearchResults();
    }, [
        search,
        searchPage,
        range,
    ]);

    /*
    |--------------------------------------------------------------------------
    | تغییر بازه
    |--------------------------------------------------------------------------
    */

    const handleRangeChange = (value) => {
        setRange(value);

        setSearchPage(1);
    };

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const handlePreviousPage = () => {
        if (searchPage > 1) {
            setSearchPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (searchPage < searchTotalPages) {
            setSearchPage((prev) => prev + 1);
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen p-6"
        >
            {/* Header */}

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    آمار بازدید محصولات
                </h1>

                <div className="mt-2 h-1 w-16 rounded-full bg-yellow-400" />
            </div>

            {/* Filter */}

            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="w-full max-w-xs">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        بازه زمانی
                    </label>

                    <select
                        value={range}
                        onChange={(e) =>
                            handleRangeChange(
                                e.target.value
                            )
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                    >
                        {RANGE_OPTIONS.map(
                            (option) => (
                                <option
                                    key={
                                        option.value
                                    }
                                    value={
                                        option.value
                                    }
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            {/* Top / Bottom */}

            {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                    <MiniLoading />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {/* Top */}

                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                ۵ محصول پربازدید
                            </h2>

                            <span className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                بیشترین بازدید
                            </span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-white bg-white shadow-lg">
                            <table className="min-w-full text-sm text-gray-800">
                                <thead className="bg-yellow-400 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-center">
                                            #
                                        </th>

                                        <th className="px-4 py-3 text-right">
                                            محصول
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            بازدید
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {topProducts.length ===
                                        0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-10 text-center text-gray-500"
                                            >
                                                محصولی برای نمایش وجود ندارد.
                                            </td>
                                        </tr>
                                    ) : (
                                        topProducts.map(
                                            (
                                                product,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        product.productId ||
                                                        index
                                                    }
                                                    className="border-t border-gray-100 transition hover:bg-[#fff8df]"
                                                >
                                                    <td className="px-4 py-4 text-center font-bold">
                                                        {formatNumber(
                                                            index +
                                                            1
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {product
                                                                .images?.[0] && (
                                                                    <img
                                                                        src={getImageUrl(
                                                                            product
                                                                                .images[0]
                                                                        )}
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                                                                    />
                                                                )}

                                                            <span className="font-semibold">
                                                                {product.name ||
                                                                    "بدون نام"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-bold">
                                                        {formatNumber(
                                                            product.views
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Bottom */}

                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                ۵ محصول کم‌بازدید
                            </h2>

                            <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                کمترین بازدید
                            </span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-white bg-white shadow-lg">
                            <table className="min-w-full text-sm text-gray-800">
                                <thead className="bg-yellow-400 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-center">
                                            #
                                        </th>

                                        <th className="px-4 py-3 text-right">
                                            محصول
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            بازدید
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {bottomProducts.length ===
                                        0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-10 text-center text-gray-500"
                                            >
                                                محصولی برای نمایش وجود ندارد.
                                            </td>
                                        </tr>
                                    ) : (
                                        bottomProducts.map(
                                            (
                                                product,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        product.productId ||
                                                        index
                                                    }
                                                    className="border-t border-gray-100 transition hover:bg-[#fff8df]"
                                                >
                                                    <td className="px-4 py-4 text-center font-bold">
                                                        {formatNumber(
                                                            index +
                                                            1
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {product
                                                                .images?.[0] && (
                                                                    <img
                                                                        src={getImageUrl(
                                                                            product
                                                                                .images[0]
                                                                        )}
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                                                                    />
                                                                )}

                                                            <span className="font-semibold">
                                                                {product.name ||
                                                                    "بدون نام"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-bold">
                                                        {formatNumber(
                                                            product.views
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}

            {/* Search */}

            <section className="mt-8">
                <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-800">
                        جستجوی بازدید محصول
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        نام محصول را جستجو کنید تا تعداد بازدید آن را در بازه انتخاب‌شده ببینید.
                    </p>
                </div>

                <div className="relative mb-5">
                    <Search
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) =>
                            setSearchInput(
                                e.target.value
                            )
                        }
                        placeholder="جستجوی نام محصول..."
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white pr-12 pl-4 text-sm text-gray-800 shadow-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                    />
                </div>

                {!search ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
                        برای مشاهده بازدید یک محصول، نام آن را جستجو کنید.
                    </div>
                ) : searchLoading ? (
                    <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
                        <MiniLoading />
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-white bg-white shadow-lg">
                            <table className="min-w-full text-sm text-gray-800">
                                <thead className="bg-yellow-400 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-right">
                                            محصول
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            بازدید در این بازه
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            کل بازدید
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchProducts.length ===
                                        0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-10 text-center text-gray-500"
                                            >
                                                محصولی با این نام پیدا نشد.
                                            </td>
                                        </tr>
                                    ) : (
                                        searchProducts.map(
                                            (product) => (
                                                <tr
                                                    key={
                                                        product.productId
                                                    }
                                                    className="border-t border-gray-100 transition hover:bg-[#fff8df]"
                                                >
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {product
                                                                .images?.[0] && (
                                                                    <img
                                                                        src={getImageUrl(
                                                                            product
                                                                                .images[0]
                                                                        )}
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                                                                    />
                                                                )}

                                                            <span className="font-semibold">
                                                                {product.name ||
                                                                    "بدون نام"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-bold">
                                                        {formatNumber(
                                                            product.views
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-semibold text-gray-600">
                                                        {formatNumber(
                                                            product.totalViews
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {searchProducts.length > 0 &&
                            searchTotalPages > 1 && (
                                <div className="mt-5 flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={
                                            handlePreviousPage
                                        }
                                        disabled={
                                            searchPage === 1
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight
                                            size={18}
                                        />
                                    </button>

                                    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-yellow-400 px-4 font-bold text-white">
                                        {formatNumber(
                                            searchPage
                                        )}
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        از
                                    </span>

                                    <span className="text-sm font-semibold text-gray-700">
                                        {formatNumber(
                                            searchTotalPages
                                        )}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            handleNextPage
                                        }
                                        disabled={
                                            searchPage ===
                                            searchTotalPages
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft
                                            size={18}
                                        />
                                    </button>
                                </div>
                            )}
                    </>
                )}
            </section>
        </div>
    );
}