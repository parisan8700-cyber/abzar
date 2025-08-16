import React from "react";
import clsx from "clsx";
import { CreditCard, ShoppingCart, Truck } from "lucide-react";

const steps = [
  { id: 1, title: "محصولات", icon: <ShoppingCart size={24} /> },
  { id: 2, title: "ارسال", icon: <Truck size={24} /> },
  { id: 3, title: "پرداخت", icon: <CreditCard size={24} /> },
];

export default function Stepper({ currentStep }) {
  const progressPercent = Math.max(
    ((currentStep - 1) / (steps.length - 1)) * 100,
    20
  );

  return (
    <div
      dir="rtl"
      className="relative flex flex-row items-center justify-between w-full max-w-2xl mx-auto mb-12"
    >
      <div className="absolute top-1/2 right-0 left-0 h-1 bg-gray-300 z-0"></div>

      <div
        className="absolute top-1/2 right-0 h-1 bg-yellow-400 z-10 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      ></div>

      {steps.map((step) => (
        <div key={step.id} className="relative flex-1 flex justify-center z-20">
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-all",
              "w-20 h-20 rounded-full border-4 p-4 bg-white",
              currentStep >= step.id
                ? "border-yellow-400 text-black"
                : "border-gray-300 text-gray-400"
            )}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <span className="text-sm font-semibold">{step.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};


