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
      theme: 'dark', // Matches brutalist aesthetic
      title: 'Lucca - RGRM Studio',
      subtitle: 'Architectural assistance',
      primaryColor: '#8B0000', // Blood red accent
    };
    
    // Load the widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/widget.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Widget injects itself
}
