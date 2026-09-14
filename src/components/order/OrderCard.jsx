"use client";

import { useEffect, useState } from "react";

import {
    User,
    Phone,
    MapPin,
    Package,
    CalendarDays,
    Clock3,
    CreditCard,
    Mailbox,
    Trash2,
    Truck,
    Edit3,
    X,
    Plus,
    Minus,
    Search,
    Save,
    Loader2,
    Pencil,
    PlusCircle,
    CheckCircle2,
    Banknote,
} from "lucide-react";

import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

export default function OrderCard({
    order,
    onDelete,
    onStatusChange,
    onOrderUpdate,
}) {
    const [currentOrder, setCurrentOrder] = useState(order);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [deleting, setDeleting] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingOrder, setUpdatingOrder] = useState(false);

    const [editItems, setEditItems] = useState([]);
    const [shippingMethod, setShippingMethod] = useState("post");

    const [searchValues, setSearchValues] = useState({});
    const [searchResults, setSearchResults] = useState({});
    const [searching, setSearching] = useState({});
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        setCurrentOrder(order);
    }, [order]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60 * 1000);

        return () => clearInterval(timer);
    }, []);

    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        paid: "bg-green-100 text-green-700",
        shipped: "bg-blue-100 text-blue-700",
        delivered: "bg-purple-100 text-purple-700",
    };

    const statusText = {
        pending: "در انتظار پرداخت",
        paid: "پرداخت شده",
        shipped: "ارسال شده",
        delivered: "تحویل شده",
    };

    const paymentStyle =
        currentOrder.paymentType === "installment"
            ? "bg-blue-100 text-blue-700"
            : "bg-emerald-100 text-emerald-700";

    const paymentText =
        currentOrder.paymentType === "installment"
            ? "اقساطی"
            : "نقدی";

    const cardStatusStyle = {
        pending: {
            border: "border-yellow-300",
            header: "from-yellow-400 to-amber-500",
            bg: "bg-yellow-50/30",
        },
        paid: {
            border: "border-green-300",
            header: "from-green-500 to-emerald-600",
            bg: "bg-green-50/30",
        },
        shipped: {
            border: "border-blue-300",
            header: "from-blue-500 to-cyan-600",
            bg: "bg-blue-50/30",
        },
        delivered: {
            border: "border-purple-300",
            header: "from-purple-500 to-violet-600",
            bg: "bg-purple-50/30",
        },
    };

    const currentStatusStyle =
        cardStatusStyle[currentOrder.status] ||
        cardStatusStyle.pending;

    const date = new Date(currentOrder.createdAt);


    const orderAgeInDays = Math.floor(
        (currentTime - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const isInstallmentOrder =
        currentOrder.items?.some(
            (item) => item.purchaseType === "installment"
        ) || currentOrder.paymentType === "installment";

    const isInstallmentExpired =
        currentOrder.status === "paid" &&
        isInstallmentOrder &&
        orderAgeInDays > 4;

    const productsTotal = currentOrder.items.reduce(
        (total, item) => {
            return (
                total +
                (item.originalPrice || 0) *
                (item.quantity || 0)
            );
        },
        0
    );

    const openEditModal = () => {
        setEditItems(
            currentOrder.items.map((item) => {
                const product =
                    typeof item.productId === "object"
                        ? item.productId
                        : null;

                const purchaseType =
                    item.purchaseType ||
                    (currentOrder.paymentType === "installment"
                        ? "installment"
                        : "cash");

                return {
                    productId:
                        typeof item.productId === "object"
                            ? item.productId?._id
                            : item.productId,

                    product,

                    quantity: Number(item.quantity) || 1,

                    price:
                        item.price !== undefined &&
                            item.price !== null
                            ? Number(item.price)
                            : 0,

                    originalPrice:
                        item.originalPrice !== undefined &&
                            item.originalPrice !== null
                            ? Number(item.originalPrice)
                            : Number(product?.price || 0),

                    purchaseType,
                };
            })
        );

        setShippingMethod(
            currentOrder.shippingMethod || "post"
        );

        setSearchValues({});
        setSearchResults({});
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        if (updatingOrder) return;

        setShowEditModal(false);
        setSearchValues({});
        setSearchResults({});
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);

            await Fetch.delete(
                `/api/orders/${currentOrder._id}`,
                {
                    token: true,
                }
            );

            toast.success("سفارش با موفقیت حذف شد");
            setShowDeleteModal(false);

            if (onDelete) {
                onDelete(currentOrder._id);
            }
        } catch (error) {
            toast.error("خطا در حذف سفارش");
        } finally {
            setDeleting(false);
        }
    };

    const handleMarkAsShipped = async () => {
        try {
            setUpdatingStatus(true);

            await Fetch.patch(
                `/api/orders/${currentOrder._id}/status`,
                {
                    status: "shipped",
                },
                {
                    token: true,
                }
            );

            const updatedOrder = {
                ...currentOrder,
                status: "shipped",
            };

            setCurrentOrder(updatedOrder);

            toast.success(
                "سفارش به وضعیت ارسال شده تغییر کرد"
            );

            if (onStatusChange) {
                onStatusChange(
                    currentOrder._id,
                    "shipped"
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                "خطا در تغییر وضعیت سفارش"
            );
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleQuantityChange = (index, value) => {
        setEditItems(prev =>
            prev.map((item, itemIndex) => {
                if (itemIndex !== index) return item;

                const currentQuantity = Number(item.quantity) || 1;

                const newQuantity = Math.max(
                    1,
                    currentQuantity + Number(value)
                );

                return {
                    ...item,
                    quantity: newQuantity,
                };
            })
        );
    };

    const handleRemoveItem = (index) => {
        if (editItems.length === 1) {
            toast.error(
                "سفارش باید حداقل یک محصول داشته باشد"
            );
            return;
        }

        setEditItems((prev) =>
            prev.filter(
                (_, itemIndex) => itemIndex !== index
            )
        );
    };

    const handleAddProduct = () => {
        setEditItems((prev) => [
            ...prev,
            {
                productId: "",
                product: null,
                quantity: 1,
                price: 0,
                originalPrice: 0,

                purchaseType: "cash",
            },
        ]);
    };

    const handlePurchaseTypeChange = (index, purchaseType) => {
        setEditItems((prev) =>
            prev.map((item, itemIndex) => {
                if (itemIndex !== index) {
                    return item;
                }

                return {
                    ...item,
                    purchaseType,
                    price:
                        purchaseType === "installment"
                            ? 0
                            : Number(item.product?.price || 0) -
                            Number(item.product?.discount || 0),
                };
            })
        );
    };

    const searchProduct = async (index, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [index]: value,
        }));

        const searchText = value.trim();

        if (!searchText || searchText.length < 2) {
            setSearchResults((prev) => ({
                ...prev,
                [index]: [],
            }));

            setSearching((prev) => ({
                ...prev,
                [index]: false,
            }));

            return;
        }

        try {
            setSearching((prev) => ({
                ...prev,
                [index]: true,
            }));

            const response = await Fetch.get(
                `/api/products/search?q=${encodeURIComponent(searchText)}`
            );

            // Fetch پاسخ را به صورت response برمی‌گرداند
            // و آرایه محصولات داخل data قرار دارد.
            const products = Array.isArray(response?.data)
                ? response.data
                : Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data?.products)
                        ? response.data.products
                        : [];

            setSearchResults((prev) => ({
                ...prev,
                [index]: products,
            }));
        } catch (error) {
            console.error("Product Search Error:", error);

            setSearchResults((prev) => ({
                ...prev,
                [index]: [],
            }));
        } finally {
            setSearching((prev) => ({
                ...prev,
                [index]: false,
            }));
        }
    };

    const selectProduct = (index, product) => {
        setEditItems((prev) =>
            prev.map((item, itemIndex) => {
                if (itemIndex !== index) {
                    return item;
                }

                return {
                    ...item,
                    productId: product._id,
                    product,
                    originalPrice: Number(product.price || 0),

                    price:
                        item.purchaseType === "installment"
                            ? 0
                            : Number(product.price || 0) -
                            Number(product.discount || 0),
                };
            })
        );

        setSearchValues((prev) => ({
            ...prev,
            [index]: product.name,
        }));

        setSearchResults((prev) => ({
            ...prev,
            [index]: [],
        }));
    };

    const handleInstallmentPriceChange = (
        index,
        value
    ) => {
        const price = Math.max(
            0,
            Number(
                String(value).replace(/,/g, "")
            ) || 0
        );

        setEditItems((prev) =>
            prev.map((item, itemIndex) =>
                itemIndex === index
                    ? {
                        ...item,
                        price,
                    }
                    : item
            )
        );
    };

    const handleSaveOrder = async () => {
        if (editItems.length === 0) {
            toast.error(
                "سفارش باید حداقل یک محصول داشته باشد"
            );
            return;
        }

        for (const item of editItems) {
            if (!item.productId) {
                toast.error(
                    "برای همه ردیف‌ها یک محصول انتخاب کنید"
                );
                return;
            }

            if (
                !item.quantity ||
                Number(item.quantity) < 1
            ) {
                toast.error(
                    "تعداد محصولات باید حداقل ۱ باشد"
                );
                return;
            }
        }

        try {
            setUpdatingOrder(true);

            const payload = {
                items: editItems.map((item) => ({
                    productId: item.productId,
                    quantity: Number(item.quantity),
                    purchaseType: item.purchaseType,
                    ...(item.purchaseType === "installment"
                        ? {
                            price: 0,
                        }
                        : {}),
                })),
                shippingMethod,
            };

            const response = await Fetch.patch(
                `/api/orders/${currentOrder._id}`,
                payload,
                {
                    token: true,
                }
            );

            const updatedOrder =
                response?.data?.order ||
                response?.order ||
                response;

            const normalizedOrder = {
                ...updatedOrder,
                items: updatedOrder.items.map(
                    (item) => {
                        const selectedProduct =
                            editItems.find(
                                (editItem) =>
                                    String(
                                        editItem.productId
                                    ) ===
                                    String(
                                        item.productId
                                    )
                            );

                        return {
                            ...item,
                            productId:
                                selectedProduct?.product ||
                                item.productId,
                        };
                    }
                ),
            };

            setCurrentOrder(normalizedOrder);

            setShowEditModal(false);

            toast.success(
                "سفارش با موفقیت ویرایش شد"
            );

            if (onOrderUpdate) {
                onOrderUpdate(normalizedOrder);
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.message ||
                "خطا در ویرایش سفارش"
            );
        } finally {
            setUpdatingOrder(false);
        }
    };

    return (
        <div
            className={`
        ${isInstallmentExpired
                    ? "bg-red-50/60 border-red-400"
                    : `${currentStatusStyle.bg} ${currentStatusStyle.border}`
                }
        rounded-3xl
        border-2
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
    `}
        >
            {/* Header */}
            <div
                className={`
        bg-gradient-to-r
        ${isInstallmentExpired
                        ? "from-red-600 to-rose-700"
                        : currentStatusStyle.header
                    }
        px-5
        py-4
        text-white
    `}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <User size={18} />

                            {currentOrder.firstName}{" "}
                            {currentOrder.lastName}
                        </h3>

                        <p className="text-xs mt-1 opacity-90 break-all">
                            {currentOrder._id}
                        </p>
                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${paymentStyle}`}
                    >
                        {paymentText}
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {/* وضعیت */}
                <div className="flex justify-between items-center">
                    <span
                        className={`
                            px-3 py-1.5
                            rounded-full
                            text-xs
                            font-extrabold
                            shadow-sm
                            ${statusStyle[currentOrder.status]}
                        `}
                    >
                        {statusText[currentOrder.status]}
                    </span>

                    <div className="text-right space-y-1">
                        <div>
                            <p className="text-xs text-gray-500">
                                جمع قیمت واقعی محصولات
                            </p>

                            <p className="text-base font-extrabold text-gray-700">
                                {productsTotal.toLocaleString(
                                    "fa-IR"
                                )}{" "}
                                تومان
                            </p>
                        </div>

                        <div className="pt-1">
                            <p className="text-xs text-gray-500">
                                مبلغ پرداختی
                            </p>

                            <p className="text-base font-extrabold text-yellow-500">
                                {currentOrder.amount.toLocaleString(
                                    "fa-IR"
                                )}{" "}
                                تومان
                            </p>
                        </div>
                    </div>
                </div>

                {/* اطلاعات ارسال */}
                <div className="space-y-3 border-t pt-4">
                    <h4 className="font-bold text-gray-700 flex items-center gap-2">
                        <Package size={17} />
                        اطلاعات ارسال
                    </h4>

                    <div className="text-sm space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Phone size={15} />
                            {currentOrder.phone}
                        </div>

                        <div className="flex items-start gap-2">
                            <MapPin
                                size={15}
                                className="mt-1"
                            />

                            <span>
                                {currentOrder.province}،{" "}
                                {currentOrder.city}،{" "}
                                {currentOrder.address}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mailbox size={15} />
                            {currentOrder.postalCode}
                        </div>
                    </div>
                </div>

                {/* زمان */}
                <div className="border-t pt-4">
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDays size={16} />

                            <span>
                                {date.toLocaleDateString(
                                    "fa-IR"
                                )}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock3 size={16} />

                            <span>
                                {date.toLocaleTimeString(
                                    "fa-IR",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`
            mt-3 flex items-center justify-between
            rounded-xl px-3 py-2.5
            ${isInstallmentExpired
                                ? "bg-red-100 text-red-700"
                                : orderAgeInDays >= 4
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-gray-50 text-gray-500"
                            }
        `}
                    >
                        <div className="flex items-center gap-2">
                            <Clock3 size={15} />

                            <span className="text-xs font-bold">
                                {orderAgeInDays === 0
                                    ? "کمتر از یک روز از ثبت سفارش گذشته"
                                    : `${orderAgeInDays.toLocaleString("fa-IR")} روز از ثبت سفارش گذشته`}
                            </span>
                        </div>

                        {isInstallmentExpired && (
                            <span className="rounded-lg bg-red-600 px-2 py-1 text-[10px] font-black text-white">
                                مهلت گذشته
                            </span>
                        )}
                    </div>
                </div>

                {/* محصولات */}
                <div className="border-t pt-4">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <CreditCard size={17} />
                        محصولات
                    </h4>

                    <div className="space-y-2">
                        {currentOrder.items.map(
                            (item) => (
                                <div
                                    key={item._id}
                                    className="bg-gray-50 rounded-xl px-3 py-2 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.productId
                                                ?.name ||
                                                "نامشخص"}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            تعداد:{" "}
                                            {
                                                item.quantity
                                            }
                                        </p>
                                    </div>

                                    <div className="text-left">
                                        {item.purchaseType ===
                                            "installment" ? (
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    قیمت محصول
                                                </p>

                                                <p className="font-bold text-gray-700">
                                                    {item.originalPrice?.toLocaleString(
                                                        "fa-IR"
                                                    )}
                                                </p>

                                                <p className="text-xs text-gray-500 mt-4">
                                                    پیش پرداخت
                                                </p>

                                                <p className="font-bold text-yellow-500">
                                                    {item.price?.toLocaleString(
                                                        "fa-IR"
                                                    )}{" "}
                                                    تومان
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="font-bold text-yellow-500">
                                                {item.price?.toLocaleString(
                                                    "fa-IR"
                                                )}{" "}
                                                تومان
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* روش ارسال */}
                    <div className="border-t pt-4 mt-4">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
                            <Package size={17} />
                            روش ارسال
                        </h4>

                        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                                <span>
                                    {currentOrder.shippingMethod ===
                                        "pickup" &&
                                        "🏪 تحویل حضوری"}

                                    {currentOrder.shippingMethod ===
                                        "post" &&
                                        "📦 پست پیشتاز"}

                                    {currentOrder.shippingMethod ===
                                        "express" &&
                                        "⚡ پست سریع"}
                                </span>
                            </div>

                            <div className="text-left">
                                <p className="font-bold text-yellow-500">
                                    {currentOrder.shippingCost?.toLocaleString(
                                        "fa-IR"
                                    )}{" "}
                                    تومان
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* دکمه‌ها */}
            <div className="border-t pt-4 mt-5 space-y-2 px-5 pb-5">
                {currentOrder.status === "paid" && (
                    <button
                        onClick={handleMarkAsShipped}
                        disabled={updatingStatus}
                        className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-2.5
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            font-semibold
                            hover:bg-blue-100
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            transition
                        "
                    >
                        <Truck size={17} />

                        {updatingStatus
                            ? "در حال تغییر وضعیت..."
                            : "علامت‌گذاری به‌عنوان ارسال شده"}
                    </button>
                )}

                <button
                    onClick={openEditModal}
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                        font-semibold
                        hover:bg-indigo-100
                        transition
                    "
                >
                    <Edit3 size={17} />
                    ویرایش سفارش
                </button>

                <button
                    onClick={() =>
                        setShowDeleteModal(true)
                    }
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        bg-red-50
                        text-red-600
                        font-semibold
                        hover:bg-red-100
                        transition
                    "
                >
                    <Trash2 size={17} />
                    حذف سفارش
                </button>
            </div>

            {/* Modal ویرایش سفارش */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-5">
                    <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className={`relative shrink-0 overflow-hidden bg-gradient-to-r ${currentStatusStyle.header} px-5 py-5 text-white sm:px-7`}>
                            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10"></div>
                            <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-white/10"></div>

                            <div className="relative flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="mb-1 flex items-center gap-2">
                                        <Pencil className="h-5 w-5 shrink-0" />
                                        <h2 className="text-lg font-black sm:text-xl">ویرایش سفارش</h2>
                                    </div>

                                    <p className="truncate text-sm text-white/80">
                                        {currentOrder.firstName} {currentOrder.lastName}
                                        <span className="mx-2 text-white/40">•</span>
                                        سفارش #{currentOrder._id?.slice(-6)}
                                    </p>
                                </div>

                                <button type="button" onClick={() => setShowEditModal(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white transition hover:bg-white/25">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-black text-gray-800">محصولات سفارش</h3>
                                    <p className="mt-1 text-xs text-gray-500">محصولات، تعداد و نوع خرید را مدیریت کنید.</p>
                                </div>

                                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-white px-3 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-100">
                                    {editItems.length} محصول
                                </div>
                            </div>

                            <div className="space-y-4">
                                {editItems.map((item, index) => {
                                    const product = item.product;
                                    const stock = product?.stock;
                                    const quantity = Number(item.quantity) || 0;

                                    return (
                                        <div key={index} className="overflow-visible rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                                            <div className="mb-4 flex items-start justify-between gap-3">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${currentStatusStyle.header} text-sm font-black text-white shadow-sm`}>
                                                        {index + 1}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-sm font-black text-gray-800">
                                                            {product?.name || "انتخاب محصول"}
                                                        </p>

                                                        {product && (
                                                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                                                                <span className="text-gray-500">
                                                                    قیمت: {Number(product.price || 0).toLocaleString("fa-IR")} تومان
                                                                </span>

                                                                {product.discount > 0 && (
                                                                    <span className="rounded-lg bg-red-50 px-2 py-1 font-bold text-red-600">
                                                                        تخفیف {Number(product.discount).toLocaleString("fa-IR")} تومان
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <button type="button" onClick={() => handleRemoveItem(index)} disabled={editItems.length === 1} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="relative">
                                                <label className="mb-2 block text-xs font-bold text-gray-600">
                                                    محصول
                                                </label>

                                                <div className="relative">
                                                    <Search className="pointer-events-none absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                    <input
                                                        type="text"
                                                        value={searchValues[index] ?? product?.name ?? ""}
                                                        onChange={(e) => searchProduct(index, e.target.value)}
                                                        placeholder="نام محصول را جستجو کنید..."
                                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-10 pl-4 text-sm font-medium text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                                                    />

                                                    {searching[index] && (
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                {searchResults[index]?.length > 0 && (
                                                    <div className="absolute right-0 left-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                                                        {searchResults[index].map((result) => (
                                                            <button
                                                                key={result._id}
                                                                type="button"
                                                                onClick={() => selectProduct(index, result)}
                                                                className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-gray-50"
                                                            >
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-bold text-gray-800">
                                                                        {result.name}
                                                                    </p>

                                                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                                                                        <span className="text-gray-500">
                                                                            {Number(result.price || 0).toLocaleString("fa-IR")} تومان
                                                                        </span>

                                                                        <span className={`rounded-lg px-2 py-1 font-bold ${Number(result.stock) > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                                                            موجودی: {result.stock ?? 0}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <Plus className="h-4 w-4 shrink-0 text-gray-400" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {searchValues[index]?.trim().length >= 2 && !searching[index] && searchResults[index]?.length === 0 && (
                                                    <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-center text-xs font-medium text-gray-500">
                                                        محصولی با این عبارت پیدا نشد
                                                    </div>
                                                )}
                                            </div>

                                            {product && (
                                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                    <div className="rounded-2xl bg-gray-50 p-3">
                                                        <p className="mb-1 text-[11px] font-bold text-gray-400">قیمت اصلی</p>
                                                        <p className="text-sm font-black text-gray-700">
                                                            {Number(product.price || 0).toLocaleString("fa-IR")}
                                                            <span className="mr-1 text-[10px] font-medium text-gray-400">تومان</span>
                                                        </p>
                                                    </div>

                                                    <div className={`rounded-2xl p-3 ${stock === undefined ? "bg-amber-50" : Number(stock) > 0 ? "bg-emerald-50" : "bg-red-50"}`}>
                                                        <p className="mb-1 text-[11px] font-bold text-gray-400">موجودی انبار</p>
                                                        <p className={`text-sm font-black ${stock === undefined ? "text-amber-600" : Number(stock) > 0 ? "text-emerald-600" : "text-red-600"}`}>
                                                            {stock === undefined ? "نامشخص" : Number(stock).toLocaleString("fa-IR")}
                                                            {stock !== undefined && <span className="mr-1 text-[10px] font-medium">عدد</span>}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl bg-blue-50 p-3">
                                                        <p className="mb-1 text-[11px] font-bold text-gray-400">تعداد سفارش</p>
                                                        <p className="text-sm font-black text-blue-600">
                                                            {quantity.toLocaleString("fa-IR")}
                                                            <span className="mr-1 text-[10px] font-medium">عدد</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}


                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                                    نوع خرید:
                                                </span>

                                                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800/70">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handlePurchaseTypeChange(index, "cash")
                                                        }
                                                        className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all duration-150 ${item.purchaseType === "cash"
                                                            ? "bg-white text-slate-700 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                                                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                                            }`}
                                                    >
                                                        نقدی
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handlePurchaseTypeChange(
                                                                index,
                                                                "installment"
                                                            )
                                                        }
                                                        className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all duration-150 ${item.purchaseType === "installment"
                                                            ? "bg-white text-slate-700 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                                                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                                            }`}
                                                    >
                                                        اقساطی
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500">تعداد محصول</p>
                                                    <p className="mt-1 text-[11px] text-gray-400">موجودی انبار قبل از ثبت تغییرات بررسی می‌شود.</p>
                                                </div>

                                                <div className="flex w-fit items-center rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
                                                    <button type="button" onClick={() => handleQuantityChange(index, -1)} disabled={quantity <= 1} className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
                                                        <Minus className="h-4 w-4" />
                                                    </button>

                                                    <span className="flex min-w-12 justify-center text-sm font-black text-gray-800">
                                                        {quantity.toLocaleString("fa-IR")}
                                                    </span>

                                                    <button type="button" onClick={() => handleQuantityChange(index, 1)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white transition hover:bg-gray-800">
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button type="button" onClick={handleAddProduct} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-white py-4 text-sm font-bold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50">
                                <PlusCircle className="h-5 w-5" />
                                افزودن محصول جدید
                            </button>
                        </div>

                        <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-4 sm:px-6">
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button type="button" onClick={() => setShowEditModal(false)} className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50">
                                    انصراف
                                </button>

                                <button type="button" onClick={handleSaveOrder} className={`flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${currentStatusStyle.header} px-7 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60`}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    ذخیره تغییرات
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal حذف */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-4">
                    <div className="bg-white rounded-2xl p-7 w-[350px] max-w-full shadow-2xl text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2
                                    size={22}
                                    className="text-red-600"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">
                            حذف سفارش
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 mb-6">
                            آیا از حذف این سفارش مطمئن
                            هستید؟
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="
                                    flex-1
                                    py-2.5
                                    rounded-xl
                                    bg-red-600
                                    text-white
                                    font-semibold
                                    hover:bg-red-700
                                    disabled:opacity-50
                                    transition
                                "
                            >
                                {deleting
                                    ? "در حال حذف..."
                                    : "حذف"}
                            </button>

                            <button
                                onClick={() =>
                                    setShowDeleteModal(
                                        false
                                    )
                                }
                                disabled={deleting}
                                className="
                                    flex-1
                                    py-2.5
                                    rounded-xl
                                    bg-gray-100
                                    text-gray-700
                                    font-semibold
                                    hover:bg-gray-200
                                    disabled:opacity-50
                                    transition
                                "
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}