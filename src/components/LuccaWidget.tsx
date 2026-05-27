'use client';

import { useEffect } from 'react';

export default function LuccaWidget() {
  useEffect(() => {
    // Only load if we have the agent ID
    if (!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID) return;

    // @ts-ignore - ElevenLabs widget types
    window.elevenlabsWidget = {
      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
      position: 'bottom-right',
      theme: 'dark', // Matches your brutalist black design
      title: 'Lucca - RGRM Studio',
      subtitle: 'Architectural assistance',
      primaryColor: '#BC2026', // Blood red accent (your brand color!)
    };
    
    // Load the widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/widget.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Widget injects itself automatically
}
