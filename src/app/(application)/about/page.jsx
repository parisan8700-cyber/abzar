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

      <section
        dir="rtl"
        className="relative overflow-hidden rounded-[28px] lg:rounded-[36px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-yellow-50 shadow-xl"
      >
        {/* Background Decorations */}
        <div className="absolute -top-32 -left-20 h-64 w-64 md:h-80 md:w-80 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-64 w-64 md:h-80 md:w-80 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-col-reverse xl:flex-row items-center gap-12 xl:gap-20 p-6 md:p-10">

          {/* ================= Text Section ================= */}
          <div className="w-full xl:w-1/2">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-100 px-4 py-2">

              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

              <span className="text-sm font-bold text-yellow-700">
                از سال ۱۳۹۴ همراه شما
              </span>

            </div>

            {/* Title */}

            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-slate-900">

              ابزار کاشمر

              <br />

              <span className="text-yellow-500">
                همراه مطمئن پروژه‌های شما
              </span>

            </h2>

            {/* Description */}

            <p className="mt-7 text-justify text-[15px] leading-8 md:text-base md:leading-9 text-slate-600">

              فعالیت ما از سال ۱۳۹۴ در زمینه فروش ابزارآلات آغاز شده است و از همان ابتدا
              هدف ما ارائه محصولاتی باکیفیت از معتبرترین برندهای بازار بوده است.

              <br />
              <br />

              امروز با ارائه خدمات فروش نقدی و اقساطی، ضمانت اصالت کالا، مشاوره تخصصی
              قبل از خرید و پشتیبانی پس از فروش تلاش می‌کنیم تجربه‌ای مطمئن و لذت‌بخش
              از خرید ابزار را برای مشتریان خود فراهم کنیم.

            </p>

            {/* Features */}

            <div className="mt-10 flex flex-wrap gap-3">

              <div className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xl font-black text-yellow-500">
                  +۱۰ سال
                </p>

                <span className="text-sm text-slate-600">
                  سابقه فعالیت
                </span>
              </div>

              <div className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xl font-black text-yellow-500">
                  ۱۰۰٪
                </p>

                <span className="text-sm text-slate-600">
                  ضمانت اصالت
                </span>
              </div>

              <div className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xl font-black text-yellow-500">
                  ارسال
                </p>

                <span className="text-sm text-slate-600">
                  سراسر کشور
                </span>
              </div>

              <div className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xl font-black text-yellow-500">
                  مشاوره
                </p>

                <span className="text-sm text-slate-600">
                  قبل از خرید
                </span>
              </div>

            </div>

            {/* Button */}

            <Link
              href="https://www.instagram.com/abzar_kashmar?igsh=MW1uMThpMTRrZTUyMg=="
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-xl"
            >

              بازدید از پیج اینستاگرام

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M20.5713 3.42859H6.857V3.42882L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                />
              </svg>

            </Link>

          </div>

          {/* ================= Image Section ================= */}

          <div className="relative flex w-full xl:w-1/2 justify-center">

            <div className="relative flex items-center justify-center">

              {/* Background Circle */}

              <div className="absolute h-[240px] w-[240px] rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-100 blur-sm sm:h-[300px] sm:w-[300px] lg:h-[380px] lg:w-[380px]" />

              {/* Dashed Ring */}

              <div className="absolute h-[260px] w-[260px] rounded-full border-2 border-dashed border-yellow-300/60 sm:h-[330px] sm:w-[330px] lg:h-[420px] lg:w-[420px]" />

              {/* Experience Card */}

              <div
                className="
              absolute
              top-0
              -right-3

              sm:top-3
              sm:right-0

              lg:top-8
              lg:-right-10

              rounded-2xl
              border
              border-slate-200
              bg-white/90
              backdrop-blur
              px-4
              py-3
              shadow-xl
              z-20
            "
              >
                <p className="text-xl lg:text-3xl font-black text-yellow-500">
                  +۱۰
                </p>

                <span className="text-xs lg:text-sm text-slate-600">
                  سال تجربه
                </span>
              </div>

              {/* Customer Card */}

              <div
                className="
    absolute

    bottom-2
    left-1/2
    -translate-x-1/2

    w-[220px]
    sm:w-fit

    sm:bottom-4

    lg:left-auto
    lg:-left-12
    lg:bottom-10
    lg:translate-x-0

    rounded-2xl
    border
    border-slate-200
    bg-white/90
    backdrop-blur

    px-4
    py-3

    shadow-xl
    z-20
  "
              >
                <p className="text-center font-bold text-slate-800 text-sm lg:text-base">
                  ⭐ رضایت مشتریان
                </p>

                <span className="mt-1 block text-center text-xs lg:text-sm text-slate-500">
                  کیفیت، اعتماد، پشتیبانی
                </span>
              </div>

              {/* Image */}

              <Image
                src="/img/person.png"
                alt="ابزار کاشمر"
                width={430}
                height={520}
                priority
                className="
              relative
              z-10

              w-[220px]
              sm:w-[290px]
              md:w-[340px]
              lg:w-[430px]

              h-auto
              object-contain

              drop-shadow-[0_30px_40px_rgba(0,0,0,.18)]
            "
              />

            </div>

          </div>

        </div>
      </section>
    </>
  );
}
