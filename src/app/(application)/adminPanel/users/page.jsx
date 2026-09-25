"use client";

import { useEffect, useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    X,
    UserRound,
    Phone,
    CalendarDays,
    Clock3,
    ShoppingBag,
    Package,
    CreditCard,
    MapPin,
} from "lucide-react";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import Fetch from "@/utils/Fetch";
import toast from "react-hot-toast";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // جزئیات کاربر
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        try {
            const { data } = await Fetch.get(
                "/api/users/getAll",
                {
                    token: true,
                }
            );

            setUsers(data);

            const maxPage = Math.max(
                1,
                Math.ceil(data.length / ITEMS_PER_PAGE)
            );

            if (currentPage > maxPage) {
                setCurrentPage(maxPage);
            }
        } catch (err) {
            toast.error("خطا در دریافت کاربران");
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id, newRole) => {
        setUpdatingUserId(id);

        try {
            await Fetch.put(
                `/api/users/${id} `,
                { role: newRole },
                { token: true }
            );

            toast.success("نقش کاربر با موفقیت تغییر کرد");

            await fetchUsers();
        } catch (err) {
            toast.error("خطا در تغییر نقش کاربر");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setShowDeleteModal(false);

        setDeletingUserId(selectedUserId);

        try {
            await Fetch.delete(`/api/users/${selectedUserId} `,
                {
                    token: true,
                }
            );

            toast.success("کاربر با موفقیت حذف شد");

            await fetchUsers();
        } catch (err) {
            toast.error("خطا در حذف کاربر");
        } finally {
            setDeletingUserId(null);
            setSelectedUserId(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedUserId(null);
    };

    // -----------------------------
    // دریافت جزئیات کاربر
    // -----------------------------

    const openUserDetails = async (userId) => {
        setShowDetailsModal(true);
        setDetailsLoading(true);
        setSelectedUser(null);

        try {
            const response = await Fetch.get(`/api/users/${userId}/details`,
                {
                    token: true,
                }
            );

            setSelectedUser(response.data);
        } catch (error) {
            console.error(
                "خطا در دریافت جزئیات کاربر:",
                error
            );

            toast.error(
                "خطا در دریافت جزئیات کاربر"
            );

            setShowDetailsModal(false);
        } finally {
            setDetailsLoading(false);
        }
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const totalPages = Math.ceil(
        users.length / ITEMS_PER_PAGE
    );

    const currentUsers = useMemo(() => {
        const start =
            (currentPage - 1) * ITEMS_PER_PAGE;

        return users.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [users, currentPage]);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
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
                currentPage >=
                totalPages - 2
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

    // -----------------------------
    // فرمت تاریخ
    // -----------------------------

    const formatDate = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat(
            "fa-IR",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        ).format(new Date(date));
    };

    // -----------------------------
    // فرمت مبلغ
    // -----------------------------

    const formatPrice = (price) => {
        return `${Number(price || 0).toLocaleString(
            "fa-IR"
        )} تومان`;
    };

    const getStatusLabel = (status) => {
        const statuses = {
            pending: "در انتظار پرداخت",
            paid: "پرداخت شده",
            shipped: "ارسال شده",
            delivered: "تحویل شده",
        };

        return statuses[status] || status || "-";
    };

    const getStatusClass = (status) => {
        const classes = {
            pending:
                "bg-amber-100 text-amber-700",
            paid:
                "bg-emerald-100 text-emerald-700",
            shipped:
                "bg-blue-100 text-blue-700",
            delivered:
                "bg-violet-100 text-violet-700",
        };

        return (
            classes[status] ||
            "bg-gray-100 text-gray-700"
        );
    };

    const getPaymentTypeLabel = (type) => {
        return type === "installment"
            ? "اقساطی"
            : "نقدی";
    };

    const getShippingMethodLabel = (
        method
    ) => {
        const methods = {
            pickup: "تحویل حضوری",
            post: "پست",
            express: "ارسال سریع",
        };

        return methods[method] || method || "-";
    };

    return (
        <div
            className="min-h-screen p-6"
            dir="rtl"
        >
            <h1 className="mb-8 text-3xl font-extrabold drop-shadow-md">
                مدیریت کاربران
            </h1>

            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-white bg-white">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-yellow-400 text-white select-none">
                            <tr>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">
                                    نام
                                </th>

                                <th className="text-right py-4 px-6 font-semibold tracking-wider">
                                    شماره
                                </th>

                                <th className="text-right py-4 px-6 font-semibold tracking-wider">
                                    نقش
                                </th>

                                <th className="text-right py-4 px-6 font-semibold tracking-wider">
                                    عملیات
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-6 text-gray-500"
                                    >
                                        هیچ کاربری یافت نشد
                                    </td>
                                </tr>
                            )}

                            {currentUsers.map(
                                (user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t border-gray-200 hover:bg-[#d4f5ef] transition-colors duration-200"
                                    >
                                        <td className="py-3 px-6 font-semibold">
                                            {user.name}
                                        </td>

                                        <td className="py-3 px-6">
                                            {user.phone ||
                                                "-"}
                                        </td>

                                        <td className="py-3 px-6 font-medium">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white ${user.role ===
                                                    "admin"
                                                    ? "bg-yellow-400"
                                                    : "bg-gray-400"
                                                    }`}
                                            >
                                                {user.role ===
                                                    "admin"
                                                    ? "ادمین"
                                                    : "کاربر"}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-4">
                                                {/* جزئیات */}
                                                <button
                                                    onClick={() =>
                                                        openUserDetails(
                                                            user._id
                                                        )
                                                    }
                                                    className="flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-800 transition"
                                                >
                                                    <Eye
                                                        size={
                                                            17
                                                        }
                                                    />

                                                    جزئیات
                                                </button>

                                                {/* تغییر نقش */}
                                                <button
                                                    onClick={() =>
                                                        updateRole(
                                                            user._id,
                                                            user.role ===
                                                                "admin"
                                                                ? "user"
                                                                : "admin"
                                                        )
                                                    }
                                                    disabled={
                                                        updatingUserId ===
                                                        user._id
                                                    }
                                                    className={`text-yellow-400 font-semibold hover:underline transition ${updatingUserId ===
                                                        user._id
                                                        ? "opacity-60 cursor-wait"
                                                        : ""
                                                        }`}
                                                >
                                                    {updatingUserId ===
                                                        user._id
                                                        ? "در حال تغییر..."
                                                        : "تغییر نقش"}
                                                </button>

                                                {/* حذف */}
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            user._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingUserId ===
                                                        user._id
                                                    }
                                                    className={`text-red-600 font-semibold hover:underline transition ${deletingUserId ===
                                                        user._id
                                                        ? "opacity-60 cursor-wait"
                                                        : ""
                                                        }`}
                                                >
                                                    {deletingUserId ===
                                                        user._id
                                                        ? "در حال حذف..."
                                                        : "حذف"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* -------------------------------- */}
            {/* Modal حذف کاربر */}
            {/* -------------------------------- */}

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 w-[350px] max-w-full mx-4 shadow-2xl text-center">
                        <p className="mb-8 text-xl font-semibold text-gray-900">
                            آیا از حذف کاربر مطمئن هستید؟
                        </p>

                        <div className="flex justify-center gap-6">
                            <button
                                onClick={
                                    confirmDelete
                                }
                                className="flex-1 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
                                autoFocus
                            >
                                حذف
                            </button>

                            <button
                                onClick={
                                    cancelDelete
                                }
                                className="flex-1 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-sm"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* -------------------------------- */}
            {/* Modal جزئیات کاربر */}
            {/* -------------------------------- */}

            {showDetailsModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={
                        closeDetailsModal
                    }
                >
                    <div
                        className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-5 bg-gray-50">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">
                                    جزئیات کاربر
                                </h2>

                                {selectedUser?.user && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        {selectedUser.user.name}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={
                                    closeDetailsModal
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {detailsLoading ? (
                            <div className="flex min-h-[400px] items-center justify-center">
                                <MiniLoading />
                            </div>
                        ) : selectedUser ? (
                            <div className="max-h-[calc(90vh-85px)] overflow-y-auto p-6">
                                {/* اطلاعات اصلی */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                                <UserRound
                                                    size={
                                                        20
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    نام کاربر
                                                </p>

                                                <p className="mt-1 font-bold text-gray-800">
                                                    {selectedUser.user.name ||
                                                        "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                                <Phone
                                                    size={
                                                        20
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    شماره تماس
                                                </p>

                                                <p className="mt-1 font-bold text-gray-800">
                                                    {selectedUser.user.phone ||
                                                        "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                                <CalendarDays
                                                    size={
                                                        20
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    تاریخ ثبت‌نام
                                                </p>

                                                <p className="mt-1 font-bold text-gray-800">
                                                    {formatDate(
                                                        selectedUser
                                                            .user
                                                            .createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                                <Clock3
                                                    size={
                                                        20
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    آخرین ورود
                                                </p>

                                                <p className="mt-1 font-bold text-gray-800">
                                                    {formatDate(
                                                        selectedUser
                                                            .user
                                                            .lastLoginAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* آمار */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-blue-600">
                                                    تعداد سفارش‌ها
                                                </p>

                                                <p className="mt-2 text-2xl font-extrabold text-blue-900">
                                                    {Number(
                                                        selectedUser
                                                            .statistics
                                                            ?.ordersCount ||
                                                        0
                                                    ).toLocaleString(
                                                        "fa-IR"
                                                    )}
                                                </p>
                                            </div>

                                            <ShoppingBag
                                                className="text-blue-500"
                                                size={30}
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-emerald-600">
                                                    مجموع ارزش سفارش‌ها
                                                </p>

                                                <p className="mt-2 text-xl font-extrabold text-emerald-900">
                                                    {formatPrice(
                                                        selectedUser
                                                            .statistics
                                                            ?.totalPurchase
                                                    )}
                                                </p>
                                            </div>

                                            <CreditCard
                                                className="text-emerald-500"
                                                size={30}
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-violet-50 border border-violet-100 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-violet-600">
                                                    تعداد کالاهای سفارش‌داده‌شده
                                                </p>

                                                <p className="mt-2 text-2xl font-extrabold text-violet-900">
                                                    {Number(
                                                        selectedUser
                                                            .statistics
                                                            ?.productsCount ||
                                                        0
                                                    ).toLocaleString(
                                                        "fa-IR"
                                                    )}
                                                </p>
                                            </div>

                                            <Package
                                                className="text-violet-500"
                                                size={30}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* سفارش‌ها */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-extrabold text-gray-900">
                                            سفارش‌های کاربر
                                        </h3>

                                        <span className="text-sm text-gray-500">
                                            {Number(
                                                selectedUser
                                                    .orders
                                                    ?.length ||
                                                0
                                            ).toLocaleString(
                                                "fa-IR"
                                            )}{" "}
                                            سفارش
                                        </span>
                                    </div>

                                    {selectedUser.orders
                                        ?.length === 0 ? (
                                        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
                                            این کاربر هنوز سفارشی ثبت نکرده است.
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            {selectedUser.orders.map(
                                                (
                                                    order
                                                ) => (
                                                    <div
                                                        key={
                                                            order._id
                                                        }
                                                        className="rounded-2xl border border-gray-200 overflow-hidden"
                                                    >
                                                        {/* Order header */}
                                                        <div className="bg-gray-50 border-b px-5 py-4">
                                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                                <div>
                                                                    <p className="font-bold text-gray-800">
                                                                        سفارش #
                                                                        {order._id.slice(
                                                                            -6
                                                                        )}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        {formatDate(
                                                                            order.createdAt
                                                                        )}
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <span
                                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                                                            order.status
                                                                        )}`}
                                                                    >
                                                                        {getStatusLabel(
                                                                            order.status
                                                                        )}
                                                                    </span>

                                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                                                        {getPaymentTypeLabel(
                                                                            order.paymentType
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {/* Products */}
                                                        <div className="p-5">
                                                            <p className="mb-3 text-sm font-bold text-gray-700">
                                                                محصولات سفارش
                                                            </p>
  
                                                            <div className="space-y-3">
                                                                {order.items?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => ( 
                                                                        <div
                                                                            key={`${order._id}-${index}`}
                                                                            className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                {item
                                                                                    .productId
                                                                                    ?.images?.[0] ? (
                                                                                    <img
                                                                                        src={
                                                                                            item
                                                                                                .productId
                                                                                                .images[0]
                                                                                        }
                                                                                        alt={
                                                                                            item
                                                                                                .productId
                                                                                                .name ||
                                                                                            "محصول"
                                                                                        }
                                                                                        className="h-14 w-14 rounded-xl object-cover border bg-white"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border text-gray-400">
                                                                                        <Package
                                                                                            size={
                                                                                                22
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                <div>
                                                                                    <p className="font-bold text-gray-800">
                                                                                        {item
                                                                                            .productId
                                                                                            ?.name ||
                                                                                            "محصول حذف شده"}
                                                                                    </p>

                                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                                        تعداد:{" "}
                                                                                        <strong>
                                                                                            {Number(
                                                                                                item.quantity ||
                                                                                                0
                                                                                            ).toLocaleString(
                                                                                                "fa-IR"
                                                                                            )}
                                                                                        </strong>{" "}
                                                                                        {item
                                                                                            .productId
                                                                                            ?.unit ||
                                                                                            "عدد"}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                                                <span
                                                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.purchaseType ===
                                                                                        "installment"
                                                                                        ? "bg-amber-100 text-amber-700"
                                                                                        : "bg-emerald-100 text-emerald-700"
                                                                                        }`}
                                                                                >
                                                                                    {item.purchaseType ===
                                                                                        "installment"
                                                                                        ? "اقساطی"
                                                                                        : "نقدی"}
                                                                                </span>

                                                                                <div className="text-left">
                                                                                    <p className="text-xs text-gray-400">
                                                                                        قیمت ثبت‌شده
                                                                                    </p>

                                                                                    <p className="font-bold text-gray-800">
                                                                                        {formatPrice(
                                                                                            item.price > 0
                                                                                                ? item.price
                                                                                                : item.originalPrice
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {/* Pagination */}

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                (prev) => prev - 1
                            )
                        }
                        className="px-4 h-10 rounded-xl border bg-white disabled:opacity-40 hover:bg-yellow-400 hover:text-white transition"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {getPageNumbers().map(
                        (page, index) =>
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
                                        setCurrentPage(
                                            page
                                        )
                                    }
                                    className={`w-10 h-10 rounded-xl transition-all ${currentPage ===
                                        page
                                        ? "bg-yellow-400 text-white shadow-lg scale-105"
                                        : "bg-white border hover:bg-yellow-100"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                    )}

                    <button
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) => prev + 1
                            )
                        }
                        className="px-4 h-10 rounded-xl border bg-white disabled:opacity-40 hover:bg-yellow-400 hover:text-white transition"
                    >
                        <ChevronLeft size={18} />
                    </button>
                </div>
            )}
        </div>
    );

}
