"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * RGRM // SUCCESS_ANIMATION_MODULE
 * Structural visualization of successful identity registry.
 */

export default function SuccessAnimation() {
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the blueprint lines "drawing" themselves
      gsap.fromTo(
        ".draw-line",
        { strokeDasharray: 500, strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          delay: 0.5,
          ease: "power4.inOut",
          stagger: 0.2,
        }
      );

      // 2. Industrial pulse for the core node
      gsap.to(".center-dot", {
        scale: 2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });
      
      // 3. Overall SVG fade in to prevent flicker
      gsap.fromTo(svgRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      );
    }, svgRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={svgRef} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" style={{ overflow: 'visible' }}>
        {/* Outer Structural Frame */}
        <rect
          className="draw-line"
          x="20"
          y="20"
          width="120"
          height="120"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />
        {/* Diagonals */}
        <line className="draw-line" x1="20" y1="20" x2="140" y2="140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
        <line className="draw-line" x1="140" y1="20" x2="20" y2="140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
        
        {/* The "Structural" Core Node */}
        <circle 
          className="center-dot" 
          cx="80" 
          cy="80" 
          r="3" 
          fill="rgba(255, 255, 255, 0.8)" 
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' }}
        />
      </svg>
    </div>
  );
}
