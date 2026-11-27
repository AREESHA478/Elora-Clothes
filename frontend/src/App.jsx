import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import SizeGuideModal from './components/SizeGuideModal';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import AccountPage from './pages/AccountPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-[#171717] font-sans selection:bg-[#171717] selection:text-white">
          {/* Announcement Bar & Sticky Header */}
          <AnnouncementBar />
          <Navbar />

          {/* Main Routing Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/collections/t-shirts" element={<ShopPage forcedCategory="T.Shirts" />} />
              <Route path="/collections/hoodies" element={<ShopPage forcedCategory="Hoodies" />} />
              <Route path="/collections/shirts" element={<ShopPage forcedCategory="Shirts" />} />
              <Route path="/collections/tank-tops" element={<ShopPage forcedCategory="Tank-Tops" />} />
              <Route path="/collections/trousers" element={<ShopPage forcedCategory="Trousers" />} />
              <Route path="/collections/shorts" element={<ShopPage forcedCategory="Shorts" />} />
              <Route path="/collections/cargo-pants" element={<ShopPage forcedCategory="Cargo-Pants" />} />
              <Route path="/collections/end-of-season-sale" element={<ShopPage forcedCategory="End of Season Sale" />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/lookbook" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Luxury Footer */}
          <Footer />

          {/* Global Interactive Overlays */}
          <QuickViewModal />
          <SizeGuideModal />
          <CartDrawer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
