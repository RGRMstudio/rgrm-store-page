"use client";
import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: `RGRM STUDIO | ${title}`,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback if browser doesn't support native share
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard. Share the study!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-black transition-all uppercase"
    >
      <Share2 size={16} strokeWidth={3} /> Share Study
    </button>
  );
}
