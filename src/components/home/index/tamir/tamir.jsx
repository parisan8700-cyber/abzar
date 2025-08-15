"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../../product/ProductCard";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useState } from "react";
import SkeletonProductCard from "@/components/shared/loading/SkeletonProductCard";
import Fetch from "@/utils/Fetch";
import Link from "next/link";

export default function Tamir() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Fetch.get("/api/products")
            .then((res) => {
                setProducts(res.data.filter((p) => p.categories?.includes("بادی")));
            })
            .catch((err) => {
                console.error("خطا در دریافت محصولات:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="relative py-10 w-full h-[40rem] rounded-xl overflow-hidden">
            <div className="flex items-center w-full">
                <div className="flex items-center mb-6 w-full">
                    <div className="flex h-10 rounded-tr-2xl rounded-br-2xl w-1 bg-yellow-400" />
                    <h2 className="px-4 md:text-2xl font-bold text-right whitespace-nowrap">
                        <span className="text-gray-700">ابزارهای تخصصی تعمیرگاهی</span>
                    </h2>

                    {/* دکمه‌ها */}
                    <div className="absolute left-1 lg:left-8 flex gap-2">
                        <Link href="/shop/تعمیرگاهی">
                            <button
                                className="w-36 h-10 flex items-center justify-center bg-yellow-400 text-black rounded-lg 
             hover:bg-yellow-300 hover:text-white transition-colors duration-300"
                            >
                                همه محصولات
                                <ArrowUpLeft />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-grow border-t border-gray-300 w-8xl h-0.5 mb-6" />

            <div className="bg-gray-200 p-5 rounded-2xl">
                <div className="flex flex-wrap justify-center items-center content-center">
                    <div className="w-[90%] md:w-full max-w-7xl mx-auto ml-[9px]">
                        <Swiper
                            loop
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            slidesPerView={1}
                            spaceBetween={16}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                768: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 4 },
                            }}
                            modules={[Navigation, Autoplay]}
                            className="overflow-visible"
                        >
                            {loading
                                ? Array.from({ length: 5 }).map((_, i) => (
                                    <SwiperSlide key={`skeleton-${i}`}>
                                        <SkeletonProductCard />
                                    </SwiperSlide>
                                ))
                                : products.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <ProductCard product={product} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
