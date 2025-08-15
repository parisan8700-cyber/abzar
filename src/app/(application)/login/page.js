"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/shared/loading/Loading";
import Link from "next/link";


export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);


  const toEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";

    return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  };


  const validatePhone = (phone) => /^09\d{9}$/.test(phone);
  const validatePassword = (password) => /^\S{5,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validatePhone(phone)) return toast("شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود");
    if (!validatePassword(password)) return toast("رمز عبور باید حداقل ۵ کاراکتر باشد");


    const userData = { phone, password }

    try {
      setIsSubmitting(true);

      const endpoint = "https://backabzar.onrender.com/api/users/login";

      const res = await axios.post(endpoint, userData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token, res.data.user);

      toast.success("ورود موفقیت‌آمیز بود");

      setPhone("");
      setPassword("");


      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "خطایی رخ داده است. لطفاً دوباره تلاش کنید";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "ورود", href: "/login" },
        ]}
      />


      <form className="flex flex-col items-center gap-6 w-full max-w-[320px] mx-auto p-6 bg-gray-300 backdrop-blur-md rounded-2xl shadow-md" onSubmit={handleSubmit} dir="rtl">

        <div className="w-full flex flex-col gap-2">
          <label className="text-black font-bold text-sm">
            شماره تلفن
          </label>
          <input
            type="text"
            placeholder="مثال: 09123456789"
            value={phone}
            onChange={(e) => setPhone(toEnglishDigits(e.target.value))}
            className="rounded-xl px-4 py-3 w-full bg-white/40 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="text-black font-bold text-sm">
            رمزعبور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(toEnglishDigits(e.target.value))}
            className="rounded-xl px-4 py-3 w-full bg-white/40 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
          />
        </div>

        <input
          type="submit"
          value="ورود"
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-sm cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <span className="text-gray-600 text-sm">
          حساب کاربری نداری؟ <Link href="/signup" className="text-black font-semibold hover:underline">ثبت‌نام</Link>
        </span>
      </form>
    </>
  );
}
