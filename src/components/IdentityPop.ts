"use client";
import { useState } from "react";

export default function IdentityPop() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const joinRegistry = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/registry", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) setStatus("success");
  };

  return (
    <div className="p-8 border-4 border-black bg-white">
      <h2 className="text-2xl font-bold mb-4 uppercase">Join The Registry</h2>
      {status === "success" ? (
        <p className="font-mono">Identity Verified. Welcome to the Tier 1 list.</p>
      ) : (
        <form onSubmit={joinRegistry} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="EMAIL@ADDRESS.COM" 
            className="border-2 border-black p-2 font-mono outline-none focus:bg-red-500 focus:text-white transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-black text-white p-3 font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Syncing..." : "Acquire Access"}
          </button>
        </form>
      )}
    </div>
  );
}
