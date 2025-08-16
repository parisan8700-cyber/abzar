"use client";

import { XCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Failed() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <XCircle className="text-red-600 w-16 h-16" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
            پرداخت ناموفق بود
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            متأسفانه پرداخت شما انجام نشد یا توسط شما لغو گردید
          </p>
          <button
            onClick={() => router.push("/basket")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
