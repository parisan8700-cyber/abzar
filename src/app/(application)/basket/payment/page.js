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
  const { orderId, amount } = useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId && amount) {
      setLoading(false);
    }
  }, [orderId, amount]);


  const handlePay = async () => {
    if (!amount) return;

    try {
      
      const amountInRial = amount * 10;

      const { data } = await Fetch.post(
        '/api/payment',
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
          `پرداخت ناموفق بود: ${data?.message || data?.error || "خطای ناشناخته"}`
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
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-white px-6 py-3 rounded-xl text-lg shadow-md w-full sm:w-auto"
          >
            <CreditCard className="w-5 h-5" />
            پرداخت امن
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
