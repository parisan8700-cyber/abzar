"use client";

import {
    ShoppingCart,
    Wallet,
    Clock3,
    CreditCard,
    BadgeDollarSign,
} from "lucide-react";

export default function OrdersStats({ orders }) {
    const totalOrders = orders.length;

    const paidOrders = orders.filter(
        (o) => o.status === "paid"
    ).length;

    const pendingOrders = orders.filter(
        (o) => o.status === "pending"
    ).length;

    const installmentOrders = orders.filter(
        (o) => o.paymentType === "installment"
    ).length;

    const totalIncome = orders.reduce(
        (sum, o) => sum + (o.paidAmount || o.amount || 0),
        0
    );

    const cards = [
        {
            title: "کل سفارشات",
            value: totalOrders,
            icon: ShoppingCart,
            color: "bg-blue-500",
        },
        {
            title: "پرداخت شده",
            value: paidOrders,
            icon: BadgeDollarSign,
            color: "bg-green-500",
        },
        {
            title: "در انتظار",
            value: pendingOrders,
            icon: Clock3,
            color: "bg-orange-500",
        },
        {
            title: "اقساطی",
            value: installmentOrders,
            icon: CreditCard,
            color: "bg-purple-500",
        },
        {
            title: "درآمد",
            value: `${totalIncome.toLocaleString()} تومان`,
            icon: Wallet,
            color: "bg-yellow-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-5 border border-gray-200 dark:border-zinc-800 hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold mt-2">
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
                            >
                                <Icon size={26} />
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}