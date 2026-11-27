import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, openQuickView } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group flex flex-col min-w-0 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Compact Image Container — Click opens Full-Screen Image Viewer */}
      <div className="relative aspect-[2/3] rounded-[10px] overflow-hidden bg-[#f5f5f5]">
        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="block w-full h-full text-left cursor-pointer"
          aria-label={`View ${product.name} full-screen`}
        >
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
            loading="lazy"
          />
        </button>

        {/* Minimal Sale / New Badge */}
        {(product.discountBadge || product.isNewArrival) && (
          <div className="absolute top-2 left-2 pointer-events-none">
            {product.discountBadge ? (
              <span className="px-2 py-0.5 bg-[#171717] text-white text-[9px] font-bold rounded-full">
                {product.discountBadge}
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-white text-[#171717] border border-[#e5e5e5] text-[9px] font-bold rounded-full">
                New
              </span>
            )}
          </div>
        )}
      </div>

      {/* Compact Product Info */}
      <div className="mt-2 flex-1 flex flex-col justify-between gap-1 text-center">
        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="text-center cursor-pointer"
        >
          <h3 className="text-[11px] md:text-[12px] font-medium text-[#171717] leading-[1.35] line-clamp-2 min-h-[2.7em] group-hover:underline underline-offset-2">
            {product.name}
          </h3>
        </button>

        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[11px] md:text-[12px] font-bold text-[#171717] tabular-nums">
            Rs.{product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] text-[#737373] line-through tabular-nums">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Centered Compact + Button */}
        <div className="pt-1 flex justify-center">
          <button
            type="button"
            onClick={() =>
              addToCart(
                product,
                product.sizes?.[0] || 'One Size',
                product.colors?.[0]?.name || 'Default',
                1
              )
            }
            aria-label={`Add ${product.name} to bag`}
            className="w-9 h-9 rounded-full border border-[#dedede] bg-white text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717] inline-flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
