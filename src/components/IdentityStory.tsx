'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function IdentityStory() {
  const [isMounted, setIsMounted] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const ctx = gsap.context(() => {
      gsap.from('.story-segment', {
        opacity: 0,
        x: -30,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  if (!isMounted) return null;

  return (
    <section ref={storyRef} className="identity-story py-20 px-4 max-w-4xl mx-auto">
      <div className="story-segment mb-12">
        <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase mb-4 inline-block">
          The Origin
        </span>
        <h3 className="text-5xl font-black mb-6 italic">It&apos;s more than a brand.</h3>
        <p className="text-xl leading-loose border-l-4 border-black pl-6">
          The RaGuiRoMo story began with a simple question: Can we make functional art 
          accessible? By stripping away the unnecessary, we found the soul of the 
          Bauhaus movement. It&apos;s about the harmony between the craftsman and 
          the machine.
        </p>
      </div>

      <div className="story-segment">
        <h3 className="text-5xl font-black mb-6">The Registry&apos;s Purpose</h3>
        <p className="text-xl leading-loose border-l-4 border-red-500 pl-6">
          Every entry in our registry is verified. When you own a RaGuiRoMo piece, 
          you aren&apos;t just buying a silhouette; you&apos;re securing a 
          numbered artifact of design history.
        </p>
      </div>
    </section>
  );
}
