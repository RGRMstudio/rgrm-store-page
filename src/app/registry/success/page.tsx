'use client';

import React from 'react';
import Link from 'next/link';

/**
 * RGRM // SUCCESS_INTERFACE
 * Status: Transaction Confirmed.
 */

export default function SuccessPage() {
  return (
    <main style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem' 
    }}>
      <div className="border-industrial" style={{ 
        maxWidth: '600px', 
        width: '100%', 
        padding: '3rem', 
        backgroundColor: 'rgba(255,255,255,0.02)',
        textAlign: 'center' 
      }}>
        
        {/* Success Icon */}
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: '2px solid var(--glitch-cyan)', 
          borderRadius: '50%', 
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--glitch-cyan)',
          fontSize: '1.5rem'
        }}>
          ✓
        </div>

        <header style={{ marginBottom: '2.5rem' }}>
          <h1 className="logo-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            Identity_Registered
          </h1>
          <p style={{ 
            fontSize: '0.6rem', 
            color: 'var(--glitch-cyan)', 
            textTransform: 'uppercase', 
            letterSpacing: '2px' 
          }}>
            Status: Acquisition_Confirmed // Shipment_Initialized
          </p>
        </header>

        <div style={{ 
          fontSize: '0.75rem', 
          lineHeight: '1.6', 
          opacity: 0.7, 
          marginBottom: '3rem',
          textTransform: 'uppercase'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Your acquisition has been logged into the RaGuiRoMo core manifest. 
            The manufacturing sequence for your artifact has been triggered.
          </p>
          <p>
            A digital dossier and receipt have been dispatched to your registered email.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Link href="/" className="btn-rgrm" style={{ fontSize: '0.7rem', justifyContent: 'center' }}>
            Return_To_Nexus
          </Link>
          <Link href="/" style={{ 
            border: '1px solid var(--border-grey)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            color: 'white'
          }}>
            View_Manifest
          </Link>
        </div>

        <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-grey)' }}>
          <p style={{ fontSize: '0.6rem', opacity: 0.3, fontStyle: 'italic' }}>
            Reference_ID: [SESSION_AUTHENTICATED] <br />
            RGRM // STUDIO_MODULE_002
          </p>
        </footer>
      </div>
    </main>
  );
}
