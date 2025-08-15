"use client";

import { useRouter } from "next/navigation";

export default function BackToLastPageBtn() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="text-lg  font-medium border border-yellow-500 py-2.5 px-4 rounded-xl cursor-pointer hover:bg-yellow-100 transition"
    >
      بازگشت به صفحه قبل
    </button>
  );
}


