import ProductShop from "@/components/shop/Shop";

async function getProductsByCategory(mainSlug) {
  const res = await fetch(
    `https://backabzar.onrender.com/api/products/category/${mainSlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("خطا در دریافت محصولات");

  return res.json();
}

export default async function MainCategoryPage({ params }) {
  const { main } = params;
  const products = await getProductsByCategory(main);

  return <ProductShop data={products} />;
}