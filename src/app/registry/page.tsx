'use client';

import React from 'react';
import Link from 'next/link';

/**
 * RGRM // SUCCESS_REGISTRY_INTERFACE
 * Status: Authenticated. Post-Acquisition Flow.
 */

export default function SuccessPage() {
  return (
    <main className="scanline-effect" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '0 1.5rem',
      backgroundColor: 'black'
    }}>
      {/* The grain-overlay is already handled by layout.tsx */}

      <div className="border-industrial" style={{ 
        maxWidth: '600px', 
        width: '100%', 
        padding: '3rem', 
        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Success Icon - Simplified SVG for Industrial Look */}
        <div style={{ 
          width: '64px', 
          height: '64px', 
          border: '2px solid var(--accent)', 
          borderRadius: '50%', 
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="square">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <header style={{ marginBottom: '2.5rem' }}>
          <h1 className="logo-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Identity_Registered
          </h1>
          <p style={{ 
            fontSize: '10px', 
            color: 'var(--accent)', 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            fontFamily: 'var(--font-mono)'
          }}>
            Status: Acquisition_Confirmed // Structural_Study_Locked
          </p>
        </header>

        <div style={{ 
          fontSize: '12px', 
          color: 'rgba(255,255,255,0.6)', 
          lineHeight: '1.8', 
          marginBottom: '3rem',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Your acquisition has been logged into the RGRM Studio core manifest. 
            The manufacturing sequence for your specific study has been initialized.
          </p>
          <p>
            A digital dossier and receipt of transaction have been dispatched 
            to your registered email address.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Link href="/" className="btn-industrial" style={{ fontSize: '10px', textAlign: 'center', display: 'block' }}>
            Return_To_Archive
          </Link>
          <Link href="/" className="btn-industrial" style={{ 
            fontSize: '10px', 
            textAlign: 'center', 
            display: 'block',
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            Return_To_Nexus
          </Link>
        </div>

        <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>
            Reference_ID: [SESSION_AUTHENTICATED] <br />
            RGRM // STUDIO_MODULE_002
          </p>
        </footer>
      </div>
    </main>
  );
}
