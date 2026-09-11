"use client";

import { useState } from "react";

import {
    User,
    Phone,
    MapPin,
    Package,
    CalendarDays,
    Clock3,
    Wallet,
    CreditCard,
    Mail,
    Mailbox,
    Trash2,
    Truck,
} from "lucide-react";

import toast from "react-hot-toast";

import Fetch from "@/utils/Fetch";

export default function OrderCard({ order, onDelete, onStatusChange }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            await Fetch.delete(`/api/orders/${order._id}`, {
                token: true,
            });

            toast.success("سفارش با موفقیت حذف شد");

            setShowDeleteModal(false);

            if (onDelete) {
                onDelete(order._id);
            }

        } catch (error) {
            toast.error("خطا در حذف سفارش");
        } finally {
            setDeleting(false);
        }
    };


    const handleMarkAsShipped = async () => {
        try {
            setUpdatingStatus(true);

            await Fetch.patch(
                `/api/orders/${order._id}/status`,
                {
                    status: "shipped",
                },
                {
                    token: true,
                }
            );

            toast.success("سفارش به وضعیت ارسال شده تغییر کرد");

            if (onStatusChange) {
                onStatusChange(order._id, "shipped");
            }

        } catch (error) {
            console.error(error);
            toast.error("خطا در تغییر وضعیت سفارش");
        } finally {
            setUpdatingStatus(false);
        }
    };

    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        paid: "bg-green-100 text-green-700",
        shipped: "bg-blue-100 text-blue-700",
        delivered: "bg-purple-100 text-purple-700",
    };

    const statusText = {
        pending: "در انتظار پرداخت",
        paid: "پرداخت شده",
        shipped: "ارسال شده",
        delivered: "تحویل شده",
    };

    const paymentStyle =
        order.paymentType === "installment"
            ? "bg-blue-100 text-blue-700"
            : "bg-emerald-100 text-emerald-700";

    const paymentText =
        order.paymentType === "installment"
            ? "اقساطی"
            : "نقدی";

    const date = new Date(order.createdAt);


    const productsTotal = order.items.reduce((total, item) => {
        return total + (item.originalPrice || 0) * item.quantity;
    }, 0);


    const cardStatusStyle = {
        pending: {
            border: "border-yellow-300",
            header: "from-yellow-400 to-amber-500",
            bg: "bg-yellow-50/30",
        },
        paid: {
            border: "border-green-300",
            header: "from-green-500 to-emerald-600",
            bg: "bg-green-50/30",
        },
        shipped: {
            border: "border-blue-300",
            header: "from-blue-500 to-cyan-600",
            bg: "bg-blue-50/30",
        },
        delivered: {
            border: "border-purple-300",
            header: "from-purple-500 to-violet-600",
            bg: "bg-purple-50/30",
        },
    };

    const currentStatusStyle =
        cardStatusStyle[order.status] || cardStatusStyle.pending;

    return (
        <div
            className={`
        ${currentStatusStyle.bg}
        rounded-3xl
        border-2
        ${currentStatusStyle.border}
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
    `}
        >

            {/* Header */}

            <div
                className={`
        bg-gradient-to-r
        ${currentStatusStyle.header}
        px-5
        py-4
        text-white
    `}
            >

                <div className="flex justify-between items-start">

                    <div>

                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <User size={18} />
                            {order.firstName} {order.lastName}
                        </h3>

                        <p className="text-xs mt-1 opacity-90 break-all">
                            {order._id}
                        </p>

                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${paymentStyle}`}
                    >
                        {paymentText}
                    </span>

                </div>

            </div>

            <div className="p-5 space-y-5">

                {/* وضعیت */}

                <div className="flex justify-between items-center">

                    <span
                        className={`
        px-3
        py-1.5
        rounded-full
        text-xs
        font-extrabold
        shadow-sm
        ${statusStyle[order.status]}
    `}
                    >
                        {statusText[order.status]}
                    </span>

                    <div className="text-right space-y-1">

                        <div>
                            <p className="text-xs text-gray-500">
                                جمع قیمت واقعی محصولات
                            </p>

                            <p className="text-base font-extrabold text-gray-700">
                                {productsTotal.toLocaleString("fa-IR")} تومان
                            </p>
                        </div>

                        <div className="pt-1">
                            <p className="text-xs text-gray-500">
                                مبلغ پرداختی
                            </p>

                            <p className="text-base font-extrabold text-yellow-500">
                                {order.amount.toLocaleString("fa-IR")} تومان
                            </p>
                        </div>

                    </div>

                </div>

                {/* اطلاعات ارسال */}

                <div className="space-y-3 border-t pt-4">

                    <h4 className="font-bold text-gray-700 flex items-center gap-2">
                        <Package size={17} />
                        اطلاعات ارسال
                    </h4>

                    <div className="text-sm space-y-2 text-gray-600">

                        <div className="flex items-center gap-2">
                            <Phone size={15} />
                            {order.phone}
                        </div>

                        <div className="flex items-start gap-2">
                            <MapPin size={15} className="mt-1" />
                            <span>
                                {order.province}، {order.city}، {order.address}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mailbox size={15} />
                            {order.postalCode}
                        </div>

                    </div>

                </div>

                {/* زمان */}

                <div className="flex justify-between border-t pt-4 text-sm">

                    <div className="flex items-center gap-2 text-gray-600">

                        <CalendarDays size={16} />

                        {date.toLocaleDateString("fa-IR")}

                    </div>

                    <div className="flex items-center gap-2 text-gray-600">

                        <Clock3 size={16} />

                        {date.toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}

                    </div>

                </div>

                {/* محصولات */}

                <div className="border-t pt-4">

                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <CreditCard size={17} />
                        محصولات
                    </h4>

                    <div className="space-y-2">

                        {order.items.map((item) => (

                            <div
                                key={item._id}
                                className="bg-gray-50 rounded-xl px-3 py-2 flex justify-between items-center"
                            >

                                <div>

                                    <p className="font-medium">
                                        {item.productId?.name || "نامشخص"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        تعداد: {item.quantity}
                                    </p>

                                </div>

                                <div className="text-left">
                                    {item.purchaseType === "installment" ? (
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                قیمت محصول
                                            </p>

                                            <p className="font-bold text-gray-700">
                                                {item.originalPrice?.toLocaleString("fa-IR")}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-4">
                                                پیش پرداخت
                                            </p>

                                            <p className="font-bold text-yellow-500">
                                                {item.price?.toLocaleString("fa-IR")} تومان
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="font-bold text-yellow-500">
                                            {item.price?.toLocaleString("fa-IR")} تومان
                                        </p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* روش ارسال */}
                    <div className="border-t pt-4">

                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
                            <Package size={17} />
                            روش ارسال
                        </h4>

                        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">

                            <div className="flex items-center gap-2 text-gray-700 font-medium">

                                <span>
                                    {order.shippingMethod === "pickup" && "🏪 تحویل حضوری"}
                                    {order.shippingMethod === "post" && "📦 پست پیشتاز"}
                                    {order.shippingMethod === "express" && "⚡ پست سریع"}
                                </span>

                            </div>

                            <div className="text-left">

                                <p className="font-bold text-yellow-500">
                                    {order.shippingCost?.toLocaleString()} تومان
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>




            <div className="border-t pt-4 mt-5 space-y-2">

                {order.status === "paid" && (
                    <button
                        onClick={handleMarkAsShipped}
                        disabled={updatingStatus}
                        className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-2.5
                rounded-xl
                bg-blue-50
                text-blue-600
                font-semibold
                hover:bg-blue-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
            "
                    >
                        <Truck size={17} />

                        {updatingStatus
                            ? "در حال تغییر وضعیت..."
                            : "علامت‌گذاری به‌عنوان ارسال شده"}
                    </button>
                )}

                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            rounded-xl
            bg-red-50
            text-red-600
            font-semibold
            hover:bg-red-100
            transition
        "
                >
                    <Trash2 size={17} />
                    حذف سفارش
                </button>

            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

                    <div className="bg-white rounded-2xl p-7 w-[350px] max-w-[calc(100%-2rem)] shadow-2xl text-center">

                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2
                                    size={22}
                                    className="text-red-600"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">
                            حذف سفارش
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 mb-6">
                            آیا از حذف این سفارش مطمئن هستید؟
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="
                        flex-1
                        py-2.5
                        rounded-xl
                        bg-red-600
                        text-white
                        font-semibold
                        hover:bg-red-700
                        disabled:opacity-50
                        transition
                    "
                            >
                                {deleting ? "در حال حذف..." : "حذف"}
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                                className="
                        flex-1
                        py-2.5
                        rounded-xl
                        bg-gray-100
                        text-gray-700
                        font-semibold
                        hover:bg-gray-200
                        disabled:opacity-50
                        transition
                    "
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