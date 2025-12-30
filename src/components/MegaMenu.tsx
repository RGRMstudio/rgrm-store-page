// src/components/MegaMenu.tsx
export default function MegaMenu() {
  return (
    <nav className="bg-black border-b border-zinc-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter">RGRM STUDIO</div>
        
        <div className="group relative">
          <button className="hover:text-zinc-400 py-2 px-4 transition-all uppercase text-sm tracking-widest">
            Acquire ↓
          </button>
          
          {/* THE MEGA MENU DROPDOWN */}
          <div className="absolute left-0 top-full hidden group-hover:grid grid-cols-2 w-[400px] bg-zinc-950 border border-zinc-800 p-6 gap-6 z-50">
            <div>
              <h3 className="text-xs text-zinc-500 mb-2 uppercase tracking-widest">Store A001</h3>
              <ul className="space-y-2">
                <li><a href="/store/a001/geometric-units" className="hover:text-yellow-400 text-sm">Geometric Units</a></li>
                <li><a href="/store/a001/vectors" className="hover:text-yellow-400 text-sm">Vector Assets</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs text-zinc-500 mb-2 uppercase tracking-widest">Store A002</h3>
              <ul className="space-y-2">
                <li><a href="/store/a002/monoliths" className="hover:text-red-500 text-sm">Monolith Series</a></li>
                <li><a href="/store/a002/prints" className="hover:text-red-500 text-sm">Archival Prints</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
