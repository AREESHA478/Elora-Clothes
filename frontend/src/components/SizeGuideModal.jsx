import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useShop();
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [activeTab, setActiveTab] = useState('women'); // 'women' | 'men'

  if (!isSizeGuideOpen) return null;

  const womenDataInches = [
    { size: 'XS',  uk: '6',      bust: '31 - 32', waist: '24 - 25', hip: '34 - 35' },
    { size: 'S',   uk: '8',      bust: '33 - 34', waist: '26 - 27', hip: '36 - 37' },
    { size: 'M',   uk: '10-12',  bust: '35 - 36', waist: '28 - 29', hip: '38 - 39' },
    { size: 'L',   uk: '14',     bust: '37 - 39', waist: '30 - 32', hip: '40 - 42' },
    { size: 'XL',  uk: '16',     bust: '40 - 42', waist: '33 - 35', hip: '43 - 45' },
    { size: 'XXL', uk: '18',     bust: '43 - 45', waist: '36 - 38', hip: '46 - 48' },
  ];

  const womenDataCm = [
    { size: 'XS',  uk: '6',      bust: '79 - 82',   waist: '61 - 64',  hip: '86 - 89'   },
    { size: 'S',   uk: '8',      bust: '84 - 87',   waist: '66 - 69',  hip: '91 - 94'   },
    { size: 'M',   uk: '10-12',  bust: '89 - 92',   waist: '71 - 74',  hip: '96 - 99'   },
    { size: 'L',   uk: '14',     bust: '94 - 99',   waist: '76 - 81',  hip: '101 - 107' },
    { size: 'XL',  uk: '16',     bust: '102 - 107', waist: '84 - 89',  hip: '109 - 114' },
    { size: 'XXL', uk: '18',     bust: '109 - 114', waist: '91 - 97',  hip: '117 - 122' },
  ];

  const menDataInches = [
    { size: 'S',   chest: '36 - 38', waist: '30 - 31', neck: '14.5 - 15',  sleeve: '32' },
    { size: 'M',   chest: '39 - 41', waist: '32 - 33', neck: '15.5 - 16',  sleeve: '33' },
    { size: 'L',   chest: '42 - 44', waist: '34 - 36', neck: '16.5 - 17',  sleeve: '34' },
    { size: 'XL',  chest: '45 - 47', waist: '37 - 39', neck: '17.5 - 18',  sleeve: '35' },
    { size: 'XXL', chest: '48 - 50', waist: '40 - 42', neck: '18.5 - 19',  sleeve: '36' },
  ];

  const menDataCm = [
    { size: 'S',   chest: '91 - 96',   waist: '76 - 79',   neck: '37 - 38', sleeve: '81' },
    { size: 'M',   chest: '99 - 104',  waist: '81 - 84',   neck: '39 - 41', sleeve: '84' },
    { size: 'L',   chest: '107 - 112', waist: '86 - 91',   neck: '42 - 43', sleeve: '86' },
    { size: 'XL',  chest: '114 - 119', waist: '94 - 99',   neck: '44 - 46', sleeve: '89' },
    { size: 'XXL', chest: '122 - 127', waist: '101 - 107', neck: '47 - 48', sleeve: '91' },
  ];

  const currentWomenData = unit === 'inches' ? womenDataInches : womenDataCm;
  const currentMenData = unit === 'inches' ? menDataInches : menDataCm;

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSizeGuide}
        className="fixed inset-0 bg-elora-dark/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-elora-taupe/40 shadow-2xl p-6 sm:p-8 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-elora-taupe/30">
          <div className="flex items-center space-x-2.5">
            <Ruler className="w-5 h-5 text-elora-brown" />
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-elora-dark">
                Size Guide
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-elora-gray">
                Find your perfect fit
              </p>
            </div>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1.5 text-stone-400 hover:text-elora-dark transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab & Unit Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-6">
          {/* Gender Tab */}
          <div className="flex space-x-2 bg-stone-100 p-1 border border-stone-200">
            <button
              onClick={() => setActiveTab('women')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'women'
                  ? 'bg-elora-dark text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'men'
                  ? 'bg-elora-dark text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Men
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center space-x-2 text-xs text-stone-600">
            <span className="font-medium text-stone-500">Unit:</span>
            <div className="inline-flex border border-stone-300">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 font-semibold transition-colors ${
                  unit === 'inches' ? 'bg-elora-taupe text-elora-dark' : 'bg-white text-stone-600'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-semibold transition-colors ${
                  unit === 'cm' ? 'bg-elora-taupe text-elora-dark' : 'bg-white text-stone-600'
                }`}
              >
                Centimetres (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Measurement Tables */}
        <div className="overflow-x-auto border border-elora-taupe/30 mb-8">
          {activeTab === 'women' ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-elora-sand text-elora-dark uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Size</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Chest</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Waist</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {currentWomenData.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50">
                    <td className="py-3 px-4 font-bold text-elora-dark">{row.size}</td>
                    <td className="py-3 px-4 text-stone-700">{row.bust}</td>
                    <td className="py-3 px-4 text-stone-700">{row.waist}</td>
                    <td className="py-3 px-4 text-stone-700">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-elora-sand text-elora-dark uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Size</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Chest</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Waist</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Neck</th>
                  <th className="py-3 px-4 border-b border-elora-taupe/30">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {currentMenData.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50">
                    <td className="py-3 px-4 font-bold text-elora-dark">{row.size}</td>
                    <td className="py-3 px-4 text-stone-700">{row.chest}</td>
                    <td className="py-3 px-4 text-stone-700">{row.waist}</td>
                    <td className="py-3 px-4 text-stone-600">{row.neck}</td>
                    <td className="py-3 px-4 text-stone-600">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* How to Measure Instructions */}
        <div className="bg-elora-sand/60 p-5 border border-elora-taupe/30">
          <h3 className="font-serif text-lg font-medium text-elora-dark mb-3">
            How to Measure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 leading-relaxed">
            <div>
              <p className="font-semibold text-elora-dark mb-1">1. Bust / Chest</p>
              <p>Measure around the fullest part of your chest, keeping the tape straight.</p>
            </div>
            <div>
              <p className="font-semibold text-elora-dark mb-1">2. Waist</p>
              <p>Measure around the narrowest part of your waist, usually above the belly button.</p>
            </div>
            <div>
              <p className="font-semibold text-elora-dark mb-1">3. Hips</p>
              <p>Stand with feet together and measure around the fullest part of your hips.</p>
            </div>
            <div>
              <p className="font-semibold text-elora-dark mb-1">4. Not sure about your size?</p>
              <p>If you're between two sizes, go a size up for a relaxed fit or size down for a fitted look.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-6 py-2.5 bg-elora-brown text-white text-xs uppercase tracking-wider font-semibold hover:bg-elora-accent transition-colors rounded-full"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
