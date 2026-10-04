import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  RotateCw,
  Cpu,
  Layers
} from 'lucide-react';
import { ScheduledJobItem } from '../types';

export const AutomationTab: React.FC = () => {
  const [jobs, setJobs] = useState<ScheduledJobItem[]>([
    {
      id: 1,
      name: 'Hourly Cycles Reserve Sentinel',
      interval: 'Every 1 Hour (3,600s)',
      targetAction: 'MONITOR_CANISTER_CYCLES',
      isActive: true,
      lastTriggered: '14 minutes ago',
      executions: 24
    },
    {
      id: 2,
      name: 'Daily DAO Treasury & Vesting Reconciler',
      interval: 'Every 24 Hours (86,400s)',
      targetAction: 'RECONCILE_TREASURY_LEDGER',
      isActive: true,
      lastTriggered: '3 hours ago',
      executions: 7
    },
    {
      id: 3,
      name: 'x402 Micropayment Settlement Cleaner',
      interval: 'Every 10 Minutes (600s)',
      targetAction: 'EXPIRE_STALE_INVOICES',
      isActive: true,
      lastTriggered: '2 minutes ago',
      executions: 144
    }
  ]);

  const [newJobName, setNewJobName] = useState('');
  const [newInterval, setNewInterval] = useState('300');
  const [newAction, setNewAction] = useState('REFRESH_TOKEN_ANALYTICS');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleJob = (id: number) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, isActive: !j.isActive } : j));
  };

  const handleTriggerNow = (name: string) => {
    alert(`Triggered autonomous canister action "${name}" immediately on ICP!`);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobName) return;

    const newJob: ScheduledJobItem = {
      id: jobs.length + 1,
      name: newJobName,
      interval: `Every ${newInterval}s`,
      targetAction: newAction,
      isActive: true,
      lastTriggered: 'Just now',
      executions: 0
    };

    setJobs([...jobs, newJob]);
    setNewJobName('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold font-mono text-white">Autonomous Canister Timers & Automations</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Zero external cron servers required. ICP canisters schedule self-executing recurring tasks natively via stable timers.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Job</span>
          </button>
        </div>
      </div>

      {/* Add Job Form */}
      {showAddForm && (
        <form onSubmit={handleCreateJob} className="glass-card rounded-xl p-5 border border-indigo-500/40 space-y-3">
          <h3 className="text-sm font-bold text-white font-mono">Configure Native Canister Timer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Job Name:</label>
              <input
                type="text"
                placeholder="e.g. AMM Liquidity Rebalancer"
                value={newJobName}
                onChange={(e) => setNewJobName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Interval (Seconds):</label>
              <input
                type="number"
                value={newInterval}
                onChange={(e) => setNewInterval(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Target Action:</label>
              <select
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-white"
              >
                <option value="REFRESH_TOKEN_ANALYTICS">REFRESH_TOKEN_ANALYTICS</option>
                <option value="CYCLE_REFILL_CHECK">CYCLE_REFILL_CHECK</option>
                <option value="TREASURY_REPORT_GENERATION">TREASURY_REPORT_GENERATION</option>
                <option value="PQC_REVOCATION_SCAN">PQC_REVOCATION_SCAN</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all"
          >
            Deploy Timer to Canister
          </button>
        </form>
      )}

      {/* Jobs List */}
      <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
          <span>Active Scheduled Automations</span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
            Subsystem Health: 100% Nominal
          </span>
        </h3>

        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.id} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">{j.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    j.isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {j.isActive ? 'ACTIVE' : 'PAUSED'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  Interval: <span className="text-indigo-300">{j.interval}</span> • Action: <span className="text-cyan-300">{j.targetAction}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  Last executed: {j.lastTriggered} • Total triggers: {j.executions}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleJob(j.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
                >
                  {j.isActive ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => handleTriggerNow(j.name)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 text-xs font-mono font-bold border border-indigo-700/60 transition-colors flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Trigger Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
