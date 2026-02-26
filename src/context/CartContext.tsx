'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// --- 1. TYPE DEFINITIONS ---
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string; // URL string
  size?: string; // Optional: For future expansion
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- 2. PROVIDER COMPONENT ---
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // --- 3. PERSISTENCE LOGIC (LocalStorage) ---
  
  // Load from storage on initial client mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('rgrm-manifest'); // Unique key for your brand
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Manifest Data Corrupted', e);
        // If data is corrupt, reset it
        localStorage.removeItem('rgrm-manifest');
      }
    }
  }, []);

  // Save to storage whenever cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('rgrm-manifest', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // --- 4. ACTIONS ---

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in the manifest
      const existingItem = prevCart.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If exists, increment quantity
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // If new, add to array with quantity 1
      // Ensure we don't accidentally pass a quantity from the component if not intended
      return [...prevCart, { ...newItem, quantity: 1 }];
    });

    // Auto-open the drawer to confirm acquisition
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // --- 5. DERIVED STATE (Calculations) ---
  
  // Calculate total valuation
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calculate total number of physical units
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // --- 6. RENDER ---
  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// --- 7. CUSTOM HOOK ---
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
