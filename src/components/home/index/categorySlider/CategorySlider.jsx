"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [ { icon: "/img/12.png", title: "برقی و شارژی", slug: "barghi-va-sharji" }, { icon: "/img/16.png", title: "بادی", slug: "badi" }, { icon: "/img/13.png", title: "جوش و برش", slug: "joosh-va-boresh" }, { icon: "/img/17.png", title: "دستی", slug: "abzar-dasti" }, { icon: "/img/15.png", title: "جرثقیل و لیفتینگ", slug: "jeraghil-lifting" }, { icon: "/img/14.png", title: "گاراژی", slug: "tamirgahi" }, ];

export default function CategorySlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="relative w-full mx-auto px-4 sm:px-14 mt-10 sm:mt-20 bg-white p-5 rounded-2xl">

            <div className="flex items-center w-full max-w-xs mx-auto">
                <div className="flex-grow border-t border-yellow-400" />
                <p className="text-center font-bold text-lg mx-4">دسته بندی محصولات</p>
                <div className="flex-grow border-t border-yellow-400" />
            </div>

            <div className="mt-5">

                {/* دکمه قبلی */}
                <button
                    ref={prevRef}
                    className="hidden mt-5 sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-yellow-300 hover:bg-yellow-500 transition p-3 shadow-lg rounded-xl cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* دکمه بعدی */}
                <button
                    ref={nextRef}
                    className="hidden mt-5 sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-yellow-300 hover:bg-yellow-500 transition p-3 shadow-lg rounded-xl cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* اسلایدر */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 16 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                    className="!overflow-x-hidden !pb-3"
                >
                    {categories.map((cat, i) => (
                        <SwiperSlide key={i}>
                            <Link href={`/category/${cat.slug}`} className="w-full block">
                                <div
                                    className="
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-yellow-200
    bg-gradient-to-b
    from-white
    to-yellow-50
    shadow-sm

    p-3

    flex
    flex-col
    items-center
    justify-center

    h-[110px]
    sm:h-[140px]

    transition-all
    duration-500

    hover:-translate-y-1
    hover:border-yellow-400
    hover:shadow-[0_12px_30px_rgba(255,193,7,.25)]
"
                                >
                                    {/* Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(255,213,79,.18),transparent_70%)]"></div>

                                    {/* نوار بالا */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"></div>

                                    {/* آیکن */}
                                    <div
                                        className="
        relative
        w-12
        h-12
        sm:w-16
        sm:h-16
        rounded-full
        bg-gradient-to-br
        from-yellow-300
        to-yellow-500
        flex
        items-center
        justify-center
        shadow-md
        transition-all
        duration-500
        group-hover:scale-110
        group-hover:rotate-6
    "
                                    >
                                        <img
                                            src={cat.icon}
                                            alt={cat.title}
                                            className="w-13 h-13 object-contain"
                                        />
                                    </div>

                                    <span
                                        className="
        mt-2
        text-[10px]
        sm:text-sm
        md:text-base
        font-semibold
        text-center
        text-gray-800
        leading-tight
    "
                                    >
                                        {cat.title}
                                    </span>

                                    {/* دایره‌های پس‌زمینه */}
                                    <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-yellow-300/20 group-hover:scale-150 transition duration-700"></div>

                                    <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-yellow-400/20 group-hover:scale-150 transition duration-700"></div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
