"use client";
import { useState, useEffect } from "react";
import React from "react";
import Loading from "../shared/loading/Loading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getFinalPrice, getDiscountPercent, formatPrice } from "@/utils/Price";
import ProductCard from "../product/ProductCard";


export default function ProductShop({ data }) {
  const [products, setProducts] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [activeImages, setActiveImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const isPriceFiltered = minPrice || maxPrice;


  const brands = ["Arva", "Tosan", "Ronix", "Crown", "Rabin", "Strong", "سایر"];

  useEffect(() => {
    setLoading(false);
  }, []);

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
    setCurrentPage(1);
  };


  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesBrands =
      selectedBrands.length > 0
        ? selectedBrands
          .map((b) => b.toLowerCase())
          .includes(product.brand.toLowerCase())
        : true;


    const matchesPrice =
      minPrice || maxPrice
        ? (() => {
          const price = product.price || 0;
          const meetsMin = minPrice ? price >= parseInt(minPrice) : true;
          const meetsMax = maxPrice ? price <= parseInt(maxPrice) : true;
          return meetsMin && meetsMax;
        })()
        : true;

    return matchesSearch && matchesBrands && matchesPrice;
  });



  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const enhancedProducts = paginatedProducts.map((product) => {
    const finalPrice = getFinalPrice(product.price, product.discount);
    const discountPercent = getDiscountPercent(product.price, product.discount);

    return {
      ...product,
      finalPrice,
      discountPercent,
    };
  });


  if (loading) return <Loading className="-top-30" />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;



  if (loading) return <div className="text-center py-10">در حال بارگذاری</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "فروشگاه", href: "/shop" },
        ]}
      />
      <div className="flex flex-col md:flex-row px-4 py-6 gap-6">
        <div className="block md:hidden px-2 mb-4">
          <input
            type="text"
            placeholder="جستجو محصولات..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-gray-300 px-4 py-3 mb-2 rounded-lg text-right outline-0 text-black placeholder-black"
          />
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md w-36"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            {isMobileFilterOpen ? "بستن فیلترها" : "نمایش فیلترها"}
          </button>

          {isMobileFilterOpen && (
            <div className="bg-gray-300 mt-4 p-4 rounded-lg space-y-4">

              <div className="bg-gray-300 p-5 pb-4 mt-5 rounded-2xl">
                <h3 className="text-lg font-bold text-center mb-4 border-b">
                  فیلتر بر اساس قیمت
                </h3>
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    placeholder="حداقل قیمت(از)"
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg text-right outline-0"
                  />
                  <input
                    type="number"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    placeholder="حداکثر قیمت(تا)"
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg text-right outline-0"
                  />

                  <button
                    onClick={() => {
                      if (isPriceFiltered) {
                        // بازنشانی فیلتر قیمت
                        setMinPrice("");
                        setMaxPrice("");
                        setMinPriceInput("");
                        setMaxPriceInput("");
                      } else {
                        // اعمال فیلتر قیمت
                        setMinPrice(minPriceInput);
                        setMaxPrice(maxPriceInput);
                      }
                      setCurrentPage(1);
                    }}
                    className={`mt-3 ${isPriceFiltered
                      ? "bg-gray-500 hover:bg-yellow-400"
                      : "bg-yellow-400 hover:bg-yellow-500"
                      } py-2 px-4 rounded-lg transition`}
                  >
                    {isPriceFiltered ? "بازنشانی فیلتر قیمت" : "اعمال فیلتر قیمت"}
                  </button>
                </div>
              </div>

              <div className="bg-gray-300  p-5 pb-4 mt-5 rounded-2xl">
                <h3 className="text-lg font-bold text-center mb-4 border-b text-black">
                  فیلتر براساس برند
                </h3>
                <div className="flex flex-wrap gap-2 justify-right">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() =>
                        toggleSelection(brand, selectedBrands, setSelectedBrands)
                      }
                      className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200
                  ${selectedBrands.includes(brand)
                          ? "bg-gray-500 text-white border-[#44e4d1] hover:bg-gray-600"
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-3/12 hidden md:block">
          <div className="space-y-2 pb-4">
            <input
              type="text"
              placeholder="جستجو محصولات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-300  px-4 p-4 rounded-lg text-right outline-0"
            />
          </div>

          <div className="bg-gray-300 p-5 pb-4 mt-5 rounded-2xl">
            <h3 className="text-lg font-bold text-center mb-4 border-b">
              فیلتر بر اساس قیمت
            </h3>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                placeholder="حداقل قیمت(از)"
                className="w-full bg-gray-100 px-4 py-2 rounded-lg text-right outline-0"
              />
              <input
                type="number"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                placeholder="حداکثر قیمت(تا)"
                className="w-full bg-gray-100 px-4 py-2 rounded-lg text-right outline-0"
              />

              <button
                onClick={() => {
                  if (isPriceFiltered) {
                    // بازنشانی فیلتر قیمت
                    setMinPrice("");
                    setMaxPrice("");
                    setMinPriceInput("");
                    setMaxPriceInput("");
                  } else {
                    // اعمال فیلتر قیمت
                    setMinPrice(minPriceInput);
                    setMaxPrice(maxPriceInput);
                  }
                  setCurrentPage(1);
                }}
                className={`mt-3 ${isPriceFiltered
                  ? "bg-gray-500 hover:bg-yellow-400"
                  : "bg-yellow-400 hover:bg-yellow-500"
                  } text-white py-2 px-4 rounded-lg transition`}
              >
                {isPriceFiltered ? "بازنشانی فیلتر قیمت" : "اعمال فیلتر قیمت"}
              </button>
            </div>
          </div>



          <div className="bg-gray-300  p-5 pb-4 mt-5 rounded-2xl">
            <h3 className="text-lg font-bold text-center mb-4 border-b text-black">
              فیلتر براساس برند
            </h3>
            <div className="flex flex-wrap gap-2 justify-right">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                  className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200
                  ${selectedBrands.includes(brand)
                      ? "bg-gray-500 text-white border-[#44e4d1] hover:bg-gray-600"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enhancedProducts.map((product) => {
              const imagesArray = Array.isArray(product.images)
                ? product.images
                : [product.images];
              const mainImage = activeImages[product.id] || imagesArray[0];

              return (
                <div
                  key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm border transition-all ${currentPage === page
                    ? "bg-black text-white border-gray-300"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>

      </div >
    </>
  );
}