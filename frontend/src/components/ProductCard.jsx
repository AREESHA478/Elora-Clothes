import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { 
    isInWishlist, 
    toggleWishlist, 
    openQuickView, 
    addToCart 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const hasSecondaryImage = product.images && product.images.length > 1;

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    const chosenSize = size || (product.sizes ? product.sizes[0] : 'One Size');
    const color = product.colors && product.colors[0] ? product.colors[0].name : 'Default';
    addToCart(product, chosenSize, color, 1);
    setShowQuickSizes(false);
  };

  return (
    <div 
      className="group relative flex flex-col h-full bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-elora-taupe/30">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              hasSecondaryImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Hover Image */}
          {hasSecondaryImage && (
            <img
              src={product.images[1]}
              alt={`${product.name} back angle`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges: Discount & Status */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10 pointer-events-none">
          {product.discountBadge && (
            <span className="bg-elora-dark text-white text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-1 shadow-sm">
              {product.discountBadge}
            </span>
          )}
          {product.isNewArrival && !product.discountBadge?.includes('OFF') && (
            <span className="bg-white/90 backdrop-blur-sm text-elora-dark text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-1 border border-elora-taupe/40">
              NEW
            </span>
          )}
        </div>

        {/* Top Right Wishlist Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 shadow-sm ${
            isFavorite
              ? 'bg-elora-brown text-white'
              : 'bg-white/90 text-stone-700 hover:text-elora-brown hover:bg-white'
          }`}
          title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Quick Action Drawer on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {showQuickSizes ? (
            <div className="bg-white/95 backdrop-blur-md p-2.5 border border-elora-taupe/40 shadow-lg animate-fade-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-elora-dark">
                  Select Size
                </span>
                <button
                  onClick={() => setShowQuickSizes(false)}
                  className="text-[10px] text-stone-400 hover:text-elora-dark"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="flex-1 min-w-[34px] py-1 text-[11px] font-medium border border-stone-200 hover:border-elora-dark hover:bg-elora-dark hover:text-white transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5">
              {/* Quick View Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openQuickView(product);
                }}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-white/95 backdrop-blur-md text-elora-dark text-[10px] uppercase tracking-widest font-semibold border border-elora-taupe/40 hover:bg-elora-dark hover:text-white transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>

              {/* Add to Bag Quick Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (product.sizes && product.sizes.length > 1) {
                    setShowQuickSizes(true);
                  } else {
                    handleQuickAdd(e, product.sizes ? product.sizes[0] : 'One Size');
                  }
                }}
                className="p-2.5 bg-elora-dark text-white hover:bg-elora-brown transition-colors shadow-sm"
                title="Add to Bag"
                aria-label="Add to bag"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 pb-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between text-[11px] text-elora-gray uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <div className="flex items-center space-x-1 text-stone-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-xs">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block font-serif text-base sm:text-lg font-medium text-elora-dark hover:text-elora-brown transition-colors line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing in PKR */}
        <div className="flex items-baseline space-x-2.5 pt-1">
          <span className="text-sm sm:text-base font-semibold text-elora-dark">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color Palette Indicators */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 mt-2.5 pt-2 border-t border-elora-taupe/20">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-stone-400 font-sans">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
