"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/basket/checkout", label: "اطلاعات" },
  { href: "/basket/payment", label: "پرداخت" },
  { href: "/basket/success", label: "پرداخت موفق" },
  { href: "/basket/failed", label: "پرداخت ناموفق" },
];

function getCurrentPageTitle(pathname) {
  const found = menuItems.find((item) => pathname.startsWith(item.href));
  return found ? found.label : "سبد خرید";
}

export default function BasketLayout({ children }) {
  const pathname = usePathname();

  const currentPage = getCurrentPageTitle(pathname);

  const breadcrumbItems = [
    { text: "صفحه اصلی", href: "/" },
    { text: "سبد خرید", href: "/basket" },
  ];

  if (pathname !== "/basket") {
    breadcrumbItems.push({ text: currentPage, href: pathname });
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <main>{children}</main>
    </div>
  );
}
