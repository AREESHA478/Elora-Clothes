import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Sparkles,
  Globe
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { openSizeGuide, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addToast('Thank you for subscribing to ÉLORA Newsletter.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-elora-dark text-stone-300 font-sans border-t border-elora-taupe/20">
      {/* Top Newsletter & Atelier Invitation Bar */}
      <div className="border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-ultra uppercase text-elora-taupe font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The ÉLORA Gazette</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Join our private client list for exclusive capsule drops and seasonal previews.
              </h3>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-white/5 border border-emerald-500/30 p-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-medium">
                    You have been enrolled. Check your inbox for your 15% welcome privilege.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/20 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-elora-taupe"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-elora-taupe text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Bio */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-3xl font-semibold tracking-widest text-white uppercase">
                ÉLORA
              </span>
              <span className="block text-[8px] tracking-[0.35em] text-elora-taupe uppercase -mt-1 font-sans">
                CONTEMPORARY HAUTE COUTURE
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm mb-6">
              A contemporary fashion label offering timeless, tailored silhouettes and trendy clothing for discerning individuals who cherish modern luxury.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400 font-light">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-elora-taupe shrink-0" />
                <span>Flagship: M.M. Alam Road, Gulberg III, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-elora-taupe shrink-0" />
                <span>Concierge: +92 (42) 3578-9000</span>
              </p>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><Link to="/shop?gender=women" className="hover:text-white transition-colors">Women's Atelier</Link></li>
              <li><Link to="/shop?gender=men" className="hover:text-white transition-colors">Men's Sartorial</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?collection=Autumn Edit" className="hover:text-white transition-colors">The Autumn Edit</Link></li>
              <li><Link to="/shop?filter=bestseller" className="hover:text-white transition-colors">Iconic Best Sellers</Link></li>
              <li><Link to="/shop?filter=sale" className="text-elora-taupe hover:text-white transition-colors">Archive Sale (Up to 40%)</Link></li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">
              Client Support
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Client Concierge</Link></li>
              <li><button onClick={openSizeGuide} className="hover:text-white transition-colors text-left">Interactive Size Guide</button></li>
              <li><Link to="/faq#shipping" className="hover:text-white transition-colors">Complimentary Shipping Policy</Link></li>
              <li><Link to="/faq#returns" className="hover:text-white transition-colors">14-Day Returns & Exchanges</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Order Tracking & History</Link></li>
            </ul>
          </div>

          {/* The Label */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Atelier Story</Link></li>
              <li><Link to="/about#craft" className="hover:text-white transition-colors">Fabric Integrity & Sourcing</Link></li>
              <li><Link to="/contact#locations" className="hover:text-white transition-colors">Boutique Locations</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">ÉLORA Membership</Link></li>
            </ul>

            <div className="mt-6">
              <h5 className="text-[10px] uppercase tracking-wider text-elora-taupe font-semibold mb-3">
                Follow The Maison
              </h5>
              <div className="flex items-center space-x-3 text-stone-400">
                <a href="#instagram" className="hover:text-white transition-colors p-1" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#facebook" className="hover:text-white transition-colors p-1" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#pinterest" className="hover:text-white transition-colors p-1" aria-label="Pinterest">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.241-.19.291-.441.175-1.656-.77-2.69-3.189-2.69-5.132 0-4.179 3.037-8.019 8.761-8.019 4.601 0 8.177 3.279 8.177 7.662 0 4.574-2.883 8.254-6.884 8.254-1.344 0-2.608-.699-3.041-1.526l-.827 3.155c-.299 1.144-1.109 2.578-1.652 3.457 1.258.388 2.597.599 3.985.599 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-400 font-light">
          <div>
            © {new Date().getFullYear()} ÉLORA Haute Couture. All International Rights Reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-stone-300">Supported: Cash on Delivery • Bank Transfer • Visa • Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
