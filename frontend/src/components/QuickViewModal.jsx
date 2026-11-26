import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Heart, 
  Star, 
  Ruler, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Check, 
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    openSizeGuide 
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showInModalSizeChart, setShowInModalSizeChart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isInWishlist(product.id);
  const activeColor = selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : '');

  const handleSizeSelect = (sz) => {
    setSelectedSize(sz);
    setSizeError(false);
  };

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    const success = addToCart(product, selectedSize, activeColor, quantity);
    if (success) {
      closeQuickView();
    }
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, activeColor, quantity);
    closeQuickView();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[2000000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeQuickView}
        className="fixed inset-0 bg-elora-dark/75 backdrop-blur-sm"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-elora-taupe/40 shadow-2xl p-6 sm:p-8 z-10"
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-elora-dark transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Images Gallery */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-elora-taupe/30">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.discountBadge && (
                <span className="absolute top-3 left-3 bg-elora-dark text-white text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-1">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-18 shrink-0 overflow-hidden border transition-all ${
                      activeImageIdx === idx
                        ? 'border-elora-dark ring-1 ring-elora-dark'
                        : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Category, Rating & Wishlist */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold">
                  {product.category} / {product.subcategory}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-1.5 transition-colors ${
                    isFavorite ? 'text-elora-brown' : 'text-stone-400 hover:text-elora-brown'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-elora-dark mb-2">
                {product.name}
              </h2>

              {/* Subtitle / Essence */}
              {product.subtitle && (
                <p className="text-xs text-stone-500 font-light mb-3 italic">
                  {product.subtitle}
                </p>
              )}

              {/* Ratings */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-elora-brown text-elora-brown'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-elora-dark">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price in PKR */}
              <div className="flex items-baseline space-x-3 mb-6 pb-5 border-b border-elora-taupe/30">
                <span className="text-xl sm:text-2xl font-semibold text-elora-dark">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="text-xs font-semibold text-elora-dark bg-elora-sand px-2 py-0.5 border border-elora-border">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-elora-dark uppercase tracking-wider">
                      Color: <span className="font-normal text-stone-600">{activeColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border p-0.5 transition-all ${
                          activeColor === c.name
                            ? 'border-elora-dark ring-2 ring-elora-dark/30 scale-110'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector with IN-MODAL Size Chart Overlay */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-elora-dark uppercase tracking-wider">
                      Select Size {selectedSize && <span className="text-elora-brown font-bold">({selectedSize})</span>}
                    </span>
                    <button
                      onClick={() => setShowInModalSizeChart(!showInModalSizeChart)}
                      className="inline-flex items-center space-x-1 text-elora-brown hover:text-elora-dark text-xs underline underline-offset-4 font-semibold"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showInModalSizeChart ? 'Hide Size Chart' : 'View Size Chart'}</span>
                    </button>
                  </div>

                  {/* Size buttons */}
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSizeSelect(sz)}
                        className={`min-w-[48px] py-2 px-3 text-xs font-semibold uppercase tracking-wider border transition-all ${
                          selectedSize === sz
                            ? 'bg-elora-dark text-white border-elora-dark shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-elora-dark'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {/* Error notice if trying to add without size */}
                  {sizeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-600 mt-2 font-medium"
                    >
                      * Please choose a size to proceed with adding to bag.
                    </motion.p>
                  )}

                  {/* INLINE IN-MODAL SIZE CHART (Guaranteed to be directly on top in front!) */}
                  {showInModalSizeChart && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-3 bg-elora-sand/80 border border-elora-taupe/50 text-xs overflow-x-auto"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-elora-dark uppercase tracking-wider text-[10px]">
                          Quick Measurement Chart (Inches)
                        </span>
                        <button
                          onClick={openSizeGuide}
                          className="text-[10px] text-elora-brown underline"
                        >
                          Full Detailed Guide
                        </button>
                      </div>
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-elora-taupe/40 text-stone-700">
                            <th className="py-1">Size</th>
                            <th className="py-1">Chest</th>
                            <th className="py-1">Waist</th>
                            <th className="py-1">Hips</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200/60">
                          <tr><td className="py-1 font-bold">XS</td><td>31-32"</td><td>24-25"</td><td>34-35"</td></tr>
                          <tr><td className="py-1 font-bold">S</td><td>33-34"</td><td>26-27"</td><td>36-37"</td></tr>
                          <tr><td className="py-1 font-bold">M</td><td>35-36"</td><td>28-29"</td><td>38-39"</td></tr>
                          <tr><td className="py-1 font-bold">L</td><td>37-39"</td><td>30-32"</td><td>40-42"</td></tr>
                          <tr><td className="py-1 font-bold">XL</td><td>40-42"</td><td>33-35"</td><td>43-45"</td></tr>
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xs uppercase font-medium text-elora-dark tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold text-elora-dark min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions: Add to Bag & Buy Now */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-elora-taupe text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-stone-300 transition-colors text-center"
                >
                  Buy Now
                </button>
              </div>

              {/* Quick Perks Info */}
              <div className="space-y-2 pt-4 border-t border-elora-taupe/30 text-xs text-stone-600">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-elora-brown shrink-0" />
                  <span>Free express delivery on orders over Rs. 5,000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-elora-brown shrink-0" />
                  <span>14-day effortless complimentary exchange policy</span>
                </div>
              </div>
            </div>

            {/* View Full Product Page Link */}
            <div className="mt-6 pt-4 border-t border-elora-taupe/30 text-center">
              <Link
                to={`/product/${product.id}`}
                onClick={closeQuickView}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-bold text-elora-dark hover:text-elora-brown transition-colors"
              >
                <span>View Full Product Details & Story</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

