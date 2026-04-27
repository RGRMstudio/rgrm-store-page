export default function LinksPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
          Connect
        </h1>
        
        <div className="flex flex-col gap-4 items-center">
          <a 
            href="https://instagram.com/raguiromo.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors w-full max-w-md block"
          >
            Instagram
          </a>
          
          <a 
            href="https://facebook.com/Raguiromo.Studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors w-full max-w-md block"
          >
            Facebook
          </a>

          <a 
            href="https://x.com/raguiromostudio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors w-full max-w-md block"
          >
            X / Twitter
          </a>

          <a 
            href="https://tiktok.com/@rgrmstudio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors w-full max-w-md block"
          >
            TikTok
          </a>

          <a 
            href="https://pinterest.com/raguiromostudio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors w-full max-w-md block"
          >
            Pinterest
          </a>
        </div>
      </div>
    </main>
  );
}
