import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import NewArrivals from '../components/NewArrivals';
import CollectionBanner from '../components/CollectionBanner';
import BestSellers from '../components/BestSellers';
import PromoBanner from '../components/PromoBanner';
import LookbookSection from '../components/LookbookSection';
import { Scissors, Shield, RefreshCw, Feather } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Brand Pillars Strip */}
      <section className="bg-elora-sand/70 border-b border-elora-taupe/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-1">
              <Feather className="w-5 h-5 text-elora-brown mb-1" />
              <h4 className="text-xs uppercase tracking-wider font-semibold text-elora-dark">Natural Fibres</h4>
              <p className="text-[11px] text-stone-600">Pure Grade-6A Silk, French Flax & Cashmere</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Scissors className="w-5 h-5 text-elora-brown mb-1" />
              <h4 className="text-xs uppercase tracking-wider font-semibold text-elora-dark">Atelier Craft</h4>
              <p className="text-[11px] text-stone-600">Hand-finished seams & bespoke tailoring</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Shield className="w-5 h-5 text-elora-brown mb-1" />
              <h4 className="text-xs uppercase tracking-wider font-semibold text-elora-dark">Free Express Delivery</h4>
              <p className="text-[11px] text-stone-600">Across Pakistan on orders above Rs. 5,000</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RefreshCw className="w-5 h-5 text-elora-brown mb-1" />
              <h4 className="text-xs uppercase tracking-wider font-semibold text-elora-dark">14-Day Exchanges</h4>
              <p className="text-[11px] text-stone-600">Complimentary doorstep collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <CategorySection />

      {/* New Arrivals (8+ items) */}
      <NewArrivals />

      {/* The Seasonal Collection Campaign ("The Autumn Edit") */}
      <CollectionBanner />

      {/* Best Sellers (8+ items) */}
      <BestSellers />

      {/* Promotional Discount Banner ("UP TO 40% OFF") */}
      <PromoBanner />

      {/* Lookbook Section */}
      <LookbookSection />
    </div>
  );
}

