'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * RGRM // MANIFEST PROTOCOL
 * Core state management for the acquisition system.
 */

// --- 1. DATA STRUCTURES ---
export interface CartItem {
  id: string;      // Structural ID (e.g., STUDY-001)
  name: string;    // Designation
  price: number;   // Unit Cost
  image: string;   // Visual Reference URL
  quantity: number; 
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// Initialize Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- 2. PROVIDER IMPLEMENTATION ---
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // PERSISTENCE: Load stored manifest on boot
  useEffect(() => {
    setIsMounted(true);
    const savedManifest = localStorage.getItem('rgrm-registry-manifest');
    if (savedManifest) {
      try {
        setCart(JSON.parse(savedManifest));
      } catch (error) {
        console.error("DATA_CORRUPTION: Resetting Manifest", error);
        localStorage.removeItem('rgrm-registry-manifest');
      }
    }
  }, []);

  // PERSISTENCE: Save manifest on state change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('rgrm-registry-manifest', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // --- 3. CORE ACTIONS ---

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    // Visual feedback: Open drawer on acquisition
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // --- 4. DERIVED ANALYTICS ---
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// --- 5. SYSTEM HOOK ---
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('SYSTEM_ERROR: useCart must be used within a CartProvider');
  }
  return context;
}
