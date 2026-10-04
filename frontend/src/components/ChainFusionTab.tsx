import React, { useState } from 'react';
import { 
  Network, 
  ExternalLink, 
  ArrowRightLeft, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Layers,
  Sparkles
} from 'lucide-react';

export const ChainFusionTab: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<'BTC' | 'ETH' | 'SOL'>('ETH');
  const [isSigning, setIsSigning] = useState(false);
  const [signedTx, setSignedTx] = useState<any>(null);

  const chainDetails = {
    BTC: {
      name: 'Bitcoin Mainnet',
      algo: 'Threshold Schnorr (BIP-340)',
      derivedAddress: 'bc1p9qmoosa88219xkz743mnh0qllf309aaz7',
      canisterService: 'icp_bitcoin_canister',
      description: 'Native Bitcoin transactions signed directly by ICP threshold keys. No wrapped tokens or bridges.'
    },
    ETH: {
      name: 'Ethereum & EVM (Base / Arbitrum)',
      algo: 'Threshold ECDSA (secp256k1)',
      derivedAddress: '0x8821B2c7e099F4e4210d7a04Eb768e718816c84b',
      canisterService: 'evm_rpc_canister',
      description: 'Direct EVM contract calls and multi-chain liquidity interaction using ICP threshold ECDSA.'
    },
    SOL: {
      name: 'Solana Mainnet',
      algo: 'Threshold Ed25519',
      derivedAddress: 'QmS7vxK492MLDSAKyber8821SolanaChainFusionNode',
      canisterService: 'solana_rpc_canister',
      description: 'Interact with Solana programs, SPL tokens, and DeFi directly from Qmoosa AI agent canisters.'
    }
  };

  const handleSimulateThresholdSign = () => {
    setIsSigning(true);
    setSignedTx(null);

    setTimeout(() => {
      setIsSigning(false);
      setSignedTx({
        chain: selectedChain,
        address: chainDetails[selectedChain].derivedAddress,
        signature: '0x7f9a8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
        txHash: `0x${Math.random().toString(16).substring(2, 40)}`,
        status: 'CONFIRMED_VIA_CHAIN_FUSION'
      });
    }, 1000);
  };

  const current = chainDetails[selectedChain];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold font-mono text-white">ICP Chain Fusion Multi-Chain Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Direct custody-free cross-chain interoperability with Bitcoin, Ethereum, and Solana via ICP threshold cryptography.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-lg">
            Zero Bridges • Pure Cryptographic Threshold Signatures
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chain Selector */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 font-mono uppercase mb-2">Supported Chain Fusion Networks</h3>
          
          <button
            onClick={() => setSelectedChain('ETH')}
            className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
              selectedChain === 'ETH'
                ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Ethereum & EVM Chains</span>
            <span className="text-[10px] text-indigo-400">tECDSA</span>
          </button>

          <button
            onClick={() => setSelectedChain('BTC')}
            className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
              selectedChain === 'BTC'
                ? 'bg-amber-600/20 border-amber-500 text-white font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Bitcoin (Taproot / SegWit)</span>
            <span className="text-[10px] text-amber-400">tSchnorr</span>
          </button>

          <button
            onClick={() => setSelectedChain('SOL')}
            className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
              selectedChain === 'SOL'
                ? 'bg-purple-600/20 border-purple-500 text-white font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Solana</span>
            <span className="text-[10px] text-purple-400">tEd25519</span>
          </button>
        </div>

        {/* Chain Details & Simulator */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono">{current.name}</h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {current.algo}
            </span>
          </div>

          <p className="text-xs text-slate-300">{current.description}</p>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-slate-400 text-[11px]">Canister-Controlled Derived Address:</div>
            <div className="text-cyan-300 font-bold break-all">{current.derivedAddress}</div>
            <div className="text-slate-500 text-[10px] mt-1">Interfacing Canister: {current.canisterService}</div>
          </div>

          <button
            onClick={handleSimulateThresholdSign}
            disabled={isSigning}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
          >
            {isSigning ? (
              <span>Generating Threshold Signature...</span>
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4" />
                <span>Simulate Native {selectedChain} Threshold Transaction</span>
              </>
            )}
          </button>

          {signedTx && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1.5 font-mono text-xs">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Transaction Signed Directly by ICP Subnet!</span>
              </div>
              <div className="text-slate-300 truncate">Tx Hash: {signedTx.txHash}</div>
              <div className="text-slate-400 truncate text-[11px]">Threshold Signature: {signedTx.signature}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
