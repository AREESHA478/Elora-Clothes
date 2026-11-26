import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const NAV_LINKS = {
  "Shop": [
    { label: "Women's Collection", to: "/shop?gender=women" },
    { label: "Men's Sartorial", to: "/shop?gender=men" },
    { label: "New Arrivals", to: "/shop?filter=new" },
    { label: "The Autumn Edit", to: "/shop?collection=Autumn Edit" },
    { label: "Best Sellers", to: "/shop?filter=bestseller" },
    { label: "Sale — Up to 40% Off", to: "/shop?filter=sale", accent: true },
  ],
  "Support": [
    { label: "Contact Us", to: "/contact" },
    { label: "FAQ", to: "/faq" },
    { label: "Size Guide", action: "sizeGuide" },
    { label: "Shipping Policy", to: "/faq#shipping" },
    { label: "Returns & Exchanges", to: "/faq#returns" },
    { label: "Track My Order", to: "/account" },
  ],
  "About": [
    { label: "Our Story", to: "/about" },
    { label: "Fabric & Sourcing", to: "/about#craft" },
    { label: "ÉLORA Membership", to: "/account" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#facebook",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const { openSizeGuide } = useShop();

  return (
    <footer className="bg-elora-dark text-elora-bg font-sans">


      {/* ── MIDDLE: Main Links Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5 group">
              <span className="font-serif text-3xl font-semibold tracking-widest text-white uppercase group-hover:text-elora-taupe transition-colors">
                ÉLORA
              </span>
              <span className="block text-[8px] tracking-[0.35em] text-elora-taupe/70 uppercase -mt-1 font-sans">
                Contemporary Haute Couture
              </span>
            </Link>

            <p className="text-xs text-elora-sand leading-relaxed mb-7 max-w-xs">
              A contemporary fashion label offering timeless, tailored silhouettes for those who cherish modern luxury.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 text-xs text-elora-sand mb-8">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-elora-bg shrink-0 mt-0.5" />
                <span>M.M. Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-elora-bg shrink-0" />
                <span>+92 (42) 3578-9000</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-elora-taupe/40 flex items-center justify-center text-elora-sand hover:border-elora-bg hover:text-elora-bg transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(NAV_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'sizeGuide' ? (
                      <button
                        onClick={openSizeGuide}
                        className="text-xs text-elora-sand hover:text-elora-bg transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.to}
                        className={`text-xs transition-colors hover:text-elora-bg ${link.accent ? 'text-elora-bg font-medium' : 'text-elora-sand'}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Copyright bar ── */}
      <div className="border-t border-elora-taupe/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-elora-sand/80">
            © {new Date().getFullYear()} ÉLORA Haute Couture. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-elora-sand/80">
            <span className="w-1.5 h-1.5 rounded-full bg-elora-taupe inline-block" />
            Cash on Delivery
            <span className="w-1.5 h-1.5 rounded-full bg-elora-taupe inline-block" />
            Bank Transfer
            <span className="w-1.5 h-1.5 rounded-full bg-elora-taupe inline-block" />
            Visa & Mastercard
          </div>
        </div>
      </div>

    </footer>
  );
}
