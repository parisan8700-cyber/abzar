"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
    { icon: "/img/1.png", title: "برقی و شارژی", slug: "electric" },
    { icon: "/img/2.png", title: "بادی", slug: "pneumatic" },
    { icon: "/img/3.png", title: "جوش و برش", slug: "welding" },
    { icon: "/img/4.png", title: "تاسیسات و آبرسانی", slug: "plumbing" },
    { icon: "/img/5.png", title: "تخصصی تعمیرگاهی", slug: "garage-tools" },
    { icon: "/img/6.png", title: "جرثقیل و لیفتینگ", slug: "lifting" },
];

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
                                <div className="bg-[#f1f4f7] hover:bg-yellow-300 rounded-xl shadow-sm p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 w-full h-[110px] sm:h-[140px]">
                                    <img
                                        src={cat.icon}
                                        alt={cat.title}
                                        className="h-12 sm:h-16 object-contain mb-2 transition-all duration-500"
                                    />
                                    <span className="text-[10px] sm:text-sm md:text-base font-medium text-center text-black leading-tight">
                                        {cat.title}
                                    </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
