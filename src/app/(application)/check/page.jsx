"use client";
import { motion } from "framer-motion";

export default function Check() {
    const conditions = [
        { months: "۴ ماهه", prepay: "۳۰٪ پیش‌پرداخت" },
        { months: "۶ ماهه", prepay: "۴۰٪ پیش‌پرداخت" },
        { months: "زیر ۵۰ میلیون", prepay: "۲۰٪ پیش‌پرداخت" },
    ];

    const steps = [
        "انتخاب محصول مورد نظر",
        "ثبت درخواست خرید اقساطی",
        "ارسال و بررسی مدارک",
        "ارسال چک",
        "دریافت محصول",
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-2xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                شرایط و نحوه خرید اقساطی
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* شرایط اقساط */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            بزودی ویدیویی به منظور راهنمایی خرید چکی از سایت در این قسمت قرار میگیرد
                        </p>
                    </div>

                    {/* دکمه‌های ارتباط */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <motion.a
                            href="https://t.me/username"
                            target="_blank"
                            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📩 پیام در تلگرام
                        </motion.a>
                        <motion.a
                            href="tel:09123456789"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📞 تماس با پشتیبانی
                        </motion.a>
                    </div>
                </motion.div>

                {/* مراحل خرید */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-xl font-semibold mb-4">مراحل خرید اقساطی</h2>
                    <ol className="space-y-4 list-decimal list-inside">
                        {steps.map((step, index) => (
                            <motion.li
                                key={index}
                                className="bg-gray-50 p-3 rounded-lg"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {step}
                            </motion.li>
                        ))}
                    </ol>
                </motion.div>
            </div>

            {/* شرایط چک */}
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-xl font-semibold mb-4">شرایط چک پس از رزرو پیش‌پرداخت</h2>
                <p className="text-md text-gray-700 leading-relaxed mb-3">
                    چک‌ها را به کد ملی <span className="font-medium">000000000000</span>
                    (محمدرضا غلامی) ثبت و به آدرس زیر ارسال فرمایید:
                </p>
                <p className="text-md text-gray-700 leading-relaxed mb-3">
                    چک‌ها حتماً باید <span className="font-medium text-yellow-500">صیادی ثبتی بنفش</span> باشند.
                </p>
                <p className="text-md text-gray-700 mb-3 italic">
                    آدرس: خراسان رضوی ، کاشمر، بلوار فروتقه، بعد از امام‌رضا(ع)15
                </p>
                <p className="text-md text-gray-700">
                 توجه : برای خرید اقساطی، لازم است مبلغ ۲۰۰٬۰۰۰ تومان به عنوان پیش‌پرداخت هنگام ثبت سفارش پرداخت شود.
                </p>
            </motion.div>
        </div>
    );
}
