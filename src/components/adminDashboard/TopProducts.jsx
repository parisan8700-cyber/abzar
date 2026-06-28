"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function TopProducts({ products }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-zinc-200
            p-6
            "
        >

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-yellow-100 p-3 rounded-2xl">

                    <Trophy
                        className="text-yellow-500"
                        size={24}
                    />

                </div>

                <div>

                    <h2 className="font-black text-xl">
                        پرفروش‌ترین محصولات
                    </h2>

                    <p className="text-sm text-zinc-500">
                        بیشترین تعداد فروش
                    </p>

                </div>

            </div>

            <div className="space-y-4">

                {products.map((product, index) => (

                    <div
                        key={product._id}
                        className="
                        flex
                        justify-between
                        items-center
                        rounded-2xl
                        bg-zinc-50
                        p-4
                        hover:bg-yellow-50
                        transition
                        "
                    >

                        <div>

                            <p className="font-bold">

                                {index + 1}.
                                {" "}
                                {product.name}

                            </p>

                            <span className="text-sm text-zinc-500">

                                {product.totalSold}

                                {" "}

                                فروش

                            </span>

                        </div>

                        <div
                            className="
                            w-12
                            h-12
                            rounded-full
                            bg-yellow-400
                            text-white
                            flex
                            items-center
                            justify-center
                            font-black
                            "
                        >

                            #{index + 1}

                        </div>

                    </div>

                ))}

            </div>

        </motion.div>
    );
}