"use client";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Search } from "lucide-react";

export default function OrdersFilters({
    search,
    setSearch,
    status,
    setStatus,
    paymentType,
    setPaymentType,
    date,
    setDate,
}) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800 p-5 mb-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* سرچ */}

                <div className="relative">

                    <Search
                        className="absolute right-3 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجوی نام، شماره سفارش..."
                        className="w-full pr-10 h-11 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 outline-none px-3"
                    />

                </div>

                {/* وضعیت سفارش */}

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-11 rounded-xl border border-gray-300 dark:border-zinc-700 px-3 bg-white dark:bg-zinc-950"
                >
                    <option value="all">همه وضعیت‌ها</option>

                    <option value="pending">
                        در انتظار پرداخت
                    </option>

                    <option value="paid">
                        پرداخت شده
                    </option>

                    <option value="shipped">
                        ارسال شده
                    </option>

                    <option value="delivered">
                        تحویل داده شده
                    </option>

                </select>

                {/* نوع خرید */}

                <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="h-11 rounded-xl border border-gray-300 dark:border-zinc-700 px-3 bg-white dark:bg-zinc-950"
                >
                    <option value="all">
                        همه سفارشات
                    </option>

                    <option value="cash">
                        نقدی
                    </option>

                    <option value="installment">
                        اقساطی
                    </option>

                </select>

                {/* تاریخ */}

                <DatePicker
                    value={date}
                    onChange={setDate}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    inputClass="w-full h-11 rounded-xl border border-gray-300 dark:border-zinc-700 px-3 bg-white dark:bg-zinc-950 outline-none"
                    placeholder="فیلتر تاریخ"
                    format="YYYY/MM/DD"
                />

            </div>

        </div>
    );
}