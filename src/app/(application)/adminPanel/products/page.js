"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await Fetch.get("/api/products");
                setProducts(res.data);
            } catch (err) {
                toast.error("خطا در دریافت محصولات")
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
            await Fetch.delete(`/api/products/${deleteId}`, { token: true });
            setProducts((prev) => prev.filter((p) => p._id !== deleteId));
            toast.success("محصول با موفقیت حذف شد");
        } catch (err) {
            toast.error("خطا در حذف محصول");
        } finally {
            cancelDelete();
        }
    };

    return (
        <div className="min-h-screen p-6" dir="rtl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
                <h1 className="text-3xl font-extrabold drop-shadow-md text-center sm:text-right">
                    مدیریت محصولات
                </h1>
                <Link
                    href="/adminPanel/products/new"
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm text-center font-semibold shadow-md transition duration-300"
                >
                    محصول جدید +
                </Link>
            </div>

            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-white bg-white">
                    <table className="min-w-full text-gray-800 text-sm">
                        <thead className="bg-yellow-400 text-white">
                            <tr>
                                <th className="text-right py-4 px-6 font-semibold">نام</th>
                                <th className="text-right py-4 px-6 font-semibold">قیمت</th>
                                <th className="text-right py-4 px-6 font-semibold">دسته‌بندی</th>
                                <th className="text-right py-4 px-6 font-semibold">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        محصولی یافت نشد
                                    </td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-t border-gray-200 hover:bg-[#d4f5ef] transition"
                                >
                                    <td className="py-3 px-6 font-bold">{product.name}</td>
                                    <td className="py-3 px-6 font-semibold">
                                        {product.price.toLocaleString()} تومان
                                    </td>
                                    <td className="py-3 px-6">
                                        {product.categories?.join("، ") || "-"}
                                    </td>
                                    <td className="py-3 px-6 flex gap-5">
                                        <button
                                            onClick={() => openDeleteModal(product._id)}
                                            className="text-red-600 font-semibold hover:underline transition"
                                        >
                                            حذف
                                        </button>
                                        <Link
                                            href={`/adminPanel/products/edit/${product._id}`}
                                            className="text-yellow-400 font-semibold hover:underline transition"
                                        >
                                            ویرایش
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

           
            {showDeleteModal && (
                <div className="fixed inset-0  flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-[350px] max-w-full mx-4 shadow-2xl text-center">
                        <p className="mb-8 text-xl font-semibold text-gray-900">
                            آیا از حذف محصول مطمئن هستید؟
                        </p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                autoFocus
                            >
                                حذف
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="flex-1 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
