import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_NAV } from '../data/products';

export default function Navbar() {
  const { 
    cartItemCount, 
    openCartDrawer, 
    openQuickView,
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
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'glass-header shadow-elora-soft border-b border-[#e8e8e8] py-3'
            : 'bg-white border-b border-[#e8e8e8] py-3.5'
        }`}
      >
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
          {/* Top Row: Menu Trigger (Left) | Brand Logo (Center) | Search, Account, Bag (Right) */}
          <div className="grid grid-cols-3 items-center">
            {/* Left: Menu Trigger (Desktop & Mobile) */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 py-1.5 pr-3 -ml-1 text-[#171717] hover:opacity-70 transition-opacity"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold tracking-tight">Menu</span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link to="/" className="inline-flex items-center gap-1 group">
                <span className="font-sans text-2xl font-extrabold tracking-[-0.05em] text-[#171717] uppercase">
                  ÉLORA<span className="text-[#171717]">.</span>
                </span>
              </Link>
            </div>

            {/* Right Action Icons (Search, Account, Bag — balanced spacing without Wishlist) */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-[#171717] hover:opacity-70 transition-opacity"
                title="Search Collections"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/account"
                className="p-1.5 text-[#171717] hover:opacity-70 transition-opacity relative"
                title={user ? `Signed in as ${user.name}` : "Client Account"}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#171717]" />
                )}
              </Link>

              <button
                onClick={openCartDrawer}
                className="p-1.5 text-[#171717] hover:opacity-70 transition-opacity relative"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#171717] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
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

      {/* ================= FULLSTOP-STYLE MENU MODAL POPUP ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white border border-[#e5e5e5] rounded-2xl shadow-2xl max-h-[86vh] flex flex-col justify-between overflow-hidden z-10"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#efefef]">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold">ÉLORA.</p>
                  <h2 className="text-lg font-bold text-[#171717] leading-tight">Menu</h2>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5] flex items-center justify-center text-[#171717] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Categories List */}
              <div className="p-6 overflow-y-auto space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-3.5 bg-[#f7f7f7] border border-[#e5e5e5] rounded-xl text-xs text-[#666666] hover:border-[#171717] transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Search className="w-3.5 h-3.5 text-[#171717]" />
                    <span>Search products...</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#171717]">Search</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#ececec] bg-white hover:bg-[#171717] hover:text-white hover:border-[#171717] text-xs font-semibold text-[#171717] transition-colors"
                  >
                    <span>Home</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  {CATEGORIES_NAV.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#ececec] bg-white hover:bg-[#171717] hover:text-white hover:border-[#171717] text-xs font-semibold text-[#171717] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#fafafa] border-t border-[#efefef] flex items-center justify-between">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-xs text-[#171717] font-semibold hover:underline"
                >
                  <User className="w-4 h-4" />
                  <span>{user ? `Account: ${user.name}` : 'Sign In / Account'}</span>
                </Link>
                <span className="text-[10px] text-[#666666] uppercase tracking-wider">
                  PKR (Rs.)
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
