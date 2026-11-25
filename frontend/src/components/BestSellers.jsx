import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

export default function BestSellers() {
  const { PRODUCTS } = useShop();

  // Filter products for best sellers
  const bestSellersList = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <section className="py-20 lg:py-28 bg-elora-bg border-b border-elora-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-elora-brown" />
              <span>Client Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-elora-dark">
              Best Sellers
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-elora-gray max-w-md">
            Our most sought-after silhouettes, revered for exceptional fabric integrity, refined proportions, and enduring appeal.
          </p>
        </div>

        {/* 8+ Product Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {bestSellersList.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Shop All Best Sellers Link */}
        <div className="mt-14 text-center">
          <Link
            to="/shop?filter=bestseller"
            className="inline-flex items-center space-x-2 px-10 py-4 bg-transparent border border-elora-dark text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-elora-dark hover:text-white transition-all duration-300"
          >
            <span>Explore All Icons</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
