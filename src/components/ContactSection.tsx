'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [email, setEmail] = useState('');

  const handleRegistry = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/registry', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    alert('Thank you for joining the registry.');
  };

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h3 className="text-xs uppercase tracking-[0.4em] mb-8">Join the Registry</h3>
      <form onSubmit={handleRegistry} className="max-w-md mx-auto flex flex-col gap-4 px-6">
        <input 
          type="email" 
          placeholder="EMAIL ADDRESS" 
          className="bg-transparent border-b border-black p-2 text-center text-xs outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="text-[10px] uppercase tracking-widest mt-4 hover:opacity-50 transition-opacity">
          Submit
        </button>
      </form>
    </section>
  );
}

