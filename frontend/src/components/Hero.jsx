import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Fullstop-style Rounded Top Hero Container */}
      <div className="relative bg-[#fafafa] rounded-b-[32px] md:rounded-b-[42px] overflow-hidden md:h-[clamp(480px,46vw,620px)]">
        {/* Desktop Right-Aligned Hero Photography */}
        <motion.div
          initial={{ scale: 1.03, opacity: 0.92 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
          className="relative w-full aspect-[4/5] md:aspect-auto md:absolute md:top-0 md:right-0 md:bottom-0 md:w-[70%]"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
            alt="The ÉLORA Edit"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle fade on mobile bottom */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none" />
        </motion.div>

        {/* Hero Copy Block (Left on Desktop, Below Image on Mobile) */}
        <div className="relative z-10 max-w-[1220px] mx-auto px-5 sm:px-8 h-full flex items-end md:items-center">
          <div className="w-full md:w-[44%] md:max-w-[480px] py-6 pb-8 md:py-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-[#171717] mb-2 md:mb-3.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#171717] inline-block shrink-0" />
              <span>New Season Drop</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans text-[28px] sm:text-[42px] md:text-[clamp(42px,4.5vw,62px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#171717]"
            >
              The ÉLORA Edit
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-[12px] md:text-[14px] text-[#626262] leading-[1.4] mt-2 md:mt-4 mb-4 md:mb-6 max-w-sm"
            >
              Graphic layers &amp; clean silhouettes. Your point of view.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/collections/hoodies"
                className="inline-flex items-center justify-center gap-3 min-h-[44px] md:min-h-[48px] px-5 py-3 bg-[#171717] text-white text-[12px] font-bold rounded-[12px] hover:bg-[#333333] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Shop hoodies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] md:min-h-[48px] px-5 py-3 bg-white text-[#171717] border border-[#dedede] text-[12px] font-semibold rounded-[12px] hover:bg-[#f3f3f3] transition-all duration-200"
              >
                <span>Browse all</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
