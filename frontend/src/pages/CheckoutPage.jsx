import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Building2, 
  Truck, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const PAKISTAN_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Abbottabad",
  "Hyderabad"
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    appliedPromo, 
    discountAmount, 
    cartTotal, 
    placeOrder,
    user 
  } = useShop();

  // Form states
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [firstName, setFirstName] = useState(user ? user.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(user ? user.name.split(' ').slice(1).join(' ') : '');
  const [address, setAddress] = useState(user?.addresses?.[0]?.address || '');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Lahore');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || '54000');
  
  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'card' | 'bank'
  
  // Mock card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-elora-bg flex items-center justify-center p-6">
        <div className="bg-white border border-elora-taupe/30 p-10 text-center max-w-md shadow-elora-soft">
          <p className="font-serif text-2xl font-light text-elora-dark mb-4">
            No items in bag to checkout
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
          >
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const finalPayable = cartTotal;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!email || !phone || !firstName || !lastName || !address || !city) {
      setErrorMessage('Please fill in all mandatory contact and shipping fields.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvc)) {
      setErrorMessage('Please complete the simulated card information.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderPayload = {
        customer: {
          fullName: `${firstName} ${lastName}`,
          email,
          phone
        },
        shippingAddress: `${address}${apartment ? ', ' + apartment : ''}, ${city}, Pakistan`,
        city,
        postalCode,
        shippingMethod: 'Standard Express Courier',
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'bank' ? 'Direct Bank Transfer' : 'Credit / Debit Card (Online)',
        totalPaid: finalPayable
      };

      const completedOrder = placeOrder(orderPayload);
      setIsSubmitting(false);
      navigate(`/order-confirmation/${completedOrder.id}`);
    }, 1000);
  };

  return (
    <div className="bg-elora-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-elora-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Checkout Multi-Step Form */}
          <div className="lg:col-span-7 bg-white border border-elora-taupe/30 p-6 sm:p-10 shadow-elora-soft">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-elora-dark mb-8 pb-4 border-b border-elora-taupe/30">
              Secure Checkout
            </h1>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Step 1: Contact Information */}
              <div>
                <h2 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-4 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-elora-dark text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Contact Information</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@example.com"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Phone Number (For Courier SMS Updates) *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="pt-6 border-t border-elora-taupe/30">
                <h2 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-4 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-elora-dark text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Shipping Address (Pakistan)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Ayesha"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Khan"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Street Address & House / Apartment *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House 18, Street 4, Block B"
                      required
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark cursor-pointer font-medium"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="54000"
                      className="w-full p-3 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="pt-6 border-t border-elora-taupe/30">
                <h2 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-4 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-elora-dark text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Payment Method</span>
                </h2>
                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start space-x-3 p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-elora-dark bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-elora-brown mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-elora-dark flex items-center space-x-1.5">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Cash on Delivery (COD)</span>
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Pay in cash upon doorstep delivery anywhere across Pakistan.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex items-start space-x-3 p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-elora-dark bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="accent-elora-brown mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-elora-dark flex items-center space-x-1.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>Direct Bank Transfer (Meezan / HBL / SCB)</span>
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Instant Raast ID / Online banking transfer. Account details displayed on order confirmation.
                      </p>
                    </div>
                  </label>

                  {/* Debit / Credit Card (UI mock) */}
                  <label
                    className={`flex items-start space-x-3 p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-elora-dark bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-elora-brown mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-elora-dark flex items-center space-x-1.5">
                        <CreditCard className="w-4 h-4 text-elora-brown" />
                        <span>Credit / Debit Card (Visa, Mastercard, PayPak)</span>
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5 mb-3">
                        Encrypted 256-bit SSL transaction simulator.
                      </p>

                      {paymentMethod === 'card' && (
                        <div className="space-y-3 pt-2 border-t border-stone-200">
                          <div>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                              className="w-full p-2.5 text-xs bg-white border border-stone-300 font-mono focus:outline-none focus:border-elora-dark"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM / YY"
                              className="p-2.5 text-xs bg-white border border-stone-300 font-mono focus:outline-none focus:border-elora-dark"
                            />
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="CVC / CVV"
                              className="p-2.5 text-xs bg-white border border-stone-300 font-mono focus:outline-none focus:border-elora-dark"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors flex items-center justify-center space-x-2 shadow-elora-soft disabled:opacity-60"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Order...' : `Complete Order — Rs. ${finalPayable.toLocaleString()}`}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Review */}
          <div className="lg:col-span-5 bg-white border border-elora-taupe/30 p-6 sm:p-8 shadow-elora-soft sticky top-28">
            <h2 className="font-serif text-2xl font-light text-elora-dark pb-4 border-b border-elora-taupe/30 mb-6">
              Review Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>

            {/* Item Mini Cards */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-18 object-cover object-top border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xs font-medium text-elora-dark truncate">{item.product.name}</p>
                    <p className="text-[10px] text-stone-500">Size: {item.size} • Color: {item.color}</p>
                    <p className="text-[11px] font-semibold text-elora-dark mt-1">
                      {item.quantity} × Rs. {item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="mt-6 pt-4 border-t border-elora-taupe/30 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-elora-dark">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Delivery</span>
                <span className="font-semibold text-elora-dark">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-elora-dark pt-3 border-t border-stone-300">
                <span>Total Amount</span>
                <span>Rs. {finalPayable.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-elora-sand/60 border border-elora-taupe/30 text-[11px] text-stone-600 space-y-1">
              <p className="font-semibold text-elora-dark">All orders are covered by the ÉLORA Quality Guarantee.</p>
              <p>Need assistance? Contact our client concierge at <strong>support@elora.pk</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
