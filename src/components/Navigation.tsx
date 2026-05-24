'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/selection', label: 'Collection' },
    { href: '/manifesto', label: 'Manifesto' },
    { href: '/studio', label: 'Studio' },
    { href: '/oracle', label: 'Oracle' },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter">
            RGRM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-12 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.2em] transition-colors ${
                  pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-white transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Cart & Menu */}
          <div className="flex items-center gap-6">
            <Link 
              href="/cart"
              className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
            >
              Cart (<span className="text-white">0</span>)
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-px w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-px w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motionLink
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                  className="text-4xl font-serif uppercase tracking-widest hover:text-blood-red transition-colors"
                >
                  {link.label}
                </motionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
