import { useEffect, useState } from "react";
import { X,  ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SearchNav from "../SearchNav";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const currentPage = "صفحه اصلی";
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setSubmenuOpen(false);
  }, [pathname]);

  const navItems = [
    {
      title: "دسته بندی ها",
      href: "/shop",
      children: [
        { href: "/shop/برقی", title: "ابزارهای برقی" },
        { href: "/shop/تعمیرگاهی", title: "ابزارهای تخصصی تعمیرگاهی" },
        { href: "/shop/بادی", title: "ابزارهای بادی" },
        { href: "/shop/آبرسانی", title: "تاسیسات و آبرسانی" },
        { href: "/shop/جوش-برش", title: "ابزارهای جوش و برش" },
        { href: "/shop/جرثقیل-لیفتینگ", title: "جرثقیل و ابزار لیفتینگ" },
      ],
    },
    { title: "پرفروش ها", href: "/shop/best" },
    { title: "تماس با ما", href: "/contact" },
    { title: "درباره ما", href: "/about" },
    { title: "شرایط اقساط", href: "/check" },
  ];

  return (
    <div className="min-[970px]:hidden">
      <div onClick={() => setIsOpen(true)} className="p-2 cursor-pointer ">
        <Image src="/img/sidebar.svg" alt="لوگو" width={35} height={35} />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={clsx(
          "fixed top-0 right-0 w-[300px] h-full bg-white z-50 shadow-xl px-4 py-5 transition-all duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="لوگو"
              width={100}
              height={100}
            />
          </Link>

          <div className="flex justify-end" dir="rtl">
            <X
              className="text-yellow-400 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        {/* <div className=" mb-7">
          <SearchNav />
        </div> */}

        <ul className="flex flex-col gap-1 text-right px-2" dir="rtl">
          {navItems.map((item, index) => (
            <li key={index}>
              <div>
                <div
                  className={clsx(
                    "flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl transition-colors",
                    item.title === currentPage
                      ? "text-[#ff8904] font-semibold"
                      : "text-gray-700",
                    "hover:bg-orange-400"
                  )}
                  onClick={() => {
                    if (item.children) {
                      setSubmenuOpen((prev) => !prev);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.children ? (
                    <>
                      <span>{item.title}</span>
                      <ChevronDown
                        size={18}
                        className={clsx(
                          "transition-transform",
                          submenuOpen && "rotate-180"
                        )}
                      />
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </div>

                {item.children && submenuOpen && (
                  <ul className="pr-5 pl-2 mt-1 flex flex-col gap-1 text-sm">
                    {item.children.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-gray-600 hover:bg-orange-400 rounded-xl px-3 py-1 transition"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


