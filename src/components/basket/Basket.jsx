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
        console.log(data)
        setCart(data);
      } else {
        // کاربر مهمان
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
          guestId = crypto.randomUUID();
          localStorage.setItem("guestId", guestId);
        }
        const res = await fetch(`https://abzarkashmar.ir/api/cart?guestId=${guestId}`);
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
    let itemPrice = 0;

    if (item.type === "installment") {
      // مبلغ پیش پرداخت
      itemPrice = item.price;
    } else {
      // قیمت نقدی با اعمال تخفیف
      const price = item.product?.price || 0;
      const discount = item.product?.discount || 0;

      itemPrice = price - discount;
    }

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
              <div className="space-y-5 mb-12">
                {cart.items
                  .filter((item) => item.product)
                  .map((item) => (
                    <div
                      key={item.product?._id}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
                    >
                      {/* اطلاعات محصول */}
                      <div className="flex w-full items-start gap-3">

                        <Image
                          src={item.product?.images[0] || "/no-image.jpg"}
                          alt={item.product?.name || "محصول"}
                          width={90}
                          height={90}
                          className="h-20 w-20 flex-shrink-0 rounded-xl border border-slate-200 object-cover sm:h-24 sm:w-24"
                        />

                        <div className="min-w-0 flex-1">

                          <h3 className="break-words text-sm font-bold text-slate-800 sm:text-base">
                            {item.product?.name}
                          </h3>

                          <div className="mt-2">

                            {item.type === "installment" ? (
                              <>
                                <p className="text-xs text-slate-400 line-through sm:text-sm">
                                  {item.product?.price?.toLocaleString()} تومان
                                </p>

                                <p className="font-bold text-green-600 text-sm sm:text-base">
                                  {item.price?.toLocaleString()} تومان (پیش‌پرداخت)
                                </p>
                              </>
                            ) : (
                              <>
                                {item.product?.discount > 0 ? (
                                  <>
                                    <p className="text-xs text-slate-400 line-through sm:text-sm">
                                      {item.product.price.toLocaleString()} تومان
                                    </p>

                                    <p className="font-bold text-green-600 text-sm sm:text-base">
                                      {(item.product.price - item.product.discount).toLocaleString()} تومان
                                    </p>
                                  </>
                                ) : (
                                  <p className="font-bold text-slate-800 text-sm sm:text-base">
                                    {item.product?.price?.toLocaleString()} تومان
                                  </p>
                                )}
                              </>
                            )}

                          </div>

                          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                            تعداد: {item.quantity}
                          </p>

                        </div>

                      </div>

                      {/* کنترل تعداد */}
                      <div className="flex w-full justify-center md:w-auto md:justify-end">

                        <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">

                          <button
                            onClick={() =>
                              handleQuantityChange(item.product?._id, "decrease")
                            }
                            disabled={loadingItems[item.product._id]}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 font-bold transition hover:bg-yellow-500 disabled:opacity-50"
                          >
                            {loadingItems[item.product._id] ? "..." : "-"}
                          </button>

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              handleQuantityChange(item.product?._id, "increase")
                            }
                            disabled={loadingItems[item.product._id]}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 font-bold transition hover:bg-yellow-500 disabled:opacity-50"
                          >
                            {loadingItems[item.product._id] ? "..." : "+"}
                          </button>

                        </div>

                      </div>

                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* پرداخت */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg">
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
