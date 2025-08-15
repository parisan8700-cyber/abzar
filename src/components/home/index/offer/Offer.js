"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../../product/ProductCard";
import Image from "next/image";
import SkeletonProductCard from "@/components/shared/loading/SkeletonProductCard";
import Fetch from "@/utils/Fetch";

export default function Offer() {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Fetch.get("/api/products")
      .then((res) => {
        setProducts(res.data.filter((p) => p.categories?.includes("اقساطی")));
      })
      .catch((err) => {
        console.error("خطا در دریافت محصولات:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center w-[99%] lg:gap-6 mt-10 lg:mt-40">
      {/* div سمت چپ */}
      <div className="w-full lg:w-1/4 lg:mt-0 flex flex-col items-center pt-16">
        <div className="w-full text-3xl lg:text-[32px] leading-[150%] text-[#2B2727] flex flex-col items-center">
          <span className="font-extrabold text-black text-center">فروش ویژه اقساطی</span>
          <span className="font-light">بدون پیش پرداخت</span>
        </div>

        <div className="flex items-center w-full max-w-xs mx-auto my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="text-yellow-300 text-3xl mx-2 blink-star">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
              <path
                d="M11.5 0C11.5 0 12.1345 5.92243 14.606 8.39396C17.0776 10.8655 23 11.5 23 11.5C23 11.5 17.0776 12.1345 14.606 14.606C12.1345 17.0776 11.5 23 11.5 23C11.5 23 10.8655 17.0776 8.39396 14.606C5.92243 12.1345 0 11.5 0 11.5C0 11.5 5.92243 10.8655 8.39396 8.39396C10.8655 5.92243 11.5 0 11.5 0Z"
                fill="#FFD700"
              />
            </svg>
          </span>
          <div className="flex-grow border-t border-gray-200" />

          <style jsx>{`
    @keyframes blinkStar {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .blink-star {
      animation: blinkStar 1s infinite;
    }
  `}</style>
        </div>


        <div className="flex items-center justify-center gap-5 mt-5 mr-10">

          <div className="flex items-center justify-center">
            <div className="relative flex h-full gap-0">
              <Image
                src="/img/1.png"
                className="w-[52px] z-10"
                width={49}
                height={49}
                alt="تصویر ۱"
              />
              <Image
                src="/img/2.png"
                className="w-[52px] absolute left-[30px] z-20"
                width={49}
                height={49}
                alt="تصویر ۲"
              />
              <Image
                src="/img/3.png"
                className="w-[52px] absolute left-[60px] z-30"
                width={49}
                height={49}
                alt="تصویر ۳"
              />
            </div>
          </div>

          <div className="text-right mb-6">
            <h3 className="text-2xl font-extrabold text-[#514F4F]">+100</h3>
            <p className="mt-2 text-sm text-[#979797]">تنوع محصولات</p>
          </div>
        </div>
      </div>

      {/* div سمت راست (اسلایدر) */}
      <div className="relative py-10 w-full lg:w-3/4 h-[29rem] bg-[#3a4654] rounded-xl overflow-hidden mt-10 lg:mt-0">
        <div className="flex flex-wrap justify-center items-center content-center h-full">
          <div className="w-[90%] mx-auto px-3">
            <Swiper
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Navigation, Autoplay]}
              className="overflow-visible"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                  <SwiperSlide key={i}>
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

        {/* دکمه‌ها */}
        <div className="absolute bottom-4 left-8 flex gap-2 z-10">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 flex items-center justify-center border-2 border-yellow-300 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffdf20"
              strokeWidth={4}
              className="rotate-[-179deg]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 flex items-center justify-center border-2 border-yellow-300 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffdf20"
              strokeWidth={4}
              className="rotate-[179deg]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div >
  );
};


