import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
];

function NewArrivalCard({ product, index }) {
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useShop();
  const [hovered, setHovered] = useState(false);
  const isFav = isInWishlist(product.id);
  const hasSecond = product.images?.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-elora-sand aspect-[3/4]">
        <Link to={`/product/${product.id}`}>
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${hasSecond && hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            loading="lazy"
          />
          {/* Secondary hover image */}
          {hasSecond && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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
        </div>

        {/* Action buttons — slide in on hover */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${isFav ? 'bg-elora-brown text-white' : 'bg-white text-elora-dark hover:bg-elora-brown hover:text-white'}`}
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

        {/* Quick Add — slide up on hover */}
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

      {/* Product Info */}
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
        {/* Color dots */}
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

export default function NewArrivals() {
  const { PRODUCTS } = useShop();
  const [filter, setFilter] = useState('all');

  const newList = PRODUCTS.filter((p) => p.isNewArrival);
  const displayed = filter === 'all' ? newList : newList.filter((p) => p.gender === filter);

  return (
    <section className="py-20 lg:py-28 bg-elora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-elora-brown" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-elora-brown font-semibold">
                Fresh Off The Runway
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-elora-dark leading-none">
              New <span className="italic text-elora-brown">Arrivals</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-250 border ${
                  filter === f.value
                    ? 'bg-elora-brown text-white border-elora-brown shadow-elora-soft'
                    : 'bg-transparent text-stone-500 border-elora-taupe hover:border-elora-brown hover:text-elora-brown'
                }`}
              >
                {f.label}
                {f.value === 'all' && (
                  <span className="ml-1.5 opacity-60">({newList.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10"
          >
            {displayed.slice(0, 4).map((product, i) => (
              <NewArrivalCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA ── */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/shop?filter=new"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-all duration-300 rounded-full shadow-elora-card"
          >
            <span>View All New Arrivals</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
