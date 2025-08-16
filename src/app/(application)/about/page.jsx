"use client"

import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image"
import Link from "next/link";

export default function About() {
  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "درباره ما", href: "/about" },
        ]}
      />

      <div
        className="flex flex-col xl:flex-row gap-8 p-6 xl:p-8 bg-gradient-to-t from-yellow-500 to-yellow-600 rounded-4xl overflow-hidden"
        dir="rtl"
      >
        {/* ستون متن */}
        <div className="w-full xl:w-1/2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-white font-bold">درباره ابزار کاشمر</h2>
            <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
          </div>
          <p className="text-white font-medium leading-8">
            فعالیت ما از سال 1394 در زمینه فروش ابزارآلات آغاز شده است و از همان ابتدا هدف ما ارائه محصولاتی با کیفیت بالا و از برندهای معتبر جهانی بوده است. ما با توجه به نیازهای مشتریان، خدمات فروش اقساطی را نیز به منظور سهولت در خرید ارائه کرده‌ایم که این رویکرد موجب رضایت و اعتماد بالای مشتریان ما شده است. تمامی محصولات ارائه شده دارای ضمانت کامل هستند و ما با ارائه خدمات پس از فروش گسترده، اطمینان خاطر مشتریان خود را تضمین می‌کنیم.

            تنوع بالای محصولات ما شامل ابزارهای صنعتی، خانگی و تخصصی است که همگی با دقت و از بهترین تولیدکنندگان انتخاب شده‌اند. همچنین تیم ما با بهره‌گیری از تخصص و تجربه، همواره آماده مشاوره به مشتریان است تا بتوانند بهترین انتخاب را بر اساس نیازهای خود داشته باشند. ما به آینده‌ای روشن و رو به توسعه فکر می‌کنیم و در تلاش هستیم تا با به‌روزرسانی مداوم محصولات و خدمات خود، نقش موثری در بازار ابزارآلات ایفا کنیم. تعهد به کیفیت، نوآوری در خدمات و توجه به نیازهای مشتریان، اصولی است که همواره در مسیر رشد و پیشرفت خود رعایت می‌کنیم.
          </p>
          <Link
            href="#"
            className="w-max flex items-center gap-2 text-lg bg-white text-orange-500 font-medium py-2.5 px-4 rounded-xl"
          >
            بازدید از پیج ما
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g id="9">
                <path
                  id="Union"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5713 3.42859H6.857V3.42882L6.857 3.42881L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </Link>
        </div>

        {/* ستون عکس */}
        <div className="w-full xl:w-1/2 flex justify-center items-center">
          <Image
            src="/img/person.png"
            className="object-contain"
            alt="model 3"
            width={380}
            height={350}
          />
        </div>
      </div>
    </>
  );
}
