import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Package, 
  MapPin, 
  Heart, 
  LogOut,CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function AccountPage() {
  const { user, login, logout, register, orders, addToast } = useShop();

  // Mode: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('login');
  
  // Dashboard active tab: 'orders' | 'profile' | 'addresses'
  const [activeTab, setActiveTab] = useState('orders');

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Forgot password input
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      addToast('Please enter both email and password.', 'error');
      return;
    }
    login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      addToast('Please complete all mandatory registration fields.', 'error');
      return;
    }
    register({
      fullName: regName,
      email: regEmail,
      phone: regPhone
    });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast('Please enter your email.', 'error');
      return;
    }
    setForgotSent(true);
    addToast('Password reset link has been dispatched to your email.', 'success');
  };

  // ================= LOGGED IN DASHBOARD VIEW =================
  if (user) {
    return (
      <div className="bg-elora-bg min-h-screen py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Welcome Banner */}
          <div className="bg-white border border-elora-taupe/40 p-6 sm:p-10 shadow-elora-soft mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-elora-dark text-white font-serif text-2xl flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-elora-dark">
                    Welcome, {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-elora-sand text-elora-brown text-[10px] font-bold uppercase tracking-wider border border-elora-taupe/40">
                    {user.tier}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Client ID: {user.email} • Enrolled since {user.memberSince}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center space-x-2 px-5 py-2.5 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-semibold hover:border-red-600 hover:text-red-600 transition-colors self-start sm:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="flex space-x-4 border-b border-elora-taupe/30 mb-8 overflow-x-auto pb-1 text-xs uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-elora-dark text-elora-dark font-bold'
                  : 'border-transparent text-stone-400 hover:text-elora-dark'
              }`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-elora-dark text-elora-dark font-bold'
                  : 'border-transparent text-stone-400 hover:text-elora-dark'
              }`}
            >
              Client Profile
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'addresses'
                  ? 'border-elora-dark text-elora-dark font-bold'
                  : 'border-transparent text-stone-400 hover:text-elora-dark'
              }`}
            >
              Saved Addresses
            </button>
          </div>

          {/* TAB 1: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-white border border-elora-taupe/30 p-12 text-center shadow-sm">
                  <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p className="font-serif text-xl font-light text-elora-dark mb-2">No Past Orders</p>
                  <p className="text-xs text-stone-500 mb-6">Discover our newest season silhouettes to curate your wardrobe.</p>
                  <Link
                    to="/shop"
                    className="inline-block px-8 py-3 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-white border border-elora-taupe/30 p-6 sm:p-8 shadow-elora-soft">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-elora-taupe/30 gap-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-elora-dark">#{ord.id}</span>
                        <p className="text-[11px] text-stone-500 mt-0.5">Placed on {ord.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-elora-sand text-elora-dark text-xs font-semibold border border-elora-border">
                          {ord.status || 'Confirmed'}
                        </span>
                        <span className="font-semibold text-elora-dark text-sm">
                          Rs. {(ord.totalPaid || ord.total).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="py-4 divide-y divide-stone-100">
                      {ord.items?.map((it, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-14 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                              {it.product?.images?.[0] ? (
                                <img src={it.product.images[0]} alt="" className="w-full h-full object-cover" />
                              ) : it.image ? (
                                <img src={it.image} alt="" className="w-full h-full object-cover" />
                              ) : null}
                            </div>
                            <div>
                              <p className="font-serif text-sm font-medium text-elora-dark">{it.product?.name || it.name}</p>
                              <p className="text-[10px] text-stone-500">Size: {it.size} • Color: {it.color} • Qty: {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-elora-dark">
                            Rs. {((it.product?.price || it.price) * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-elora-taupe/20 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-stone-500 gap-2">
                      <p>Destination: {ord.shippingAddress}</p>
                      <Link
                        to={`/order-confirmation/${ord.id}`}
                        className="text-elora-brown hover:underline font-semibold text-xs flex items-center space-x-1"
                      >
                        <span>View Order Receipt</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Profile Overview */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-elora-taupe/30 p-8 shadow-elora-soft max-w-2xl">
              <h2 className="font-serif text-2xl font-light text-elora-dark mb-6 pb-3 border-b border-elora-taupe/30">
                Personal Information
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-stone-400 uppercase tracking-wider text-[10px] block mb-1">Full Legal Name</label>
                  <p className="font-semibold text-elora-dark text-sm">{user.name}</p>
                </div>
                <div>
                  <label className="text-stone-400 uppercase tracking-wider text-[10px] block mb-1">Electronic Mail</label>
                  <p className="font-semibold text-elora-dark text-sm">{user.email}</p>
                </div>
                <div>
                  <label className="text-stone-400 uppercase tracking-wider text-[10px] block mb-1">Registered Phone</label>
                  <p className="font-semibold text-elora-dark text-sm">{user.phone}</p>
                </div>
                <div>
                  <label className="text-stone-400 uppercase tracking-wider text-[10px] block mb-1">Maison Tier Status</label>
                  <p className="font-semibold text-elora-brown text-sm">{user.tier}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.addresses?.map((addr) => (
                <div key={addr.id} className="bg-white border border-elora-taupe/40 p-6 shadow-elora-soft relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 bg-elora-dark text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5">
                      Default
                    </span>
                  )}
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-elora-brown" />
                    <h3 className="font-serif text-lg font-medium text-elora-dark">{addr.label}</h3>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-light mb-4">
                    <strong>{addr.fullName}</strong><br />
                    {addr.address}<br />
                    {addr.city}, {addr.postalCode}<br />
                    Pakistan<br />
                    Phone: {addr.phone}
                  </p>
                  <div className="pt-3 border-t border-elora-taupe/30 text-xs">
                    <span className="text-elora-dark font-medium">Verified for Express Delivery</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= NOT LOGGED IN AUTH FORMS =================
  return (
    <div className="bg-elora-bg min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-elora-taupe/30 p-8 sm:p-12 shadow-elora-card">
        {/* Top Brand Logo */}
        <div className="text-center mb-8">
          <span className="font-serif text-3xl font-semibold tracking-widest text-elora-dark uppercase">
            ÉLORA
          </span>
          <span className="block text-[8px] tracking-[0.35em] text-elora-brown uppercase mt-0.5 font-sans">
            CLIENT PORTAL
          </span>
        </div>

        {/* Auth Mode Tabs (Login vs Register) */}
        <div className="flex border-b border-elora-taupe/30 mb-8 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => { setAuthMode('login'); setForgotSent(false); }}
            className={`flex-1 pb-3 text-center transition-colors ${
              authMode === 'login'
                ? 'border-b-2 border-elora-dark text-elora-dark font-bold'
                : 'text-stone-400 hover:text-elora-dark'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('register'); setForgotSent(false); }}
            className={`flex-1 pb-3 text-center transition-colors ${
              authMode === 'register'
                ? 'border-b-2 border-elora-dark text-elora-dark font-bold'
                : 'text-stone-400 hover:text-elora-dark'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1. LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="client@domain.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] uppercase tracking-wider font-medium text-stone-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="text-[10px] text-elora-brown hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-sm mt-2"
            >
              Sign In to Your Account
            </button>

            <div className="pt-4 text-center">
              <p className="text-[11px] text-stone-500">
                Demo Quick Sign-In: Enter any test email (e.g. <strong>ayesha@elora.pk</strong>) and password.
              </p>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ayesha Khan"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ayesha@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors shadow-sm mt-2"
            >
              Create Your Account
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-medium text-elora-dark mb-1">
              Reset Your Password
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed mb-4">
              Enter your account email. We will dispatch instructions to securely renew your credentials.
            </p>

            {forgotSent ? (
              <div className="p-4 bg-elora-sand border border-elora-border text-elora-dark text-xs">
                <CheckCircle2 className="w-5 h-5 text-elora-brown mb-2" />
                <span>Instructions have been transmitted. Please inspect your email inbox.</span>
                <button
                  onClick={() => setAuthMode('login')}
                  className="block mt-4 text-xs font-bold uppercase underline"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="client@domain.com"
                    required
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-elora-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-elora-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-elora-brown transition-colors"
                >
                  Transmit Reset Link
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-stone-500 hover:text-elora-dark underline"
                  >
                    Cancel and return to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

