"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MiniLoading from "../shared/loading/MiniLoading";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";
import useAuthStore from "@/store/authStore";

export default function Basket() {
  const { isLoggedIn, checkAuth } = useAuthStore();
  const [cart, setCart] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    let guestId = localStorage.getItem("guestId");
    if (isLoggedIn || guestId) {
      fetchCartData();
    } else {
      setCart({ items: [] });
    }
  }, [isLoggedIn]);


  const fetchCartData = async () => {
    try {
      if (isLoggedIn) {
        // کاربر لاگین شده
        const { data } = await Fetch.get("/api/cart", { requiresAuth: true });
        setCart(data);
      } else {
        // کاربر مهمان
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
          guestId = crypto.randomUUID();
          localStorage.setItem("guestId", guestId);
        }
        const res = await fetch(`https://backabzar.onrender.com/api/cart?guestId=${guestId}`);
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      toast.error("لطفا صفحه را رفرش کنید");
    }
  };



  const handleQuantityChange = async (productId, action) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      const item = cart.items.find((i) => i.product._id === productId);
      if (!item) throw new Error("محصول یافت نشد");

      const guestId = !isLoggedIn ? localStorage.getItem("guestId") : null;

      if (action === "increase") {
        await Fetch.post(
          "/api/cart/add",
          {
            productId,
            quantity: 1,
            ...(isLoggedIn ? {} : { guestId }),
          },
          { requiresAuth: isLoggedIn } // فقط اگر کاربر لاگین هست
        );
      } else if (action === "decrease") {
        if (item.quantity === 1) {
          await Fetch.delete(`/api/cart/remove/${productId}`, {
            ...(isLoggedIn
              ? { requiresAuth: true }
              : { params: { guestId } }),
          });
          toast.success("محصول با موفقیت حذف شد");
        } else {
          await Fetch.post(
            "/api/cart/add",
            {
              productId,
              quantity: -1,
              ...(isLoggedIn ? {} : { guestId }),
            },
            { requiresAuth: isLoggedIn }
          );
        }
      }

      await fetchCartData();
    } catch (error) {
      toast.error(error.message || "خطا در تغییر تعداد محصول");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };



  if (!cart) return <MiniLoading />;

  const totalPrice = cart.items.reduce((sum, item) => {
    const itemPrice = item.type === "installment" ? item.price : item.product?.price || 0;
    return sum + itemPrice * item.quantity;
  }, 0);
  

  return (
    <div dir="rtl">
      {cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-4 py-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            سبد خرید شما خالی است
          </h2>
          <p className="text-gray-500 mt-3 mb-8 text-sm sm:text-base">
            محصولی برای نمایش وجود ندارد
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 transition-colors text-white font-medium py-2.5 px-4 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5713 3.42859H6.857L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                fill="white"
              />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 p-4 text-right">
          <div className="w-full md:w-2/3 min-w-0">
            <div className="space-y-8 mb-12">
              {cart.items.map((item) => (
                <div key={item.product._id} className="flex flex-col md:flex-row justify-between items-center bg-gray-300 rounded-xl shadow-md p-4">
                  <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                    <Image
                      src={item.product?.images[0] || "/no-image.jpg"}
                      alt={item.product?.name || "محصول"}
                      width={80}
                      height={60}
                      className="rounded-md border border-gray-300"
                    />
                    <div>
                      <h3 className="text-base font-semibold truncate w-40">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {/* اگر اقساطیه از item.price استفاده کن، در غیر اینصورت قیمت اصلی */}
                        {item.type === "installment"
                          ? `${item.price} تومان (پیش‌پرداخت)`
                          : `${item.product?.price ?? 0} تومان`}
                      </p>
                      <p className="text-sm text-gray-600">تعداد: {item.quantity}</p>
                    </div>
                  </div>

                  {/* کنترل تعداد */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, "decrease")}
                      disabled={loadingItems[item.product._id]}
                      className="bg-yellow-400 px-3 py-1.5 rounded-full hover:bg-yellow-500 disabled:opacity-50"
                    >
                      {loadingItems[item.product._id] ? "..." : "-"}
                    </button>
                    <p className="text-xl w-8 h-8 bg-gray-100 border border-gray-300 rounded-lg text-center leading-8">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, "increase")}
                      disabled={loadingItems[item.product._id]}
                      className="bg-yellow-400 px-3 py-1.5 rounded-full hover:bg-yellow-500 disabled:opacity-50"
                    >
                      {loadingItems[item.product._id] ? "..." : "+"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* پرداخت */}
          <div className="w-full md:w-1/3 bg-gray-300 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 ">مجموع کل سبدخرید:</h3>
            <div className="py-5">
              <p className="text-md text-gray-800">مبلغ کل: {totalPrice.toLocaleString()} تومان</p>
            </div>

            <div className="mb-6">
              <div className="w-full h-[1px] border-t border-dashed border-yellow-400"></div>
            </div>


            <div className="mb-6">
              <p className="text-lg">مجموع: {totalPrice.toLocaleString()} تومان</p>
            </div>
            <Link href="/basket/checkout">
              <button className="bg-yellow-400 px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 w-full">
                ادامه مراحل خرید
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
