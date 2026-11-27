import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Ruler, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight,Share2, 
  Check, 
  Clock, 
  PackageCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    PRODUCTS, 
    addToCart, 
    openSizeGuide, 
    addRecentlyViewed,
    addToast 
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('fabric');

  // Sync color & log recently viewed on product change
  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveImageIdx(0);
      setSelectedSize('');
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : '');
      setQuantity(1);
      setSizeError(false);
      addRecentlyViewed(product);
    }
  }, [id, product]);

  const activeColor = selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');

  // Handle zoom movement
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleSizeClick = (sz) => {
    setSelectedSize(sz);
    setSizeError(false);
  };

  const handleAddToBag = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, activeColor, quantity);
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, activeColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard', 'info');
    }
  };

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="bg-elora-bg min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-elora-gray">
          <Link to="/" className="hover:text-elora-brown transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-elora-brown transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-elora-brown transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-elora-dark font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery (Thumbs + Zoom View) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails Column */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 sm:w-20 aspect-[3/4] overflow-hidden border transition-all ${
                      activeImageIdx === idx
                        ? 'border-elora-dark ring-1 ring-elora-dark'
                        : 'border-elora-taupe/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image with Zoom on Hover */}
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-stone-100 border border-elora-taupe/30 cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      }
                    : undefined
                }
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
                {product.discountBadge && (
                  <span className="bg-elora-dark text-white text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 shadow-sm">
                    {product.discountBadge}
                  </span>
                )}
                {product.collection && (
                  <span className="bg-white/90 backdrop-blur-sm text-elora-dark text-[9px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 border border-elora-taupe/40">
                    {product.collection}
                  </span>
                )}
              </div>

              {/* Zoom hint overlay */}
              <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-[10px] uppercase tracking-wider text-stone-600 px-2 py-1 pointer-events-none hidden md:block">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Add to Cart */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Top metadata */}
            <div className="flex items-center justify-between pb-2 border-b border-elora-taupe/20">
              <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold">
                {product.category} • {product.subcategory}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-stone-400 hover:text-elora-dark transition-colors"
                  title="Share Silhouette"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-elora-dark mt-3 mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Subtitle */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-stone-600 font-light italic mb-4">
                {product.subtitle}
              </p>
            )}

            {/* Rating Stars & Reviews */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-elora-taupe/30">
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
              <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Pricing in PKR */}
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="text-2xl sm:text-3xl font-semibold text-elora-dark">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discountBadge && (
                <span className="text-xs font-semibold text-elora-dark bg-elora-sand px-2.5 py-1 border border-elora-border">
                  Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="font-semibold text-elora-dark uppercase tracking-wider">
                    Color: <span className="font-normal text-stone-600">{activeColor}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border p-0.5 transition-all ${
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

            {/* Size Selection (MANDATORY for apparel) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="font-semibold text-elora-dark uppercase tracking-wider">
                    Size: {selectedSize ? <span className="text-elora-brown font-bold">({selectedSize})</span> : <span className="text-stone-400 font-normal">Select Size</span>}
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="inline-flex items-center space-x-1 text-xs text-elora-brown hover:text-elora-dark underline underline-offset-4 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Interactive Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => handleSizeClick(sz)}
                      className={`py-3 text-xs uppercase font-semibold border transition-all text-center ${
                        selectedSize === sz
                          ? 'bg-elora-dark text-white border-elora-dark shadow-sm'
                          : 'bg-white text-stone-800 border-stone-300 hover:border-elora-dark'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-2 font-medium"
                  >
                    * Please select an appropriate size before adding to your shopping bag.
                  </motion.p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xs uppercase font-semibold text-elora-dark tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center border border-stone-300 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  -
                </button>
                <span className="px-5 py-2 text-xs font-semibold text-elora-dark min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-stone-500 italic">
                {product.modelInfo}
              </span>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToBag}
                className="w-full py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-elora-soft"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-elora-taupe text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-stone-300 transition-colors text-center"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Availability & Delivery Status Badges */}
            <div className="bg-white border border-elora-taupe/30 p-4 space-y-3 text-xs text-stone-600 mb-8">
              <div className="flex items-center space-x-2 text-elora-dark font-medium">
                <PackageCheck className="w-4 h-4 text-elora-dark" />
                <span>In Stock & Ready to Dispatch from Atelier Lahore</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-elora-brown" />
                <span>Free Express Courier within 2-4 business days nationwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-elora-brown" />
                <span>Complimentary 14-day exchange with doorstep pickup</span>
              </div>
            </div>

            {/* Accordion Tabs for Product Narrative */}
            <div className="border-t border-elora-taupe/30 divide-y divide-elora-taupe/20">
              {/* Fabric & Materials */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-elora-dark"
                >
                  <span>Fabric & Atelier Craftsmanship</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'fabric' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'fabric' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-stone-600 leading-relaxed space-y-2"
                  >
                    <p><strong>Composition:</strong> {product.fabric}</p>
                    <p>Woven with certified sustainable natural yarns, ensuring high tensile drape, breathability, and soft skin-feel that ages gracefully.</p>
                  </motion.div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-elora-dark"
                >
                  <span>Garment Care & Longevity</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-stone-600 leading-relaxed space-y-1"
                  >
                    <p>{product.care}</p>
                    <p>We recommend airing garments out between wears rather than frequent laundering to preserve fibre integrity.</p>
                  </motion.div>
                )}
              </div>

              {/* Delivery & Returns */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-elora-dark"
                >
                  <span>Complimentary Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'delivery' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-stone-600 leading-relaxed space-y-2"
                  >
                    <p>{product.deliveryInfo}</p>
                    <p>Orders are dispatched in signature ÉLORA recyclable rigid presentation boxes with protective unbleached garment slips.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 pt-12 border-t border-elora-taupe/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold block mb-1">
                Client Testimonials
              </span>
              <h2 className="font-serif text-3xl font-light text-elora-dark">
                Verified Reviews ({product.reviewCount})
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="font-serif text-4xl font-light text-elora-dark">{product.rating}</span>
              <div>
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-elora-brown text-elora-brown" />
                  ))}
                </div>
                <span className="text-xs text-stone-500">100% of clients recommend this silhouette</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-elora-taupe/30">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-elora-brown text-elora-brown" />
                ))}
              </div>
              <p className="font-serif text-base font-medium text-elora-dark mb-2">
                "Exquisite fabric weight and tailored cut"
              </p>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                The drape on this piece is truly international grade. It feels like something acquired in a Milanese atelier. Very pleased with the packaging as well.
              </p>
              <p className="text-[11px] font-semibold text-elora-dark">Zainab R. • Lahore</p>
              <p className="text-[10px] text-elora-brown">Verified Purchaser</p>
            </div>

            <div className="bg-white p-6 border border-elora-taupe/30">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-elora-brown text-elora-brown" />
                ))}
              </div>
              <p className="font-serif text-base font-medium text-elora-dark mb-2">
                "Sublime comfort for evening occasions"
              </p>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                Purchased for an autumn gala in Islamabad. Received compliments all evening. The size guide was 100% accurate.
              </p>
              <p className="text-[11px] font-semibold text-elora-dark">Mahnoor K. • Islamabad</p>
              <p className="text-[10px] text-elora-brown">Verified Purchaser</p>
            </div>

            <div className="bg-white p-6 border border-elora-taupe/30">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-elora-brown text-elora-brown" />
                ))}
              </div>
              <p className="font-serif text-base font-medium text-elora-dark mb-2">
                "Investment wardrobe piece"
              </p>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                You can tell immediate attention went into the stitching and lining. Fast 2-day delivery to Clifton. Highly recommend!
              </p>
              <p className="text-[11px] font-semibold text-elora-dark">Hassan T. • Karachi</p>
              <p className="text-[10px] text-elora-brown">Verified Purchaser</p>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-elora-taupe/30">
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold block mb-1">
                Complete The Wardrobe
              </span>
              <h2 className="font-serif text-3xl font-light text-elora-dark">
                Complementary Silhouettes
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

