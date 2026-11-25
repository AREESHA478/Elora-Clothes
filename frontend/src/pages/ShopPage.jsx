import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw, 
  Search,
  Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const ALL_CATEGORIES = [
  "All",
  "Dresses",
  "Tops",
  "Shirts",
  "Co-ord Sets",
  "Trousers",
  "Jeans",
  "Hoodies",
  "Jackets",
  "Outerwear",
  "Skirts",
  "Accessories"
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLOR_OPTIONS = [
  { name: "Black", hex: "#1D1D1D" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Beige", hex: "#D8C9B8" },
  { name: "Brown", hex: "#8B6B4E" },
  { name: "Blue", hex: "#1E293B" },
  { name: "Olive", hex: "#556B2F" }
];

export default function ShopPage() {
  const { PRODUCTS } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const categoryParam = searchParams.get('category') || 'All';
  const genderParam = searchParams.get('gender') || 'all';
  const filterParam = searchParams.get('filter') || 'all'; // 'new' | 'sale' | 'bestseller'
  const collectionParam = searchParams.get('collection') || 'all';
  const searchParam = searchParams.get('search') || '';

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedGender, setSelectedGender] = useState(genderParam);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under8k', '8k-15k', '15k-25k', 'above25k'
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params when they change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedGender(genderParam);
    setSearchQuery(searchParam);
  }, [categoryParam, genderParam, searchParam]);

  // Handle toggling size
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Handle toggling color
  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange('all');
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  // Active filter count
  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Gender filter
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'All') {
        if (product.subcategory !== selectedCategory && product.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Collection filter
      if (collectionParam !== 'all') {
        if (product.collection !== collectionParam) return false;
      }

      // 4. Special flags (new, sale, bestseller)
      if (filterParam === 'new' && !product.isNewArrival) return false;
      if (filterParam === 'sale' && !product.isSale) return false;
      if (filterParam === 'bestseller' && !product.isBestSeller) return false;

      // 5. Price filter
      if (priceRange === 'under8k' && product.price >= 8000) return false;
      if (priceRange === '8k-15k' && (product.price < 8000 || product.price > 15000)) return false;
      if (priceRange === '15k-25k' && (product.price < 15000 || product.price > 25000)) return false;
      if (priceRange === 'above25k' && product.price <= 25000) return false;

      // 6. Sizes filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes?.some((s) => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // 7. Colors filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = product.colors?.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // 8. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // 'featured'
    });
  }, [
    PRODUCTS,
    selectedCategory,
    selectedGender,
    collectionParam,
    filterParam,
    priceRange,
    selectedSizes,
    selectedColors,
    searchQuery,
    sortBy
  ]);

  const displayedList = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-elora-bg min-h-screen pb-24">
      {/* Editorial Header Banner */}
      <div className="bg-white border-b border-elora-taupe/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-elora-gray mb-4">
            <Link to="/" className="hover:text-elora-brown transition-colors">Home</Link>
            <span>/</span>
            <span className="text-elora-dark font-semibold">Shop All</span>
            {selectedGender !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize text-elora-brown">{selectedGender}</span>
              </>
            )}
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-elora-brown">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark">
                {filterParam === 'sale'
                  ? 'Private Archive Sale'
                  : filterParam === 'new'
                  ? 'New Arrivals'
                  : collectionParam !== 'all'
                  ? collectionParam
                  : selectedGender === 'women'
                  ? "Women's Collection"
                  : selectedGender === 'men'
                  ? "Men's Sartorial"
                  : 'All Silhouettes'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light max-w-xl">
                Refined tailoring, luxurious natural fibres, and timeless drape engineered for contemporary living.
              </p>
            </div>

            <div className="text-xs text-stone-500 mt-4 md:mt-0 font-medium tracking-wider uppercase">
              Showing <span className="font-bold text-elora-dark">{displayedList.length}</span> of{' '}
              <span className="font-bold text-elora-dark">{filteredProducts.length}</span> Silhouettes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Active Filter Tags Bar & Sorting Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-elora-taupe/30 mb-8">
          {/* Left: Mobile Filter Button & Active Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 px-4 py-2 bg-white border border-elora-taupe/40 text-xs uppercase tracking-wider font-semibold text-elora-dark shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-elora-brown" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Active Tags */}
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-elora-taupe/40 text-xs text-stone-700">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-elora-taupe/40 text-xs text-stone-700 capitalize">
                <span>Gender: {selectedGender}</span>
                <button onClick={() => setSelectedGender('all')} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSizes.map((sz) => (
              <span key={sz} className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-elora-taupe/40 text-xs text-stone-700">
                <span>Size: {sz}</span>
                <button onClick={() => toggleSize(sz)} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((cl) => (
              <span key={cl} className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-elora-taupe/40 text-xs text-stone-700">
                <span>Color: {cl}</span>
                <button onClick={() => toggleColor(cl)} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-wider font-semibold text-elora-brown hover:underline ml-2"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white border border-elora-taupe/40 px-3 py-2 font-medium text-elora-dark focus:outline-none focus:border-elora-dark cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">New Arrivals First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content: Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pr-6 border-r border-elora-taupe/30">
            {/* Search within Catalogue */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Search
              </h3>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-elora-taupe/40 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Department
              </h3>
              <div className="flex space-x-2">
                {['all', 'women', 'men'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold border transition-all ${
                      selectedGender === g
                        ? 'bg-elora-dark text-white border-elora-dark'
                        : 'bg-white text-stone-600 border-stone-300 hover:border-elora-dark'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Category
              </h3>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1 text-xs transition-colors flex justify-between items-center ${
                      selectedCategory === cat
                        ? 'font-bold text-elora-brown pl-1'
                        : 'text-stone-600 hover:text-elora-dark'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-elora-brown" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Sizes
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-1.5 text-xs uppercase font-semibold border text-center transition-all ${
                        isSelected
                          ? 'bg-elora-dark text-white border-elora-dark'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-elora-dark'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Color Palette
              </h3>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs border transition-all ${
                        isSelected
                          ? 'border-elora-dark bg-stone-100 font-bold'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-3">
                Price (PKR)
              </h3>
              <div className="space-y-1.5 text-xs text-stone-600">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under8k', label: 'Under Rs. 8,000' },
                  { id: '8k-15k', label: 'Rs. 8,000 – Rs. 15,000' },
                  { id: '15k-25k', label: 'Rs. 15,000 – Rs. 25,000' },
                  { id: 'above25k', label: 'Above Rs. 25,000' }
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center space-x-2 cursor-pointer py-0.5">
                    <input
                      type="radio"
                      name="priceTier"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id)}
                      className="accent-elora-brown"
                    />
                    <span className={priceRange === tier.id ? 'font-bold text-elora-dark' : ''}>
                      {tier.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filter Button */}
            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center space-x-2 py-2.5 border border-stone-300 text-xs uppercase tracking-widest font-semibold hover:border-elora-dark transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-elora-taupe/30 p-12 text-center">
                <Sparkles className="w-8 h-8 text-elora-brown mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-light text-elora-dark mb-2">
                  No matching silhouettes found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                  Try clearing some filters or searching for alternative fabric descriptions like "silk", "linen", or "wool".
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                  {displayedList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button if remaining items */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-16 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="px-10 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-elora-soft"
                    >
                      Load More Silhouettes ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[2000000] flex justify-start lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-elora-dark/65 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-xs bg-white h-full flex flex-col justify-between p-6 overflow-y-auto z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-elora-taupe/30 mb-6">
                  <h3 className="font-serif text-xl font-medium text-elora-dark">Filter Silhouettes</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-stone-500" />
                  </button>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider font-semibold text-elora-dark mb-2">Department</p>
                  <div className="flex gap-2">
                    {['all', 'women', 'men'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`flex-1 py-1.5 text-xs uppercase border ${
                          selectedGender === g ? 'bg-elora-dark text-white' : 'bg-white text-stone-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider font-semibold text-elora-dark mb-2">Category</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {ALL_CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left text-xs py-1 ${
                          selectedCategory === c ? 'font-bold text-elora-brown' : 'text-stone-600'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider font-semibold text-elora-dark mb-2">Size</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`py-1 text-xs border ${
                          selectedSizes.includes(sz) ? 'bg-elora-dark text-white' : 'bg-white text-stone-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-elora-taupe/30 space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-xs uppercase text-stone-500 hover:text-elora-dark"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
