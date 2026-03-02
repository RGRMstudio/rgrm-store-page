'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-rgrm-black border-l border-white/10 z-[101] p-8 flex flex-col"
          >
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Acquisition_Manifest</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-[10px] font-mono text-rgrm-red hover:text-white transition-colors">
                [CLOSE_X]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-[10px] uppercase tracking-widest text-white/40 italic">Registry_Empty...</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{item.name}</p>
                      <p className="text-[10px] font-mono text-white/40 mt-1">${item.price} — QTY: {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] text-rgrm-red uppercase font-mono"
                    >
                      [REMOVE]
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <Link 
                  href="/api/checkout" 
                  className="block w-full bg-white text-black py-4 text-center text-xs font-black uppercase tracking-widest hover:bg-rgrm-red hover:text-white transition-all"
                  onClick={() => setIsCartOpen(false)}
                >
                  Authorize_Transaction
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
