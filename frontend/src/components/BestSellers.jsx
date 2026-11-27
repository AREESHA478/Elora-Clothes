import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function BestSellers() {
  const { PRODUCTS, addToCart, openQuickView } = useShop();
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="bg-white py-5 md:py-7">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
        {/* Heading */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="font-sans text-[20px] md:text-[22px] font-bold tracking-[-0.025em] text-[#171717]">
            Best Sellers
          </h2>
          <Link
            to="/shop?filter=bestseller"
            className="inline-flex items-center gap-1.5 min-h-[44px] text-[12px] font-medium text-[#171717] hover:underline underline-offset-4"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Grid (Fullstop fsb-featured__grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {bestSellers.map((product) => (
            <div key={product.id} className="group flex flex-col min-w-0">
              <div className="relative aspect-[4/5] rounded-[12px] overflow-hidden bg-[#f5f5f5]">
                <button
                  type="button"
                  onClick={() => openQuickView(product)}
                  className="block w-full h-full text-left cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                  />
                </button>
                {product.discountBadge && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white text-[#171717] border border-[#e5e5e5] rounded-full text-[10px] font-bold">
                    {product.discountBadge}
                  </span>
                )}
                <button
                  onClick={() => openQuickView(product)}
                  aria-label={`Quick view ${product.name}`}
                  className="hidden md:flex absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/95 text-[#171717] border border-[#e5e5e5] rounded-full text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Quick view
                </button>
              </div>

              <div className="mt-2 flex-1 flex flex-col justify-between gap-2">
                <button type="button" onClick={() => openQuickView(product)} className="text-left cursor-pointer">
                  <h3 className="text-[12px] md:text-[13px] font-medium text-[#171717] leading-[1.3] line-clamp-2 min-h-[2.6em] group-hover:underline underline-offset-2">
                    {product.name}
                  </h3>
                </button>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[12px] md:text-[13px] font-bold text-[#171717] tabular-nums">
                      Rs.{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-[11px] text-[#737373] line-through tabular-nums">
                        Rs.{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        product,
                        product.sizes?.[0] || 'One Size',
                        product.colors?.[0]?.name || 'Default',
                        1
                      )
                    }
                    className="inline-flex items-center justify-center gap-1 min-h-[36px] px-3 bg-[#171717] text-white text-[11px] font-bold rounded-full hover:bg-[#333333] transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
