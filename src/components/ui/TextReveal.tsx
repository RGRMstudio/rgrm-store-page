'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </div>
  );
}
