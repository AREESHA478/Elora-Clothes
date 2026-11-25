import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Feather, Compass, Sparkles, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-elora-bg min-h-screen">
      {/* Hero Editorial Header */}
      <section className="relative py-24 sm:py-36 bg-elora-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Atelier Campaign"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-[10px] tracking-ultra uppercase text-elora-taupe font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Maison Manifesto</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            A Quiet Revolution in <br />
            <span className="italic font-normal text-elora-taupe">Contemporary Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed"
          >
            Founded on the principle that true style does not clamor for attention. It resides in the effortless drape of raw silk, the crisp structure of Egyptian poplin, and the quiet assurance of precision tailoring.
          </motion.p>
        </div>
      </section>

      {/* Chapter 1: The Narrative */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/5] bg-stone-100 overflow-hidden border border-elora-taupe/30">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                alt="ÉLORA Atelier"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="lg:col-span-6 lg:pl-6 space-y-6">
              <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold block">
                Chapter I — The Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark leading-tight">
                Crafted for those who wear their individuality with grace.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                ÉLORA was conceived to bridge the divide between ephemeral runway trends and timeless heirloom fashion. In an age of disposable garments, we craft pieces engineered to become lifelong staples in your wardrobe.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Every pattern is drafted in our atelier with anatomical precision. From double-pleated trousers with hidden waist extenders to bias-cut satin slips that move seamlessly with your natural cadence, comfort and beauty are never held in opposition.
              </p>
              <div className="pt-4 border-t border-elora-taupe/30">
                <p className="font-serif italic text-lg text-elora-dark">
                  "Fashion passes; style remains indelible."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Pillars */}
      <section id="craft" className="py-20 lg:py-28 bg-white border-t border-b border-elora-taupe/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-ultra text-elora-brown font-semibold block mb-2">
              Our Foundations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-elora-dark">
              Atelier Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-elora-sand/50 border border-elora-taupe/40 text-center">
              <Feather className="w-8 h-8 text-elora-brown mx-auto mb-4" />
              <h3 className="font-serif text-xl font-medium text-elora-dark mb-2">Noble Natural Fibres</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                We select exclusively Grade-6A Mulberry silk, certified organic Supima cotton, European flax linen, and double-faced virgin wool for lasting tactile splendor.
              </p>
            </div>

            <div className="p-8 bg-elora-sand/50 border border-elora-taupe/40 text-center">
              <Compass className="w-8 h-8 text-elora-brown mx-auto mb-4" />
              <h3 className="font-serif text-xl font-medium text-elora-dark mb-2">Architectural Cut</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Clean lapels, knife-edge pleats, and unconstructed shoulders allow garments to drape effortlessly without stiff, restrictive padding.
              </p>
            </div>

            <div className="p-8 bg-elora-sand/50 border border-elora-taupe/40 text-center">
              <HeartHandshake className="w-8 h-8 text-elora-brown mx-auto mb-4" />
              <h3 className="font-serif text-xl font-medium text-elora-dark mb-2">Ethical Sourcing</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Our master patternmakers and artisans receive dignified wages, safe conditions, and complete creative ownership in small-batch capsule production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-elora-dark mb-4">
            Experience the ÉLORA Silhouette
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-8 font-light">
            Discover our newest arrivals, curated looks, and private archive collections.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-10 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-elora-soft"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
