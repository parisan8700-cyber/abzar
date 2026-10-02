"use client";


import { Home, Menu, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";


export default function NavigationBar() {


  const openSidebar = () => {
    window.dispatchEvent(new Event("open-sidebar"));
  };

  return (
    <div
      className="min-[652px]:hidden"
      style={{ zIndex: 9999999 }}
      id="navigation"
    >
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-3 rounded-t-3xl z-[1000]">
        <Link href="/basket">
          <span className="flex flex-col items-center text-black hover:text-yellow-400 transition">
            <ShoppingCartIcon className="w-7 h-7" />
            <span className="text-sm">سبد خرید</span>
          </span>

        </Link>
        <Link href="/">
          <span className="relative flex flex-col items-center bg-yellow-400 text-white rounded-full p-4 -mt-6 shadow-lg">
            <Home className="w-6 h-6" />
            <span className="text-sm">خانه</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={openSidebar}
          className="flex flex-col items-center text-black hover:text-yellow-400 transition"
        >
          <Menu className="w-7 h-7" />
          <span className="text-sm">دسته‌بندی‌ها</span>
        </button>
      </nav>
    </div>
  );
}
