"use client";
import dynamic from 'next/dynamic';
// Dynamically import the real Navbar to prevent server crashes
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function NavbarWrapper() {
  return <Navbar />;
}
