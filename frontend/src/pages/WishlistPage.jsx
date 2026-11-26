import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, PRODUCTS, addToCart, toggleWishlist } = useShop();

  // Find products that match wishlist IDs
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-elora-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-elora-gray mb-6">
          <Link to="/" className="hover:text-elora-brown">Home</Link>
          <span>/</span>
          <span className="text-elora-dark font-semibold">Wishlist</span>
        </nav>

        {/* Page Title & Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-elora-taupe/30">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-1">
              <span>Personal Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark">
              My Saved Wishlist
            </h1>
          </div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium mt-2 sm:mt-0">
            {wishlistProducts.length} Saved {wishlistProducts.length === 1 ? 'Silhouette' : 'Silhouettes'}
          </span>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="bg-white border border-elora-taupe/30 p-12 sm:p-16 text-center max-w-lg mx-auto shadow-elora-soft">
            <Heart className="w-14 h-14 text-stone-300 stroke-[1.2] mx-auto mb-4" />
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-elora-dark mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed mb-8">
              Save your cherished silhouettes, seasonal gowns, and tailored coats as you explore our collections.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-sm"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

