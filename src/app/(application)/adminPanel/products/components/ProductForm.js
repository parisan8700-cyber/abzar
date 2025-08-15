"use client";


import { useState, useEffect } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discount: "",
        stock: "",
        description: "",
        brand: "",
        imagesInput: "",
        images: [],
        featureInput: "",
        feature: [],
        categories: [],
        categoryInput: "",
        ...initialData,
    });



    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                name: initialData.name || "",
                price: initialData.price || "",
                discount: initialData.discount || "",
                description: initialData.description || "",
                brand: initialData.brand || "",
                images: initialData.images || [],
                feature: initialData.feature || [],
                categories: initialData.categories || [],
                imagesInput: "",
                featureInput: "",
                categoryInput: "",
            });
        }
    }, [initialData]);

    const formatNumber = (value) => {
        if (!value) return "";
        const numberValue = value.toString().replace(/\D/g, "");
        return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: formatNumber(value),
        }));
    };



    const availableCategories = ["برقی", "تعمیرگاهی", "بادی", "آبرسانی", "جوش-برش", "جرثقیل-لیفتینگ", "جدید", "اقساطی" , "پرفروش"];
    const brands = ["Arva", "Tosan", "Ronix", "Crown", "Rabin", "Strong", "سایر"];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addToList = (key, inputKey) => {
        const newItem = formData[inputKey].trim();
        if (newItem && !formData[key].includes(newItem)) {
            setFormData((prev) => ({
                ...prev,
                [key]: [...prev[key], newItem],
                [inputKey]: "",
            }));
        }
    };

    const removeFromList = (key, itemToRemove) => {
        setFormData((prev) => ({
            ...prev,
            [key]: prev[key].filter((item) => item !== itemToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dataToSend = {
                ...formData,
                price: Number(formData.price.replace(/\./g, "")),
                discount: Number(formData.discount.replace(/\./g, "")),
                stock: Number(formData.stock),
                brand: formData.brand || "نامشخص",
            };

            delete dataToSend.categoryInput;
            delete dataToSend.featureInput;
            delete dataToSend.imagesInput;
            delete dataToSend.variantInput;


            await onSubmit(dataToSend);
        } catch (err) {
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);

            // https://yourdomain.com/api/upload/image
            const res = await fetch("https://backabzar.onrender.com/api/upload/image", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, data.imageUrl],
                }));
            } else {
            }
        } catch (err) {
        } finally {
            setUploading(false);
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded shadow text-right"
            dir="rtl"
        >
            <div>
                <label className="block mb-1 font-semibold text-yellow-400">نام محصول</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-semibold text-yellow-400">قیمت</label>
                    <input
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleNumberChange}
                        className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                        placeholder="مثلا 15.345.000"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-yellow-400">تخفیف (اختیاری)</label>
                    <input
                        name="discount"
                        type="text"
                        placeholder="مثلا 1.500.000"
                        value={formData.discount}
                        onChange={handleNumberChange}
                        className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                    />
                </div>
            </div>


            <div>
                <label className="block mb-1 font-semibold text-yellow-400">موجودی انبار</label>
                <input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold text-yellow-400">توضیحات</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                />
            </div>

            <div className="w-full relative">
                <label className="block mb-1 font-semibold text-yellow-400">نام برند</label>
                <div className="relative">
                    <div
                        className="w-full border border-gray-300 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm cursor-pointer flex justify-between items-center"
                        onClick={() => setOpen(!open)}
                    >
                        {formData.brand || "انتخاب برند"}
                        <span className="text-gray-400">▼</span>
                    </div>
                    {open && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto z-10">
                            {brands.map((b) => (
                                <li
                                    key={b.toLowerCase()}
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, brand: b }));
                                        setOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                                >
                                    {b}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>


            {/* دسته‌بندی‌ها */}
            <div>
                <label className="block mb-1 font-semibold text-yellow-400">دسته‌بندی‌ها</label>
                <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    {availableCategories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={cat}
                                checked={formData.categories?.includes(cat)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setFormData((prev) => {
                                        const newList = isChecked
                                            ? [...(prev.categories || []), cat]
                                            : prev.categories.filter((c) => c !== cat);
                                        return { ...prev, categories: newList };
                                    });
                                }}
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>


            {/* تصاویر */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold text-yellow-400">آپلود تصویر محصول</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                />

                {uploading && (
                    <p className="text-sm text-gray-500 mt-2 animate-pulse">در حال آپلود...</p>
                )}

                {formData.images.length > 0 && (
                    <>
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative group rounded overflow-hidden border shadow-sm">
                                    <img
                                        src={img}
                                        alt="product"
                                        className="w-full aspect-square object-cover"
                                    />
                                    <button
                                        onClick={() => removeFromList("images", img)}
                                        className="absolute top-1 left-1 bg-white bg-opacity-80 text-red-600 text-xs px-2 py-0.5 rounded hidden group-hover:block transition duration-150"
                                    >
                                        حذف
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ویژگی‌ها */}
            <div>
                <label className="block mb-1 font-semibold text-yellow-400">ویژگی‌ها</label>
                <div className="sm:flex gap-2 grid ">
                    <input
                        name="featureInput"
                        value={formData.featureInput}
                        onChange={handleChange}
                        className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm"
                        placeholder="مثلاً: ضدآب، سبک، ..."
                    />
                    <button
                        type="button"
                        onClick={() => addToList("feature", "featureInput")}
                        className="bg-yellow-400 text-white px-4 py-2 rounded"
                    >
                        افزودن
                    </button>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                    {formData.feature.map((f, idx) => (
                        <span
                            key={idx}
                            className="bg-[#e0f7f4] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            {f}
                            <button
                                type="button"
                                onClick={() => removeFromList("feature", f)}
                                className="text-red-500"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 text-white px-6 py-2 rounded font-bold hover:bg-yellow-500 disabled:opacity-50"
            >
                {isSubmitting ? "در حال ذخیره..." : "ذخیره محصول"}
            </button>

        </form >
    );
}
