"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowUpLeft, ShoppingCartIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";
import { getFinalPrice, getDiscountPercent, formatPrice } from "@/utils/Price";
import useAuthStore from "@/store/authStore";
import Breadcrumb from "../ui/Breadcrumb";
import Link from "next/link";
import Loading from "../shared/loading/Loading";

export default function FullProduct() {
  const [product, setProduct] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { isLoggedIn } = useAuthStore();

  const params = useParams();
  const slug = params.id;

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await Fetch.get(`/api/products/${slug}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) { }
    };

    fetchProduct();
  }, [slug]);

  const addToCart = async () => {
    try {
      // دریافت یا ایجاد guestId برای مهمان
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = crypto.randomUUID();
        localStorage.setItem("guestId", guestId);
      }

      // گرفتن توکن JWT برای کاربر لاگین شده
      const token = localStorage.getItem("token");
      const isLoggedIn = Boolean(token && token.split(".").length === 3); // چک ساده JWT

      // ساخت هدرها با شرط Authorization فقط اگر لاگین هستیم
      const headers = {
        "Content-Type": "application/json",
        ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
      };

      // ارسال درخواست به سرور
      const res = await fetch("https://backabzar.onrender.com/api/cart/add", {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          // توکن فقط در body نیست، بلکه guestId برای مهمان می‌فرستیم
          ...(isLoggedIn ? {} : { guestId }),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطا در افزودن به سبد خرید");
      console.log(data)

      toast.success("محصول با موفقیت به سبد خریداضافه شد");
    } catch (err) {
      console.error("خطا در افزودن محصول به سبد خرید:", err.message);
      toast.error(err.message);
    }
  };


  const addToCartInstallment = async () => {
    try {
      // دریافت یا ایجاد guestId برای مهمان
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = crypto.randomUUID();
        localStorage.setItem("guestId", guestId);
      }

      // گرفتن توکن JWT برای کاربر لاگین شده
      const token = localStorage.getItem("token");
      const isLoggedIn = Boolean(token && token.split(".").length === 3); // چک ساده JWT

      // ساخت هدرها با شرط Authorization فقط اگر لاگین هستیم
      const headers = {
        "Content-Type": "application/json",
        ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
      };

      // ارسال درخواست به سرور
      const res = await fetch("https://backabzar.onrender.com/api/cart/add-installment", {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          // توکن فقط در body نیست، بلکه guestId برای مهمان می‌فرستیم
          ...(isLoggedIn ? {} : { guestId }),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطا در افزودن به سبد خرید");
      console.log(data)

      toast.success("محصول با موفقیت به سبد خریداضافه شد");
    } catch (err) {
      console.error("خطا در افزودن محصول به سبد خرید:", err.message);
      toast.error(err.message);
    }
  };


  useEffect(() => {
    if (!product || !product.categories) return;

    const fetchRelated = async () => {
      try {
        const response = await Fetch.get(`/api/products/category/${product.categories[0]}`);
        if (response.status === 200) {
          // محصول فعلی رو حذف می‌کنیم از لیست مرتبط‌ها (تا خودش نمایش داده نشه)
          const filtered = response.data.filter((p) => p._id !== product._id);
          setRelatedProducts(filtered);
        }
      } catch (error) { }
    };

    fetchRelated();
  }, [product]);

  return (
    <div dir="rtl">
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: product?.name, href: "#" },
        ]}
      />

      <div className="flex flex-col md:flex-row bg-gray-100 rounded-3xl p-4 md:p-9 justify-between shadow-md">
        {/* گالری و تصویر اصلی */}
        <div className="w-full lg:w-[35%] flex gap-3">
          {/* تصاویر کوچک */}
          {product?.images?.length > 1 && (
            <div className="flex flex-col gap-2 overflow-x-auto md:overflow-y-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-14 h-14 border rounded-lg overflow-hidden flex-shrink-0 ${selectedImageIndex === i ? "border-orange-500" : "border-gray-200"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`تصویر ${i + 1}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* تصویر اصلی با افکت زوم */}
          <div
            className="flex-1 rounded-lg  overflow-hidden relative h-[250px] md:h-[300px] cursor-zoom-in"
            style={{
              backgroundImage: `url(${product?.images[selectedImageIndex]})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-size 0.3s ease",
            }}
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.pageX - left) / width) * 100;
              const y = ((e.pageY - top) / height) * 100;
              e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundSize = "200%";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundSize = "contain";
              e.currentTarget.style.backgroundPosition = "center";
            }}
          ></div>
        </div>

        {/* اطلاعات محصول */}
        <div className="w-full md:w-1/2 flex flex-col justify-between mt-4 md:mt-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
              {product?.name}
            </h1>

            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <ul className="text-gray-600 text-sm space-y-1">
                {Array.isArray(product?.feature)
                  ? product.feature.map((line, i) => <li key={i}>{line}</li>)
                  : <li>{product?.feature}</li>}
              </ul>
            </div>
          </div>

          <div>
            <p>برند: {product?.brand}</p>
          </div>

          <div>
            {product?.price && (
              <>
                <div className="flex items-center justify-between mb-2 mt-10">
                  {product.discount > 0 && (
                    <del className="text-gray-400 text-sm">{formatPrice(product.price)} تومان</del>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded">
                      {getDiscountPercent(product.price, product.discount)}٪ تخفیف
                    </span>
                  )}
                </div>

                <div className="text-xl md:text-2xl font-bold text-black mb-4">
                  {formatPrice(getFinalPrice(product.price, product.discount))} تومان
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-5">
              {/* دکمه‌های خرید */}
              <div className="flex gap-2 order-2 sm:order-1 flex-wrap">
                <button
                  onClick={addToCart}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 border border-yellow-400 hover:bg-yellow-500 text-md font-semibold rounded-lg transition-colors duration-300 shadow-md"
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  خرید نقدی
                </button>

                <button
                  onClick={addToCartInstallment}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 border border-green-500 hover:bg-green-600 text-md font-semibold rounded-lg transition-colors duration-300 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m15 9-6 6" />
                    <path d="M9 9h.01" />
                    <path d="M15 15h.01" />
                  </svg>
                  خرید اقساطی
                </button>
              </div>

              {/* لینک شرایط */}
              <div className="order-1 sm:order-2 max-sm:mb-3">
                <Link href="/check">
                  <button className="text-sm text-white bg-green-600 hover:bg-green-800 px-3 py-2 rounded-2xl">
                    مشاهده شرایط اقساطی
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-100 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-black mb-4">
          توضیحات کامل محصول
        </h2>
        <p className="text-gray-700 leading-relaxed text-md">
          {product?.description ||
            "توضیحات تکمیلی این محصول هنوز اضافه نشده است"}
        </p>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20 relative w-full h-[28rem] rounded-xl overflow-hidden">
          <div className="flex items-center w-full mb-6 gap-2.5">
            <div className="flex h-10 rounded-tr-2xl rounded-br-2xl w-1 bg-yellow-400" />
            <h2 className="text-2xl font-bold text-black whitespace-nowrap flex-shrink-0">
              محصولات مرتبط
            </h2>

            <div className="absolute left-1 lg:left-8 flex gap-2">
              <Link href="/shop">
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

          <div className="flex-grow border-t border-gray-300 w-8xl h-0.5 mb-6" />

          <div className="rounded-2xl">
            <div className="flex flex-wrap justify-center items-center content-center">
              <div className="w-[90%] md:w-full max-w-7xl mx-auto ">
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
                  style={{ overflow: "visible" }}
                >
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
