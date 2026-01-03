// src/components/ContactSection.tsx
export default function ContactSection() {
  return (
    <section className="bg-white border-t-8 border-black p-8 md:p-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        
        {/* Contact Info Block */}
        <div className="flex flex-col justify-center">
          <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-8">
            Get In <br /> <span className="text-[#FF0000]">Touch</span>
          </h2>
          <p className="text-xl font-bold uppercase mb-12 max-w-md">
            Have questions about an order or a custom design? Our team is here to help.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-[#0066FF] border-4 border-black group-hover:rounded-full transition-all" />
              <span className="font-black uppercase tracking-widest underline decoration-4 underline-offset-4">Support@raguiromo.store</span>
            </div>
          </div>
        </div>

        {/* Minimalist Contact Form */}
        <div className="bg-[#FFCC00] p-1 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <form className="bg-white p-8 space-y-6">
            <div>
              <label className="block text-xs font-black uppercase mb-2">Full Identity</label>
              <input type="text" className="w-full border-4 border-black p-3 focus:bg-[#F9F7F2] outline-none" placeholder="YOUR NAME" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-2">Email Address</label>
              <input type="email" className="w-full border-4 border-black p-3 focus:bg-[#F9F7F2] outline-none" placeholder="EMAIL@EXAMPLE.COM" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-2">Message</label>
              <textarea rows={4} className="w-full border-4 border-black p-3 focus:bg-[#F9F7F2] outline-none" placeholder="HOW CAN WE HELP?" />
            </div>
            <button className="w-full bg-black text-white font-black py-4 uppercase tracking-widest hover:bg-[#0066FF] transition-colors">
              Send Message
            </button>
          </form>
        </div>
        
      </div>
    </section>
  );
}
