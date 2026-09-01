"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";

export default function TopProducts({ products }) {
    const medals = ["🥇", "🥈", "🥉"];

    return (
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl">

            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1E3A5F]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-5 sm:p-7">

                {/* Header */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#3E6B9C] flex items-center justify-center shadow-lg shrink-0">
                            <Trophy size={26} className="text-yellow-300" />
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-black">پرفروش‌ترین محصولات</h2>
                            <p className="text-zinc-500 text-sm mt-1">محبوب‌ترین محصولات فروشگاه</p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-bold w-fit">
                        <TrendingUp size={16} />
                        فروش عالی
                    </div>

                </div>

                {/* Products */}

                <div className="space-y-4">

                    {products.map((product, index) => (

                        <motion.div key={product._id} whileHover={{ y: -4, scale: 1.015 }} transition={{ type: "spring", stiffness: 220 }} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-slate-50 p-4 shadow-sm hover:shadow-lg transition-all">

                            <div className="flex items-center gap-4 flex-1 min-w-0">

                                <div className="relative shrink-0">

                                    <img src={product.image} alt={product.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200" />

                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-sm">
                                        {medals[index] || <span className="font-bold text-xs">{index + 1}</span>}
                                    </div>

                                </div>

                                <div className="min-w-0 flex-1">

                                    <h3 className="font-bold text-slate-800 truncate">{product.name}</h3>

                                    <div className="flex flex-wrap items-center gap-2 mt-2">

                                        <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap">
                                            {product.totalSold} فروش
                                        </span>

                                        <span className="text-zinc-400 text-xs whitespace-nowrap">
                                            {Number(product.price).toLocaleString()} تومان
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#335c8a] text-white flex items-center justify-center font-black shadow-lg shrink-0">
                                #{index + 1}
                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </motion.div>
    );
}