import { useState, useEffect } from 'react';
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import axios from 'axios';
import { beginCell, Address, toNano } from '@ton/core';

// Mayana's Trust Vault Address
const VAULT_ADDRESS = "EQD0fUSLiNJSoemRotaKcORECcTsf6VQHYqmCnYXqYXDwBOy";

const SUPPORTED_TOKENS = {
  TON: { name: "Toncoin", symbol: "TON", address: "null", decimals: 9 },
  USDT: { name: "Tether", symbol: "USDT", address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs", decimals: 6 },
};

export function DonationForm() {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS.TON);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);

  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress(); 

  useEffect(() => {
    const fetchLivePrice = async () => {
      try {
        const tokenQuery = selectedToken.symbol === "TON" ? "ton" : selectedToken.address;
        const response = await axios.get(`https://tonapi.io/v2/rates?tokens=${tokenQuery}&currencies=usd`);
        const price = selectedToken.symbol === "TON" 
          ? response.data.rates.TON.prices.USD 
          : response.data.rates[selectedToken.address]?.prices?.USD;
        setTokenPrice(price || (selectedToken.symbol === "USDT" ? 1 : 0)); 
      } catch (error) {
        console.error("Price fetch failed:", error);
      }
    };
    fetchLivePrice();
  }, [selectedToken]);

  const handleDonate = async () => {
    if (!amount || isNaN(Number(amount))) {
      setStatus('Please enter a valid amount.');
      return;
    }

    setIsLoading(true);
    setStatus(`Preparing ${selectedToken.symbol} transaction...`);

    try {
      let tonConnectPayload;

      if (selectedToken.symbol === "USDT") {
        // ==========================================
        // PATH A: THE USDT BYPASS (Direct Jetton Transfer)
        // ==========================================
        setStatus('Fetching Jetton Wallet Data...');

        // 1. Fetch the user's specific USDT wallet address via TonAPI
        const jettonRes = await axios.get(`https://tonapi.io/v2/accounts/${userAddress}/jettons/${selectedToken.address}`);
        
        if (!jettonRes.data.wallet_address || !jettonRes.data.wallet_address.address) {
            throw new Error("You do not have a USDT wallet initialized on this network.");
        }
        
        // 🚨 THE FIX: Parse the raw TonAPI address (0:xxx) and convert it to strict Base64 (EQ...) for TonConnect
        const rawWalletAddress = jettonRes.data.wallet_address.address;
        const userUsdtWallet = Address.parse(rawWalletAddress).toString(); 

        // 2. Build the Jetton Transfer Payload (Opcode: 0xf8a7ea5)
        const usdtAmountNano = BigInt(Math.floor(Number(amount) * 1e6)); // USDT uses 6 decimals

        const body = beginCell()
          .storeUint(0xf8a7ea5, 32) // Jetton transfer opcode
          .storeUint(0, 64) // query_id
          .storeCoins(usdtAmountNano) // amount to transfer
          .storeAddress(Address.parse(VAULT_ADDRESS)) // destination (Your Tact Vault)
          .storeAddress(Address.parse(userAddress)) // response_destination (User gets excess gas back)
          .storeBit(0) // custom_payload
          .storeCoins(toNano("0.02")) // forward_ton_amount (Gas for the Vault to process the JettonTransferNotification)
          .storeBit(0) // forward_payload
          .endCell();

        const base64Payload = body.toBoc().toString('base64');

        // 3. Construct the TonConnect payload
        tonConnectPayload = {
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: [
            {
              address: userUsdtWallet, // Now safely formatted as a Base64 string
              amount: toNano("0.06").toString(), 
              payload: base64Payload
            }
          ]
        };

      } else {
        // ==========================================
        // PATH B: THE NATIVE TON ROUTE (Backend Swap)
        // ==========================================
        const response = await axios.post('https://mayanas-trust-backend.onrender.com/api/get-payload', {
          amount: Number(amount),
          offer_address: null, // Forces native TON
          wallet_address: userAddress
        });

        const stonData = response.data.transaction;
        
        const hexToBase64 = (hexString: string) => {
          let str = '';
          for (let i = 0; i < hexString.length; i += 2) {
              str += String.fromCharCode(parseInt(hexString.substring(i, i + 2), 16));
          }
          return btoa(str);
        };

        const base64Payload = stonData.payload ? hexToBase64(stonData.payload) : "";

        tonConnectPayload = {
          validUntil: Math.floor(Date.now() / 1000) + 180, 
          messages: [
            {
              address: stonData.to || stonData.target_address, 
              amount: String(stonData.value || stonData.send_amount), 
              payload: base64Payload 
            }
          ]
        };
      }

      // --- EXECUTE ---
      setStatus('Please confirm in Tonkeeper...');
      await tonConnectUI.sendTransaction(tonConnectPayload);
      
      setStatus('Success! Thank you for your contribution. 🎉');
      setAmount(''); 

    } catch (error: any) {
      console.error("TRANSACTION ERROR:", error);
      setStatus(`Failed: ${error.message || "Ensure you have enough TON for network gas."}`);
    } finally {
      setIsLoading(false);
    }
  }; 

  const liveUsdValue = tokenPrice && amount && !isNaN(Number(amount)) 
    ? (Number(amount) * tokenPrice).toFixed(2) 
    : "0.00";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topGlow}></div>

        <div style={styles.header}>
          <h2 style={styles.title}>Secure Donation</h2>
          <p style={styles.subtitle}>Native TON & USDT Support</p>
        </div>

        <div style={styles.inputBlock}>
          <div style={styles.inputHeader}>
            <span>Select Asset</span>
            <div style={styles.tabContainer}>
              <button 
                onClick={() => setSelectedToken(SUPPORTED_TOKENS.TON)}
                style={selectedToken.symbol === "TON" ? styles.tabActive : styles.tab}
              >TON</button>
              <button 
                onClick={() => setSelectedToken(SUPPORTED_TOKENS.USDT)}
                style={selectedToken.symbol === "USDT" ? styles.tabActive : styles.tab}
              >USDT</button>
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              style={styles.input}
              disabled={!userAddress || isLoading}
            />
          </div>

          <div style={styles.usdBox}>
            <span>Est. Value</span>
            <strong>${liveUsdValue} USD</strong>
          </div>
        </div>

        <button
          onClick={handleDonate}
          style={userAddress ? styles.button : styles.buttonDisabled}
          disabled={!userAddress || isLoading}
        >
          {isLoading ? "Processing..." : userAddress ? `Contribute ${selectedToken.symbol}` : "Connect Wallet"}
        </button>

        {status && <div style={styles.status}>{status}</div>}
        <div style={styles.footer}>Verified Trust Architecture</div>
      </div>
    </div>
  );
}

