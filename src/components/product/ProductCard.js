import Image from "next/image";
import Link from "next/link";
import { getFinalPrice, getDiscountPercent, formatPrice } from "@/utils/Price";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";
import { ShoppingBasket, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {

  function toPersianDigits(number) {
    return number.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

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

      toast.success("محصول با موفقیت به سبد خریداضافه شد");
    } catch (err) {
      console.error("خطا در افزودن محصول به سبد خرید:", err.message);
      toast.error(err.message);
    }
  };




  return (
    <div>
      <div className="relative group w-[95%] h-[23rem]">

        {/* پس‌زمینه نارنجی */}
        <div
          className="absolute top-[-2] left-1 right-1 bottom-8 bg-yellow-300 rounded-2xl 
rotate-6 opacity-0 scale-95 
transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100
-z-10"
        ></div>


        <div
          className="bg-white rounded-2xl p-4 shadow-lg relative text-right 
    transition-transform duration-300 ease-in-out
    group-hover:translate-y-0
    text-white"
        >

          {/* تصویر و درصد تخفیف */}
          <div className="relative w-full h-44 rounded-md overflow-hidden ">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                loading="lazy"
                className="object-contain"
              />
              <div className="absolute top-2">
                {product.discount > 0 ? (
                  <span className="bg-yellow-300 text-white text-xs px-3 py-1 rounded-md">
                    {getDiscountPercent(product.price, product.discount)}٪
                  </span>
                ) : (
                  <span className="invisible text-xs px-2 py-1 rounded-full">
                    ۰۰٪
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* خط با دایره وسط */}
          <div className="relative flex items-center px-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>


          {/* عنوان */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-base text-center text-gray-700 mb-3 mt-3 leading-6">
              {product.name}
            </h3>
          </Link>

          {/* قیمت قبلی */}
          {product.discount > 0 ? (
            <p className="line-through text-gray-400 text-sm mb-1 text-left ml-2">
              {toPersianDigits(formatPrice(product.price))}
            </p>
          ) : (
            <p className="invisible text-sm mb-1">_</p>
          )}

          {/* دکمه و قیمت نهایی */}
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => addToCart(product._id)}
              className="group bg-[#f3f6f9] w-[44px] h-[44px] hover:bg-yellow-300 px-3 rounded-lg flex items-center justify-center"
            >
              <ShoppingCart color="black" />
            </button>

            <p className="font-bold text-yellow-300 text-base flex items-center">
              {toPersianDigits(
                formatPrice(
                  product.discount > 0
                    ? getFinalPrice(product.price, product.discount)
                    : product.price
                )
              )}
              <span className="inline-block transform rotate-270 origin-center text-xs font-normal">
                تومان
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
