'use client';

export default function Home() {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' });
    const { id } = await res.json();
    const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 className="logo-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        01_ARTIFACT
      </h1>
      <p style={{ maxWidth: '600px', margin: '0 auto 3rem', opacity: 0.7 }}>
        [HEAVYWEIGHT_TEE] // COMBS-SPUN COTTON // INDUSTRIAL GLITCH ART 
        <br />DECAY_STATUS: ACTIVE
      </p>
      
      <button className="btn-industrial" onClick={handleCheckout}>
        INITIALIZE_PURCHASE // $45.00
      </button>

      <div style={{ marginTop: '5rem', opacity: 0.3, fontSize: '0.8rem' }}>
        <p>RECORDS_FOUND: 1</p>
        <p>LOCATION: SECTOR_7_VAULT</p>
      </div>
    </div>
  );
}
