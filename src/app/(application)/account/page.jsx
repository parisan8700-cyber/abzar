"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ShoppingBasket, UserRound } from "lucide-react";
import Fetch from "@/utils/Fetch";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await Fetch.get("/api/users");
        setUser(response.data);
      } catch (error) {}
    };

    fetchUserData();
  }, []);

  const items = [
    {
      title: "آدرس‌ها",
      icon: <MapPin className="w-10 h-10 text-yellow-400" />,
      href: "/account/address",
    },
    {
      title: "سبدخرید",
      icon: <ShoppingBasket className="w-10 h-10 text-yellow-400" />,
      href: "/basket",
    },
    {
      title: "جزئیات حساب",
      icon: <UserRound className="w-10 h-10 text-yellow-400" />,
      href: "/account/profile",
    },
  ];

  return (
    <div className="p-4">
      <div className="p-6 rounded-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">
            سلام {user?.name || "کاربر عزیز"} 
          </h2>
          <p className="text-gray-700 text-sm">
            برای مدیریت حساب کاربری خود، یکی از گزینه‌های زیر را انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, icon, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-[#231C35] hover:bg-gray-800 p-6 rounded-xl flex flex-col items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-200"
            >
              {icon}
              <p className="mt-4 text-gray-300 font-bold">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
