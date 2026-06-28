"use client";

import { motion } from "framer-motion";

export default function StatsCard({
    title,
    value = 0,
    icon,
    color = "#3b82f6",
    suffix,
}) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
            }}
            className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition-all
            hover:shadow-2xl
            "
        >
            {/* Soft Glow */}
            <div
                className="absolute inset-0 opacity-20 blur-3xl"
                style={{
                    background: `radial-gradient(circle at top right, ${color}, transparent 60%)`,
                }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />

            {/* Shine */}
            <motion.div
                initial={{ x: "-140%" }}
                whileHover={{ x: "230%" }}
                transition={{ duration: 0.8 }}
                className="
                absolute
                top-0
                left-0
                h-full
                w-24
                rotate-12
                bg-gradient-to-r
                from-transparent
                via-white/40
                to-transparent
                "
            />

            {/* Live Dot */}
            <div className="absolute top-5 right-5">
                <span
                    className="absolute h-2.5 w-2.5 animate-ping rounded-full"
                    style={{
                        backgroundColor: color,
                    }}
                />
                <span
                    className="relative block h-2.5 w-2.5 rounded-full"
                    style={{
                        backgroundColor: color,
                    }}
                />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">
                            {title}
                        </p>

                        <h2 className="mt-3 text-4xl font-black tracking-tight">
                            <span
                                style={{
                                    background: `linear-gradient(90deg, ${color}, #111827)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {Number(value).toLocaleString()}
                            </span>

                            {suffix && (
                                <span className="mr-2 text-sm font-medium text-slate-500">
                                    {suffix}
                                </span>
                            )}
                        </h2>
                    </div>

                    <motion.div
                        whileHover={{
                            rotate: 8,
                            scale: 1.08,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                        }}
                        className="
                        relative
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        "
                        style={{
                            backgroundColor: `${color}20`,
                            color,
                        }}
                    >
                        {icon}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div
                className="absolute bottom-0 left-0 h-[3px] w-full"
                style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                }}
            />
        </motion.div>
    );
}