import ProductShop from "@/components/shop/Shop";

async function getProductsByCategory(mainSlug, subSlug) {
    const res = await fetch(
        `https://backabzar.onrender.com/api/products/category/${mainSlug}/${subSlug}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("خطا در دریافت محصولات");

    return res.json();
}

export default async function SubCategoryPage({ params }) {
    const { main, sub } = params;
    const products = await getProductsByCategory(main, sub);

    return <ProductShop data={products} />;
}