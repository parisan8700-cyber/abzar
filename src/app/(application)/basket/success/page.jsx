"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("درحال برسی پرداخت");

  useEffect(() => {
    const verifyPayment = async () => {
      const status = searchParams.get("Status");
      const authority = searchParams.get("Authority");
      const amount = 10000; 
  
      if (status === "OK" && authority) {
        try {
          const { data } = await Fetch.post(
            "/api/payment/verify",
            { Authority: authority, Amount: amount },
            { requiresAuth: false } 
          );
  
          if (data?.code === 100) {
            setMessage("✅ پرداخت با موفقیت تأیید شد");
          } else {
            router.push("/basket/failed");
          }
        } catch (error) {
          router.push("/basket/failed");
        }
      } else {
        setMessage("❌ وضعیت پرداخت نامشخص است");
        router.push("/basket/failed");
      }
    };
  
    verifyPayment();
  }, [searchParams, router]);
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl px-8 py-12 max-w-md w-full text-center">
        <p className="text-xl font-bold text-gray-800">{message}</p>
      </div>
    </div>
  );
}
