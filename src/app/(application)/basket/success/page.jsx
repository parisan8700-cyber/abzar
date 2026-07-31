"use client";

import Fetch from "@/utils/Fetch";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Home, Package } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const orderId = searchParams.get("orderId");
  const trackId = searchParams.get("trackId");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!trackId || !orderId) {
        router.replace("/basket/failed");
        return;
      }

      try {
        const { data } = await Fetch.post(
          "/api/verify",
          { trackId, orderId },
          { requiresAuth: false }
        );

        if (data.success) {
          window.dispatchEvent(new Event("cartUpdated"));
          setVerified(true);
        } else {
          router.replace("/basket/failed");
        }
      } catch {
        router.replace("/basket/failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [trackId, orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          در حال بررسی پرداخت...
        </p>
      </div>
    );
  }

  if (!verified) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-amber-50 flex items-center justify-center px-4 py-10">

      <div className="relative max-w-xl w-full">

        {/* Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />

        <div className="relative bg-white/95 backdrop-blur rounded-[32px] shadow-2xl border border-yellow-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 h-28 flex items-end justify-center pb-8">

            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-[6px] border-white translate-y-12">
              <CheckCircle2 className="w-12 h-12 text-yellow-500" />
            </div>

          </div>

          <div className="pt-20 px-8 pb-8 text-center">

            <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold border border-yellow-200">
              ✓ پرداخت تایید شد
            </span>

            <h1 className="mt-6 text-3xl font-extrabold text-yellow-700">
              سفارش شما با موفقیت ثبت شد
            </h1>

            <p className="mt-5 leading-8 text-gray-600">
              پرداخت شما با موفقیت انجام شد و سفارش در سیستم ثبت گردید.
              <br />
              کارشناسان ابزار کاشمر در اولین فرصت سفارش شما را آماده و ارسال خواهند کرد.
            </p>

            {/* اطلاعات سفارش */}

            <div className="mt-8 rounded-2xl border border-yellow-200 overflow-hidden">

              <div className="grid grid-cols-2">

                <div className="bg-yellow-50 p-5 border-l border-yellow-200">
                  <p className="text-sm text-gray-500 mb-2">
                    شماره سفارش
                  </p>

                  <p className="font-extrabold text-lg text-yellow-700 break-all">
                    {orderId}
                  </p>
                </div>

                <div className="bg-white p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    شماره پیگیری
                  </p>

                  <p className="font-extrabold text-lg text-amber-600 break-all">
                    {trackId}
                  </p>
                </div>

              </div>

            </div>

            {/* پیام */}

            <div className="mt-8 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">

              <p className="text-gray-600 leading-8">
                از اعتماد شما به
                <span className="font-bold text-yellow-700 mx-1">
                  ابزار کاشمر
                </span>
                سپاسگزاریم 🌹
                <br />
                وضعیت سفارش از طریق پنل کاربری قابل پیگیری خواهد بود.
              </p>

            </div>

            {/* Buttons */}

            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              <button
                onClick={() => router.push("/account/orders")}
                className="group h-14 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <Package
                    size={18}
                    className="group-hover:scale-110 transition"
                  />
                  مشاهده سفارش‌ها
                </span>
              </button>

              <button
                onClick={() => router.push("/")}
                className="h-14 rounded-2xl border border-yellow-300 bg-white hover:bg-yellow-50 text-yellow-700 font-bold transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Home size={18} />
                  بازگشت به صفحه اصلی
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}