import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  {
    text: "COMPLIMENTARY EXPRESS SHIPPING ON ALL ORDERS ABOVE RS. 5,000",
    linkText: "SHOP NOW",
    link: "/shop"
  },
  {
    text: "THE AUTUMN EDIT — TIMELESS TAILORING & SILK SILHOUETTES",
    linkText: "DISCOVER",
    link: "/shop?collection=Autumn Edit"
  },
  {
    text: "LIMITED TIME PRIVATE ARCHIVE: UP TO 40% OFF SELECTED PIECES",
    linkText: "EXPLORE SALE",
    link: "/shop?filter=sale"
  },
  {
    text: "WELCOME TO ÉLORA: ENJOY 15% OFF WITH CODE ELORA15 AT CHECKOUT",
    linkText: "APPLY CODE",
    link: "/shop"
  }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="relative bg-elora-dark text-white text-[11px] font-sans tracking-widest uppercase border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
          className="text-stone-400 hover:text-white p-1 transition-colors hidden sm:block"
          aria-label="Previous message"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Message Rotator with Motion */}
        <div className="flex-1 flex items-center justify-center overflow-hidden h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex items-center space-x-2 text-center truncate px-2"
            >
              <Sparkles className="w-3 h-3 text-elora-taupe shrink-0 hidden md:inline-block" />
              <span className="font-medium text-stone-200 truncate">{current.text}</span>
              <Link
                to={current.link}
                className="underline underline-offset-4 font-semibold text-elora-taupe hover:text-white transition-colors ml-1.5 shrink-0"
              >
                {current.linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next and Close */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            className="text-stone-400 hover:text-white p-1 transition-colors hidden sm:block"
            aria-label="Next message"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3 bg-white/20 hidden sm:block" />
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-400 hover:text-white p-1 transition-colors"
            title="Dismiss Announcement"
            aria-label="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
