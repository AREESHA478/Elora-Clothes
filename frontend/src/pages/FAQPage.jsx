import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: "Shipping",
    question: "What are the shipping charges and delivery timelines across Pakistan?",
    answer: "ÉLORA offers complimentary express courier delivery on all orders over Rs. 5,000 nationwide. For orders below Rs. 5,000, a flat rate of Rs. 450 applies. Major metropolitan areas (Lahore, Karachi, Islamabad, Rawalpindi) typically receive their parcels within 2 to 3 business days. Regional zones are serviced within 3 to 5 business days."
  },
  {
    category: "Shipping",
    question: "Do you offer priority same-day or next-day delivery?",
    answer: "Yes, for Lahore and Karachi orders placed before 1:00 PM, VIP Priority Delivery can be requested at checkout (Rs. 950 surcharge) for dispatch with dedicated priority air courier."
  },
  {
    category: "Returns",
    question: "What is the ÉLORA return and exchange policy?",
    answer: "We offer a 14-day complimentary exchange window from the date of delivery. Garments must be unworn, unwashed, and returned in their original packaging with all security tags intact. Our courier will collect the exchange parcel directly from your doorstep."
  },
  {
    category: "Returns",
    question: "How do I initiate a size exchange?",
    answer: "Simply email our client concierge at concierge@elora.pk with your Order ID and desired size, or contact our WhatsApp concierge (+92 300 8472910). We will immediately reserve your replacement silhouette."
  },
  {
    category: "Orders",
    question: "Can I inspect the parcel before paying for Cash on Delivery?",
    answer: "In compliance with national courier regulations (TCS / Leopards), parcels must be signed and paid for before opening. If anything does not suit your preference upon inspection, our seamless doorstep return procedure ensures an immediate replacement or store credit."
  },
  {
    category: "Sizing",
    question: "How do I ensure I select the right size?",
    answer: "Every garment details page features our Interactive Size Guide containing exact garment specifications in both inches and centimeters. If your measurements fall between two sizes, we recommend sizing up for fluid drape, or sizing down for tailored structure."
  },
  {
    category: "Payments",
    question: "What payment methods are supported?",
    answer: "We accept Cash on Delivery (COD) across Pakistan, Direct Online Bank Transfers (via Raast / IBAN to our Meezan Bank account), and all major international Visa and Mastercard credit/debit cards."
  },
  {
    category: "Products",
    question: "How should I care for my silk and wool garments?",
    answer: "Natural fibres are inherently self-cleaning and breathable. We recommend gentle airing on cedar hangers after each wear. For 100% Mulberry silk and double-faced virgin wool coats, specialist dry cleaning or cold hand-washing with pH-neutral silk detergent is recommended."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIdx, setOpenIdx] = useState(0);
  const [search, setSearch] = useState('');

  const categories = ['All', 'Shipping', 'Returns', 'Orders', 'Sizing', 'Payments', 'Products'];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = search.trim() === '' ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-elora-bg min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Maison Knowledgebase</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xl mx-auto">
            Everything you need to know about our atelier craftsmanship, complimentary national delivery, and client care privileges.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, shipping, returns, silk..."
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-elora-taupe/40 focus:outline-none focus:border-elora-dark shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${
                activeCategory === c
                  ? 'bg-elora-dark text-white border-elora-dark shadow-sm'
                  : 'bg-white text-stone-700 border-elora-taupe/30 hover:border-elora-dark'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Expandable Accordion List */}
        <div className="bg-white border border-elora-taupe/30 divide-y divide-stone-100 shadow-elora-soft">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No answers found for "{search}". Please reach out to our concierge directly.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-stone-50/60 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-elora-dark pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-elora-brown shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 text-xs text-stone-600 leading-relaxed font-light"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center bg-elora-sand/60 border border-elora-taupe/40 p-8">
          <h3 className="font-serif text-xl font-medium text-elora-dark mb-2">
            Have a question not addressed here?
          </h3>
          <p className="text-xs text-stone-600 mb-6 font-light">
            Our atelier concierge is available 6 days a week to provide customized assistance.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
          >
            Speak with Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
