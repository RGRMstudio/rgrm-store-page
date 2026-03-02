'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * RGRM // CART_CONTEXT_PROTOCOL
 * Manages identity registry state and persistent local storage.
 */

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. PERSISTENCE HANDSHAKE: Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('rgrm-registry-manifest');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("LOG_ERROR: Registry corrupted, resetting state.");
        localStorage.removeItem('rgrm-registry-manifest');
      }
    }
  }, []);

  // 2. DATA SYNCHRONIZATION: Save cart to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('rgrm-registry-manifest', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      isCartOpen, 
      setIsCartOpen, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider sector.');
  }
  return context;
}
