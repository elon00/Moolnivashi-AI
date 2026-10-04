import React, { useState } from 'react';
import { 
  Rocket, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { LaunchpadItem } from '../types';

export const LaunchpadTab: React.FC = () => {
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('100000000');
  const [model, setModel] = useState<'Fixed' | 'Mintable' | 'Governance' | 'Deflationary'>('Governance');
  const [hasVesting, setHasVesting] = useState(true);
  const [cliffDays, setCliffDays] = useState(90);
  const [durationDays, setDurationDays] = useState(365);
  
  const [deployedTokens, setDeployedTokens] = useState<LaunchpadItem[]>([
    {
      id: 1,
      name: 'Conway Autonomous AI Token',
      symbol: 'CAAI',
      decimals: 8,
      supply: '500,000,000',
      model: 'Governance',
      canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
      status: 'Live on ICP'
    },
    {
      id: 2,
      name: 'x402 Data Machine Token',
      symbol: 'XDAT',
      decimals: 8,
      supply: '250,000,000',
      model: 'Mintable',
      canisterId: 'r7inp-6aaaa-aaaaa-aaabq-cai',
      status: 'Live on ICP'
    }
  ]);

  const [manifest, setManifest] = useState<string | null>(null);

  const handleDeployToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenName || !symbol) {
      alert('Please enter a valid token name and symbol');
      return;
    }

    const randomCanisterId = `qmoosa-tok-${Math.floor(Math.random() * 9000 + 1000)}-cai`;
    const newToken: LaunchpadItem = {
      id: deployedTokens.length + 1,
      name: tokenName,
      symbol: symbol.toUpperCase(),
      decimals: 8,
      supply: parseInt(initialSupply).toLocaleString(),
      model: model,
      canisterId: randomCanisterId,
      status: 'Deployed & Active'
    };

    setDeployedTokens([newToken, ...deployedTokens]);

    // Generate manifest
    const manifestObj = {
      token: tokenName,
      symbol: symbol.toUpperCase(),
      standard: ['ICRC-1', 'ICRC-2', 'ICRC-3'],
      ledgerCanister: randomCanisterId,
      decimals: 8,
      initialSupply: initialSupply,
      supplyPolicy: model,
      vesting: hasVesting ? { cliffDays, durationDays, pool: '20% Team/Advisors' } : null,
      deployedAt: new Date().toISOString(),
      governanceController: 'QMOOSA_DAO_SNS'
    };
    setManifest(JSON.stringify(manifestObj, null, 2));

    // Reset inputs
    setTokenName('');
    setSymbol('');
  };

  return (
    <div className="space-y-6">
      {/* Launchpad Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold font-mono text-white">Qmoosa No-Code Token Launchpad</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deploy autonomous ICRC-1/2/3 token canisters directly to the Internet Computer with automated vesting schedules and DAO governance manifests.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-lg">
            Zero Coding Required • Instant Mainnet Registry
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Creation Form */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Create New ICRC Token Canister</span>
          </h3>

          <form onSubmit={handleDeployToken} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Token Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Quantum Autonomous Token"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Symbol:</label>
                <input
                  type="text"
                  placeholder="e.g. QAT"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Initial Supply:</label>
                <input
                  type="number"
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Supply Economic Model:</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Governance">Governance-Controlled Mintable (Recommended)</option>
                  <option value="Fixed">Fixed Hard Cap</option>
                  <option value="Mintable">Uncapped Mintable</option>
                  <option value="Deflationary">Deflationary (Auto Burn on Tx)</option>
                </select>
              </div>
            </div>

            {/* Vesting Options */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-semibold">Enable Automated Vesting Schedule</span>
                <input
                  type="checkbox"
                  checked={hasVesting}
                  onChange={(e) => setHasVesting(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
              </div>

              {hasVesting && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Cliff Period (Days):</label>
                    <input
                      type="number"
                      value={cliffDays}
                      onChange={(e) => setCliffDays(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Total Vesting Duration (Days):</label>
                    <input
                      type="number"
                      value={durationDays}
                      onChange={(e) => setDurationDays(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Deploy Token Canister to ICP</span>
            </button>
          </form>

          {/* Generated Manifest */}
          {manifest && (
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-400 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Deployment Manifest Registered</span>
                </span>
                <span className="text-[10px] text-slate-400">ICRC Manifest</span>
              </div>
              <pre className="text-slate-300 text-[11px] overflow-x-auto p-2 bg-slate-900/80 rounded border border-slate-800">
                {manifest}
              </pre>
            </div>
          )}
        </div>

        {/* Deployed Tokens List */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Launched Token Canisters</span>
          </h3>

          <div className="space-y-3">
            {deployedTokens.map((t) => (
              <div key={t.id} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white font-mono">{t.name}</span>
                  <span className="text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                    {t.symbol}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">Supply: {t.supply} • {t.model}</div>
                <div className="text-[10px] font-mono text-cyan-400 mt-2 truncate">Canister: {t.canisterId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
