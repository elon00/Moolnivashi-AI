import React, { useState } from 'react';
import { 
  Coins, 
  Vote, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  Lock, 
  Unlock, 
  TrendingUp, 
  Layers,
  ArrowRight,
  Flame
} from 'lucide-react';
import { DAOProposal, StakingNeuron } from '../types';

export const TokenDAOTab: React.FC = () => {
  // Staking states
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [dissolveDelayMonths, setDissolveDelayMonths] = useState(6);
  const [userNeurons, setUserNeurons] = useState<StakingNeuron[]>([
    { id: 101, amount: 50000, dissolveDelayDays: 180, votingPower: 75000, isDissolving: false },
    { id: 102, amount: 25000, dissolveDelayDays: 365, votingPower: 50000, isDissolving: false }
  ]);

  // Governance Proposals
  const [proposals, setProposals] = useState<DAOProposal[]>([
    {
      id: 1,
      proposer: 'QMOOSA_GENESIS_CORE',
      title: 'Ratify Qmoosa ICP Autonomous Protocol & Global Tokenomics Standard',
      description: 'Formalize ICRC-1/2/3 token parameters, uncapped DAO-minting safeguards, x402 Bazaar fee policies, and Post-Quantum ML-DSA security anchoring.',
      proposalType: 'LaunchpadPolicy',
      yesVotes: 125000000,
      noVotes: 1200000,
      quorum: 50000000,
      deadline: '24 hours remaining',
      status: 'Passed'
    },
    {
      id: 2,
      proposer: '2vxsx-fae-dao-agent',
      title: 'Authorize 2,500,000 QMOOSA Minting for Developer Grants & Launchpad Incentives',
      description: 'Programmatic issuance under uncapped supply policy to bootstrap decentralized AI agent builders deploying on Qmoosa x402 Bazaar.',
      proposalType: 'TokenMint',
      yesVotes: 89000000,
      noVotes: 4300000,
      quorum: 50000000,
      deadline: '48 hours remaining',
      status: 'Active'
    },
    {
      id: 3,
      proposer: 'solana-fusion-node',
      title: 'Integrate Solana Threshold Key Derivation via ICP Chain Fusion',
      description: 'Enable direct Solana ed25519 threshold transactions from Qmoosa agent canisters without external bridge custodians.',
      proposalType: 'ProtocolUpgrade',
      yesVotes: 112000000,
      noVotes: 800000,
      quorum: 50000000,
      deadline: 'Completed',
      status: 'Executed'
    }
  ]);

  // Handle stake
  const handleStake = () => {
    const amt = parseFloat(stakeAmount);
    if (isNaN(amt) || amt <= 0) return;

    // Dissolve delay bonus multiplier
    const bonus = 1 + (dissolveDelayMonths / 12) * 0.5;
    const vp = Math.round(amt * bonus);

    const newNeuron: StakingNeuron = {
      id: Math.floor(Math.random() * 900) + 200,
      amount: amt,
      dissolveDelayDays: dissolveDelayMonths * 30,
      votingPower: vp,
      isDissolving: false
    };

    setUserNeurons([newNeuron, ...userNeurons]);
    alert(`Staked ${amt} QMOOSA successfully! Created Neuron #${newNeuron.id} with ${vp} Voting Power.`);
  };

  // Handle vote
  const handleVote = (proposalId: number, approve: boolean) => {
    setProposals(proposals.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          yesVotes: approve ? p.yesVotes + 75000 : p.yesVotes,
          noVotes: !approve ? p.noVotes + 75000 : p.noVotes
        };
      }
      return p;
    }));
    alert(`Vote recorded on Proposal #${proposalId}! Voting power (75,000) applied.`);
  };

  return (
    <div className="space-y-6">
      {/* Token Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-mono text-white">QMOOSA Native Token</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-500/40 font-semibold">
                ICRC-1 / ICRC-2 / ICRC-3
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic 1-second block finality on Internet Computer with uncapped DAO-mintable supply policy.
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <div className="text-slate-500">Decimals</div>
              <div className="text-white font-bold">8 (e8s)</div>
            </div>
            <div>
              <div className="text-slate-500">Transfer Fee</div>
              <div className="text-cyan-400 font-bold">0.0001 QMOOSA</div>
            </div>
            <div>
              <div className="text-slate-500">Circulating Supply</div>
              <div className="text-indigo-400 font-bold">1,000,000,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Uncapped Supply Policy & Proof-of-Stake Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-indigo-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2 text-indigo-400">
            <TrendingUp className="w-4 h-4" />
            <h3 className="text-sm font-bold font-mono">Uncapped DAO-Governed Supply Model</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rather than hardcoding an artificial limit or allowing reckless inflation, QMOOSA uses an <strong>uncapped governance-mintable model</strong>. No single entity can mint tokens. Every new issuance requires a formal SNS DAO proposal, passing community quorum, and a mandatory 24-hour on-chain timelock.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-cyan-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <Lock className="w-4 h-4" />
            <h3 className="text-sm font-bold font-mono">SNS Neurons & Proof-of-Stake Governance</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Token holders lock QMOOSA into <strong>Governance Neurons</strong>. The longer the dissolve delay (up to 24 months), the higher the voting power and staking rewards. Neurons govern protocol upgrades, x402 fees, treasury disbursements, and AI tool authorizations.
          </p>
        </div>
      </div>

      {/* Staking & Neuron Creation Section */}
      <div className="glass-card rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white font-mono">Stake QMOOSA in SNS Neuron</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Estimated APY: ~14.8% Staking Rewards
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Amount to Stake (QMOOSA):</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Dissolve Delay (Lock Duration):</span>
                <span className="text-indigo-300 font-bold">{dissolveDelayMonths} Months</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={dissolveDelayMonths}
                onChange={(e) => setDissolveDelayMonths(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 Month (1.0x)</span>
                <span>6 Months (1.25x)</span>
                <span>12 Months (1.5x)</span>
                <span>24 Months (2.0x)</span>
              </div>
            </div>

            <button
              onClick={handleStake}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Stake and Create Governance Neuron</span>
            </button>
          </div>

          {/* Staking Summary Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase mb-3">Neuron Parameters</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Stake:</span>
                  <span className="text-white">{stakeAmount || 0} QMOOSA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delay Multiplier:</span>
                  <span className="text-cyan-400">{(1 + (dissolveDelayMonths / 12) * 0.5).toFixed(2)}x</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2">
                  <span className="text-slate-300 font-semibold">Voting Power:</span>
                  <span className="text-indigo-400 font-bold">
                    {Math.round((parseFloat(stakeAmount) || 0) * (1 + (dissolveDelayMonths / 12) * 0.5))} VP
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400">Active Neurons: {userNeurons.length}</div>
              <div className="text-xs font-mono text-emerald-400 font-bold">
                Total VP: {userNeurons.reduce((acc, n) => acc + n.votingPower, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Governance Proposals */}
      <div className="glass-card rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono">Active SNS DAO Proposals</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{proposals.length} Proposals Recorded</span>
        </div>

        <div className="space-y-4">
          {proposals.map((p) => {
            const total = p.yesVotes + p.noVotes;
            const yesPct = total > 0 ? (p.yesVotes / total) * 100 : 0;

            return (
              <div key={p.id} className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 font-bold">#{p.id}</span>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold self-start ${
                    p.status === 'Passed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    p.status === 'Active' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                    'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3">{p.description}</p>

                {/* Voting Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Yes: {p.yesVotes.toLocaleString()} ({yesPct.toFixed(1)}%)</span>
                    <span>No: {p.noVotes.toLocaleString()} ({(100 - yesPct).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                    <div style={{ width: `${yesPct}%` }} className="bg-emerald-500 h-full transition-all" />
                    <div style={{ width: `${100 - yesPct}%` }} className="bg-red-500 h-full transition-all" />
                  </div>
                </div>

                {/* Vote Action Buttons */}
                {p.status === 'Active' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(p.id, true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-mono font-bold border border-emerald-700/60 transition-colors"
                    >
                      Vote YES (Approve)
                    </button>
                    <button
                      onClick={() => handleVote(p.id, false)}
                      className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-mono font-bold border border-red-700/60 transition-colors"
                    >
                      Vote NO (Reject)
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
