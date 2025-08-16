"use client";

export default function Loading({ className = "" }) {
  return (
    <div
      className={`flex flex-col justify-center items-center h-80 gap-6 ${className}`}
    >
      {/* Spinner پیشرفته */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-b-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-yellow-300 border-t-transparent animate-spin animation-delay-200"></div>
        <div className="absolute inset-4 rounded-full border-4 border-yellow-200 border-l-transparent animate-spin animation-delay-400"></div>
      </div>

      {/* متن با گرادینت زرد به بنفش و انیمیشن ملایم */}
      <p className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-purple-600 bg-clip-text text-transparent animate-pulse select-none">
        لطفاً صبر کنید
      </p>
    </div>
  );
}
