import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/products';

export default function LookbookSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeLook = LOOKBOOK_ITEMS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LOOKBOOK_ITEMS.length);
  };

  return (
    <section className="py-20 lg:py-32 bg-elora-bg border-b border-elora-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-elora-brown" />
            <span>Volume IV — The Lookbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark mb-4">
            Curated Outfits & Styling
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            A visual journal of cohesive dressing, pairing structural tailoring with fluid silhouettes for effortless poise.
          </p>
        </div>

        {/* Magazine Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-elora-taupe/30 p-6 sm:p-10 lg:p-12 shadow-elora-soft">
          {/* Left Large Editorial Photography */}
          <div className="lg:col-span-7 relative aspect-[4/5] overflow-hidden bg-stone-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeLook.id}
                src={activeLook.image}
                alt={activeLook.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            {/* Look Selector Overlay Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md p-1.5 shadow-md">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-elora-dark hover:text-white transition-colors"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 font-medium">
                0{activeIndex + 1} / 0{LOOKBOOK_ITEMS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 hover:bg-elora-dark hover:text-white transition-colors"
                aria-label="Next look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Editorial Story & Outfit Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-4 lg:pl-6">
            <div>
              <p className="text-[11px] font-sans uppercase tracking-ultra text-elora-brown font-semibold mb-2">
                {activeLook.season}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-elora-dark mb-5">
                {activeLook.title}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-8">
                {activeLook.caption}
              </p>

              {/* Styling Tips */}
              <div className="border-t border-b border-elora-taupe/30 py-5 space-y-3 mb-8">
                <div className="text-xs uppercase tracking-widest font-semibold text-elora-dark">
                  Stylist's Note
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "Maintain monochromatic balance by anchoring soft alabaster silks with rich leather accessories. Keep jewelry minimal and architectural."
                </p>
              </div>
            </div>

            {/* Direct Shop Link */}
            <div>
              <Link
                to="/shop?collection=Autumn Edit"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-sm"
              >
                <span>Shop This Entire Look</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
