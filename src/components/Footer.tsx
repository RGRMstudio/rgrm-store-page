import { Instagram, Twitter, Mail } from "lucide-react";
import { subscribe } from "@/app/actions/newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-20 px-8 bg-white text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="font-black tracking-tighter text-xl uppercase">RGRM STUDIO</h2>
          <p className="text-xs font-mono text-gray-400 leading-loose uppercase">
            Structural Studies & Manifesto Designs.<br/>
            Printed in the Laboratory.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400">Join the Study</h3>
          <form action={subscribe} className="flex flex-col gap-3">
            <input 
              name="email" 
              type="email" 
              placeholder="EMAIL@ADDRESS.COM" 
              className="border-b-2 border-black py-2 outline-none text-sm font-mono uppercase focus:border-gray-300 transition-all"
              required 
            />
            <button type="submit" className="bg-black text-white text-[10px] py-3 px-6 font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
              Register Contact
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="md:text-right space-y-4">
          <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400">Connect</h3>
          <div className="flex md:justify-end gap-6 text-black">
            <a href="https://instagram.com/yourhandle" target="_blank" className="hover:text-gray-400 transition-all"><Instagram size={18} /></a>
            <a href="https://twitter.com/yourhandle" target="_blank" className="hover:text-gray-400 transition-all"><Twitter size={18} /></a>
            <a href="mailto:support@raguiromo.store" className="hover:text-gray-400 transition-all"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
