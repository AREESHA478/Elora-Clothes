import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function NewArrivals() {
  const { PRODUCTS, openQuickView } = useShop();
  const lineup = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 5);

  return (
    <section className="bg-white py-5 md:py-7">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
        {/* Heading (Fullstop fsb-lineup__heading) */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#666666] mb-0.5">
              ÉLORA
            </p>
            <h2 className="font-sans text-[18px] md:text-[20px] font-bold tracking-[-0.025em] text-[#171717]">
              New Arrivals lineup
            </h2>
          </div>

          <Link
            to="/shop?filter=new"
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 border border-[#dedede] rounded-full text-[11px] font-semibold text-[#171717] hover:bg-[#f5f5f5] transition-colors shrink-0"
          >
            <span>Explore new</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Column Compact Lineup Grid (Fullstop fsb-lineup__grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 md:gap-3">
          {lineup.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => openQuickView(product)}
              className="group flex flex-col items-center text-center min-w-0 p-1.5 rounded-[10px] hover:bg-[#fafafa] transition-colors cursor-pointer"
            >
              <div className="w-full aspect-[2/3] max-h-[240px] rounded-[10px] overflow-hidden bg-[#f7f7f7] mb-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] md:text-[12px] font-semibold text-[#171717] leading-[1.3] line-clamp-2 min-h-[2.6em] group-hover:underline underline-offset-2">
                {product.name}
              </span>
              <span className="text-[11px] md:text-[12px] font-bold text-[#171717] mt-0.5 tabular-nums">
                Rs.{product.price.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
