"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Fetch from "@/utils/Fetch";

export default function SearchNav() {
  const [value, setValue] = useState("");
  const search = useDeferredValue(value);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const debounceTimeout = setTimeout(() => {
      Fetch.get(`/api/products/search?q=${encodeURIComponent(search)}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => {
          setProducts([]);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  useEffect(() => {
    setProducts([]);
    setValue("");
    setLoading(false);
  }, [pathname]);

  return (
    <div className="relative w-60 h-[44px] max-[1100]:w-88 rounded-xl p-2 flex items-center gap-3 max-[1100]:mr-4 border-2 border-yellow-300">
      <input
        dir="rtl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جستجو محصولات..."
        className="w-full h-full pr-1 bg-transparent text-base text-black placeholder:text-black outline-none"
      />

      {(loading || products.length > 0 || (!loading && search.trim() && products.length === 0)) && (
        <div className="absolute top-14 left-0 w-full rounded-xl shadow-lg p-3 flex flex-col gap-2 z-10 max-h-80 overflow-y-auto bg-[#f1f4f7] text-center text-gray-600">
          {loading && (
            <div className="py-4 text-sm">
              در حال جستجو...
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-4 text-sm">
              نتیجه‌ای یافت نشد.
            </div>
          )}

          {!loading && products.length > 0 && (
            products.map((item) => (
              <Link
                href={`/products/${item.slug}`}
                key={item.id}
                className="flex items-center gap-2 p-2 hover:bg-orange-100 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-xl bg-gray-200">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      width={48}
                      height={48}
                      alt="product-image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  )}
                </div>
                <span
                  dir="rtl"
                  className="text-sm md:text-base font-medium text-gray-500 hover:text-orange-500"
                >
                  {item.name}
                </span>
              </Link>
            ))
          )}
        </div>
      )}

      <div className="w-10 h-10 flex items-center justify-center">
        <Image
          src="https://mehdibagheridev.ir/modista/wp-content/uploads/2024/12/Minimalistic-Magnifer.svg"
          width={15}
          height={15}
          alt="آیکن جستجو"
          className="w-5 h-5 active:scale-95 cursor-pointer"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
