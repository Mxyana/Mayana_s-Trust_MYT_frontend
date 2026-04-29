import React, { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Screen Size Detector (Replaces CSS Media Queries)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // The Scroll Spy Engine
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'analytics', 'donate'];
      let current = 'home'; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Instantly close the mobile menu when a link is tapped
    
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
      
      {/* Left Side: Branding */}
      <div style={styles.branding}>
        <h1 style={styles.title}>MYT<span style={styles.logo}></span></h1>
        <p style={styles.subtitle}>Powered by ston.fi</p>
      </div>

      {/* Center: Desktop Navigation Pill (Hidden on Mobile) */}
      {!isMobile && (
        <nav style={styles.navPill}>
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} style={activeSection === 'home' ? styles.navLinkActive : styles.navLink}>Home</a>
          <div style={styles.navDivider}></div>
          <a href="#analytics" onClick={(e) => scrollToSection(e, 'analytics')} style={activeSection === 'analytics' ? styles.navLinkActive : styles.navLink}>Analytics</a>
          <div style={styles.navDivider}></div>
          <a href="#donate" onClick={(e) => scrollToSection(e, 'donate')} style={activeSection === 'donate' ? styles.navLinkAccentActive : styles.navLinkAccent}>Fund a Project</a>
        </nav>
      )}

      {/* Right Side: Wallet & Mobile Menu Toggle */}
      <div style={styles.rightControls}>
        <div style={styles.walletBtn}>
          <TonConnectButton />
        </div>
        
        {/* The Hamburger Button */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            style={styles.burgerButton}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Card with Framer Motion */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={styles.mobileMenuCard}
          >
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} style={activeSection === 'home' ? styles.mobileLinkActive : styles.mobileLink}>Home</a>
            <a href="#analytics" onClick={(e) => scrollToSection(e, 'analytics')} style={activeSection === 'analytics' ? styles.mobileLinkActive : styles.mobileLink}>Analytics</a>
            <a href="#donate" onClick={(e) => scrollToSection(e, 'donate')} style={activeSection === 'donate' ? styles.mobileLinkAccentActive : styles.mobileLinkAccent}>Fund a Project</a>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: { 
    pointerEvents: 'auto', width: '100%', maxWidth: '1220px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '12px 20px', 
    background: 'rgba(10, 10, 10, 0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    color: 'white', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.15)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)', position: 'relative'
  },
  topGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, gold, #b9f2ff, gold, transparent)', borderRadius: '20px 20px 0 0' },
  branding: { display: 'flex', flexDirection: 'column' },
  title: { margin: '0', fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px' },
  logo: { fontSize: '16px' },
  subtitle: { margin: '2px 0 0 0', fontSize: '11px', color: '#aaa', letterSpacing: '0.2px' },
  
  navPill: { display: 'flex', alignItems: 'center', gap: '24px', background: 'rgba(255,255,255,0.02)', padding: '10px 28px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' },
  navDivider: { width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  
  navLink: { color: '#8b95a8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease', cursor: 'pointer' },
  navLinkActive: { color: '#b9f2ff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 0 12px rgba(185,242,255,0.5)', transition: 'all 0.3s ease', cursor: 'pointer' },
  navLinkAccent: { color: 'rgba(212,175,55,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease', cursor: 'pointer' },
  navLinkAccentActive: { color: '#FFD700', textDecoration: 'none', fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px', textShadow: '0 0 16px rgba(255,215,0,0.6)', transition: 'all 0.3s ease', cursor: 'pointer' },
  
  rightControls: { display: 'flex', alignItems: 'center', gap: '12px' },
  walletBtn: { display: 'flex', padding: '2px', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.1)' },
  
  // Mobile Burger Icon
  burgerButton: { background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '8px' },
  
  // The Floating Dropdown Card
  mobileMenuCard: {
    position: 'absolute', top: '70px', right: '16px',
    background: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px',
    padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.8)', minWidth: '180px', zIndex: 100
  },
  
  // Mobile Links (Larger touch targets)
  mobileLink: { color: '#8b95a8', textDecoration: 'none', fontSize: '15px', fontWeight: 600, paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  mobileLinkActive: { color: '#b9f2ff', textDecoration: 'none', fontSize: '15px', fontWeight: 700, textShadow: '0 0 12px rgba(185,242,255,0.4)', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  mobileLinkAccent: { color: 'rgba(212,175,55,0.8)', textDecoration: 'none', fontSize: '15px', fontWeight: 700 },
  mobileLinkAccentActive: { color: '#FFD700', textDecoration: 'none', fontSize: '15px', fontWeight: 800, textShadow: '0 0 16px rgba(255,215,0,0.5)' }
};
