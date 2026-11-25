import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-elora-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-elora-sand border border-elora-taupe/40 p-8 sm:p-12 lg:p-16">
          {/* Subtle Background Pattern/Image */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-30 lg:opacity-100 mix-blend-multiply pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
              alt="Sale Fashion"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-elora-dark text-white text-[10px] tracking-ultra uppercase font-bold mb-4">
              <Tag className="w-3 h-3 text-elora-taupe" />
              <span>Private Archive Clearance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-elora-dark leading-none mb-4">
              UP TO <span className="font-medium text-elora-brown">40% OFF</span>
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-stone-700 mb-4">
              "Your favorite styles, at a better price."
            </p>

            <p className="text-xs sm:text-sm text-stone-600 mb-8 max-w-md leading-relaxed">
              Curate an enduring wardrobe of organic linen blouses, tailored trousers, and silk slips. Limited quantities remaining per silhouette.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop?filter=sale"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-elora-soft group"
              >
                <span>Shop Sale</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <div className="text-xs text-stone-500 font-sans tracking-wide">
                Apply <span className="font-bold text-elora-dark bg-stone-200/80 px-2 py-1">AUTUMN20</span> for extra savings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
