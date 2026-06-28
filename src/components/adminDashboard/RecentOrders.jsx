"use client";

import { motion } from "framer-motion";

const statusColor = {

    pending:
        "bg-yellow-100 text-yellow-700",

    paid:
        "bg-emerald-100 text-emerald-700",

    shipped:
        "bg-sky-100 text-sky-700",

    delivered:
        "bg-purple-100 text-purple-700",

};

const statusText = {

    pending: "در انتظار",

    paid: "پرداخت شده",

    shipped: "ارسال شده",

    delivered: "تحویل شده",

};

export default function RecentOrders({

    orders,

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 25
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                delay: .3
            }}

            className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-zinc-200
            overflow-hidden
            "

        >

            <div className="px-6 py-5 border-b">

                <h2 className="font-black text-xl">

                    آخرین سفارش‌ها

                </h2>

                <p className="text-sm text-zinc-500 mt-1">

                    جدیدترین خریدهای ثبت شده

                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-zinc-50">

                        <tr>

                            <th className="text-right px-6 py-4">
                                مشتری
                            </th>

                            <th className="text-right px-6 py-4">
                                مبلغ
                            </th>

                            <th className="text-right px-6 py-4">
                                تاریخ
                            </th>

                            <th className="text-right px-6 py-4">
                                وضعیت
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="
                                border-t
                                hover:bg-yellow-50
                                transition
                                "
                            >

                                <td className="px-6 py-5 font-semibold">

                                    {order.firstName}
                                    {" "}
                                    {order.lastName}

                                </td>

                                <td className="px-6 py-5">

                                    {order.amount.toLocaleString()}
                                    {" "}
                                    تومان

                                </td>

                                <td className="px-6 py-5">

                                    {new Date(order.createdAt)
                                        .toLocaleDateString("fa-IR")}

                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-bold
                                        ${statusColor[order.status]}
                                        `}
                                    >

                                        {statusText[order.status]}

                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </motion.div>

    );

}