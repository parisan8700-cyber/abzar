import ProductShop from "@/components/shop/Shop";

export default async function ShopPage() {
  const res = await fetch("https://backabzar.onrender.com/api/products/", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div>
      <ProductShop data={products} />
    </div>
  );
}
