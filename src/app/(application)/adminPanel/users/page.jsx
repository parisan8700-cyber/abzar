"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        try {
            const { data } = await Fetch.get('/api/users/getAll', { requiresAuth: true });
            setUsers(data);

            const maxPage = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
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
            await Fetch.put(`/api/users/${id}`, { role: newRole }, { requiresAuth: true });
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
            await Fetch.delete(`/api/users/${selectedUserId}`, { requiresAuth: true });
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

    useEffect(() => {
        fetchUsers();
    }, []);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    const currentUsers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return users.slice(start, start + ITEMS_PER_PAGE);
    }, [users, currentPage]);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
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

    return (
        <div className="min-h-screen p-6" dir="rtl">
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
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">نام</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">شماره</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">نقش</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        هیچ کاربری یافت نشد
                                    </td>
                                </tr>
                            )}
                            {currentUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t border-gray-200 hover:bg-[#d4f5ef] transition-colors duration-200 cursor-pointer"
                                >
                                    <td className="py-3 px-6 font-semibold">{user.name}</td>
                                    <td className="py-3 px-6">{user.phone || "-"}</td>
                                    <td className="py-3 px-6 font-medium">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${user.role === "admin" ? "bg-yellow-400" : "bg-gray-400"
                                                }`}
                                        >
                                            {user.role === "admin" ? "ادمین" : "کاربر"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 flex gap-4">
                                        <button
                                            onClick={() =>
                                                updateRole(user._id, user.role === "admin" ? "user" : "admin")
                                            }
                                            disabled={updatingUserId === user._id}
                                            className={`text-yellow-400 font-semibold hover:underline transition ${updatingUserId === user._id ? "opacity-60 cursor-wait" : ""
                                                }`}
                                        >
                                            {updatingUserId === user._id ? "در حال تغییر..." : "تغییر نقش"}
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(user._id)}
                                            disabled={deletingUserId === user._id}
                                            className={`text-red-600 font-semibold hover:underline transition ${deletingUserId === user._id ? "opacity-60 cursor-wait" : ""
                                                }`}
                                        >
                                            {deletingUserId === user._id ? "در حال حذف..." : "حذف"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-[350px] max-w-full mx-4 shadow-2xl text-center">
                        <p className="mb-8 text-xl font-semibold text-gray-900">
                            آیا از حذف کاربر مطمئن هستید؟
                        </p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
                                autoFocus
                            >
                                حذف
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="flex-1 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-sm"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-4 h-10 rounded-xl border bg-white disabled:opacity-40 hover:bg-yellow-400 hover:text-white transition"
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
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-xl transition-all ${currentPage === page
                                        ? "bg-yellow-400 text-white shadow-lg scale-105"
                                        : "bg-white border hover:bg-yellow-100"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-4 h-10 rounded-xl border bg-white disabled:opacity-40 hover:bg-yellow-400 hover:text-white transition"
                    >
                        <ChevronLeft size={18} />
                    </button>

                </div>
            )}

        </div>
    );
}
