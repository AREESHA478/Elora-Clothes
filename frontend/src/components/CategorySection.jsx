import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: "cat-women",
    title: "Women's Collection",
    subtitle: "Fluid silks, tailored power suits & outerwear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?gender=women",
    span: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    id: "cat-men",
    title: "Men's Sartorial",
    subtitle: "French linen, worsted wool & suede classics",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?gender=men",
    span: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "cat-dresses",
    title: "Evening & Day Dresses",
    subtitle: "Micro-pleats, bias draping & timeless forms",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?category=Dresses",
    span: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "cat-casual",
    title: "Casual Wear",
    subtitle: "Relaxed essentials, Supima jersey & loopback fleece",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?category=Shirts",
    span: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "cat-formal",
    title: "Formal Tailoring",
    subtitle: "Sharp lapels, side-adjuster trousers & blazers",
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?category=Co-ord Sets",
    span: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "cat-accessories",
    title: "Artisanal Accessories",
    subtitle: "Hand-rolled silk squares, calfskin leather & wraps",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    link: "/shop?category=Accessories",
    span: "col-span-1 md:col-span-2 lg:col-span-1"
  }
];

export default function CategorySection() {
  return (
    <section className="py-20 lg:py-28 bg-elora-bg border-b border-elora-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-ultra uppercase text-elora-brown font-semibold block mb-2">
              Curated Silhouettes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-elora-dark">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-elora-dark hover:text-elora-brown transition-colors group"
          >
            <span>Explore All Silhouettes</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative group overflow-hidden bg-stone-900 h-[360px] sm:h-[420px] ${cat.span}`}
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-elora-dark/90 via-elora-dark/30 to-transparent group-hover:from-elora-dark/95 transition-all duration-300" />

              {/* Text & Link Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] tracking-widest uppercase text-elora-taupe mb-1">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light mb-4">
                    {cat.title}
                  </h3>
                  
                  <Link
                    to={cat.link}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white/90 group-hover:text-elora-taupe transition-colors"
                  >
                    <span className="underline underline-offset-8">Shop Now</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
