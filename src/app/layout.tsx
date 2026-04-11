/* ... existing imports and font configs ... */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} antialiased`}>
      <head>
        <Script 
          src="https://js.stripe.com/v3/" 
          strategy="beforeInteractive" 
        />
      </head>
      {/* CHANGE: Changed bg-white to bg-[var(--bg)] and text-black to text-[var(--fg)] */}
      <body className="scanline-effect bg-[var(--bg)] text-[var(--fg)] min-h-screen">
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.05]" />
        
        {/* CHANGE: Updated nav background and border for the dark theme */}
        <nav className="nav-main sticky top-0 z-40 w-full border-b border-[var(--industrial-border)] bg-[var(--bg)]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <span className="logo-text font-black uppercase tracking-tighter text-2xl">RaGuiRoMo</span>
          <div className="status-container flex items-center gap-2">
            <span className="status-led w-2 h-2 rounded-full bg-[#BC2026] shadow-[0_0_8px_#BC2026]" />
            <span className="status-label font-mono text-[10px] tracking-widest uppercase text-[#BC2026]">SIGNAL_DEPLOYED</span>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
