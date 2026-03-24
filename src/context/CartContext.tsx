"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  cartCount: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("rgrm-cart")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems([])
      }
    }
    setMounted(true)
  }, [])

  // Persist cart
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("rgrm-cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }

      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
