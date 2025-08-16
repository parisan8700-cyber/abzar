"use client";

import { useEffect, useState } from "react";
import { Users, PackageOpen, ShoppingCart, Banknote } from "lucide-react";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import Fetch from "@/utils/Fetch";

function StatCard({ icon, label, value, suffix }) {
    return (
        <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-500  rounded-xl shadow-lg p-6 flex items-center gap-5 transform transition-transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(147,51,234,0.5)]">
            <div className="p-4 bg-white bg-opacity-25 rounded-full flex items-center justify-center text-[#00a693]">
                {icon}
            </div>
            <div className="flex flex-col text-right">
                <span className="uppercase tracking-wide text-sm opacity-80">{label}</span>
                <span className="text-3xl font-bold drop-shadow-md">
                    {value} {suffix || ""}
                </span>
            </div>

            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
          try {
            const res = await Fetch.get("/api/admin/dashboard-stats", { token: true });
            setStats(res.data);
          } catch (err) {
          } finally {
            setLoading(false);
          }
        };
      
        fetchStats();
      }, []);
      

    if (loading || !stats) return <MiniLoading />;

    return (
        <div className=" p-6 sm:p-8 text-right">
            <h1 className="mb-10 text-3xl sm:text-4xl font-extrabold">
                داشبورد آماری
            </h1>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
                <StatCard
                    icon={<Users size={32} className="text-[#00a693]" />}
                    label="تعداد کاربران"
                    value={stats.totalUsers.toLocaleString()}
                />
                <StatCard
                    icon={<PackageOpen size={32} className="text-[#00a693]" />}
                    label="تعداد محصولات"
                    value={stats.totalProducts.toLocaleString()}
                />
                <StatCard
                    icon={<ShoppingCart size={32} className="text-[#00a693]" />}
                    label="تعداد سفارشات"
                    value={stats.totalOrders.toLocaleString()}
                />
                <StatCard
                    icon={<Banknote size={32} className="text-[#00a693]" />}
                    label="درآمد کل"
                    value={stats.totalRevenue.toLocaleString()}
                    suffix="تومان"
                />
            </div>
        </div>

    );
}
