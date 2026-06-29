"use client";
import { Instagram, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2F3B46] text-white py-10 px-6 mt-32 max-md:mb-20 rounded-3xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* سمت چپ: لوگو + متن + لینک‌های دسترسی سریع */}
        <div className="md:w-1/2 space-y-8">
          {/* لوگو و متن */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* <Image src="/img/logo.png" alt="Logo" width={100} height={100} /> */}
              <Image
                src="/img/mainLogo.png"
                alt="لوگو"
                width={80}
                height={80}
              />
              <p className="font-bold text-2xl">ابزارکاشمر</p>
            </div>
            <p className="text-lg text-gray-400 leading-6">
              ابزارکاشمر بازارگاه و فروشگاه آنلاینی در ایران و مستقر در کاشمر است. این پلتفرم تجارت الکترونیکی طیف گسترده‌ای از کالاهای مصرفی را ارائه می‌دهد که شامل ابزارآلات متنوع با خدمات تحویل سریع است.
            </p>
          </div>

          {/* لینک‌های دسترسی سریع */}
          <div className="flex flex-col md:flex-row flex-wrap gap-10 md:gap-30">

            {/* راهنمای خرید */}
            <div>
              <h4 className="font-bold text-lg mb-4">راهنمای خرید</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="hover:text-yellow-400">تماس با ما</a></li>
                <li><a href="/about" className="hover:text-yellow-400">درباره ما</a></li>
                <li><a href="/account" className="hover:text-yellow-400">حساب کاربری</a></li>
                <li><a href="/basket" className="hover:text-yellow-400">سبد خرید</a></li>
                <li><a href="/shop" className="hover:text-yellow-400">فروشگاه</a></li>
              </ul>
            </div>

            {/* دسترسی آسان */}
            <div>
              <h4 className="font-bold text-lg mb-4">دسترسی آسان</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="hover:text-yellow-400">تماس با ما</a></li>
                <li><a href="/about" className="hover:text-yellow-400">درباره ما</a></li>
                <li><a href="/account" className="hover:text-yellow-400">حساب کاربری</a></li>
                <li><a href="/basket" className="hover:text-yellow-400">سبد خرید</a></li>
                <li><a href="/shop" className="hover:text-yellow-400">فروشگاه</a></li>
              </ul>
            </div>

            {/* لوگو */}
            <div className="flex justify-start gap-3">
              <a href="https://zibal.ir" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/img/zibal.webp"
                  alt="zibal"
                  width={140}
                  height={20}
                  className="w-20 h-22"
                />
              </a>
            </div>
          </div>
        </div>


        <div className="grid md:w-1/2 space-y-6 mt-8 justify-center">
          <p className="font-bold text-2xl">ابزارکاشمر را همراهی کنید:</p>

          {/* شبکه‌های اجتماعی */}
          <div className="flex justify-center md:justify-start gap-4">

            <Link
              href="ii"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-300 group"
            >
              <Instagram
                size={26}
                className="stroke-fuchsia-600 transition-all duration-300"
              />
            </Link>

            <Link
              href="ii"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-300 group"
            >
              <Send
                size={26}
                className="stroke-blue-500 transition-all duration-300"
              />
            </Link>

            <Link
              href="ii"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-300"
            >
              <Image
                src="/img/watsapp.png"
                alt="WhatsApp"
                width={46}
                height={46}
              />
            </Link>

            <Link
              href="ii"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-300"
            >
              <Image
                src="/img/rubika.png"
                alt="Rubika"
                width={26}
                height={26}
              />
            </Link>
          </div>


          <div className="grid bg-gray-700 rounded-2xl items-center p-6">
            <div className="flex items-center justify-between gap-6">
              {/* سمت چپ: لوگو */}
              <div className="flex-shrink-0">
                <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
              </div>

              {/* سمت راست: متن‌ها */}
              <div className="space-y-2 text-white">
                <p>
                  <span className="font-bold"> تلفن:</span> 09151203083
                </p>
                <p>
                  <span className="font-bold"> آدرس:</span> کاشمر، بلوار فروتقه، بعد از امام‌رضا(ع)15
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-500 pt-3 text-sm grid gap-5">
            <p>تمام حقوق مادی و معنوی مطالب موجود در این سایت متعلق به مجموعه ابزار کاشمر می‌باشد.</p>
            <a href="https://parisan0487.github.io">طراحی شده توسط : <span className="text-yellow-400 underline underline-offset-2">پریسان غلامی</span></a>
          </div>
        </div>
      </div>
    </footer >
  );
}
