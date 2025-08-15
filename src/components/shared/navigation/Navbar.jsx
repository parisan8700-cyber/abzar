"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  ShoppingCartIcon,
  Phone, Info, Package,
  Flame,
  Wrench,
  UserIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchNav from "../SearchNav";
import useAuthStore from "@/store/authStore";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  const linkHref = isLoggedIn ? "/account" : "/signup";

  const navLinks = [
    { href: "/shop", label: "پرفروش ها", Icon: Flame },
    { href: "/check", label: "شرایط اقساط", Icon: Package },
  ];

  const topLinks = [
    { href: "/contact", label: "تماس با ما", Icon: Phone },
    { href: "/about", label: "درباره ما", Icon: Info },
  ];


  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 300);
  };

  return (
    <>
      <div className="flex h-10 py-6 border-b border-gray-300 gap-3 text-sm font-medium items-center justify-between px-3 ">
        <div className="flex gap-3">
          <ul className="flex gap-3">
            {topLinks.map(({ href, label, Icon }) => (
              <li key={href} className="relative group">
                <Link
                  href={href}
                  className="text-gray-600 hover:text-yellow-300 transition-all flex items-center gap-1"
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-gray-600 hover:text-yellow-300 transition-all flex items-center text-xs sm:text-sm">
          <p>پشتیبان شما هستیم : 09151203083</p>
        </div>
      </div>

      <header className="flex justify-between items-center px-3 text-right">
        <Sidebar />


        {/* لوگو + لینک‌ها */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="لوگو"
              width={100}
              height={100}
            />
          </Link>

          <nav className="max-[1100px]:hidden">
            <ul className="flex gap-5 text-md font-medium items-center">

              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className="flex items-center gap-1 cursor-pointer text-black hover:text-yellow-300 transition-all">
                  <Menu size={20} />
                  دسته بندی‌ها
                </p>

                <div>
                  <ul
                    className={`absolute top-full right-0 flex flex-col gap-2 shadow-xl rounded-xl p-2 mt-4 z-50 min-w-[240px] text-sm text-right bg-[#f1f4f7]
                  transition-all duration-300 ease-out
                  ${submenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-3 invisible'}`}
                  >
                    {[
                      { href: "/shop/برقی", label: "ابزارهای برقی", Icon: Wrench },
                      { href: "/shop/تعمیرگاهی", label: "ابزارهای تخصصی تعمیرگاهی", Icon: Wrench },
                      { href: "/shop/بادی", label: "ابزارهای بادی", Icon: Wrench },
                      { href: "/shop/آبرسانی", label: "تاسیسات و آبرسانی", Icon: Wrench },
                      { href: "/shop/جوش-برش", label: "ابزارهای جوش و برش", Icon: Wrench },
                      { href: "/shop/جرثقیل-لیفتینگ", label: "جرثقیل و ابزار لیفتینگ", Icon: Wrench },
                    ].map(({ href, label, Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 font-medium text-gray-500 hover:text-black hover:bg-orange-100"
                        >
                          <Icon size={18} />
                          <span>{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </li>

              {navLinks.map(({ href, label, Icon }) => (
                <li key={href} className="relative group">
                  <Link
                    href={href}
                    className="text-black hover:text-yellow-300 transition-all flex items-center gap-2"
                  >
                    <Icon size={20} />
                    {label}
                  </Link>
                </li>
              ))}

            </ul>
          </nav>
        </div>

        {/* آیکن‌ها */}
        <div className="flex items-center gap-1">
          <div className="relative max-[652px]:hidden">
            <SearchNav />
          </div>

          {/* آیکن سبد خرید */}
          <Link href="/basket">
            <button className="p-3 rounded-xl border-2 transition-colors border-yellow-300">
              <ShoppingCartIcon size={17} />
            </button>
          </Link>

          <Link href={linkHref}>
            <button className="px-6 py-[14px] rounded-xl bg-yellow-300 hover:bg-yellow-400 text-white text-sm font-medium max-[1100px]:hidden">
              {isLoggedIn ? "حساب کاربری" : "ورود / ثبت نام"}
            </button>
          </Link>


          <Link href={linkHref}>
            <button className="p-3 rounded-xl border-2 transition-colors border-yellow-300 hidden max-[1100px]:inline-flex">
              <UserIcon size={17} />
            </button>
          </Link>

        </div>
      </header>

      <div className="relative min-[652px]:hidden mb-5">
        <SearchNav />
      </div>
    </>
  );
}
