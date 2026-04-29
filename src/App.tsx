import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { VaultStats } from './components/VaultStats';
import { DonationForm } from './components/DonationForm';
import { ProjectGallery } from './components/ProjectGallery';

const manifestUrl = "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1, ease: [0.16, 1, 0.3, 1] } } };
const itemVariants: any = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fadeUp: any = { initial: { opacity: 0, y: 60, scale: 0.97 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, margin: "-120px" }, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } };
const scaleIn: any = { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } };

export default function App() {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div style={styles.pageBackground}>
        
        {/* ADDED: The High-Visibility Security Banner */}
        <div style={styles.warningBanner}>
          ⚠️ SMART CONTRACT AUDIT IN PROCESS — DO NOT SEND REAL FUNDS, ANY FUNDS SENT MUST BE MANUALLY REVIEWED FOR REFUND WITH 25 PERCENT PENALTY
                  </div>

        <div style={styles.ambientGlow}></div>
        
        <motion.div 
          style={styles.navWrapper}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Header />
        </motion.div>

        <main style={styles.mainContent}>
          
          <motion.section 
            id="home"
            style={styles.heroSection}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div style={styles.badge} variants={itemVariants}>
              <span style={styles.badgeDot}></span> SYSTEM STATUS: OPERATIONAL
            </motion.div>
            
            <motion.h2 style={styles.heroTitle} variants={itemVariants}>
              Funding the Next <br /> <span style={styles.heroTitleAccent}>Generation of Builders</span>
            </motion.h2>
            
            <motion.div style={styles.heroTextContainer} variants={itemVariants}>
              <p style={styles.heroText}>Mayana's Trust [MYT] isn't just a vault; it's a decentralized engine designed to bridge the gap between community liquidity and high-impact innovation on the TON blockchain.</p>
              <p style={styles.heroSubText}>We provide the architecture. You provide the fuel. Together, we build the open network of tomorrow.</p>
            </motion.div>
            
            <motion.div style={styles.scrollIndicator} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0}} transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 1.8 } }}>
              SCROLL TO EXPLORE ARCHITECTURE
            </motion.div>
          </motion.section>

          <motion.section id="analytics" style={styles.dataSection} {...fadeUp}>
             <div style={styles.contentWrapper}>
                <motion.div style={styles.textSide} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                  <motion.div style={styles.sectionLabel} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>01. TREASURY ANALYTICS</motion.div>
                  <motion.h3 style={styles.sectionTitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>Real-Time Transparency</motion.h3>
                  <motion.p style={styles.sectionDesc} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>Trust is earned through data. Our Vault Analytics provide a live window into the treasury, showing exactly how much has been raised and how close we are to our next funding milestone.</motion.p>
                  <motion.ul style={styles.featureList} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}>
                    {['• Automated On-Chain Tracking', '• Real-Time Fiat Valuation', '• Transparent Milestone Progress'].map((item, i) => (
                      <motion.li key={i} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>{item}</motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                <motion.div style={styles.uiSide} {...scaleIn} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
                   <VaultStats />
                </motion.div>
             </div>
          </motion.section>

          <motion.section style={styles.impactSection} {...fadeUp}>
            <motion.div style={styles.centerContent} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <motion.div style={styles.sectionLabel} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>02. ACTIVE INITIATIVES</motion.div>
              <motion.h3 style={styles.sectionTitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>Where Your Impact Lives</motion.h3>
              <motion.p style={styles.sectionDescCentered} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>We don't just fund projects; we fuel ecosystems. Every initiative in our gallery is vetted for its potential to bring new developers, users, and security to the TON network.</motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
              <ProjectGallery />
            </motion.div>
          </motion.section>

          <motion.section id="donate" style={styles.actionSection} {...fadeUp}>
            <div style={styles.contentWrapper}>
              <motion.div style={styles.uiSide} {...scaleIn} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                 <DonationForm />
              </motion.div>
              <motion.div style={styles.textSide} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
                <motion.div style={styles.sectionLabel} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>03. SECURE CONTRIBUTION</motion.div>
                <motion.h3 style={styles.sectionTitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>Fuel the Architecture</motion.h3>
                <motion.p style={styles.sectionDesc} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>Contributing to Mayana's Trust is seamless. Our backend dynamically routes your donation through STON.fi, converting your assets into stable USDT to ensure the longevity of our grant pool.</motion.p>
                <motion.div style={styles.trustBadge} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}><strong>Verified Route:</strong> Native TON or USDT processed with automated 3-minute TTL protection.</motion.div>
              </motion.div>
            </div>
            <motion.footer style={styles.footer} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Mayana's Trust • The Architect of Logic • 2026</motion.footer>
          </motion.section>

        </main>
      </div>
    </TonConnectUIProvider>
  );
}

const styles: Record<string, any> = {
  // NEW: Premium, non-panic security banner (Obsidian & Gold)
  warningBanner: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: 'rgba(10, 10, 10, 0.85)', // Dark obsidian to blend in
    backdropFilter: 'blur(12px)', // Frosted glass effect
    WebkitBackdropFilter: 'blur(12px)',
    color: 'gold', // Signature gold to stand out without screaming danger
    borderBottom: '1px solid rgba(212,175,55,0.25)', // Subtle gold bottom border
    textAlign: 'center',
    padding: '10px 20px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    zIndex: 2000,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
  },
  
  pageBackground: { backgroundColor: '#050505', minHeight: '100vh', width: '100%', color: 'white', fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif', position: 'relative', overflowX: 'hidden' },
  ambientGlow: { position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100vh', background: 'radial-gradient(circle at 50% 20%, rgba(212,175,55,0.03) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
  
  // ADJUSTED: Pushed top down to 32px to make room for the warning banner
  navWrapper: { 
    position: 'fixed', 
    top: '32px', 
    left: 0, 
    width: '100%', 
    padding: '24px 40px 0', 
    zIndex: 1000, 
    pointerEvents: 'none', 
    display: 'flex', 
    justifyContent: 'center' 
  },
  
  mainContent: { position: 'relative', zIndex: 1 },
  
  // ADJUSTED: Extra padding top so the hero text clears the header and banner completely
  heroSection: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '140px 40px 80px' },
  
  heroTextContainer: { maxWidth: '720px', margin: '0 auto' },
  heroSubText: { fontSize: '17px', color: '#666', marginTop: '20px', lineHeight: '1.65' },
  dataSection: { padding: '140px 40px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.01), transparent)', marginTop: '60px' },
  impactSection: { padding: '160px 40px' },
  actionSection: { padding: '140px 40px 80px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.02))', marginTop: '40px' },
  contentWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1240px', margin: '0 auto', gap: '100px', flexWrap: 'wrap' },
  textSide: { flex: '1 1 460px', textAlign: 'left' },
  uiSide: { flex: '1 1 460px' },
  sectionTitle: { fontSize: '40px', fontWeight: 800, color: '#fff', marginBottom: '24px', letterSpacing: '-1.2px', lineHeight: '1.15' },
  sectionDesc: { fontSize: '16px', color: '#8B95A8', lineHeight: '1.7', marginBottom: '28px' },
  sectionDescCentered: { fontSize: '18px', color: '#8B95A8', lineHeight: '1.7', maxWidth: '740px', margin: '0 auto 50px auto', textAlign: 'center' },
  featureList: { listStyle: 'none', padding: 0, color: 'gold', fontWeight: 600, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '32px' },
  trustBadge: { marginTop: '36px', padding: '18px 20px', background: 'rgba(212,175,55,0.05)', borderLeft: '4px solid gold', color: '#aaa', fontSize: '13px', lineHeight: '1.6', borderRadius: '2px' },
  centerContent: { textAlign: 'center', marginBottom: '80px' },
  sectionLabel: { fontSize: '11px', fontWeight: 700, color: 'gold', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', fontWeight: 700, color: '#666', marginBottom: '32px' },
  badgeDot: { width: '7px', height: '7px', borderRadius: '50%', background: '#00E676', boxShadow: '0 0 10px #00E676' },
  heroTitle: { fontSize: '72px', lineHeight: '1.1', fontWeight: 800, color: '#fff', letterSpacing: '-2.5px', marginBottom: '32px' },
  heroTitleAccent: { background: 'linear-gradient(135deg, gold 0%, #b9f2ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroText: { fontSize: '22px', color: '#8B95A8', lineHeight: '1.65' },
  scrollIndicator: { marginTop: '100px', fontSize: '10px', fontWeight: 700, color: '#444', letterSpacing: '3.5px' },
  footer: { marginTop: '140px', textAlign: 'center', fontSize: '11px', color: '#444', letterSpacing: '1.5px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '50px' }
};