import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-elora-bg flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="w-20 h-20 rounded-full bg-elora-brown/10 border-2 border-elora-brown flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-10 h-10 text-elora-brown" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-elora-brown font-semibold block mb-3">
            Order Confirmed
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-elora-dark mb-4 leading-tight">
            Thank You for<br />
            <span className="italic text-elora-brown">Your Order</span>
          </h1>
          <p className="text-stone-500 text-sm font-light leading-relaxed mb-2">
            Your order has been placed successfully. We'll send a confirmation to your email shortly.
          </p>
          {orderId && (
            <p className="text-xs text-stone-400 font-mono mt-3 mb-8">
              Order ID: <span className="text-elora-dark font-semibold">{orderId}</span>
            </p>
          )}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          <div className="bg-white border border-elora-taupe/40 p-5 rounded-2xl text-left">
            <Package className="w-5 h-5 text-elora-brown mb-3" />
            <p className="text-xs font-semibold text-elora-dark mb-1">Processing</p>
            <p className="text-[11px] text-stone-400 leading-relaxed">Your order is being prepared with care.</p>
          </div>
          <div className="bg-white border border-elora-taupe/40 p-5 rounded-2xl text-left">
            <ShoppingBag className="w-5 h-5 text-elora-brown mb-3" />
            <p className="text-xs font-semibold text-elora-dark mb-1">Delivery</p>
            <p className="text-[11px] text-stone-400 leading-relaxed">Expected within 3–5 working days.</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-elora-brown text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-accent transition-colors rounded-full"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-elora-dark/20 text-elora-dark text-xs uppercase tracking-widest font-semibold hover:bg-elora-dark hover:text-white transition-all rounded-full"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
