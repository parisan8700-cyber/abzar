"use client";


import { Home, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";


export default function NavigationBar() {

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
        <Link href="/check">
          <span className="flex flex-col items-center text-black hover:text-yellow-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-percent-icon lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m15 9-6 6" /><path d="M9 9h.01" /><path d="M15 15h.01" /></svg>
            <span className="text-sm">شرایط اقساط</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