// Strictly Typed Styles
const styles: Record<string, React.CSSProperties> = {
  tabContainer: { display: 'flex', gap: '8px' },
  tab: { background: '#222', color: '#777', border: 'none', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 700 },
  tabActive: { background: 'rgba(212,175,55,0.2)', color: 'gold', border: '1px solid gold', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 700 },
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  card: { width: '100%', maxWidth: '420px', background: 'linear-gradient(145deg, #0a0a0a, #111)', borderRadius: '24px', padding: '28px', border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)', position: 'relative', overflow: 'hidden' },
  topGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, gold, #b9f2ff, gold, transparent)' },
  header: { textAlign: 'center', marginBottom: '24px' },
  title: { color: '#fff', margin: 0, fontSize: '22px', fontWeight: 700, letterSpacing: '0.5px' },
  subtitle: { color: '#aaa', fontSize: '13px' },
  inputBlock: { marginBottom: '20px' },
  inputHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#aaa', marginBottom: '8px' },
  inputWrapper: { border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', background: 'rgba(255,255,255,0.02)' },
  input: { width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '28px' },
  usdBox: { marginTop: '12px', display: 'flex', justifyContent: 'space-between', background: 'rgba(212,175,55,0.08)', padding: '10px', borderRadius: '10px', color: '#ddd' },
  button: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 700, background: 'linear-gradient(135deg, gold, #b9f2ff)', color: '#000', cursor: 'pointer', marginTop: '10px' },
  buttonDisabled: { width: '100%', padding: '14px', borderRadius: '12px', background: '#222', color: '#555' },
  status: { marginTop: '14px', padding: '10px', borderRadius: '10px', background: 'rgba(185,242,255,0.1)', color: '#b9f2ff', textAlign: 'center' },
  footer: { marginTop: '18px', textAlign: 'center', fontSize: '12px', color: '#777' }
};