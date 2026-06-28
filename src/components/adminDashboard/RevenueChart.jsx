"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { motion } from "framer-motion";

export default function RevenueChart({ data }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
            border
            border-zinc-200
            "
        >

            <div className="mb-6">

                <h2 className="font-black text-xl">
                    درآمد ماهانه
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                    میزان فروش در ماه‌های اخیر
                </p>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#facc15"
                                stopOpacity={0.9}
                            />

                            <stop
                                offset="95%"
                                stopColor="#facc15"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#facc15"
                        strokeWidth={3}
                        fill="url(#colorRevenue)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </motion.div>
    );
}