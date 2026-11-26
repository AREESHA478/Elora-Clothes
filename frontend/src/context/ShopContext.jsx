import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // ================= CART STATE =================
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('elora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ================= WISHLIST STATE =================
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('elora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ================= RECENTLY VIEWED =================
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('elora_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ================= ORDERS STATE =================
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('elora_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: "ELR-94821",
          date: "14 Nov 2026",
          status: "Delivered",
          items: [
            {
              id: "elr-w-01",
              name: "Aurelia Pleated Silk Maxi Dress",
              price: 18950,
              size: "S",
              color: "Alabaster White",
              quantity: 1,
              image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80"
            }
          ],
          total: 18950,
          shippingAddress: "House 42, Street 10, Sector F-7/2, Islamabad"
        }
      ];
    } catch {
      return [];
    }
  });

  // ================= AUTH / USER STATE (MOCK) =================
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('elora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ================= PROMO CODE STATE =================
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // ================= UI MODAL STATES =================
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // ================= PERSISTENCE =================
  useEffect(() => {
    try {
      localStorage.setItem('elora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('elora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('elora_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('elora_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('elora_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('elora_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // ================= TOAST NOTIFICATION HELPER =================
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ================= CART ACTIONS =================
  const addToCart = (product, size, color, quantity = 1) => {
    // If product has sizes, size selection is mandatory!
    if (product.sizes && product.sizes.length > 0 && (!size || size === '')) {
      addToast('Please select a size before adding to bag', 'error');
      return false;
    }

    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const selectedSize = size || 'One Size';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            size: selectedSize,
            color: selectedColor,
            quantity
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to your shopping bag`, 'success');
    setIsCartDrawerOpen(true);
    return true;
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ================= CALCULATIONS =================
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 5000;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartSubtotal > 0 ? (isFreeShipping ? 0 : 450) : 0;
  const freeShippingDifference = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  // Promo code discounts
  const applyPromoCode = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'ELORA15') {
      setAppliedPromo({ code: cleanCode, percent: 15, name: '15% Welcome Discount' });
      addToast('Promo code ELORA15 applied! (15% Off)', 'success');
      return true;
    } else if (cleanCode === 'AUTUMN20') {
      setAppliedPromo({ code: cleanCode, percent: 20, name: 'Autumn Edit 20% Discount' });
      addToast('Promo code AUTUMN20 applied! (20% Off)', 'success');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: cleanCode, percent: 0, freeShipping: true, name: 'Complimentary Express Shipping' });
      addToast('Free Shipping code applied!', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try "ELORA15" or "AUTUMN20"', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    addToast('Promo code removed', 'info');
  };

  const discountAmount = appliedPromo?.percent
    ? Math.round((cartSubtotal * appliedPromo.percent) / 100)
    : 0;

  const effectiveShipping = appliedPromo?.freeShipping ? 0 : shippingFee;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + effectiveShipping);

  // ================= WISHLIST ACTIONS =================
  const toggleWishlist = (product) => {
    const exists = wishlist.some((id) => id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast(`Saved "${product.name}" to your wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // ================= RECENTLY VIEWED =================
  const addRecentlyViewed = (product) => {
    if (!product?.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  // ================= ORDER CHECKOUT =================
  const placeOrder = (orderData) => {
    const orderId = `ELR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Confirmed",
      estimatedDelivery: "3-4 Business Days",
      ...orderData,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: effectiveShipping,
      total: cartTotal
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    return newOrder;
  };

  // ================= AUTH ACTIONS (MOCK) =================
  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || "Valued Client",
      email: email,
      phone: "+92 300 1234567",
      memberSince: "November 2026",
      tier: "ÉLORA VIP Member",
      addresses: [
        {
          id: 1,
          isDefault: true,
          label: "Home / Residence",
          fullName: "Ayesha Khan",
          address: "House 18, Block B, Street 4, Gulberg III",
          city: "Lahore",
          postalCode: "54000",
          phone: "+92 300 1234567"
        }
      ]
    };
    setUser(mockUser);
    addToast(`Welcome back, ${mockUser.name}`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('You have been securely signed out', 'info');
  };

  const register = (userData) => {
    const newUser = {
      name: userData.fullName || "Valued Client",
      email: userData.email,
      phone: userData.phone || "+92 300 0000000",
      memberSince: "November 2026",
      tier: "ÉLORA Member",
      addresses: [
        {
          id: 1,
          isDefault: true,
          label: "Primary Address",
          fullName: userData.fullName || "Valued Client",
          address: userData.address || "Main Boulevard",
          city: userData.city || "Karachi",
          postalCode: userData.postalCode || "75000",
          phone: userData.phone || "+92 300 0000000"
        }
      ]
    };
    setUser(newUser);
    addToast('Account created successfully! Welcome to ÉLORA.', 'success');
    return true;
  };

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartItemCount,
        shippingFee: effectiveShipping,
        cartTotal,
        isFreeShipping,
        freeShippingDifference,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        orders,
        placeOrder,
        user,
        login,
        logout,
        register,
        quickViewProduct,
        setQuickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
