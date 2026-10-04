import React from 'react';
import { 
  Coins, 
  Vote, 
  Rocket, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Network,
  Sparkles,
  Server,
  AlertCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { TabType } from '../types';

interface DashboardTabProps {
  onNavigate: (tab: TabType) => void;
  onOpenQR: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ onNavigate, onOpenQR }) => {
  const canisters = [
    { name: 'token', type: 'ICRC-1/2/3 Ledger', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'dao_governance', type: 'SNS Neuron Staking', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'launchpad', type: 'Token Factory', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'x402_gateway', type: 'HTTP 402 Micropayments', id: 'Pending dfx deploy (canister_ids.json)', status: 'Fail-Closed' },
    { name: 'agent_orchestrator', type: 'Multi-Model Router', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'conway_engine', type: 'Cellular Automaton AI', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'automation', type: 'Native Canister Timers', id: 'Pending dfx deploy (canister_ids.json)', status: 'Source Validated' },
    { name: 'pqc', type: 'NIST FIPS 204 ML-DSA', id: 'Pending dfx deploy (canister_ids.json)', status: 'Architecture Ready' },
  ];

  return (
    <div className="space-y-6">
      {/* Strict Deployment Truth Status Banner */}
      <div className="rounded-xl bg-amber-950/40 border border-amber-500/40 p-4 font-mono text-xs text-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">
            Current Status: Localhost Web Preview Active • Source Code Integrated • Mainnet Canister Deployment Pending
          </div>
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            Qmoosa canisters are implemented in Motoko and passing local/PocketIC tests. As per the strict deployment rule, canisters are considered <strong>mainnet deployed</strong> only after <code>dfx deploy --network ic</code> succeeds, real canister IDs are generated and committed to <code>canister_ids.json</code>, and independently verified on ICP Dashboard. Do not confuse DFINITY system canister IDs (e.g., NNS Ledger, CMC, Root) with Qmoosa deployments.
          </p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Full-Stack Autonomous Web3 + AI Architecture</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Qmoosa ICP Autonomous Operating Platform
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Synchronizing ICRC-1/2/3 tokenomics, SNS DAO neuron staking, no-code launchpad, x402 machine micropayments, Conway Automaton AI, post-quantum security (ML-DSA/ML-KEM), and native canister timers on the Internet Computer.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('token_dao')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Coins className="w-4 h-4" />
              <span>Stake QMOOSA</span>
            </button>
            <button
              onClick={() => onNavigate('launchpad')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Rocket className="w-4 h-4" />
              <span>Launchpad</span>
            </button>
            <button
              onClick={onOpenQR}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700 transition-all"
            >
              <span>Instant QR Pay</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Testing Setup Card */}
      <div className="glass-card rounded-xl p-5 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono">Official Testing Setup: TESTICP Faucet + OISY Wallet + ICP Dashboard</h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            Active Testing Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="text-slate-400 text-[11px]">Official TESTICP Ledger Canister:</div>
            <div className="text-cyan-300 font-bold select-all">xafvr-biaaa-aaaai-aql5q-cai</div>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://faucet.internetcomputer.org/" 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-1"
              >
                <span>Free Faucet (Claim 10 TESTICP)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://dashboard.internetcomputer.org/tokens/xafvr-biaaa-aaaai-aql5q-cai/transactions" 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
              >
                <span>Live Transactions Scanner</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="text-slate-400 text-[11px]">Verified OISY Testing Identity:</div>
            <div className="text-slate-300 text-[10px] truncate select-all">Principal: ygwoo-ajcpq-dppl7-2ejwb-msjm2-tehg2-z56er-vbrxu-ne7hp-kdbth-2ae</div>
            <div className="text-slate-400 text-[10px] truncate select-all">Account ID: ad66df0c17780b506d45ac4ad2699069e70cf7824ed99a57c8b74b7eeb292f5f</div>
            <a 
              href="https://dashboard.internetcomputer.org/account/ad66df0c17780b506d45ac4ad2699069e70cf7824ed99a57c8b74b7eeb292f5f" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-1 pt-1"
            >
              <span>Scan Account Transactions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Primary System Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Token Metric */}
        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">QMOOSA Model</span>
            <Coins className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">Uncapped DAO</div>
          <div className="text-xs text-indigo-300 font-mono mt-1">
            <span>Requires Passed Proposal & Timelock</span>
          </div>
        </div>

        {/* Staking & Governance */}
        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">SNS Governance</span>
            <Vote className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">Neurons (1-24m)</div>
          <div className="text-xs text-emerald-400 font-mono mt-1">
            <span>Up to 2.0x Linear Voting Multiplier</span>
          </div>
        </div>

        {/* x402 Micropayments */}
        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">x402 Protocol</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">Fail-Closed</div>
          <div className="text-xs text-yellow-300 font-mono mt-1">
            <span>Enforces Ledger Settlement Proof</span>
          </div>
        </div>

        {/* PQC Security */}
        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">PQC Architecture</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">NIST FIPS 204</div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            <span>ML-DSA Verifier Integration Pending</span>
          </div>
        </div>
      </div>

      {/* Canister Status Grid */}
      <div className="glass-card rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white font-mono">Qmoosa ICP Canisters Topology & Mainnet Readiness</h2>
          </div>
          <span className="text-xs text-amber-400 font-mono bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full">
            Local Source Ready • Mainnet Unassigned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {canisters.map((c) => (
            <div key={c.name} className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white">{c.name}</span>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-900/40 px-1.5 py-0.5 rounded">
                  {c.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{c.type}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-2 truncate">{c.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
