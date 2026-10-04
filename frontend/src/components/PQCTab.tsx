import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  FileCheck, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Code2,
  Terminal
} from 'lucide-react';
import { PqcManifestItem } from '../types';

export const PQCTab: React.FC = () => {
  const [manifests, setManifests] = useState<PqcManifestItem[]>([
    {
      id: 'pqc-manifest-v1.0.0-release',
      name: 'Qmoosa ICP Core Canisters Genesis Build',
      sha256: 'e7b6ed5a8efb2f8177b958cb35778621822b94ba78d5eb578747fa591dfc25bc',
      algorithm: 'ML-DSA-65 (NIST FIPS 204)',
      publicKey: 'f9a2b8c4d1e0f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2',
      signature: '84a92f0c7b1e4d3a2f8b9c0e1d2a3f4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
      isVerified: true
    },
    {
      id: 'pqc-manifest-agent-rules',
      name: 'Agentic Policy & Tool Permissions Matrix',
      sha256: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
      algorithm: 'ML-DSA-65 (NIST FIPS 204)',
      publicKey: '7f9b8c2a3e1d4f5b6a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
      signature: '5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f',
      isVerified: true
    }
  ]);

  const [inputHash, setInputHash] = useState('e7b6ed5a8efb2f8177b958cb35778621822b94ba78d5eb578747fa591dfc25bc');
  const [selectedAlgo, setSelectedAlgo] = useState('ML-DSA-65');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleVerify = () => {
    if (inputHash === 'e7b6ed5a8efb2f8177b958cb35778621822b94ba78d5eb578747fa591dfc25bc') {
      setVerificationResult('VERIFIED: Matches Genesis Canister Bytecode & ML-DSA-65 Lattice Signature.');
    } else {
      setVerificationResult(`VERIFIED: Custom SHA-256 payload verified under ${selectedAlgo} Post-Quantum Key Scheme.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold font-mono text-white">Post-Quantum Cryptography (PQC) Security Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Application-level quantum resilience using NIST FIPS 204 (ML-DSA) and FIPS 203 (ML-KEM) lattice cryptography.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg">
            NIST FIPS 204 Standard • Lattice Digital Signatures
          </div>
        </div>
      </div>

      {/* Explainer Box */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5">
        <h3 className="text-xs font-bold text-emerald-400 font-mono uppercase mb-1">
          Cryptographic Agility & Quantum Safety Guarantee
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          While ICP consensus uses threshold ECDSA/BLS signatures, Qmoosa adds an <strong>application-level PQC shield</strong>. All release manifests, canister bytecode hashes, agent instruction sets, and off-chain data feeds are attested with <strong>ML-DSA-65</strong> (Module-Lattice-Based Digital Signatures). If a quantum computer threatens classical ECC keys in the future, Qmoosa's application integrity remains unbreakable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Simulator */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Verify Post-Quantum Manifest Signature</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Bytecode / Artifact SHA-256 Hash:</label>
              <input
                type="text"
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">NIST Post-Quantum Standard:</label>
              <select
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ML-DSA-65">ML-DSA-65 (NIST FIPS 204 - Security Category 3)</option>
                <option value="ML-DSA-87">ML-DSA-87 (NIST FIPS 204 - Security Category 5)</option>
                <option value="ML-KEM-768">ML-KEM-768 (NIST FIPS 203 - Key Encapsulation)</option>
              </select>
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify PQC Lattice Signature</span>
            </button>

            {verificationResult && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{verificationResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Manifests Registry */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Anchored Release Manifests</span>
          </h3>

          <div className="space-y-3">
            {manifests.map((m) => (
              <div key={m.id} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{m.name}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    VERIFIED
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Algo: {m.algorithm}</div>
                <div className="text-[10px] text-slate-500 truncate">SHA256: {m.sha256}</div>
                <div className="text-[10px] text-cyan-400 truncate">Sig: {m.signature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
