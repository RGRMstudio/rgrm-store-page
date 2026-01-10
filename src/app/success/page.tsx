"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Bauhaus Animation: Circle scales up and text fades in
    tl.fromTo(circleRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, delay: 0.5 }
    )
    .fromTo(textRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.4"
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-mono uppercase tracking-tighter">
      {/* Bauhaus Geometric Element */}
      <div 
        ref={circleRef}
        className="w-48 h-48 bg-[#E63946] rounded-full mb-12 flex items-center justify-center text-white text-6xl font-bold"
      >
        ✓
      </div>

      <div ref={textRef} className="text-center max-w-md">
        <h1 className="text-4xl font-black mb-4 border-b-8 border-black pb-2">
          Registration Complete
        </h1>
        <p className="text-lg mb-8 leading-tight">
          Your identity has been successfully registered in the Bauhaus Registry. 
          <span className="block mt-4 text-gray-500 text-xs">ID: {sessionId?.slice(-12)}</span>
        </p>

        <Link 
          href="/" 
          className="inline-block bg-black text-white px-8 py-4 hover:bg-[#E63946] transition-colors duration-300 w-full"
        >
          Return to Terminal
        </Link>
      </div>

      {/* Grid Overlay for Bauhaus Aesthetic */}
      <div className="fixed inset-0 pointer-events-none border-[20px] border-black opacity-10"></div>
    </div>
  );
}
