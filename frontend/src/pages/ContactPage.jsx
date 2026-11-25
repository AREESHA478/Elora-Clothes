import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ContactPage() {
  const { addToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Your inquiry has been relayed to our Client Concierge.', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="bg-elora-bg min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark mb-4">
            Get in Touch with ÉLORA
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Our atelier stylists and customer care advisors are at your service for bespoke sizing consultations, order inquiries, and private boutique appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white border border-elora-taupe/30 p-8 sm:p-12 shadow-elora-soft">
            <h2 className="font-serif text-2xl font-light text-elora-dark mb-6">
              Send an Inquiry
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-light text-emerald-950 mb-2">Message Dispatched</h3>
                <p className="text-xs text-emerald-800 font-light leading-relaxed mb-6">
                  Thank you for contacting ÉLORA. A client concierge advisor will respond to your email within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-elora-dark text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lady / Lord..."
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@domain.com"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Inquiry Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark cursor-pointer font-medium"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
                      <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                      <option value="Boutique Styling Appointment">Boutique Styling Appointment</option>
                      <option value="Press & Collaborations">Press & Collaborations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our atelier assist you today?"
                    required
                    className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-elora-soft"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Boutique Directory */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-white border border-elora-taupe/30 p-8 shadow-elora-soft space-y-5">
              <h3 className="font-serif text-xl font-medium text-elora-dark pb-3 border-b border-elora-taupe/20">
                Direct Communication
              </h3>
              <div className="space-y-4 text-xs text-stone-600 leading-relaxed font-light">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-elora-brown mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-elora-dark">Telephone Concierge</p>
                    <p>+92 (42) 3578-9000 / +92 300 8472910</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-elora-brown mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-elora-dark">Electronic Correspondence</p>
                    <p>concierge@elora.pk / vip@elora.pk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-elora-brown mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-elora-dark">Advisory Hours</p>
                    <p>Monday – Saturday: 10:00 AM – 9:00 PM PKT<br />Sunday: Closed for Atelier Archive Rest</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutiques */}
            <div id="locations" className="bg-white border border-elora-taupe/30 p-8 shadow-elora-soft space-y-5">
              <h3 className="font-serif text-xl font-medium text-elora-dark pb-3 border-b border-elora-taupe/20">
                Atelier Boutiques
              </h3>
              <div className="space-y-4 text-xs text-stone-600 font-light">
                <div>
                  <p className="font-bold text-elora-dark">Lahore Flagship</p>
                  <p>42 M.M. Alam Road, Gulberg III, Lahore</p>
                </div>
                <div>
                  <p className="font-bold text-elora-dark">Karachi Salon</p>
                  <p>Ocean Mall Retail Suite, Block 9, Clifton, Karachi</p>
                </div>
                <div>
                  <p className="font-bold text-elora-dark">Islamabad Atelier</p>
                  <p>Plot 14-B, College Road, Sector F-7/2, Islamabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
