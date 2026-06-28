"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Fetch from "@/utils/Fetch";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setOpenCategory(null);
  }, [pathname]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await Fetch.get("/api/categories/tree");
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();
  }, []);

  const navItems = [
    {
      title: "دسته بندی ها",
      children: categories,
    },

    {
      title: "پرفروش ها",
      href: "/shop/porforoush",
    },

    {
      title: "تماس با ما",
      href: "/contact",
    },

    {
      title: "درباره ما",
      href: "/about",
    },

    {
      title: "شرایط اقساط",
      href: "/check",
    },
  ];

  return (
    <div className="min-[970px]:hidden">
      {/* دکمه باز کردن */}

      <div
        onClick={() => setIsOpen(true)}
        className="p-2 cursor-pointer"
      >
        <Image
          src="/img/sidebar.svg"
          alt="لوگو"
          width={35}
          height={35}
        />
      </div>

      {/* بک دراپ */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* سایدبار */}

      <div
        className={clsx(
          "fixed top-0 right-0 w-[300px] h-full bg-white z-50 shadow-xl px-4 py-5 transition-all duration-500",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* هدر */}

        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <X
            className="text-yellow-400 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* منو */}

        <ul
          className="flex flex-col gap-2"
          dir="rtl"
        >
          {navItems.map((item, index) => (
            <li>
              <div
                onClick={() =>
                  setOpenCategory((prev) => (prev === "categories" ? null : "categories"))
                }
                className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl hover:bg-orange-400"
              >
                <span>دسته بندی ها</span>

                <ChevronDown
                  size={18}
                  className={clsx(
                    "transition-transform duration-300",
                    openCategory === "categories" && "rotate-180"
                  )}
                />
              </div>

              {openCategory === "categories" && (
                <ul className="mt-2 pr-4 space-y-2">
                  {categories.map((mainCat) => (
                    <li key={mainCat._id}>
                      <div
                        onClick={() =>
                          setOpenCategory((prev) =>
                            prev === mainCat._id ? "categories" : mainCat._id
                          )
                        }
                        className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-orange-100"
                      >
                        <Link
                          href={`/shop/${mainCat.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1"
                        >
                          {mainCat.name}
                        </Link>

                        {mainCat.subs?.length > 0 && (
                          <ChevronDown
                            size={16}
                            className={clsx(
                              "transition-transform",
                              openCategory === mainCat._id && "rotate-180"
                            )}
                          />
                        )}
                      </div>

                      {openCategory === mainCat._id &&
                        mainCat.subs?.length > 0 && (
                          <ul className="pr-5 mt-2 space-y-1">
                            {mainCat.subs.map((sub) => (
                              <li key={sub._id}>
                                <Link
                                  href={`/shop/${mainCat.slug}/${sub.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-100"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}