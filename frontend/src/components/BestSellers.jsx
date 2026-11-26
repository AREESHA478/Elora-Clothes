import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

function BestSellerCard({ product, index }) {
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useShop();
  const [hovered, setHovered] = useState(false);
  const isFav = isInWishlist(product.id);
  const hasSecond = product.images?.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-elora-sand aspect-[3/4]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${hasSecond && hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            loading="lazy"
          />
          {hasSecond && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Best Seller badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-elora-dark text-[9px] uppercase tracking-widest font-bold rounded-full shadow-sm">
            <Star className="w-2.5 h-2.5 fill-elora-brown text-elora-brown" />
            Best Seller
          </span>
          {product.discount > 0 && (
            <span className="px-2.5 py-1 bg-elora-brown text-white text-[9px] uppercase tracking-widest font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Hover action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${isFav ? 'bg-elora-brown text-white' : 'bg-white text-elora-dark hover:bg-elora-brown hover:text-white'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); openQuickView(product); }}
            className="w-8 h-8 rounded-full bg-white text-elora-dark hover:bg-elora-brown hover:text-white flex items-center justify-center shadow-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add slide up */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              const size = product.sizes?.[0] || 'One Size';
              const color = product.colors?.[0]?.name || 'Default';
              addToCart(product, size, color, 1);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-elora-dark/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3.5 flex flex-col gap-1">
        <p className="text-[9px] uppercase tracking-widest text-elora-brown font-medium">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-elora-dark hover:text-elora-brown transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>
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
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
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
    </motion.div>
  );
}

export default function BestSellers() {
  const { PRODUCTS } = useShop();
  const bestList = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-elora-cream border-y border-elora-taupe/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-elora-brown" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-elora-brown font-semibold">
                Client Favorites
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-elora-dark leading-none">
              Best <span className="italic text-elora-brown">Sellers</span>
            </h2>
          </div>

          {/* Right: description + link */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-sm text-stone-500 font-light max-w-xs sm:text-right leading-relaxed">
              Most sought-after silhouettes, loved for their exceptional fabric & timeless appeal.
            </p>
            <Link
              to="/shop?filter=bestseller"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-elora-dark hover:text-elora-brown transition-colors"
            >
              <span>Explore All</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Rank + Product Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {bestList.map((product, i) => (
            <div key={product.id} className="relative">
              {/* Rank number watermark */}
              <div className="absolute -top-4 -left-1 font-serif text-[64px] font-light leading-none text-elora-taupe/30 select-none pointer-events-none z-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="relative z-10">
                <BestSellerCard product={product} index={i} />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/shop?filter=bestseller"
            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-elora-dark text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-elora-dark hover:text-white transition-all duration-300 rounded-full"
          >
            <span>Shop All Best Sellers</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
