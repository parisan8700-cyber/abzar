"use client";

import { useEffect, useMemo, useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import Fetch from "@/utils/Fetch";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import Pagination from "@/components/order/Pagination";
import OrderCard from "@/components/order/OrderCard";
import OrdersFilters from "@/components/order/OrdersFilters";




export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [paymentType, setPaymentType] = useState("all");
    const [date, setDate] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await Fetch.get("/api/orders", {
                    token: true,
                });

                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const fullName =
                `${order.firstName ?? ""} ${order.lastName ?? ""}`.toLowerCase();

            const phone = order.phone ?? "";

            const matchSearch =
                fullName.includes(search.toLowerCase()) ||
                phone.includes(search) ||
                order._id.includes(search);

            const matchStatus =
                status === "all"
                    ? true
                    : order.status === status;

            const matchPayment =
                paymentType === "all"
                    ? true
                    : order.paymentType === paymentType;

            if (date) {
                const selected = new DateObject(date)
                    .format("YYYY/MM/DD");

                const orderDate = new DateObject({
                    date: order.createdAt,
                    calendar: persian,
                    locale: persian_fa,
                }).format("YYYY/MM/DD");

                if (selected !== orderDate) {
                    return false;
                }
            }

            return matchSearch && matchStatus && matchPayment;
        });
    }, [orders, search, status, paymentType, date]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, paymentType, date]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    const currentOrders = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    if (loading) return <MiniLoading />;

    return (
        <div className="min-h-screen p-6" dir="rtl">

            <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        سفارشات کاربران
                    </h1>
                </div>
            </div>

            <OrdersFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                date={date}
                setDate={setDate}
            />

            {filteredOrders.length === 0 ? (
                <p className="bg-yellow-100 text-gray-800 text-center py-3 rounded-xl shadow mt-8">
                    سفارشی ثبت نشده است
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                        {currentOrders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}

        </div>
    );
}