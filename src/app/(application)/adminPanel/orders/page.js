"use client";

import MiniLoading from "@/components/shared/loading/MiniLoading";
import Fetch from "@/utils/Fetch";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await Fetch.get("/api/orders/", { token: true });
                setOrders(res.data);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    if (loading) return <MiniLoading />;

    return (
        <div className="p-6 min-h-screen text-right rtl">
            <h1 className="mb-8 text-3xl font-extrabold drop-shadow-md">
                سفارشات کاربران
            </h1>

            {orders.length === 0 ? (
                <p className="bg-yellow-100 text-gray-800 text-center py-3 rounded-xl shadow">
                    سفارشی ثبت نشده است
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-md hover:shadow-xl transition-all rounded-2xl p-5 space-y-4 border border-gray-200 leading-relaxed"
                        >
                            <div className="border-b pb-3 space-y-2">
                                <p className="font-medium text-gray-700">
                                    👤 <span className="text-yellow-400">{"-"}</span> ({order.firstName})
                                </p>
                                <p className="text-sm text-gray-600">
                                    شماره سفارش: <span className="font-semibold">{order._id}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    مبلغ: <span className="text-yellow-400 font-bold">{order.amount.toLocaleString()} تومان</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    وضعیت:{" "}
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${order.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                                            }`}
                                    >
                                        {order.status === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    📅 تاریخ: {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                                </p>
                            </div>

                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-yellow-400">📦 اطلاعات ارسال:</p>
                                <p>نام گیرنده: {order.firstName} {order.lastName}</p>
                                <p>تلفن: {order.phone}</p>
                                <p>آدرس: {order.province}، {order.city}، {order.address}</p>
                            </div>

                            <div className="pt-3 border-t space-y-2">
                                <p className="font-semibold text-yellow-400">🛒 محصولات سفارش داده شده:</p>
                                <ul className="list-disc pr-5 space-y-1 text-sm text-gray-700">
                                    {order.items.map((item) => (
                                        <li key={item._id}>
                                            {item.productId?.name || "نامشخص"} - {item.quantity} عدد
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
