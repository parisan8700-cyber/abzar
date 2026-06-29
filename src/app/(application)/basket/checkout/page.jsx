"use client";

import { useEffect, useState } from "react";
import Stepper from "@/components/basket/Stepper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useOrderStore from "@/store/useOrderStore";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";
import useAuthStore from "@/store/authStore";

export default function Checkout() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    province: "",
    address: "",
    postalCode: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [cart, setCart] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("post");

  const shippingCost =
    shippingMethod === "pickup"
      ? 0
      : shippingMethod === "post"
        ? 100000
        : 200000;


  const finalAmount =
    (cart?.items?.reduce((sum, item) => {
      const currentPrice =
        item.type === "installment"
          ? item.price
          : item.product.price - (item.product.discount || 0);

      return sum + currentPrice * item.quantity;
    }, 0) || 0) + shippingCost;


  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isLoggedIn === null) return;

        if (isLoggedIn) {
          // کاربر لاگین شده
          const { data } = await Fetch.get('/api/cart', { requiresAuth: true });
          setCart(data);
        } else {
          // کاربر مهمان
          let guestId = localStorage.getItem("guestId");
          if (!guestId) {
            guestId = crypto.randomUUID();
            localStorage.setItem("guestId", guestId);
          }
          const res = await fetch(
            `https://backabzar.onrender.com/api/cart?guestId=${guestId}`
          );
          const data = await res.json();
          setCart(data);
        }
      } catch (error) {
        toast.error("خطا در بارگذاری سبد خرید");
      }
    };

    fetchCart();
  }, [isLoggedIn]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = ["phone", "postalCode"].includes(name)
      ? toEnglishDigits(value)
      : value;
    setFormData({ ...formData, [name]: cleanValue });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const toEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";

    return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "پر کردن این فیلد الزامی است";
    if (!formData.lastName) newErrors.lastName = "پر کردن این فیلد الزامی است";
    if (!formData.city) newErrors.city = "شهر الزامی است";
    if (!formData.province) newErrors.province = "استان الزامی است";
    if (!formData.address) newErrors.address = "پر کردن این فیلد الزامی است";
    if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید دقیقا ۱۰ رقم باشد";
    }

    if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن باید با 09 شروع شده و 11 رقم باشد";
    }
    return newErrors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    if (!cart || cart.items.length === 0) {
      toast("سبد خرید شما خالی است");
      return;
    }

    const cartItems = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,

      // اگر اقساطی بود از مبلغ پیش پرداخت استفاده کن
      // اگر نقدی بود از قیمت اصلی
      price:
        item.type === "installment"
          ? item.price
          : item.product.price - (item.product.discount || 0),

      originalPrice: item.product.price,

      purchaseType: item.type,
    }));

    const totalAmount = cart.items.reduce((sum, item) => {
      const currentPrice =
        item.type === "installment"
          ? item.price
          : item.product.price - (item.product.discount || 0);

      return sum + currentPrice * item.quantity;
    }, 0);

    const paymentType = cart.items.some(item => item.type === "installment")
      ? "installment"
      : "cash";

    const originalTotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const finalFormData = {
      ...formData,

      items: cartItems,

      // مبلغی که الان پرداخت می‌شود
      // amount: totalAmount,

      // // مبلغ پرداخت شده
      // paidAmount: totalAmount,

      // // مبلغ باقی مانده
      // remainingAmount: originalTotal - totalAmount,

      // نوع سفارش
      paymentType,

      //نوع پست
      shippingMethod,
    };

    try {
      const { data } = await Fetch.post('/api/orders', finalFormData);

      const { _id: orderId, amount } = data;

      useOrderStore.getState().setOrder(orderId, amount);

      router.push('/basket/payment');
    } catch (err) {
      if (err.response) {
        toast.error("خطا در ثبت سفارش");
      } else {
        toast.error("ارتباط با سرور برقرار نشد");
      }
    }
  };


  const renderInput = (name, placeholder, extraClass = "", isTextArea = false) => (
    <div className={`flex flex-col ${extraClass}`} dir="rtl">
      {isTextArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`p-3 border border-gray-800
            } rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none resize-none h-32`}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`p-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4" dir="rtl">

      <Stepper currentStep={2} />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">

          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">

            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 space-y-8"
            >

              {/* Title */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                  جزئیات صورت‌حساب
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  اطلاعات خود را برای ثبت سفارش تکمیل کنید
                </p>
              </div>

              {/* FORM SECTION */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {renderInput("lastName", "نام خانوادگی")}
                  {renderInput("firstName", "نام")}
                  {renderInput("city", "شهر")}
                  {renderInput("province", "استان")}
                  {renderInput("address", "آدرس خیابان", "sm:col-span-2")}
                  {renderInput("postalCode", "کدپستی")}
                  {renderInput("phone", "تلفن")}
                  {renderInput(
                    "description",
                    "توضیحات سفارش (اختیاری)",
                    "sm:col-span-2",
                    true
                  )}

                  {/* SHIPPING */}
                  <div className="sm:col-span-2 mt-2">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">
                      🚚 روش ارسال
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {/* PICKUP */}
                      <div
                        onClick={() => setShippingMethod("pickup")}
                        className={`cursor-pointer border rounded-2xl p-4 flex justify-between items-center transition
                        ${shippingMethod === "pickup"
                            ? "border-green-500 bg-green-50"
                            : "hover:bg-gray-50"
                          }`}
                      >
                        <div>
                          <p className="font-semibold">🏪 تحویل حضوری</p>
                          <p className="text-sm text-gray-500">
                            دریافت از فروشگاه
                          </p>
                        </div>

                        <div className="font-bold text-green-600">
                          رایگان
                        </div>
                      </div>

                      {/* POST */}
                      <div
                        onClick={() => setShippingMethod("post")}
                        className={`cursor-pointer border rounded-2xl p-4 flex justify-between items-center transition
                        ${shippingMethod === "post"
                            ? "border-blue-500 bg-blue-50"
                            : "hover:bg-gray-50"
                          }`}
                      >
                        <div>
                          <p className="font-semibold">📦 پست پیشتاز</p>
                          <p className="text-sm text-gray-500">
                            ۲ تا ۵ روز کاری
                          </p>
                        </div>

                        <div className="font-bold text-blue-600">
                          100,000 تومان
                        </div>
                      </div>

                      {/* EXPRESS */}
                      <div
                        onClick={() => setShippingMethod("express")}
                        className={`cursor-pointer border rounded-2xl p-4 flex justify-between items-center transition
                        ${shippingMethod === "express"
                            ? "border-yellow-500 bg-yellow-50"
                            : "hover:bg-gray-50"
                          }`}
                      >
                        <div>
                          <p className="font-semibold">⚡ پست سریع</p>
                          <p className="text-sm text-gray-500">
                            ارسال فوری
                          </p>
                        </div>

                        <div className="font-bold text-yellow-600">
                          200,000 تومان
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* SUMMARY */}
                <div className="bg-white rounded-2xl p-5 border mt-6 space-y-3">

                  <div className="flex justify-between text-gray-600">
                    <span>هزینه ارسال</span>
                    <span>{shippingCost.toLocaleString()} تومان</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-3">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-green-600">
                      {finalAmount.toLocaleString()} تومان
                    </span>
                  </div>

                </div>

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold p-4 rounded-2xl hover:scale-[1.01] transition"
              >
                ثبت سفارش
              </button>

            </form>

          </div>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="mt-6 text-center">
        <Link href="/basket">
          <button
            type="button"
            className="border border-gray-300 hover:bg-gray-200 transition px-6 py-3 rounded-xl"
          >
            بازگشت
          </button>
        </Link>
      </div>

    </div>
  );
}
