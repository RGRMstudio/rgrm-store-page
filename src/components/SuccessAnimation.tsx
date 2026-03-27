"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SuccessAnimation() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the lines "drawing" themselves
      gsap.fromTo(
        ".draw-line",
        { strokeDasharray: 500, strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power4.inOut",
          stagger: 0.3,
        }
      );

      // 2. Subtle pulse for the center dot
      gsap.to(".center-dot", {
        scale: 1.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, svgRef);

    return () => ctx.revert(); // Cleanup when page changes
  }, []);

  return (
    <div ref={svgRef} className="flex justify-center mb-8">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        {/* Outer Structural Frame */}
        <rect
          className="draw-line"
          x="20"
          y="20"
          width="120"
          height="120"
          stroke="black"
          strokeWidth="1.5"
        />
        {/* Diagonals */}
        <line className="draw-line" x1="20" y1="20" x2="140" y2="140" stroke="black" strokeWidth="0.5" />
        <line className="draw-line" x1="140" y1="20" x2="20" y2="140" stroke="black" strokeWidth="0.5" />
        {/* The "Structural" Core */}
        <circle className="center-dot" cx="80" cy="80" r="3" fill="black" />
      </svg>
    </div>
  );
}
