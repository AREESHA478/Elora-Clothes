import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const FOOTER_LINKS = {
  "Support": [
    { label: "Contact Information", to: "/contact" },
    { label: "Shipping Policy", to: "/faq#shipping" },
    { label: "Return & Exchange Policy", to: "/faq#returns" },
    { label: "Size Guide", action: "sizeGuide" },
    { label: "Track Your Order", to: "/account" },
  ],
  "Info": [
    { label: "T.Shirts", to: "/collections/t-shirts" },
    { label: "Hoodies", to: "/collections/hoodies" },
    { label: "Cargo-Pants", to: "/collections/cargo-pants" },
    { label: "End of Season Sale", to: "/collections/end-of-season-sale" },
    { label: "About Us", to: "/about" },
  ],
};

const SOCIALS = [
  {
    label: "Facebook",
    href: "#facebook",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#instagram",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const { openSizeGuide } = useShop();

  return (
    <footer className="bg-white text-[#171717] border-t border-[#e5e5e5] font-sans mt-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Menu Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="font-cursive text-2xl text-[#171717] mb-3">
                {heading}
              </h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'sizeGuide' ? (
                      <button
                        onClick={openSizeGuide}
                        className="text-[13px] text-[#171717]/75 hover:text-[#171717] hover:underline underline-offset-4 transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-[13px] text-[#171717]/75 hover:text-[#171717] hover:underline underline-offset-4 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand & Socials */}
          <div className="col-span-2 flex flex-col md:items-end justify-between gap-4">
            <div className="md:text-right">
              <Link to="/" className="inline-block">
                <span className="font-sans text-2xl font-extrabold tracking-[-0.05em] text-[#171717] uppercase">
                  ÉLORA.
                </span>
              </Link>
              <p className="text-xs text-[#666666] mt-2 max-w-xs md:ml-auto leading-relaxed">
                M.M. Alam Road, Gulberg III, Lahore · +92 (42) 3578-9000
              </p>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#dedede] flex items-center justify-center text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#666666]">
          <p>© {new Date().getFullYear()} ÉLORA CLOTHING. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Bank Transfer</span>
            <span>·</span>
            <span>Visa &amp; Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
