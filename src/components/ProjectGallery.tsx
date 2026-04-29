export function ProjectGallery() {
  const projects = [
    {
      title: "TON Campus Connect",
      category: "Web3 Education",
      description: "A grassroots initiative hosting workshops across universities to teach developers how to write smart contracts on the TON blockchain using Tact.",
      status: "In Development"
    },
    {
      title: "Learn-to-Earn Telegram Mini-App",
      category: "User Onboarding",
      description: "An interactive Telegram bot that rewards everyday users with micro-grants in TON for completing educational modules about DeFi, STON.fi, and Tonkeeper security.",
      status: "In Development"
    }
  ];

  return (
    <div style={styles.wrapper}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.topGlow}></div>
        <div style={styles.headerContent}>
          <div style={styles.accentBadge}>
            <span style={styles.accentDot}></span>
            <span style={styles.accentText}>Live Initiatives</span>
          </div>
          <h2 style={styles.mainTitle}>Active TON Ecosystem Projects</h2>
          <p style={styles.headerDescription}>
            Transparent funding allocation for community-driven innovation.
          </p>
        </div>
        
        <button style={styles.applyButton} disabled>
          <span style={styles.applyButtonContent}>
            <span style={styles.applyText}>Apply for Grant</span>
            <span style={styles.applyBadge}>Q3 2025</span>
          </span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={styles.projectsGrid}>
        {projects.map((proj, idx) => (
          <div key={idx} style={styles.projectCard}>
            <div style={styles.cardGlow}></div>
            
            <div style={styles.categoryTag}>
              <span style={styles.tagText}>{proj.category}</span>
            </div>

            <div style={styles.projectContent}>
              <h3 style={styles.projectTitle}>{proj.title}</h3>
              <p style={styles.projectDescription}>{proj.description}</p>
            </div>

            <div style={styles.statusFooter}>
              <div style={styles.statusIndicator}>
                <div style={styles.statusDot}></div>
                <div style={styles.statusPulse}></div>
              </div>
              <span style={styles.statusLabel}>{proj.status}</span>
              <div style={styles.statusDivider}></div>
              <span style={styles.fundingText}>Verified Route</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info Bar */}
      <div style={styles.infoBar}>
        <div style={styles.infoItem}>
          <span style={styles.infoIcon}></span>
          <span style={styles.infoText}>On-chain Tracking</span>
        </div>
        <div style={styles.infoDivider}></div>
        <div style={styles.infoItem}>
          <span style={styles.infoIcon}></span>
          <span style={styles.infoText}>Instant Settlement via Omniston</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    marginBottom: '48px'
  },
  headerSection: {
    marginBottom: '32px',
    padding: '32px',
    background: 'linear-gradient(145deg, #0a0a0a, #111)',
    borderRadius: '24px',
    border: '1px solid rgba(212,175,55,0.25)',
    position: 'relative' as const,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '20px'
  },
  topGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, gold, #b9f2ff, gold, transparent)'
  },
  headerContent: { flex: 1 },
  accentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    background: 'rgba(212,175,55,0.1)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '20px',
    marginBottom: '12px'
  },
  accentDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'gold',
    boxShadow: '0 0 8px gold'
  },
  accentText: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'gold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px'
  },
  mainTitle: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '8px'
  },
  headerDescription: {
    margin: 0,
    fontSize: '14px',
    color: '#aaa'
  },
  applyButton: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    cursor: 'not-allowed'
  },
  applyButtonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px'
  },
  applyText: { fontSize: '14px', fontWeight: '600', color: '#666' },
  applyBadge: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#aaa',
    padding: '4px 8px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '6px'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  projectCard: {
    background: 'linear-gradient(145deg, #0a0a0a, #111)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '24px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  },
  cardGlow: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(185,242,255,0.05) 0%, transparent 70%)',
    pointerEvents: 'none' as const
  },
  categoryTag: {
    padding: '6px 12px',
    borderRadius: '8px',
    background: 'rgba(185,242,255,0.08)',
    border: '1px solid rgba(185,242,255,0.15)',
    width: 'fit-content'
  },
  tagText: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#b9f2ff',
    textTransform: 'uppercase' as const
  },
  projectContent: { flex: 1 },
  projectTitle: {
    margin: '0 0 10px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff'
  },
  projectDescription: {
    margin: 0,
    fontSize: '14px',
    color: '#aaa',
    lineHeight: '1.6'
  },
  statusFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  statusIndicator: { position: 'relative' as const, width: '10px', height: '10px' },
  statusDot: {
    width: '8px',
    height: '8px',
    background: '#00E676',
    borderRadius: '50%',
    position: 'absolute' as const,
    zIndex: 2
  },
  statusPulse: {
    width: '8px',
    height: '8px',
    background: '#00E676',
    borderRadius: '50%',
    position: 'absolute' as const,
    opacity: 0.4,
    animation: 'pulse 2s infinite'
  },
  statusLabel: { fontSize: '13px', fontWeight: '700', color: '#00E676' },
  statusDivider: { width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.1)' },
  fundingText: { fontSize: '12px', color: '#555', fontWeight: '600' },
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    padding: '16px',
    background: 'rgba(212,175,55,0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(212,175,55,0.1)'
  },
  infoItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  infoIcon: { fontSize: '14px' },
  infoText: { fontSize: '12px', color: '#777', fontWeight: '500' },
  infoDivider: { width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.05)' }
};