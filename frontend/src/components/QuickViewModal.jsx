import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Ruler,
  Truck,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, openSizeGuide } = useShop();
  const navigate = useNavigate();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const images = quickViewProduct?.images || [];
  const totalImages = images.length;

  useEffect(() => {
    if (!quickViewProduct) return;
    setActiveImageIdx(0);
    setSelectedSize('');
    setSelectedColor(
      quickViewProduct.colors && quickViewProduct.colors[0]
        ? quickViewProduct.colors[0].name
        : ''
    );
    setQuantity(1);
    setSizeError(false);
  }, [quickViewProduct]);

  const handlePrev = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIdx((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleNext = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIdx((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (!quickViewProduct) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [quickViewProduct, closeQuickView, handlePrev, handleNext]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor =
    selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    const success = addToCart(product, selectedSize || 'One Size', activeColor, quantity);
    if (success) closeQuickView();
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize || 'One Size', activeColor, quantity);
    closeQuickView();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[2000000] bg-white overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5]">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-extrabold tracking-tight text-[#171717] uppercase shrink-0">
                ÉLORA.
              </span>
              <span className="text-[#dedede]">/</span>
              <span className="text-xs font-medium text-[#666666] truncate">
                {product.name}
              </span>
            </div>

            <button
              type="button"
              onClick={closeQuickView}
              className="w-9 h-9 rounded-full bg-[#f5f5f5] hover:bg-[#171717] hover:text-white text-[#171717] flex items-center justify-center transition-colors shrink-0"
              aria-label="Close full-screen product view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full-Screen Product Content */}
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Full-Aspect Large Image Gallery */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#f7f7f7] rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] sm:min-h-[480px] lg:min-h-[560px]">
                {totalImages > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-[#171717] hover:text-white text-[#171717] border border-[#e5e5e5] flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <img
                  src={images[activeImageIdx] || images[0]}
                  alt={`${product.name} — view ${activeImageIdx + 1}`}
                  className="max-h-[70vh] w-auto h-auto object-contain"
                />

                {totalImages > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-[#171717] hover:text-white text-[#171717] border border-[#e5e5e5] flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {product.discountBadge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#171717] text-white text-[10px] font-bold rounded-full">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {totalImages > 1 && (
                <div className="flex items-center gap-2.5 mt-3 overflow-x-auto no-scrollbar pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIdx === idx
                          ? 'border-[#171717] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Full Product Details, Price, Size, Add to Bag */}
            <div className="lg:col-span-5 flex flex-col">
              <p className="text-[11px] uppercase tracking-widest text-[#666666] font-semibold mb-1.5">
                {product.subcategory || product.category}
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#171717] leading-tight">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs sm:text-sm text-[#666666] mt-1.5">
                  {product.subtitle}
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4 pb-5 border-b border-[#efefef]">
                <span className="text-2xl font-bold text-[#171717] tabular-nums">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#737373] line-through tabular-nums">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mt-5">
                  {product.description}
                </p>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#171717] mb-2">
                    Color: <span className="font-normal text-[#666666]">{activeColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isSelected = activeColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-colors ${
                            isSelected
                              ? 'border-[#171717] bg-[#f5f5f5] font-semibold'
                              : 'border-[#dedede] bg-white hover:border-[#171717]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#dedede] flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow" />}
                          </span>
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-[#171717]">
                      Size {selectedSize ? `: ${selectedSize}` : ''}
                    </p>
                    <button
                      type="button"
                      onClick={openSizeGuide}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#171717] underline underline-offset-4"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          setSelectedSize(sz);
                          setSizeError(false);
                        }}
                        className={`py-2.5 text-xs font-bold rounded-xl border transition-colors ${
                          selectedSize === sz
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#dedede] hover:border-[#171717]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {sizeError && (
                    <p className="text-xs text-red-600 font-medium mt-2">
                      Please select a size first.
                    </p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-bold text-[#171717]">Quantity</span>
                <div className="inline-flex items-center border border-[#dedede] rounded-full">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 text-sm font-bold text-[#171717] hover:bg-[#f5f5f5] rounded-l-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 text-sm font-bold text-[#171717] hover:bg-[#f5f5f5] rounded-r-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 px-6 bg-[#171717] text-white text-xs font-bold rounded-full hover:bg-[#333333] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-white text-[#171717] border border-[#171717] text-xs font-bold rounded-full hover:bg-[#f5f5f5] transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Fabric & Delivery Info */}
              <div className="mt-7 pt-5 border-t border-[#efefef] space-y-2.5 text-xs text-[#666666]">
                {product.fabric && (
                  <p>
                    <strong className="text-[#171717]">Fabric:</strong> {product.fabric}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#171717] shrink-0" />
                  <span>Express delivery in 2–4 business days across Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#171717] shrink-0" />
                  <span>14-day easy returns &amp; exchanges</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
