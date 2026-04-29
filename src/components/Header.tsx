import React, { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

export function Header() {
  const [activeSection, setActiveSection] = useState('home');

  // The Scroll Spy Engine: Tracks which section is currently in the viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'analytics', 'donate'];
      let current = 'home'; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section reaches the upper 40% of the screen, mark it active
          if (rect.top <= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.topGlow}></div>
      
      <div style={styles.branding}>
        <h1 style={styles.title}>MYT <span style={styles.logo}></span></h1>
        <p style={styles.subtitle}>Built on The Open Network</p>
      </div>

      <nav style={styles.navPill}>
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')} 
          style={activeSection === 'home' ? styles.navLinkActive : styles.navLink}
        >
          Home
        </a>
        <div style={styles.navDivider}></div>
        <a 
          href="#analytics" 
          onClick={(e) => scrollToSection(e, 'analytics')} 
          style={activeSection === 'analytics' ? styles.navLinkActive : styles.navLink}
        >
          Analytics
        </a>
        <div style={styles.navDivider}></div>
        <a 
          href="#donate" 
          onClick={(e) => scrollToSection(e, 'donate')} 
          style={activeSection === 'donate' ? styles.navLinkAccentActive : styles.navLinkAccent}
        >
          Fund a Project
        </a>
        <div style={styles.navDivider}></div>
        <a 
          href="#" 
          style={styles.navLinkDisabled} 
          title="Grant applications open in Q3 2025"
        >
          Apply for Grant
        </a>
      </nav>

      <div style={styles.walletBtn}>
        <TonConnectButton />
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: { 
    pointerEvents: 'auto', // CRITICAL: Reactivates clicks inside the fixed wrapper
    width: '100%',
    maxWidth: '1220px',
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '20px 32px', 
    background: 'rgba(10, 10, 10, 0.75)', 
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    color: 'white',
    borderRadius: '24px',
    border: '1px solid rgba(212,175,55,0.15)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
    position: 'relative',
    overflow: 'hidden',
    flexWrap: 'wrap', 
    gap: '20px'
  },
  topGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, gold, #b9f2ff, gold, transparent)' },
  branding: { display: 'flex', flexDirection: 'column' },
  title: { margin: '0', fontSize: '24px', fontWeight: 700, letterSpacing: '0.5px' },
  logo: { fontSize: '20px' },
  subtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#aaa', letterSpacing: '0.2px' },
  navPill: { display: 'flex', alignItems: 'center', gap: '24px', background: 'rgba(255,255,255,0.02)', padding: '12px 32px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' },
  navDivider: { width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  
  // STANDARD LINK (Grey)
  navLink: { color: '#8b95a8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease', cursor: 'pointer' },
  // ACTIVE LINK (Cyan Glow)
  navLinkActive: { color: '#b9f2ff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 0 12px rgba(185,242,255,0.5)', transition: 'all 0.3s ease', cursor: 'pointer' },
  
  // ACCENT LINK (Resting Yellow)
  navLinkAccent: { color: 'rgba(212,175,55,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease', cursor: 'pointer' },
  // ACCENT LINK ACTIVE (Glowing Yellow)
  navLinkAccentActive: { color: '#FFD700', textDecoration: 'none', fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px', textShadow: '0 0 16px rgba(255,215,0,0.6)', transition: 'all 0.3s ease', cursor: 'pointer' },
  
  navLinkDisabled: { color: '#555', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', cursor: 'not-allowed' },
  walletBtn: { display: 'flex', padding: '4px', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.1)' }
};