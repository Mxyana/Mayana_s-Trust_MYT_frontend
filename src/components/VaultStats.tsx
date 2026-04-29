export function VaultStats() {
  // Mock data for the UI. Later, this will fetch from your smart contract.
  const currentRaised = 12500; 
  const targetGoal = 50000;
  
  // Calculate the percentage for the progress bar
  const progressPercent = Math.min((currentRaised / targetGoal) * 100, 100);

  return (
    <div style={styles.card}>
      {/* Signature Vault Glow */}
      <div style={styles.topGlow}></div>

      <h2 style={styles.title}>Vault Analytics</h2>
      
      <div style={styles.statsRow}>
        <div style={styles.statBox}>
          <span style={styles.label}>Total Raised</span>
          <span style={styles.value}>${currentRaised.toLocaleString()}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.label}>Target Goal</span>
          <span style={styles.targetValue}>${targetGoal.toLocaleString()}</span>
        </div>
      </div>

      {/* The Styled Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar(progressPercent)}>
          <div style={styles.progressShimmer}></div>
        </div>
      </div>
      
      <div style={styles.footerRow}>
        <span style={styles.liveIndicator}>
          <span style={styles.liveDot}></span>
          Live Chain Data
        </span>
        <p style={styles.progressText}>{progressPercent}% Funded</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'linear-gradient(145deg, #0a0a0a, #111)',
    padding: '28px',
    borderRadius: '24px',
    border: '1px solid rgba(212,175,55,0.25)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
    position: 'relative' as const,
    overflow: 'hidden',
    marginBottom: '20px',
    color: 'white'
  },
  topGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, gold, #b9f2ff, gold, transparent)'
  },
  title: { 
    margin: '0 0 20px 0', 
    fontSize: '14px', 
    color: '#aaa', 
    textTransform: 'uppercase' as const, 
    letterSpacing: '1.5px',
    fontWeight: 700 
  },
  statsRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    marginBottom: '28px',
    alignItems: 'flex-end'
  },
  statBox: { display: 'flex', flexDirection: 'column' as const },
  label: { 
    fontSize: '11px', 
    color: '#666', 
    textTransform: 'uppercase' as const, 
    letterSpacing: '1px',
    marginBottom: '4px'
  },
  value: { 
    fontSize: '32px', 
    fontWeight: 800, 
    color: 'gold', 
    letterSpacing: '-0.5px' 
  },
  targetValue: { 
    fontSize: '20px', 
    fontWeight: 600, 
    color: '#fff',
    opacity: 0.9
  },
  progressContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  progressBar: (percent: number) => ({
    width: `${percent}%`,
    height: '100%',
    background: 'linear-gradient(90deg, gold, #b9f2ff)',
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const
  }),
  progressShimmer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: 'shimmer 2s infinite'
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#555',
    fontWeight: 600
  },
  liveDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#b9f2ff',
    boxShadow: '0 0 5px #b9f2ff'
  },
  progressText: { 
    margin: 0, 
    fontSize: '13px', 
    color: '#b9f2ff', 
    fontWeight: 700 
  }
};