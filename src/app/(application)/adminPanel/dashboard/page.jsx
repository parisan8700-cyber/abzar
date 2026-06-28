"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Package,
    ShoppingCart,
    Wallet,
} from "lucide-react";

import MiniLoading from "@/components/shared/loading/MiniLoading";
import Fetch from "@/utils/Fetch";
import RecentOrders from "@/components/adminDashboard/RecentOrders";
import OrdersChart from "@/components/adminDashboard/OrdersChart";
import TopProducts from "@/components/adminDashboard/TopProducts";
import RevenueChart from "@/components/adminDashboard/RevenueChart";
import StatsCard from "@/components/adminDashboard/StatsCard";


export default function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const { data } = await Fetch.get(
                    "/api/admin/dashboard-stats",
                    {
                        token: true,
                    }
                );

                setStats(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading || !stats) {
        return <MiniLoading />;
    }

    console.log("stats", stats.topProducts)

    return (

        <div className="space-y-8 p-6">

            {/* Header */}

            <motion.div

                initial={{
                    opacity: 0,
                    y: -20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                className="
                flex
                justify-between
                items-center
                flex-wrap
                gap-4
                "

            >

                <div>

                    <h1 className="text-4xl font-black">

                        داشبورد مدیریت

                    </h1>

                    <p className="text-zinc-500 mt-2">

                        وضعیت کلی فروشگاه

                    </p>

                </div>

            </motion.div>

            {/* کارت ها */}

            <div
                className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-6
    "
            >
                <StatsCard
                    title="کاربران"
                    value={stats.totalUsers}
                    icon={<Users size={24} />}
                    color="#3b82f6"
                />

                <StatsCard
                    title="محصولات"
                    value={stats.totalProducts}
                    icon={<Package size={24} />}
                    color="#8b5cf6"
                />

                <StatsCard
                    title="سفارشات"
                    value={stats.totalOrders}
                    icon={<ShoppingCart size={24} />}
                    color="#f97316"
                />

                <StatsCard
                    title="درآمد"
                    value={stats.totalRevenue}
                    suffix="تومان"
                    icon={<Wallet size={24} />}
                    color="#10b981"
                />
            </div>

            {/* نمودارها */}

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-3
                gap-6
                "
            >

                <div className="xl:col-span-2">

                    <RevenueChart
                        data={stats.monthlyRevenue}
                    />

                </div>

                <TopProducts
                    products={stats.topProducts}
                />

            </div>

            {/* نمودار سفارش */}

            <OrdersChart
                data={stats.monthlyOrders}
            />

        </div>

    );

}