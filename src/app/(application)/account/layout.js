"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import useAuthStore from "@/store/authStore";
import Fetch from "@/utils/Fetch";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const menuItems = [
  { href: "/account/profile", label: "جزئیات حساب" },
  { href: "/account/orders", label: "سفارش ها" },
  { href: "/basket", label: "سبد خرید" },
];

function getCurrentPageTitle(pathname) {
  const found = menuItems.find((item) => pathname.startsWith(item.href));
  return found ? found.label : "پیشخوان";
}

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const logout = useAuthStore((state) => state.logout);

  const currentPage = getCurrentPageTitle(pathname);

  const breadcrumbItems = [
    { text: "صفحه اصلی", href: "/" },
    { text: "حساب کاربری", href: "/account" },
  ];

  if (pathname !== "/account") {
    breadcrumbItems.push({ text: currentPage, href: pathname });
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await Fetch.get("/api/users", { token: true });
        setUser(response.data);
      } catch (error) { }
    };

    fetchUserData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    toast.success("خروج موفقیت آمیزبود");
    router.push("/");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row-reverse mt-5 gap-6 font-gandom min-h-[70vh]">

        <main className="flex-1 bg-gray-100 p-4 md:p-8 rounded-2xl shadow-xl">
          {children}
        </main>

        <aside className="w-full md:max-w-xs rounded-2xl shadow-xl bg-gray-300 p-4 max-h-[470px]">
          <div className="bg-yellow-400 text-center py-2 rounded-md font-bold mb-4">
            <Link href="/account">پیشخوان</Link>
          </div>
          <ul className="space-y-3 text-right px-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-all ${pathname.startsWith(item.href)
                      ? "bg-yellow-400/30 font-bold"
                      : "hover:text-yellow-800"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/adminPanel"
                  className="block px-3 py-2 rounded-md transition-all hover:text-yellow-800"
                >
                  پنل ادمین
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-right block px-3 py-2 rounded-md transition-all hover:text-red-600"
              >
                خروج
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
