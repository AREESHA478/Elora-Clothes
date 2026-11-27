import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

const CATEGORY_PILLS = [
  { label: 'T.Shirts', to: '/collections/t-shirts', thumb: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=120&q=75' },
  { label: 'Hoodies', to: '/collections/hoodies', thumb: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=120&q=75' },
  { label: 'Shirts', to: '/collections/shirts', thumb: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=120&q=75' },
  { label: 'Tank-Tops', to: '/collections/tank-tops', thumb: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=120&q=75' },
  { label: 'Trousers', to: '/collections/trousers', thumb: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=120&q=75' },
  { label: 'Shorts', to: '/collections/shorts', thumb: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=120&q=75' },
  { label: 'Cargo-Pants', to: '/collections/cargo-pants', thumb: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=120&q=75' },
  { label: 'End of Season Sale', to: '/collections/end-of-season-sale', thumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=120&q=75' },
];

const CATEGORY_CARDS = [
  {
    title: 'T.Shirts',
    subtitle: 'Oversized & essential tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85',
    to: '/collections/t-shirts',
  },
  {
    title: 'Hoodies',
    subtitle: 'Heavyweight fleece layers',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85',
    to: '/collections/hoodies',
  },
  {
    title: 'Shirts',
    subtitle: 'Crisp everyday cuts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
    to: '/collections/shirts',
  },
  {
    title: 'Tank-Tops',
    subtitle: 'Ribbed & relaxed fits',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85',
    to: '/collections/tank-tops',
  },
  {
    title: 'Trousers',
    subtitle: 'Tailored & relaxed drape',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85',
    to: '/collections/trousers',
  },
  {
    title: 'Shorts',
    subtitle: 'Fleece & chino shorts',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=85',
    to: '/collections/shorts',
  },
  {
    title: 'Cargo-Pants',
    subtitle: 'Utility & parachute cargos',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
    to: '/collections/cargo-pants',
  },
  {
    title: 'End of Season Sale',
    subtitle: 'Limited markdowns',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    to: '/collections/end-of-season-sale',
  },
];

export default function CategorySection() {
  const [activePill, setActivePill] = useState(0);

  return (
    <section className="relative z-10 -mt-7 bg-white rounded-t-[28px] md:rounded-t-[36px] pt-4 md:pt-5 pb-6">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8">

        {/* ── Category Pills Row (Fullstop fsb-collection-pills) ── */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {CATEGORY_PILLS.map((pill, idx) => (
            <Link
              key={pill.label}
              to={pill.to}
              onClick={() => setActivePill(idx)}
              className={`inline-flex items-center gap-2 shrink-0 min-h-[44px] pl-1.5 pr-3.5 py-1.5 rounded-[12px] border text-[12px] font-semibold whitespace-nowrap transition-colors ${activePill === idx
                ? 'bg-[#171717] text-white border-[#171717]'
                : 'bg-white text-[#171717] border-[#ececec] shadow-[0_2px_7px_rgba(0,0,0,0.03)] hover:bg-[#f4f4f4] hover:border-[#aaaaaa]'
                }`}
            >
              <img
                src={pill.thumb}
                alt={pill.label}
                className="w-7 h-7 rounded-full object-cover bg-[#f7f7f7] shrink-0"
              />
              <span>{pill.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Discovery Pill ── */}
        <div className="mt-3 mb-7 flex gap-2 pb-1">
          <Link
            to="/shop?filter=new"
            className="inline-flex items-center gap-2.5 min-h-[52px] px-4 py-2 border border-[#ececec] rounded-[12px] bg-white shadow-[0_2px_7px_rgba(0,0,0,0.03)] hover:bg-[#f7f7f7] transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-[#f7f7f7] flex items-center justify-center shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#171717]" />
            </span>
            <strong className="text-[12px] md:text-[13px] font-bold text-[#171717] whitespace-nowrap">
              New Drop
            </strong>
          </Link>
        </div>

        {/* ── Shop by Category Heading ── */}
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#171717]">
            Shop by category
          </h2>
          <Link
            to="/shop"
            className="text-[12px] font-semibold text-[#171717] hover:underline underline-offset-4 inline-flex items-center gap-1"
          >
            <span>Browse all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── 4-Column Category Grid (Fullstop fsb-collection-grid) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="group relative block aspect-[4/5] min-h-[160px] rounded-[22px] overflow-hidden bg-[#f3f3f3]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Floating White Bottom Pill */}
              <div className="absolute inset-x-2 bottom-2 md:inset-x-2.5 md:bottom-2.5 p-2.5 md:p-3 rounded-[14px] bg-white/95 text-[#171717] flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <strong className="block text-[14px] md:text-[16px] font-bold leading-tight tracking-[-0.025em] truncate">
                    {cat.title}
                  </strong>
                  <span className="block text-[10px] md:text-[11px] text-[#666666] truncate mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
                <span className="w-6 h-6 rounded-full border border-[#171717]/30 flex items-center justify-center shrink-0 group-hover:bg-[#171717] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
