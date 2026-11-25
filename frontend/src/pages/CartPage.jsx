import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Gift, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartSubtotal, 
    shippingFee, 
    isFreeShipping, 
    freeShippingDifference, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    discountAmount, 
    cartTotal 
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const giftWrapFee = giftWrap ? 750 : 0;
  const finalTotal = cartTotal + giftWrapFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-elora-bg flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center bg-white border border-elora-taupe/30 p-10 sm:p-14 shadow-elora-soft">
          <ShoppingBag className="w-16 h-16 text-stone-300 stroke-[1.2] mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-light text-elora-dark mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed mb-8">
            You haven't curated any silhouettes into your shopping bag yet. Explore our latest arrivals or seasonal edits.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-sm"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-elora-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-elora-gray mb-6">
          <Link to="/" className="hover:text-elora-brown">Home</Link>
          <span>/</span>
          <span className="text-elora-dark font-semibold">Shopping Bag</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark mb-8">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white border border-elora-taupe/40 p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-elora-brown" />
            <span className="text-xs text-stone-700">
              {isFreeShipping ? (
                <strong className="text-emerald-700">Congratulations! You've unlocked Complimentary Express Courier Shipping.</strong>
              ) : (
                <>Add <strong className="text-elora-dark">Rs. {freeShippingDifference.toLocaleString()}</strong> more to your order to enjoy Free Express Shipping nationwide.</>
              )}
            </span>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-elora-brown hover:underline">
            Continue Shopping
          </Link>
        </div>

        {/* Layout: Table on left, Order Summary on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Table */}
          <div className="lg:col-span-8 bg-white border border-elora-taupe/30 overflow-hidden shadow-elora-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-elora-sand text-elora-dark uppercase tracking-widest font-semibold border-b border-elora-taupe/30">
                  <tr>
                    <th className="py-4 px-6">Silhouette</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Quantity</th>
                    <th className="py-4 px-4 text-right">Total</th>
                    <th className="py-4 px-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {cart.map((item) => (
                    <tr key={item.cartItemId} className="hover:bg-stone-50/60 transition-colors">
                      {/* Product Info */}
                      <td className="py-5 px-6">
                        <div className="flex space-x-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-18 h-24 sm:w-20 sm:h-28 object-cover object-top border border-stone-200 shrink-0"
                          />
                          <div className="flex flex-col justify-center">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-serif text-sm sm:text-base font-medium text-elora-dark hover:text-elora-brown"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-[11px] text-stone-500 mt-1">
                              Size: <strong className="text-elora-dark">{item.size}</strong> • Color: <strong className="text-elora-dark">{item.color}</strong>
                            </p>
                            <p className="text-[10px] text-elora-brown uppercase tracking-wider mt-1 font-medium">
                              {item.product.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-5 px-4 font-semibold text-elora-dark whitespace-nowrap">
                        Rs. {item.product.price.toLocaleString()}
                      </td>

                      {/* Quantity Controls */}
                      <td className="py-5 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center border border-stone-300 bg-white">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-100"
                          >
                            -
                          </button>
                          <span className="px-3.5 py-1 font-semibold text-elora-dark min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Line Item Total */}
                      <td className="py-5 px-4 text-right font-bold text-elora-dark whitespace-nowrap">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </td>

                      {/* Remove Button */}
                      <td className="py-5 px-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-red-600 p-2 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions inside table card */}
            <div className="p-6 bg-elora-bg/40 border-t border-elora-taupe/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={clearCart}
                className="text-xs uppercase tracking-wider text-stone-500 hover:text-red-700 transition-colors font-medium"
              >
                Clear Entire Bag
              </button>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="giftWrapCheck"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="accent-elora-brown cursor-pointer"
                />
                <label htmlFor="giftWrapCheck" className="text-xs text-stone-700 cursor-pointer flex items-center space-x-1.5">
                  <Gift className="w-3.5 h-3.5 text-elora-brown" />
                  <span>Add Luxury ÉLORA Gift Presentation Box & Ribbon (+ Rs. 750)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white border border-elora-taupe/30 p-6 sm:p-8 shadow-elora-soft space-y-6">
            <h2 className="font-serif text-2xl font-light text-elora-dark pb-4 border-b border-elora-taupe/30">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-elora-dark">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privé Privilege ({appliedPromo?.percent}%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              {giftWrap && (
                <div className="flex justify-between text-stone-700">
                  <span>Gift Box & Ribbon</span>
                  <span>+ Rs. {giftWrapFee.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Delivery</span>
                <span className="font-semibold text-elora-dark">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-elora-dark pt-3 border-t border-stone-200">
                <span>Grand Total (PKR)</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="pt-4 border-t border-elora-taupe/30">
              <p className="text-xs uppercase tracking-wider font-semibold text-elora-dark mb-2">
                Privilege / Promo Code
              </p>
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code (e.g. ELORA15)"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 uppercase font-mono focus:outline-none focus:border-elora-dark"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold hover:bg-elora-dark"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="mt-2 flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 border border-emerald-200">
                  <span>{appliedPromo.name}</span>
                  <button onClick={removePromoCode} className="underline text-[10px] text-stone-500 hover:text-black">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Order Note */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-elora-dark mb-1.5">
                Special Delivery Instructions (Optional)
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Gate code, custom gift message, or ring doorbell..."
                rows={2}
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark resize-none"
              />
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-elora-soft"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted Checkout • 100% Client Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
