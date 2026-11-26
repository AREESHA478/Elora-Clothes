import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useShop();

  const [hovered, setHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const isFav = isInWishlist(product.id);
  const hasSecond = product.images?.length > 1;

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    const chosenSize = size || product.sizes?.[0] || 'One Size';
    const color = product.colors?.[0]?.name || 'Default';
    addToCart(product, chosenSize, color, 1);
    setShowSizes(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowSizes(false); }}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-elora-sand">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              hasSecond && hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />
          {/* Secondary */}
          {hasSecond && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-elora-brown text-white text-[9px] uppercase tracking-widest font-bold rounded-full">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2.5 py-1 bg-elora-dark text-white text-[9px] uppercase tracking-widest font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.discountBadge && !product.discount && (
            <span className="px-2.5 py-1 bg-elora-dark text-white text-[9px] uppercase tracking-widest font-bold rounded-full">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Hover action buttons — slide from right */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 z-10 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isFav ? 'bg-elora-brown text-white' : 'bg-white text-elora-dark hover:bg-elora-brown hover:text-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); openQuickView(product); }}
            className="w-8 h-8 rounded-full bg-white text-elora-dark hover:bg-elora-brown hover:text-white flex items-center justify-center shadow-lg transition-colors"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add — slides up from bottom */}
        <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          {showSizes ? (
            <div className="bg-white/95 backdrop-blur-md p-3 border-t border-elora-taupe/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-elora-dark">Select Size</span>
                <button onClick={() => setShowSizes(false)} className="text-[10px] text-stone-400 hover:text-elora-dark">✕</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="flex-1 min-w-[32px] py-1 text-[10px] font-semibold border border-stone-200 hover:border-elora-brown hover:bg-elora-brown hover:text-white transition-colors rounded-full"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (product.sizes && product.sizes.length > 1) {
                  setShowSizes(true);
                } else {
                  handleQuickAdd(e, product.sizes?.[0] || 'One Size');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-elora-dark/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Quick Add
            </button>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="mt-3.5 flex flex-col gap-1">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-widest text-elora-brown font-medium">{product.category}</p>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-elora-brown text-elora-brown" />
              <span className="text-[10px] text-stone-500 font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-elora-dark hover:text-elora-brown transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-elora-dark">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color dots */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-3 h-3 rounded-full border border-stone-200 ring-1 ring-transparent hover:ring-elora-brown transition-all cursor-pointer"
                style={{ backgroundColor: c.hex || '#ccc' }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
