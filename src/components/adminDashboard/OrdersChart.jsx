"use client";

import { motion } from "framer-motion";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function OrdersChart({ data }) {

    return (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-zinc-200
            p-6
            "
        >

            <div className="mb-6">

                <h2 className="font-black text-xl">
                    تعداد سفارشات
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                    روند ثبت سفارش در ماه‌های اخیر
                </p>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip
                        cursor={{
                            fill: "#fde68a55",
                        }}
                    />

                    <Bar
                        dataKey="orders"
                        radius={[12, 12, 0, 0]}
                        fill="#facc15"
                    />

                </BarChart>

            </ResponsiveContainer>

        </motion.div>

    );

}