import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Code
} from 'lucide-react';
import { X402Service } from '../types';

export const X402BazaarTab: React.FC = () => {
  const [services] = useState<X402Service[]>([
    {
      id: 'agent-inference-deep',
      name: 'Deep Agentic Multi-Model LLM Reasoning',
      category: 'AI Inference',
      priceQmoosa: 0.005,
      endpoint: '/api/v2/agent/reason',
      provider: 'Qmoosa Core Network',
      description: 'High-context autonomous agent reasoning across ICP on-chain models and external providers.'
    },
    {
      id: 'pqc-manifest-sign',
      name: 'NIST FIPS 204 ML-DSA Attestation',
      category: 'Cryptography',
      priceQmoosa: 0.01,
      endpoint: '/api/v2/pqc/sign-manifest',
      provider: 'Qmoosa Cryptographic Node',
      description: 'Post-Quantum lattice-based signature attestation for canister bytecode and agent policies.'
    },
    {
      id: 'conway-strategy-sim',
      name: 'Conway Automaton Strategy Simulator',
      category: 'Simulation',
      priceQmoosa: 0.0025,
      endpoint: '/api/v2/automaton/simulate',
      provider: 'Qmoosa Simulation Labs',
      description: 'Cellular automaton state evolution for tokenomics testing and agent behavioral fitness.'
    },
    {
      id: 'crosschain-threshold-sign',
      name: 'Chain Fusion Threshold Signature API',
      category: 'Cross-Chain',
      priceQmoosa: 0.008,
      endpoint: '/api/v2/chainfusion/sign',
      provider: 'ICP Chain Fusion Engine',
      description: 'Threshold ECDSA and Schnorr signature generation for Bitcoin, Ethereum, and Solana.'
    }
  ]);

  const [selectedService, setSelectedService] = useState<X402Service>(services[0]);
  const [simulationStep, setSimulationStep] = useState<'idle' | '402_required' | 'paying' | 'unlocked'>('idle');
  const [invoice, setInvoice] = useState<any>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleTriggerAPI = (srv: X402Service) => {
    setSelectedService(srv);
    setSimulationStep('402_required');
    setApiResponse(null);

    // Mock HTTP 402 challenge
    setInvoice({
      statusCode: 402,
      statusText: 'Payment Required',
      headers: {
        'x-payment-protocol': 'x402-v2',
        'x-payment-amount': `${srv.priceQmoosa} QMOOSA`,
        'x-payment-recipient': 'rkp4c-7iaaa-aaaaa-aaaca-cai',
        'x-invoice-id': `x402-inv-${Math.floor(Math.random() * 90000 + 10000)}`,
        'x-expires-in': '600s'
      }
    });
  };

  const handlePayInvoice = () => {
    setSimulationStep('paying');
    setTimeout(() => {
      setSimulationStep('unlocked');
      setApiResponse({
        status: 200,
        result: 'Service execution successful.',
        data: {
          serviceId: selectedService.id,
          authenticatedBy: 'QMOOSA ICRC-1 Micropayment',
          settlementTx: `tx-${Math.floor(Math.random() * 900000 + 100000)}`,
          jwt: 'eyJhbGciOiJNTF9EU0FfNjUiLCJ0eXAiOiJKV1QifQ.qmoosa_verified_access_token',
          executionTimeMs: 142
        }
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold font-mono text-white">x402 Bazaar Protocol Gateway</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous HTTP-native micropayment standard for machine-to-machine APIs, AI agent consumption, and pay-per-call services.
            </p>
          </div>
          <div className="text-xs font-mono text-yellow-400 bg-yellow-950/60 border border-yellow-800 px-3 py-1.5 rounded-lg">
            HTTP 402 Open Standard • Zero Credit Cards
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Directory */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
            <span>Discoverable Agent Services</span>
            <span className="text-xs font-normal text-slate-400">4 Services Registered</span>
          </h3>

          <div className="space-y-3">
            {services.map((s) => (
              <div 
                key={s.id}
                onClick={() => handleTriggerAPI(s)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedService.id === s.id && simulationStep !== 'idle'
                    ? 'bg-slate-900 border-yellow-500/50 shadow-md shadow-yellow-500/10'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white font-mono">{s.name}</span>
                  <span className="text-[10px] font-mono text-yellow-400 font-bold bg-yellow-950/60 border border-yellow-800 px-2 py-0.5 rounded">
                    {s.priceQmoosa} QMOOSA / call
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">{s.description}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-indigo-400">{s.endpoint}</span>
                  <span className="text-slate-400">Provider: {s.provider}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Simulation Console */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>x402 Protocol Console Simulator</span>
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                simulationStep === 'idle' ? 'bg-slate-800 text-slate-400' :
                simulationStep === '402_required' ? 'bg-yellow-950 text-yellow-300 border border-yellow-700' :
                simulationStep === 'paying' ? 'bg-indigo-950 text-indigo-300 border border-indigo-700' :
                'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}>
                {simulationStep.toUpperCase()}
              </span>
            </div>

            {simulationStep === 'idle' && (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs font-mono">
                Select an API service on the left to simulate an autonomous HTTP 402 challenge and instant settlement.
              </div>
            )}

            {simulationStep === '402_required' && invoice && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-950/20 border border-yellow-500/40 rounded-xl font-mono text-xs">
                  <div className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>HTTP/1.1 402 Payment Required</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded border border-slate-800">
                    {JSON.stringify(invoice.headers, null, 2)}
                  </pre>
                </div>

                <button
                  onClick={handlePayInvoice}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Settle {selectedService.priceQmoosa} QMOOSA via ICRC Canister</span>
                </button>
              </div>
            )}

            {simulationStep === 'paying' && (
              <div className="p-8 text-center bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-indigo-300">Verifying ICRC-1 Micropayment on ICP Canister...</div>
              </div>
            )}

            {simulationStep === 'unlocked' && apiResponse && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-xl font-mono text-xs">
                  <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>HTTP/1.1 200 OK — Payment Verified</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded border border-slate-800">
                    {JSON.stringify(apiResponse.data, null, 2)}
                  </pre>
                </div>

                <button
                  onClick={() => handleTriggerAPI(selectedService)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all"
                >
                  Simulate Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
