'use client';

import Script from 'next/script';

export default function LuccaWidget() {
  // Get the Agent ID from environment variables, or paste it directly here
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'YOUR_ELEVENLABS_AGENT_ID';

  return (
    <>
      {/* ElevenLabs Conversational AI Custom Element */}
      <elevenlabs-convai 
        agent-id={agentId}
        style={{ zIndex: 9998 }} // Ensure it sits above the noise overlay but below modals
      />
      
      {/* Load the ElevenLabs Widget Script safely after page interaction */}
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
        async
        type="text/javascript"
      />
    </>
  );
}
