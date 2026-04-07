'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * RGRM // NULL REFERENCE PROTOCOL
 * Custom 404 interface for unauthorized route access.
 */

export default function NotFound() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: 'black', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '0 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%', 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        position: 'relative' 
      }}>
        
        {/* GLITCH EFFECT DECOR - VERTICAL LINE */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '1px', 
          height: '100%', 
          background: 'linear-gradient(to bottom, transparent, rgba(255, 0, 0, 0.2), transparent)' 
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <header style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: 'clamp(4rem, 15vw, 6rem)', 
              fontWeight: 900, 
              letterSpacing: '-0.05em', 
              color: 'white', 
              lineHeight: 1,
              margin: 0
            }}>
              404
            </h1>
            <p style={{ 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5em', 
              color: '#ff0000', // RGRM Red
              fontWeight: 'bold', 
              marginTop: '1rem' 
            }}>
              Error: Null_Reference_Detected
            </p>
          </header>

          <div style={{ marginBottom: '3rem', spacing: '1.5rem' }}>
            <p style={{ 
              fontSize: '12px', 
              color: 'rgba(255, 255, 255, 0.5)', 
              lineHeight: '1.6', 
              textTransform: 'uppercase', 
              fontFamily: 'var(--font-mono)' 
            }}>
              The requested coordinate does not exist within the current 
              Identity Registry architecture. 
              Please recalibrate your destination.
            </p>
            
            <div style={{ 
              marginTop: '1.5rem',
              fontSize: '10px', 
              color: 'rgba(255, 255, 255, 0.2)', 
              fontFamily: 'var(--font-mono)', 
              textTransform: 'uppercase', 
              fontStyle: 'italic' 
            }}>
              Sector: [unauthorized_access] <br />
              Status: [terminated]
            </div>
          </div>

          <Link 
            href="/"
            className="btn-industrial"
            style={{ 
              display: 'block',
              width: '100%', 
              backgroundColor: 'white', 
              color: 'black', 
              padding: '1rem 0', 
              fontSize: '12px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.3em', 
              textDecoration: 'none',
              transition: '0.3s'
            }}
          >
            Return to Nexus
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
