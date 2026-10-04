import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ArrowUpRight, Zap } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('50');
  const [mode, setMode] = useState<'receive' | 'x402'>('receive');

  if (!isOpen) return null;

  const currentAddress = walletAddress || '2vxsx-fae-qmoosa-principal-example';
  const qrUri = mode === 'receive' 
    ? `qmoosa://pay?network=icp&token=QMOOSA&amount=${amount}&recipient=${currentAddress}`
    : `x402://pay?service=agent-inference-deep&cost=0.005&recipient=${currentAddress}&invoice=x402-inv-8821`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <QrCode className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-bold text-white font-mono">Qmoosa Multi-Wallet QR System</h3>
        </div>

        {/* Mode switcher */}
        <div className="flex rounded-lg bg-slate-950 p-1 mb-5 border border-slate-800">
          <button
            onClick={() => setMode('receive')}
            className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              mode === 'receive' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Receive QMOOSA
          </button>
          <button
            onClick={() => setMode('x402')}
            className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              mode === 'x402' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            x402 Agent Invoice
          </button>
        </div>

        {/* High-Tech QR Code SVG Visual */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 mb-4 shadow-inner">
          <div className="relative p-3 bg-white rounded-lg shadow-lg">
            <svg className="w-48 h-48" viewBox="0 0 100 100" fill="currentColor">
              {/* QR Finder Top-Left */}
              <rect x="5" y="5" width="30" height="30" rx="3" fill="#0f172a" />
              <rect x="10" y="10" width="20" height="20" fill="white" />
              <rect x="15" y="15" width="10" height="10" fill="#4338ca" />

              {/* QR Finder Top-Right */}
              <rect x="65" y="5" width="30" height="30" rx="3" fill="#0f172a" />
              <rect x="70" y="10" width="20" height="20" fill="white" />
              <rect x="75" y="15" width="10" height="10" fill="#4338ca" />

              {/* QR Finder Bottom-Left */}
              <rect x="5" y="65" width="30" height="30" rx="3" fill="#0f172a" />
              <rect x="10" y="70" width="20" height="20" fill="white" />
              <rect x="15" y="75" width="10" height="10" fill="#4338ca" />

              {/* Data Blocks Pattern */}
              <rect x="42" y="8" width="6" height="6" fill="#0f172a" />
              <rect x="52" y="16" width="6" height="6" fill="#0f172a" />
              <rect x="40" y="24" width="6" height="6" fill="#06b6d4" />
              <rect x="48" y="32" width="6" height="6" fill="#0f172a" />

              <rect x="8" y="42" width="6" height="6" fill="#0f172a" />
              <rect x="18" y="48" width="6" height="6" fill="#4338ca" />
              <rect x="28" y="42" width="6" height="6" fill="#0f172a" />
              
              <rect x="42" y="42" width="16" height="16" rx="4" fill="#6366f1" />
              
              <rect x="66" y="45" width="8" height="6" fill="#0f172a" />
              <rect x="78" y="52" width="6" height="6" fill="#06b6d4" />
              <rect x="86" y="42" width="6" height="6" fill="#0f172a" />

              <rect x="44" y="66" width="8" height="6" fill="#0f172a" />
              <rect x="56" y="74" width="6" height="8" fill="#4338ca" />
              <rect x="70" y="68" width="6" height="6" fill="#0f172a" />
              <rect x="82" y="78" width="8" height="8" fill="#06b6d4" />
              <rect x="48" y="86" width="8" height="6" fill="#0f172a" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-slate-900 text-cyan-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyan-400/40">
                QMOOSA
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Instant Finality on ICP Canisters</span>
          </div>
        </div>

        {/* Amount Input for Receive */}
        {mode === 'receive' && (
          <div className="mb-3">
            <label className="text-xs text-slate-400 font-mono block mb-1">Requested QMOOSA Amount:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
              <span className="text-xs font-mono text-cyan-400 font-bold">QMOOSA</span>
            </div>
          </div>
        )}

        {/* URI text and Copy */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div className="truncate text-xs font-mono text-slate-400">
            {qrUri}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy URI'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
