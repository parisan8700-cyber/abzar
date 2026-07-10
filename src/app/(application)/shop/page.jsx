import ProductShop from "@/components/shop/Shop";

export default async function ShopPage() {
  const res = await fetch("https://abzarkashmar.ir/api/products/", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div>
      <ProductShop data={products} />
    </div>
  );
}
