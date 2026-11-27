import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  {
    text: "FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE RS. 5,000",
    linkText: "EXPLORE",
    link: "/shop"
  },
  {
    text: "THE ÉLORA EDIT — NEW GRAPHIC LAYERS & ESSENTIALS LIVE",
    linkText: "VIEW DROP",
    link: "/shop?filter=new"
  }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="relative bg-[#111111] text-white text-[11px] font-sans tracking-wide z-50">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8 h-9 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
          className="text-neutral-400 hover:text-white p-1 transition-colors hidden sm:block"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 flex items-center justify-center overflow-hidden h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center space-x-2 text-center truncate px-2"
            >
              <Link
                to={current.link}
                className="font-semibold text-white hover:underline underline-offset-4 truncate"
              >
                {current.text}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            className="text-neutral-400 hover:text-white p-1 transition-colors hidden sm:block"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-400 hover:text-white p-1 transition-colors"
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
