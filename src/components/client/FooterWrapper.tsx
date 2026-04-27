"use client";
import dynamic from 'next/dynamic';
// Dynamically import the real Footer to prevent server crashes
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function FooterWrapper() {
  return <Footer />;
}
