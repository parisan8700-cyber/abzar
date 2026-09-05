"use client";

import Link from "next/link";
import { CreditCard, Sparkles } from "lucide-react";

export default function InstallmentFloatingButton() {
    return (
        <div
            className="
        fixed
        right-4
        bottom-[82px]
        sm:right-6
        sm:bottom-7
        z-[99999]
      "
            dir="rtl"
        >
            <Link
                href="/check"
                aria-label="مشاهده شرایط خرید اقساطی"
                className="group relative block"
            >
                {/* Glow */}
                <div
                    className="
            absolute
            -inset-2
            rounded-full
            bg-emerald-400/30
            blur-md
            opacity-70
            animate-pulse
          "
                />

                {/* حلقه چرخان */}
                <div
                    className="
            absolute
            -inset-[3px]
            rounded-full
            border border-dashed
            border-emerald-400/80
            animate-[spin_8s_linear_infinite]
          "
                />

                {/* موج اطراف */}
                <span
                    className="
            absolute
            inset-0
            rounded-full
            border-2
            border-emerald-400/40
            animate-ping
          "
                />

                {/* دایره اصلی */}
                <div
                    className="
            relative
            w-[68px]
            h-[68px]
            sm:w-[72px]
            sm:h-[72px]
            rounded-full
            bg-gradient-to-br
            from-emerald-400
            via-green-600
            to-emerald-800
            border-2
            border-white/90
            shadow-[0_8px_30px_rgba(5,150,105,0.5)]
            flex
            flex-col
            items-center
            justify-center
            text-white
            overflow-hidden
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:shadow-[0_12px_40px_rgba(5,150,105,0.7)]
          "
                >
                    {/* نور داخلی */}
                    <div
                        className="
              absolute
              -top-8
              -left-8
              w-16
              h-16
              rounded-full
              bg-white/20
              blur-xl
            "
                    />

                    {/* آیکون */}
                    <CreditCard
                        className="
              relative
              w-5
              h-5
              sm:w-6
              sm:h-6
              stroke-[1.8]
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
                    />

                    {/* متن اصلی */}
                    <span
                        className="
              relative
              text-[9px]
              sm:text-[10px]
              font-black
              leading-none
              mt-0.5
            "
                    >
                     اقساطی
                    </span>

                    {/* متن کوچک شرایط خرید */}
                    <span
                        className="
              relative
              text-[7px]
              sm:text-[8px]
              font-medium
              opacity-90
              mt-1
              leading-none
            "
                    >
                        شرایط خرید
                    </span>
                </div>

                {/* حباب توضیحات */}
                <div
                    className="
            absolute
            right-[78px]
            sm:right-[84px]
            top-1/2
            -translate-y-1/2
            w-max
            max-w-[180px]
            opacity-0
            translate-x-3
            pointer-events-none
            transition-all
            duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
                >
                    <div
                        className="
              relative
              bg-white
              text-gray-800
              rounded-2xl
              px-4
              py-2.5
              shadow-xl
              border
              border-gray-100
            "
                    >
                        <p className="text-xs font-black">
                            خرید اقساطی داری؟ 👀
                        </p>

                        <p className="text-[10px] text-gray-500 mt-1">
                            شرایط خرید رو ببین
                        </p>

                        <span
                            className="
                absolute
                -right-2
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                bg-white
                border-t
                border-r
                border-gray-100
                rotate-45
              "
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
}