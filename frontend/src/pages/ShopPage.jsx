import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const COLLECTION_ITEMS = [
  { name: "All", path: "/shop" },
  { name: "T.Shirts", path: "/collections/t-shirts" },
  { name: "Hoodies", path: "/collections/hoodies" },
  { name: "Shirts", path: "/collections/shirts" },
  { name: "Tank-Tops", path: "/collections/tank-tops" },
  { name: "Trousers", path: "/collections/trousers" },
  { name: "Shorts", path: "/collections/shorts" },
  { name: "Cargo-Pants", path: "/collections/cargo-pants" },
  { name: "End of Season Sale", path: "/collections/end-of-season-sale" }
];

export default function ShopPage({ forcedCategory = null }) {
  const { PRODUCTS } = useShop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = forcedCategory || searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    setSelectedCategory(forcedCategory || searchParams.get('category') || 'All');
    setVisibleCount(24);
  }, [forcedCategory, searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory === 'End of Season Sale') {
        if (!product.isSale) return false;
      } else if (selectedCategory === 'T.Shirts') {
        if (product.subcategory !== 'T-shirts' && product.subcategory !== 'T.Shirts') return false;
      } else if (selectedCategory !== 'All') {
        if (product.subcategory !== selectedCategory && product.category !== selectedCategory) {
          return false;
        }
      }

      if (filterParam === 'new' && !product.isNewArrival) return false;

      if (searchParam.trim()) {
        const q = searchParam.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [PRODUCTS, selectedCategory, filterParam, searchParam]);

  const displayedList = filteredProducts.slice(0, visibleCount);

  const pageTitle =
    selectedCategory !== 'All'
      ? selectedCategory
      : filterParam === 'new'
      ? 'New Drop'
      : 'All Collections';

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8 pt-6 md:pt-8">

        {/* Fullstop-style Collection Header */}
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#656565] mb-1">
              ÉLORA
            </p>
            <h1 className="font-sans text-[26px] sm:text-[36px] font-bold leading-[1.05] tracking-[-0.04em] text-[#171717]">
              {pageTitle}
            </h1>
          </div>
          <span className="text-[11px] text-[#666666] font-medium shrink-0">
            {filteredProducts.length} items
          </span>
        </div>

        {/* Horizontal Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 border-b border-[#e5e5e5]">
          {COLLECTION_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`shrink-0 min-h-[38px] px-4 py-1.5 rounded-[12px] text-xs font-semibold border transition-colors ${
                selectedCategory === item.name
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#171717] border-[#e5e5e5] hover:bg-[#f5f5f5]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Fullstop-style Compact 6-Column Grid (.fhg__grid) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#f5f5f5] rounded-2xl p-12 text-center">
            <h3 className="text-base font-bold text-[#171717] mb-1">No products found</h3>
            <p className="text-xs text-[#666666]">
              Check back soon for new pieces in this collection.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-2.5 gap-y-6 md:gap-x-4 md:gap-y-7">
              {displayedList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-7 py-3 bg-[#171717] text-white text-xs font-bold rounded-full hover:bg-[#333333] transition-colors"
                >
                  Load more ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
