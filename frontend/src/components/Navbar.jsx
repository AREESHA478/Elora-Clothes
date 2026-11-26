import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_NAV } from '../data/products';

export default function Navbar() {
  const { 
    cartItemCount, 
    wishlist, 
    openCartDrawer, 
    user,
    PRODUCTS
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll detection for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Live search suggestions
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-elora-soft border-b border-elora-taupe/30 py-3.5'
            : 'bg-elora-bg/95 border-b border-elora-taupe/20 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-elora-dark hover:text-elora-brown transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-widest text-elora-dark uppercase group-hover:text-elora-brown transition-colors">
                  ÉLORA
                </span>
                <span className="block text-[8px] tracking-[0.35em] text-elora-gray uppercase -mt-1 font-sans">
                  HAUTE COUTURE
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-9 text-xs uppercase tracking-widest font-medium text-elora-dark">
              <Link
                to="/"
                className="hover:text-elora-brown transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-elora-brown hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </Link>

              {/* Women Dropdown Trigger */}
              <div
                className="relative py-2 cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('women')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to="/shop?gender=women"
                  className="flex items-center space-x-1 hover:text-elora-brown transition-colors"
                >
                  <span>Women</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {/* Women Mega Menu */}
                <AnimatePresence>
                  {activeMegaMenu === 'women' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-20 w-[680px] bg-white border border-elora-taupe/40 shadow-elora-float p-7 grid grid-cols-3 gap-6 rounded-none z-50 text-left"
                    >
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase tracking-widest text-elora-brown font-semibold mb-3 border-b border-elora-taupe/30 pb-1.5">
                          Women's Categories
                        </div>
                        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-normal normal-case tracking-normal">
                          <Link to="/shop?category=Dresses&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Dresses</Link>
                          <Link to="/shop?category=Tops&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Tops & Knits</Link>
                          <Link to="/shop?category=Shirts&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Crisp Shirts & Blouses</Link>
                          <Link to="/shop?category=Co-ord Sets&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Tailored Co-ord Sets</Link>
                          <Link to="/shop?category=Trousers&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Pleated Trousers</Link>
                          <Link to="/shop?category=Jeans&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Straight Selvedge Jeans</Link>
                          <Link to="/shop?category=Skirts&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Satin Slip Skirts</Link>
                          <Link to="/shop?category=Outerwear&gender=women" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Wool Coats & Outerwear</Link>
                        </div>
                        <div className="mt-5 pt-3 border-t border-elora-taupe/20">
                          <Link
                            to="/shop?gender=women"
                            className="inline-flex items-center text-xs tracking-wider uppercase font-semibold text-elora-brown hover:text-elora-dark transition-colors"
                          >
                            <span>Explore All Women's Styles</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Featured Card */}
                      <div className="relative group overflow-hidden bg-elora-sand">
                        <img
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80"
                          alt="Women Collection"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="p-3 bg-elora-dark text-white">
                          <p className="text-[10px] tracking-widest uppercase text-elora-taupe">New Season</p>
                          <p className="font-serif text-sm font-semibold truncate">The Autumn Editorial</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Men Dropdown Trigger */}
              <div
                className="relative py-2 cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('men')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to="/shop?gender=men"
                  className="flex items-center space-x-1 hover:text-elora-brown transition-colors"
                >
                  <span>Men</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {/* Men Mega Menu */}
                <AnimatePresence>
                  {activeMegaMenu === 'men' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-20 w-[680px] bg-white border border-elora-taupe/40 shadow-elora-float p-7 grid grid-cols-3 gap-6 rounded-none z-50 text-left"
                    >
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase tracking-widest text-elora-brown font-semibold mb-3 border-b border-elora-taupe/30 pb-1.5">
                          Men's Categories
                        </div>
                        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-normal normal-case tracking-normal">
                          <Link to="/shop?category=Shirts&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Linen & Silk Shirts</Link>
                          <Link to="/shop?category=T-shirts&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Heavyweight Supima Tees</Link>
                          <Link to="/shop?category=Hoodies&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Architectural Loopback Hoodies</Link>
                          <Link to="/shop?category=Trousers&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Tailored Wool Trousers</Link>
                          <Link to="/shop?category=Jeans&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Japanese Selvedge Jeans</Link>
                          <Link to="/shop?category=Jackets&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Suede Jackets & Overcoats</Link>
                          <Link to="/shop?category=Accessories&gender=men" className="text-stone-700 hover:text-elora-brown transition-colors hover:translate-x-1 duration-200 inline-block">Belts & Leather Goods</Link>
                        </div>
                        <div className="mt-5 pt-3 border-t border-elora-taupe/20">
                          <Link
                            to="/shop?gender=men"
                            className="inline-flex items-center text-xs tracking-wider uppercase font-semibold text-elora-brown hover:text-elora-dark transition-colors"
                          >
                            <span>Explore All Men's Styles</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Featured Card */}
                      <div className="relative group overflow-hidden bg-elora-sand">
                        <img
                          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80"
                          alt="Men Collection"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="p-3 bg-elora-dark text-white">
                          <p className="text-[10px] tracking-widest uppercase text-elora-taupe">Sartorial Modernism</p>
                          <p className="font-serif text-sm font-semibold truncate">Refined Essentials</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/shop?filter=new"
                className="hover:text-elora-brown transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-elora-brown hover:after:w-full after:transition-all after:duration-300"
              >
                New Arrivals
              </Link>
              <Link
                to="/shop?collection=Autumn Edit"
                className="hover:text-elora-brown transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-elora-brown hover:after:w-full after:transition-all after:duration-300"
              >
                Collections
              </Link>
              <Link
                to="/shop?filter=sale"
                className="text-stone-900 hover:text-red-700 font-semibold transition-colors py-2"
              >
                Sale
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-elora-dark hover:text-elora-brown transition-colors"
                title="Search Collections"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Icon */}
              <Link
                to="/account"
                className="p-1.5 text-elora-dark hover:text-elora-brown transition-colors relative"
                title={user ? `Signed in as ${user.name}` : "Client Account"}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-elora-brown" />
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="p-1.5 text-elora-dark hover:text-elora-brown transition-colors relative"
                title="Saved Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-elora-brown text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Icon with Drawer Trigger */}
              <button
                onClick={openCartDrawer}
                className="p-1.5 text-elora-dark hover:text-elora-brown transition-colors relative"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-elora-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SEARCH MODAL OVERLAY ================= */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-elora-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white border border-elora-taupe/40 shadow-2xl p-6 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-elora-taupe/30">
                <span className="text-xs uppercase tracking-widest font-semibold text-elora-brown">
                  Search Haute Couture Catalogue
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-stone-400 hover:text-elora-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <Search className="w-5 h-5 text-elora-gray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by silhouette, silk, linen, cashmere, dress..."
                  className="w-full pl-11 pr-24 py-3 text-sm bg-elora-sand/50 border border-elora-taupe/40 focus:outline-none focus:border-elora-brown"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-elora-dark text-white text-xs uppercase tracking-wider hover:bg-elora-brown transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Suggestions */}
              {searchQuery.trim() ? (
                <div className="mt-5 max-h-80 overflow-y-auto divide-y divide-stone-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center space-x-4 py-3 hover:bg-elora-bg px-2 transition-colors group"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-elora-gray uppercase tracking-wider">{prod.category} / {prod.subcategory}</p>
                          <p className="font-serif text-sm font-medium text-stone-900 group-hover:text-elora-brown truncate">{prod.name}</p>
                          <p className="text-xs font-semibold text-elora-dark">Rs. {prod.price.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-elora-brown transition-colors" />
                      </Link>
                    ))
                  ) : (
                    <div className="py-8 text-center text-sm text-elora-gray">
                      No silhouettes found matching "{searchQuery}".
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-[11px] uppercase tracking-widest text-elora-gray font-semibold mb-2">
                    Popular Inquiries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Silk Maxi Dress', 'Cashmere Knit', 'Tailored Trousers', 'Selvedge Denim', 'Autumn Coat', 'Harrington Jacket'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-xs px-3 py-1 bg-stone-100 hover:bg-elora-taupe/30 text-stone-700 transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-elora-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-xs bg-elora-bg border-r border-elora-taupe/40 h-full flex flex-col justify-between overflow-y-auto p-6 z-10"
            >
              <div>
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-4 border-b border-elora-taupe/30">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <span className="font-serif text-2xl font-semibold tracking-widest text-elora-dark uppercase">
                      ÉLORA
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-stone-500 hover:text-elora-dark transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search Input */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-3 bg-white border border-elora-taupe/40 text-xs text-elora-gray"
                  >
                    <span className="flex items-center space-x-2">
                      <Search className="w-3.5 h-3.5" />
                      <span>Search collection...</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-elora-brown">Search</span>
                  </button>
                </div>

                {/* Nav Accordions */}
                <div className="mt-6 space-y-3 text-sm uppercase tracking-wider font-medium text-stone-800">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 border-b border-stone-200/60"
                  >
                    Home
                  </Link>

                  {/* Women Accordion */}
                  <div className="border-b border-stone-200/60 pb-2">
                    <button
                      onClick={() => setMobileExpandedCat(mobileExpandedCat === 'women' ? null : 'women')}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <span>Women</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileExpandedCat === 'women' ? 'rotate-180 text-elora-brown' : ''
                        }`}
                      />
                    </button>
                    {mobileExpandedCat === 'women' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal font-normal text-stone-600"
                      >
                        <Link to="/shop?category=Dresses&gender=women" className="block py-1">Dresses</Link>
                        <Link to="/shop?category=Tops&gender=women" className="block py-1">Tops & Knits</Link>
                        <Link to="/shop?category=Shirts&gender=women" className="block py-1">Shirts & Blouses</Link>
                        <Link to="/shop?category=Co-ord Sets&gender=women" className="block py-1">Co-ord Sets</Link>
                        <Link to="/shop?category=Trousers&gender=women" className="block py-1">Trousers & Tailoring</Link>
                        <Link to="/shop?category=Jeans&gender=women" className="block py-1">Denim & Jeans</Link>
                        <Link to="/shop?category=Skirts&gender=women" className="block py-1">Skirts</Link>
                        <Link to="/shop?category=Outerwear&gender=women" className="block py-1">Coats & Outerwear</Link>
                        <Link to="/shop?gender=women" className="block py-1.5 font-semibold text-elora-brown">Shop All Women →</Link>
                      </motion.div>
                    )}
                  </div>

                  {/* Men Accordion */}
                  <div className="border-b border-stone-200/60 pb-2">
                    <button
                      onClick={() => setMobileExpandedCat(mobileExpandedCat === 'men' ? null : 'men')}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <span>Men</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileExpandedCat === 'men' ? 'rotate-180 text-elora-brown' : ''
                        }`}
                      />
                    </button>
                    {mobileExpandedCat === 'men' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal font-normal text-stone-600"
                      >
                        <Link to="/shop?category=Shirts&gender=men" className="block py-1">Shirts & Camp Collars</Link>
                        <Link to="/shop?category=T-shirts&gender=men" className="block py-1">T-Shirts & Polos</Link>
                        <Link to="/shop?category=Hoodies&gender=men" className="block py-1">Loopback Hoodies</Link>
                        <Link to="/shop?category=Trousers&gender=men" className="block py-1">Pleated Trousers</Link>
                        <Link to="/shop?category=Jeans&gender=men" className="block py-1">Selvedge Denim</Link>
                        <Link to="/shop?category=Jackets&gender=men" className="block py-1">Jackets & Coats</Link>
                        <Link to="/shop?category=Accessories&gender=men" className="block py-1">Belts & Accessories</Link>
                        <Link to="/shop?gender=men" className="block py-1.5 font-semibold text-elora-brown">Shop All Men →</Link>
                      </motion.div>
                    )}
                  </div>

                  <Link
                    to="/shop?filter=new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 border-b border-stone-200/60"
                  >
                    New Arrivals
                  </Link>
                  <Link
                    to="/shop?collection=Autumn Edit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 border-b border-stone-200/60"
                  >
                    Collections
                  </Link>
                  <Link
                    to="/shop?filter=sale"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-red-700 font-semibold"
                  >
                    Sale (Up to 40% Off)
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-6 border-t border-elora-taupe/30 space-y-3">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-xs uppercase tracking-wider text-elora-dark font-medium"
                >
                  <User className="w-4 h-4 text-elora-brown" />
                  <span>{user ? `Account: ${user.name}` : 'Sign In / Register'}</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider text-elora-dark font-medium"
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-elora-brown" />
                    <span>Wishlist</span>
                  </span>
                  <span className="text-stone-500 font-bold">{wishlist.length}</span>
                </Link>
                <div className="pt-3 text-[10px] text-elora-gray uppercase tracking-widest text-center">
                  Pakistan / PKR (Rs.)
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
