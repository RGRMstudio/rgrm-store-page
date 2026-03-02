export default function BlueprintGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Radial fade for focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
      
      {/* CSS Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Vertical Lines */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
    </div>
  );
}
