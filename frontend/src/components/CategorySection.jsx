import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategorySection() {
  return (
    <section className="py-20 lg:py-28 bg-elora-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-elora-brown font-semibold block mb-3">
              — Curated for you
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-elora-dark leading-none">
              Shop by <span className="italic text-elora-brown">Category</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-elora-dark/20 text-elora-dark hover:border-elora-brown hover:text-elora-brown text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-full self-start sm:self-auto"
          >
            View All
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* ════ BENTO GRID ════ */}

        {/* Row 1: Big Women card + stacked Men & Dresses */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">

          {/* Women's — BIG featured card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <Link to="/shop?gender=women" className="group relative block overflow-hidden h-[480px] sm:h-[560px] bg-elora-sand">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
                alt="Women's Collection"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-elora-dark/80 via-elora-dark/25 to-elora-dark/10" />
              {/* Blush color wash on hover */}
              <div className="absolute inset-0 bg-elora-brown/0 group-hover:bg-elora-brown/25 transition-all duration-700" />

              {/* Giant background number */}
              <div className="absolute top-4 right-6 font-serif text-[130px] leading-none text-white/5 group-hover:text-white/0 transition-opacity duration-500 select-none pointer-events-none">
                01
              </div>

              {/* Top badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-block px-3 py-1 bg-elora-brown text-white text-[9px] uppercase tracking-[0.25em] font-bold rounded-full">
                  Featured
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-elora-taupe text-[10px] uppercase tracking-[0.25em] font-medium mb-3 opacity-80">
                  Fluid silks · Tailored suits · Outerwear
                </p>
                <h3 className="font-serif text-4xl sm:text-5xl font-light text-white mb-6 leading-tight">
                  Women's<br />
                  <span className="italic text-elora-taupe">Collection</span>
                </h3>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-elora-dark text-[10px] uppercase tracking-widest font-bold rounded-full group-hover:bg-elora-brown group-hover:text-white transition-all duration-300">
                    Shop Now
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right stack: Men + Dresses */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Men's */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="flex-1"
            >
              <Link to="/shop?gender=men" className="group relative block overflow-hidden h-[270px] sm:h-[270px] bg-elora-sand">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85"
                  alt="Men's Collection"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elora-dark/80 via-elora-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-elora-brown/0 group-hover:bg-elora-brown/20 transition-all duration-700" />
                <div className="absolute top-4 right-5 font-serif text-[72px] leading-none text-white/5 select-none pointer-events-none">02</div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-elora-taupe text-[9px] uppercase tracking-widest mb-1.5">Linen · Wool · Suede</p>
                  <h3 className="font-serif text-2xl font-light text-white mb-4">Men's <span className="italic">Sartorial</span></h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white border-b border-white/20 group-hover:border-white pb-0.5 transition-all">
                    Explore <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Dresses */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="flex-1"
            >
              <Link to="/shop?category=Dresses" className="group relative block overflow-hidden h-[270px] sm:h-[270px] bg-elora-sand">
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"
                  alt="Dresses"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elora-dark/80 via-elora-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-elora-brown/0 group-hover:bg-elora-brown/20 transition-all duration-700" />
                <div className="absolute top-4 right-5 font-serif text-[72px] leading-none text-white/5 select-none pointer-events-none">03</div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-elora-taupe text-[9px] uppercase tracking-widest mb-1.5">Bias draping · Timeless forms</p>
                  <h3 className="font-serif text-2xl font-light text-white mb-4">Evening <span className="italic">Dresses</span></h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white border-b border-white/20 group-hover:border-white pb-0.5 transition-all">
                    Explore <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Row 2: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              num: '04', title: 'Casual Wear', italic: 'Wear',
              subtitle: 'Supima jersey · Loopback fleece',
              image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
              link: '/shop?category=Shirts',
            },
            {
              num: '05', title: 'Formal Tailoring', italic: 'Tailoring',
              subtitle: 'Sharp blazers · Side-adjuster trousers',
              image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=85',
              link: '/shop?category=Co-ord Sets',
            },
            {
              num: '06', title: 'Accessories', italic: 'Accessories',
              subtitle: 'Silk scarves · Calfskin leather',
              image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
              link: '/shop?category=Accessories',
            },
          ].map((cat, i) => (
            <motion.div
              key={cat.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={cat.link} className="group relative block overflow-hidden h-[280px] bg-elora-sand">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elora-dark/80 via-elora-dark/25 to-transparent" />
                <div className="absolute inset-0 bg-elora-brown/0 group-hover:bg-elora-brown/20 transition-all duration-700" />
                <div className="absolute top-4 right-5 font-serif text-[72px] leading-none text-white/5 select-none pointer-events-none">{cat.num}</div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-elora-taupe text-[9px] uppercase tracking-widest mb-1.5">{cat.subtitle}</p>
                  <h3 className="font-serif text-xl font-light text-white mb-4">{cat.title.replace(cat.italic, '')} <span className="italic">{cat.italic}</span></h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white border-b border-white/20 group-hover:border-white pb-0.5 transition-all">
                    Shop <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
