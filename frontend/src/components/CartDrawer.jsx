import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { 
    isCartDrawerOpen, 
    closeCartDrawer, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal,
    freeShippingDifference,
    isFreeShipping,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    shippingFee,
    cartTotal 
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / 5000) * 100));

  return (
    <div className="fixed inset-0 z-[2000001] flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCartDrawer}
        className="fixed inset-0 bg-elora-dark/65 backdrop-blur-sm"
      />

      {/* Slide-over Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl z-10 border-l border-elora-taupe/40"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-elora-taupe/30 flex items-center justify-between bg-elora-bg">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-elora-dark" />
            <h2 className="font-serif text-xl font-medium text-elora-dark">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 text-stone-400 hover:text-elora-dark transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-stone-50 p-4 border-b border-stone-200/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center space-x-1.5 font-medium text-stone-700">
              <Truck className="w-4 h-4 text-elora-brown" />
              <span>
                {isFreeShipping ? (
                  <strong className="text-elora-dark">You qualify for Free Express Shipping!</strong>
                ) : (
                  <>Add <strong className="text-elora-dark">Rs. {freeShippingDifference.toLocaleString()}</strong> more for Free Shipping</>
                )}
              </span>
            </span>
            <span className="text-[11px] font-mono text-stone-500 font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFreeShipping ? 'bg-elora-dark' : 'bg-elora-brown'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <ShoppingBag className="w-12 h-12 text-stone-300 stroke-[1.5] mb-4" />
              <p className="font-serif text-2xl font-light text-elora-dark mb-2">
                Your Bag is Empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Explore our curated silhouettes and discover pieces tailored to timeless grace.
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/shop');
                }}
                className="px-6 py-3 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="py-4 flex space-x-4">
                {/* Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-18 h-24 object-cover object-top border border-stone-200 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCartDrawer}
                        className="font-serif text-sm font-medium text-elora-dark hover:text-elora-brown line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-1 space-x-2">
                      <span>Size: <strong className="text-elora-dark">{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-elora-dark">{item.color}</strong></span>
                    </div>

                    <div className="text-xs font-semibold text-elora-dark mt-1">
                      Rs. {item.product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Modifier */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center border border-stone-300">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-elora-taupe/30 bg-elora-bg/60 space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-elora-dark">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-elora-dark">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-elora-dark pt-2 border-t border-stone-300">
                <span>Estimated Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-elora-soft"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/cart"
                onClick={closeCartDrawer}
                className="block text-center text-xs uppercase tracking-wider text-stone-500 hover:text-elora-dark py-1 font-medium transition-colors"
              >
                View Full Bag Details
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
