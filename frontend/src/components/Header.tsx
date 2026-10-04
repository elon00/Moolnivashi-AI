import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  QrCode, 
  Activity, 
  Cpu, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { WalletType } from '../types';

interface HeaderProps {
  activeWallet: WalletType | null;
  onConnectWallet: (wallet: WalletType) => void;
  onDisconnectWallet: () => void;
  onOpenQR: () => void;
  walletAddress: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeWallet,
  onConnectWallet,
  onDisconnectWallet,
  onOpenQR,
  walletAddress,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const wallets: WalletType[] = ['Internet Identity', 'Plug', 'NFID', 'OISY', 'Bitfinity'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Q
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">MOOLNIVASHI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono font-medium">
                ICP Native Web4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Autonomous AI + ICRC Token + x402 + PQC Platform</p>
          </div>
        </div>

        {/* Live Network Telemetry */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium">Subnet Live</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Finality: 0.98s</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Cycles: 4.88 T</span>
          </div>
        </div>

        {/* Action Controls: QR Code + Multi-Wallet */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenQR}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 text-xs font-mono transition-all shadow-sm hover:border-cyan-500/40"
            title="Scan or Show Moolnivashi QR Code for Instant Payments"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">QR Pay</span>
          </button>

          {/* Wallet Menu Dropdown */}
          <div className="relative">
            {activeWallet ? (
              <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/40 rounded-lg px-3 py-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white font-mono">{activeWallet}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {walletAddress.slice(0, 5)}...{walletAddress.slice(-4)}
                  </div>
                </div>
                <button
                  onClick={onDisconnectWallet}
                  className="ml-2 text-[10px] px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/40 hover:bg-red-900/80"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold font-mono shadow-md shadow-indigo-600/20 transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}

            {showWalletMenu && !activeWallet && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                <div className="text-xs font-semibold text-slate-400 px-3 py-1.5 uppercase font-mono">
                  Select ICP / Multi-Wallet
                </div>
                {wallets.map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      onConnectWallet(w);
                      setShowWalletMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left text-slate-200 hover:bg-indigo-600/20 hover:text-white transition-all group font-mono"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                      {w}
                    </span>
                    <span className="text-[10px] text-slate-500 group-hover:text-cyan-300">
                      {w === 'OISY' ? 'Open signer' : 'SDK wiring pending'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
