import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Download, 
  Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useShop();

  // Find placed order or fallback
  const order = orders.find((o) => o.id === orderId) || orders[0] || {
    id: orderId || "ELR-92837",
    date: new Date().toLocaleDateString('en-GB'),
    status: "Confirmed",
    customer: { fullName: "Valued Client", email: "client@elora.pk" },
    shippingAddress: "House 18, Block B, Gulberg III, Lahore, Pakistan",
    paymentMethod: "Cash on Delivery",
    items: [],
    total: 18950
  };

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B6B4E', '#D8C9B8', '#1D1D1D', '#C4A67B']
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-elora-bg min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-elora-taupe/40 p-8 sm:p-12 shadow-elora-card text-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-ultra uppercase text-elora-brown font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Successfully Placed</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-elora-dark mb-3">
            Thank You For Your Order
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md mx-auto mb-6 leading-relaxed">
            Your haute couture pieces have been reserved in our Lahore atelier. We have dispatched a confirmation summary to{' '}
            <strong className="text-elora-dark">{order.customer?.email || 'your email'}</strong>.
          </p>

          <div className="inline-block bg-elora-sand/70 border border-elora-taupe/40 px-6 py-3 font-mono text-sm font-semibold text-elora-dark tracking-wider">
            Order Reference: {order.id}
          </div>
        </motion.div>

        {/* Order Details & Summary Card */}
        <div className="bg-white border border-elora-taupe/30 p-6 sm:p-8 shadow-elora-soft space-y-8">
          {/* Status & Delivery Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-elora-taupe/30 text-xs">
            <div>
              <p className="text-stone-400 uppercase tracking-wider text-[10px] mb-1">Order Date</p>
              <p className="font-semibold text-elora-dark flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-elora-brown" />
                <span>{order.date}</span>
              </p>
            </div>
            <div>
              <p className="text-stone-400 uppercase tracking-wider text-[10px] mb-1">Estimated Delivery</p>
              <p className="font-semibold text-elora-dark flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-elora-brown" />
                <span>2-4 Business Days</span>
              </p>
            </div>
            <div>
              <p className="text-stone-400 uppercase tracking-wider text-[10px] mb-1">Payment Method</p>
              <p className="font-semibold text-elora-dark">
                {order.paymentMethod || 'Cash on Delivery'}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-2 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-elora-brown" />
              <span>Delivery Destination</span>
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong>{order.customer?.fullName}</strong><br />
              {order.shippingAddress}
            </p>
          </div>

          {/* Bank Transfer Details Box if applicable */}
          {order.paymentMethod?.includes('Bank') && (
            <div className="p-4 bg-elora-sand/80 border border-elora-taupe/50 text-xs text-stone-700 space-y-2">
              <p className="font-bold text-elora-dark uppercase tracking-wider text-[11px]">
                Direct Bank Transfer Instructions:
              </p>
              <p>Please transfer the total sum to our official Maison account:</p>
              <div className="font-mono bg-white p-3 border border-stone-300 space-y-1">
                <p><strong>Bank:</strong> Meezan Bank Limited (Pakistan)</p>
                <p><strong>Account Title:</strong> ÉLORA HAUTE COUTURE (PVT) LTD</p>
                <p><strong>IBAN:</strong> PK72MEZN0001000987654321</p>
                <p><strong>Raast ID:</strong> 03001234567</p>
              </div>
              <p className="text-[11px] text-stone-500 italic">
                * Please include Order Reference #{order.id} in payment reference.
              </p>
            </div>
          )}

          {/* Ordered Items List */}
          <div>
            <h3 className="text-xs uppercase tracking-ultra font-semibold text-elora-dark mb-4">
              Silhouettes Ordered
            </h3>
            <div className="divide-y divide-stone-100">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-14 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                      {item.product?.images?.[0] ? (
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-serif text-sm font-medium text-elora-dark">{item.product?.name || item.name}</p>
                      <p className="text-[10px] text-stone-500">Size: {item.size} • Color: {item.color}</p>
                      <p className="text-[11px] text-stone-700">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-elora-dark">
                    Rs. {((item.product?.price || item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="pt-4 border-t border-elora-taupe/30 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {(order.subtotal || order.total).toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount Privilege</span>
                <span>- Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'COMPLIMENTARY' : `Rs. ${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-elora-dark pt-3 border-t border-stone-200">
              <span>Amount Paid</span>
              <span>Rs. {(order.totalPaid || order.total).toLocaleString()}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 py-4 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors text-center flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handlePrint}
              className="px-6 py-4 border border-stone-300 text-stone-700 text-xs uppercase tracking-widest font-semibold hover:border-elora-dark hover:text-elora-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
