"use client"

import { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react"

type CartTriggerProps = {
  cartCount?: number
  onClick?: () => void
}

export default function CartTrigger({
  cartCount = 0,
  onClick,
}: CartTriggerProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isBumped, setIsBumped] = useState(false)

  // Prevent hydration mismatch in Next.js
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Small animation bump when cart changes
  useEffect(() => {
    if (!isMounted) return

    if (cartCount > 0) {
      setIsBumped(true)
      const timer = setTimeout(() => {
        setIsBumped(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [cartCount, isMounted])

  if (!isMounted) return null

  const safeCartCount = cartCount ?? 0

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white transition-all duration-200"
    >
      <ShoppingBag size={18} />

      <span
        className={`block text-[10px] font-bold font-mono transition-transform duration-100 ${
          isBumped ? "scale-110 text-rgrm-red" : "text-white"
        }`}
      >
        {safeCartCount.toString().padStart(2, "0")} UNITS
      </span>
    </button>
  )
}
