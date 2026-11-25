import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-elora-bg min-h-[85vh] lg:min-h-[92vh] flex items-center">
      {/* Background Editorial Canvas */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full">
          {/* Left subtle textured tint */}
          <div className="hidden lg:block lg:col-span-5 bg-gradient-to-r from-elora-bg via-elora-sand/60 to-transparent z-10" />
          
          {/* Hero Photography with gentle Ken Burns motion */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full lg:col-span-12 absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
              alt="ÉLORA Autumn / Winter Campaign"
              className="w-full h-full object-cover object-top opacity-90 brightness-[0.96]"
            />
            {/* Elegant luxury gradient overlay for maximum readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-elora-bg via-elora-bg/30 to-elora-dark/20 lg:bg-gradient-to-r lg:from-elora-bg/95 lg:via-elora-bg/60 lg:to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Season Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-elora-dark/80 backdrop-blur-md text-elora-taupe border border-elora-taupe/30 text-[10px] tracking-ultra uppercase font-medium mb-6"
          >
            <Sparkles className="w-3 h-3 text-elora-taupe" />
            <span>Autumn / Winter 2026 Collection</span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-elora-dark leading-[1.08] mb-6"
          >
            Style That Speaks. <br />
            <span className="italic font-normal text-elora-brown">Confidence</span> That Lasts.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-stone-700 font-light max-w-lg mb-8 leading-relaxed"
          >
            A contemporary dialogue between fluid organic silks, architectural tailoring, and quiet modern luxury. Created for those who make elegance their statement.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/shop?gender=women"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-all duration-300 shadow-elora-card group"
            >
              <span>Shop Women</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/shop?gender=men"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/90 backdrop-blur-md text-elora-dark border border-elora-dark/20 text-xs uppercase tracking-widest font-semibold hover:bg-elora-dark hover:text-white transition-all duration-300 group"
            >
              <span>Shop Men</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Micro Brand Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-elora-taupe/40 grid grid-cols-3 gap-4 text-left"
          >
            <div>
              <p className="font-serif text-lg font-medium text-elora-dark">100%</p>
              <p className="text-[10px] uppercase tracking-wider text-elora-gray">Pure Silk & Flax</p>
            </div>
            <div>
              <p className="font-serif text-lg font-medium text-elora-dark">Free</p>
              <p className="text-[10px] uppercase tracking-wider text-elora-gray">Shipping Above Rs. 5K</p>
            </div>
            <div>
              <p className="font-serif text-lg font-medium text-elora-dark">14 Days</p>
              <p className="text-[10px] uppercase tracking-wider text-elora-gray">Bespoke Returns</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
