"use client";

import MiniLoading from "@/components/shared/loading/MiniLoading";
import Stepper from "@/components/basket/Stepper";
import useOrderStore from "@/store/useOrderStore";
import Fetch from "@/utils/Fetch";
import { CreditCard, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Payment() {
  const router = useRouter();
  const { orderId, amount, paymentType } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [installmentConfirmed, setInstallmentConfirmed] = useState(
    paymentType !== "installment"
  );

  useEffect(() => {
    if (orderId && amount) {
      setLoading(false);
    }
  }, [orderId, amount]);



  useEffect(() => {
    if (orderId && paymentType === "installment") {
      setInstallmentConfirmed(false);

      toast.custom(
        (t) => (
          <div
            dir="rtl"
            className={`w-[calc(100vw-28px)] max-w-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 ${t.visible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
              }`}
          >
            {/* نوار بالایی */}
            <div className="h-1 bg-gradient-to-l from-amber-400 via-yellow-400 to-orange-400" />

            <div className="p-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <span className="text-lg">⚠️</span>
                </div>
              </div>

              {/* مهلت */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-amber-400 text-gray-900">
                  <span className="text-xl font-black leading-none">
                    ۴
                  </span>

                  <span className="mt-1 text-[9px] font-bold">
                    روز
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                    مهلت ارسال چک‌ها
                  </p>

                  <p className="mt-1 text-[11px] font-extrabold leading-5 text-gray-700 dark:text-gray-200">
                    چک‌ها حداکثر تا ۴ روز پس از ثبت سفارش
                    باید ارسال شوند.
                  </p>
                </div>
              </div>

              {/* هشدار */}
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 dark:bg-red-950/20">
                <span className="mt-0.5 text-xs">⛔</span>

                <p className="text-[11px] leading-5 text-red-600 dark:text-red-400">
                  پس از پایان مهلت، چک‌ها معتبر نخواهند بود و
                  <span className="font-bold">
                    {" "}سفارش منقضی می‌شود.
                  </span>
                </p>
              </div>

              {/* تأیید */}
              <button
                type="button"
                onClick={() => {
                  setInstallmentConfirmed(true);
                  toast.dismiss(t.id);
                }}
                className="mt-3 w-full rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white transition hover:bg-gray-800 active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    }
  }, [orderId, paymentType]);


  const handlePay = async () => {
    if (!amount) return;

    if (paymentType === "installment" && !installmentConfirmed) {
      toast.error("لطفاً ابتدا شرایط خرید اقساطی را مطالعه و تأیید کنید.");
      return;
    }

    try {
      const amountInRial = amount * 10;

      const { data } = await Fetch.post(
        "/api/payment",
        {
          amount: amountInRial,
          description: `پرداخت سفارش شماره ${orderId}`,
          orderId,
        },
        { requiresAuth: false }
      );

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(
          `پرداخت ناموفق بود: ${data?.message || data?.error || "خطای ناشناخته"
          }`
        );
      }
    } catch (err) {
      toast.error("خطا در برقراری ارتباط با سرور");
    }
  };


  if (loading) return <MiniLoading />;

  return (
    <div className="min-h-screen p-5 sm:p-10">
      <Stepper currentStep={3} />
      <div className="max-w-xl mx-auto mt-12 bg-gray-300 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold  mb-4">
          آماده‌ی پرداخت هستید؟
        </h2>
        <p className="text-gray-800 mb-8 text-base sm:text-lg">
          مبلغ قابل پرداخت:{" "}
          <span className="font-semibold">{amount?.toLocaleString()} تومان</span>
          <br />
          با کلیک روی دکمه زیر، به درگاه بانکی متصل خواهید شد
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePay}
            disabled={paymentType === "installment" && !installmentConfirmed}
            className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-xl text-lg shadow-md
        w-full sm:w-auto
        transition-all duration-300

        ${paymentType === "installment" && !installmentConfirmed
                ? "cursor-not-allowed bg-gray-400 text-gray-200 opacity-70 shadow-none"
                : "bg-yellow-400 text-white hover:bg-yellow-500 hover:shadow-lg active:scale-[0.98]"
              }
    `}
          >
            <CreditCard className="w-5 h-5" />

            {paymentType === "installment" && !installmentConfirmed
              ? "تأیید شرایط برای پرداخت"
              : "پرداخت امن"}
          </button>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 border border-gray-800  hover:bg-yellow-500 transition-all duration-300 px-6 py-3 rounded-xl text-base w-full sm:w-auto"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}
