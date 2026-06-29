"use client";

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
} from "lucide-react";

export default function OrderCard({ order }) {

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

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

            {/* Header */}

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-5 py-4 text-white">

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
                        className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[order.status]}`}
                    >
                        {statusText[order.status]}
                    </span>

                    <div className="text-right">

                        <p className="text-xs text-gray-500">
                            مبلغ پرداختی
                        </p>

                        <p className="text-base font-extrabold text-yellow-500">
                            {order.amount.toLocaleString()} تومان
                        </p>

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

                                    <p className="font-bold text-yellow-500">

                                        {item.price?.toLocaleString()} تومان

                                    </p>

                                    {item.purchaseType === "installment" && (
                                        <span className="text-xs text-blue-600">
                                            پیش پرداخت
                                        </span>
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

        </div>
    );
}