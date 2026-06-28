"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Fetch from "@/utils/Fetch";

export default function Sidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  // باز بودن بخش دسته بندی ها
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // باز بودن هر دسته
  const [openSubCategory, setOpenSubCategory] = useState(null);

  useEffect(() => {
    setIsOpen(false);
    setCategoriesOpen(false);
    setOpenSubCategory(null);
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

  return (
    <div className="min-[970px]:hidden">


      <button
        onClick={() => setIsOpen(true)}
        className="p-2"
      >
        <Image
          src="/img/sidebar.svg"
          alt="sidebar"
          width={35}
          height={35}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-screen w-[300px] bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >

        <div className="flex items-center justify-between p-5">

          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <button onClick={() => setIsOpen(false)}>
            <X className="text-yellow-500" />
          </button>

        </div>

        {/* منو */}

        <ul className="p-4 space-y-2 text-right">

          {/* دسته بندی ها */}

          <li>

            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-orange-100 transition"
            >
              <span className="font-medium">
                دسته بندی ها
              </span>

              <ChevronDown
                size={18}
                className={clsx(
                  "transition-transform",
                  categoriesOpen && "rotate-180"
                )}
              />
            </button>

            {categoriesOpen && (

              <ul className="mt-2 pr-2 space-y-1">

                {categories.map((mainCat) => (

                  <li key={mainCat._id}>

                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer"
                      onClick={() =>
                        setOpenSubCategory((prev) =>
                          prev === mainCat._id ? null : mainCat._id
                        )
                      }
                    >

                      <Link
                        href={`/shop/${mainCat.slug}`}
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(false);
                        }}
                      >
                        {mainCat.name}
                      </Link>

                      {mainCat.subs.length > 0 && (

                        <ChevronDown
                          size={16}
                          className={clsx(
                            "transition-transform",
                            openSubCategory === mainCat._id &&
                            "rotate-180"
                          )}
                        />

                      )}

                    </div>

                    {openSubCategory === mainCat._id &&
                      mainCat.subs.length > 0 && (

                        <ul className="mr-5 mt-2 space-y-1 border-r-2 border-orange-200 pr-3">

                          {mainCat.subs.map((sub) => (

                            <li key={sub._id}>

                              <Link
                                href={`/shop/${mainCat.slug}/${sub.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 px-2 rounded-lg text-sm text-gray-600 hover:bg-orange-100 hover:text-black transition"
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

          {/* سایر لینک ها */}

          <li>
            <Link
              href="/shop/porforoush"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-xl hover:bg-orange-100"
            >
              پرفروش ها
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-xl hover:bg-orange-100"
            >
              تماس با ما
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-xl hover:bg-orange-100"
            >
              درباره ما
            </Link>
          </li>

          <li>
            <Link
              href="/check"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-xl hover:bg-orange-100"
            >
              شرایط اقساط
            </Link>
          </li>

        </ul>

      </aside>

    </div>
  );
}