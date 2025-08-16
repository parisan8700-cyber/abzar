"use client"

import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";
import { useRouter } from "next/navigation";
import Fetch from "@/utils/Fetch";


export default function NewProductPage() {
    const router = useRouter();

    const handleAdd = async (formData) => {
        try {
            await Fetch.post("/api/products", formData, { token: true });
            router.push("/adminPanel/products");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "خطا در افزودن محصول. لطفاً ورودی‌ها را بررسی کنید"
            );
        }
    };


    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <h1
                className="text-2xl font-bold mb-6 border-b pb-2"
                dir="rtl"
            >
                افزودن محصول جدید
            </h1>
            <ProductForm onSubmit={handleAdd} />
        </div>
    );
}
