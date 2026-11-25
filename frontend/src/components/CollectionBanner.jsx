import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CollectionBanner() {
  return (
    <section className="relative py-24 lg:py-36 bg-elora-dark text-white overflow-hidden">
      {/* Background Campaign Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
          alt="The Autumn Edit Collection"
          className="w-full h-full object-cover object-center opacity-40 brightness-90 filter"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-elora-dark via-elora-dark/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-ultra text-elora-taupe font-semibold mb-3"
          >
            Seasonal Atelier Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 leading-tight"
          >
            THE AUTUMN <br />
            <span className="italic font-normal text-elora-taupe">EDIT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-md"
          >
            An ode to textural harmony. Heavyweight virgin wool wrap coats, fluid sandwashed silk gowns, and tailored double-pleated trousers in earthy hues of mocha, bone, and charcoal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              to="/shop?collection=Autumn Edit"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-elora-taupe text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300 shadow-elora-soft group"
            >
              <span>Shop Collection</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/lookbook"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-stone-300 hover:text-white transition-colors underline underline-offset-8"
            >
              <span>View Editorial Lookbook</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
