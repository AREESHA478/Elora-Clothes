import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const { PRODUCTS } = useShop();
  const [filterGender, setFilterGender] = useState('all');

  // Filter products for new arrivals
  const newArrivalsList = PRODUCTS.filter((p) => p.isNewArrival);

  const displayedProducts = filterGender === 'all'
    ? newArrivalsList
    : newArrivalsList.filter((p) => p.gender === filterGender);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-elora-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-elora-brown" />
              <span>Fresh Off The Runway</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-elora-dark">
              New Arrivals
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-6 mt-6 md:mt-0 text-xs uppercase tracking-widest font-medium border-b border-elora-taupe/30 pb-2">
            <button
              onClick={() => setFilterGender('all')}
              className={`transition-colors relative py-1 ${
                filterGender === 'all'
                  ? 'text-elora-dark font-bold after:content-[\'\'] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[2px] after:bg-elora-dark'
                  : 'text-stone-400 hover:text-elora-dark'
              }`}
            >
              All Pieces ({newArrivalsList.length})
            </button>
            <button
              onClick={() => setFilterGender('women')}
              className={`transition-colors relative py-1 ${
                filterGender === 'women'
                  ? 'text-elora-dark font-bold after:content-[\'\'] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[2px] after:bg-elora-dark'
                  : 'text-stone-400 hover:text-elora-dark'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setFilterGender('men')}
              className={`transition-colors relative py-1 ${
                filterGender === 'men'
                  ? 'text-elora-dark font-bold after:content-[\'\'] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[2px] after:bg-elora-dark'
                  : 'text-stone-400 hover:text-elora-dark'
              }`}
            >
              Men
            </button>
          </div>
        </div>

        {/* 8+ Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {displayedProducts.slice(0, 8).map((product, index) => (
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

        {/* Explore All CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop?filter=new"
            className="inline-flex items-center space-x-2 px-10 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-elora-soft"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
