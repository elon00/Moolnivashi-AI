import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  FileText, 
  Landmark, 
  Globe2, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export const WhitePaperTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'rights' | 'benefits' | 'architecture' | 'simulator'>('overview');
  const [copied, setCopied] = useState(false);

  // Legal Simulator state
  const [simCategory, setSimCategory] = useState<'fra' | 'poa' | 'pesa'>('fra');
  const [simDetails, setSimDetails] = useState('');
  const [simOutput, setSimOutput] = useState<{
    statute: string;
    sections: string[];
    actionItems: string[];
    onChainHash: string;
    humanApprovalNeeded: boolean;
  } | null>(null);

  const handleRunSim = () => {
    if (simCategory === 'fra') {
      setSimOutput({
        statute: 'Scheduled Tribes & Other Traditional Forest Dwellers (FRA) Act, 2006',
        sections: ['Section 3(1)(a) - Individual Forest Rights (IFR)', 'Section 3(1)(i) - Community Forest Rights (CFR)', 'Section 6 - Gram Sabha Statutory Primacy'],
        actionItems: [
          'Record GPS boundary polyline coordinates with community witness sign-offs',
          'Pass 2/3 quorum resolution in Gram Sabha village assembly',
          'Mint tamper-proof cryptographic audit hash to ICP audit_registry canister',
          'Generate Prior Occupancy Certificate to prevent arbitrary forest eviction'
        ],
        onChainHash: 'fra-cfr-0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        humanApprovalNeeded: true
      });
    } else if (simCategory === 'poa') {
      setSimOutput({
        statute: 'SC & ST (Prevention of Atrocities) Act, 1989 (Amended 2015)',
        sections: ['Section 3(1)(g) - Wrongful dispossession from land', 'Section 3(1)(r) - Intentional insult or intimidation in public view', 'Section 4 - Neglect of duties by public servant', 'Section 18 - Complete bar on anticipatory bail'],
        actionItems: [
          'Formalize incident transcript with exact timestamp, location, and witness identifiers',
          'Auto-generate standard statutory First Information Report (FIR) format',
          'Require victim WebAuthn biometric confirmation prior to recordation',
          'Timestamp encrypted evidence into sovereign canister for court admissibility'
        ],
        onChainHash: 'poa-fir-0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        humanApprovalNeeded: true
      });
    } else {
      setSimOutput({
        statute: 'Panchayats (Extension to Scheduled Areas) Act, 1996 (PESA)',
        sections: ['Section 4(d) - Protection of community customs & resources', 'Section 4(i) - Mandatory prior consultation before land acquisition', 'Section 4(m)(iii) - Prohibition of alienation of tribal lands'],
        actionItems: [
          'Verify Fifth Schedule geographic demarcation of the village territory',
          'Draft Gram Sabha formal objection against unilateral commercial leasing',
          'Submit immutable resolution to multi-chain governance canister',
          'Anchor legal standing under landmark Samatha v. State of AP (1997) precedent'
        ],
        onChainHash: 'pesa-gs-0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        humanApprovalNeeded: true
      });
    }
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-800/40 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-mono">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official Protocol White Paper & Rights Charter v1.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Moolnivashi AI: Sovereign Multi-Chain Protocol
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Decentralized Intelligence & Universal Chain Fusion (ICP) for Indigenous Self-Determination, 
              Constitutional Rights Protection, and Socio-Economic Liberation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/elon00/Moolnivashi-AI/blob/main/WHITEPAPER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Read WHITEPAPER.md</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/elon00/Moolnivashi-AI/blob/main/RIGHTS_AND_BENEFITS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-semibold shadow-lg transition-all"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Read RIGHTS_AND_BENEFITS.md</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Legal & Institutional Safeguards Disclaimer Banner */}
        <div className="mt-5 rounded-xl bg-amber-950/30 border border-amber-600/40 p-4 font-mono text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-300">
              Institutional Notice & Responsible Boundary:
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              Moolnivashi AI empowers communities through digital literacy, verified statutory information, and transparent coordination. 
              <strong> No application or algorithm can independently create or grant constitutional rights, government benefits, or land ownership.</strong> Official entitlements and judicial enforcement remain the exclusive prerogative of sovereign statutory authorities, Gram Sabhas under FRA/PESA, and competent courts.
            </p>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Vision', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'rights', label: 'Moolnivashi Rights', icon: <Scale className="w-4 h-4" /> },
            { id: 'benefits', label: 'Community Benefits', icon: <Users className="w-4 h-4" /> },
            { id: 'architecture', label: 'Technical Core', icon: <Cpu className="w-4 h-4" /> },
            { id: 'simulator', label: 'Rights AI Simulator', icon: <Sparkles className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeSubTab === tab.id
                  ? 'bg-slate-800 text-white border border-indigo-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">Ideological Heritage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Anchored in the egalitarian philosophies of Mahatma Jyotirao Phule, Dr. B. R. Ambedkar, 
                Birsa Munda, Jaipal Singh Munda, and Periyar—asserting the sovereign dignity of the original inhabitants.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">Zero Trust Infrastructure</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replaces centralized corporate clouds with 11 native smart canisters on the Internet Computer (ICP). 
                No government or corporate entity can shut down or manipulate community records.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">14-Chain Universal Bridge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bridges Bitcoin, Ethereum, Solana, Cosmos, Polkadot, and Dogecoin natively via threshold cryptography 
                (ECDSA/Schnorr/Ed25519) without vulnerable centralized bridges.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>The Core Problem & The Algorithmic Resolution</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-3 bg-red-950/20 border border-red-900/40 p-4 rounded-xl">
                <h4 className="font-bold text-red-300 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Historical & Modern Disenfranchisement
                </h4>
                <p>
                  <strong>Paper Record Manipulation:</strong> Forest and revenue land titles of indigenous families are routinely altered, lost, or forged by corrupt officials, dispossessing communities of ancestral territories.
                </p>
                <p>
                  <strong>Algorithmic Apartheid:</strong> Proprietary AI models trained on dominant cultures reproduce caste and racial biases in credit scoring, policing, and welfare administration.
                </p>
                <p>
                  <strong>Predatory Usury:</strong> Commercial banking redlining forces rural families to depend on local loan sharks charging up to 120% APR.
                </p>
              </div>

              <div className="space-y-3 bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl">
                <h4 className="font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  The Moolnivashi AI Solution
                </h4>
                <p>
                  <strong>Immutable Forest & Land Registry:</strong> Community Forest Rights (CFR) and Gram Sabha resolutions are immutably signed to decentralized canisters on ICP.
                </p>
                <p>
                  <strong>Vernacular Legal Intelligence:</strong> AI co-pilot operates in local dialects (Gondi, Santhali, Bhili, Hindi), drafting legal FIRs and RTI petitions with Human-in-the-Loop consent.
                </p>
                <p>
                  <strong>Decentralized Liquidity:</strong> Cross-chain P2P micro-finance and autonomous x402 micropayments connect rural cooperatives directly to global fair-trade capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Moolnivashi Rights */}
      {activeSubTab === 'rights' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
            <h3 className="text-xs font-bold font-mono text-indigo-300 uppercase tracking-wider">
              Constitutional & Statutory Rights Enforced by Code
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Moolnivashi AI maps every protocol feature directly to constitutional articles, statutory protections, and international conventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-1 rounded">
                  Land & Forest Law
                </span>
                <span className="text-[11px] font-mono text-slate-400">FRA 2006 & PESA 1996</span>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Jal, Jungle, Jameen (Water, Forest, Land)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sections 3(1)(a) and 3(1)(i) of the Forest Rights Act grant unalienable Individual and Community Forest Rights. 
                PESA 1996 mandates absolute Gram Sabha consultation prior to any land alienation in Scheduled Areas.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-indigo-300 font-mono">
                ⚡ Protocol Enforcement: Geo-fenced polygon hashes stored on ICP with tamper-evident zero-knowledge proofs.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2.5 py-1 rounded">
                  Criminal & Civil Protection
                </span>
                <span className="text-[11px] font-mono text-slate-400">SC/ST PoA Act 1989/2015</span>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Freedom from Caste Oppression & Atrocities
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Section 3 criminalizes social boycotts, physical violence, wrongful eviction, and insults to dignity. 
                Section 18 strictly forbids anticipatory bail to prevent harassment and witness intimidation.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-indigo-300 font-mono">
                ⚡ Protocol Enforcement: Timestamped evidence vaults and automated statutory FIR generator with paralegal dispatch.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2.5 py-1 rounded">
                  Constitutional Part III
                </span>
                <span className="text-[11px] font-mono text-slate-400">Articles 14, 15, 17, 21, 46</span>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Equality, Non-Discrimination & Human Dignity
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Abolition of Untouchability (Art. 17), Right to Dignity and Privacy (Art. 21), and special economic protections 
                for Scheduled Castes and Tribes (Art. 46) form the bedrock of constitutional morality.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-indigo-300 font-mono">
                ⚡ Protocol Enforcement: Algorithmic bias audits and decentralized identity (DID) guaranteeing equal cryptographic access.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                  International Jurisprudence
                </span>
                <span className="text-[11px] font-mono text-slate-400">UNDRIP & ILO Convention 169</span>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Free, Prior & Informed Consent (FPIC)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                UNDRIP Articles 10, 19, and 32 mandate that no development or extractive activity can proceed on indigenous 
                land without explicit, freely given community consent.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-indigo-300 font-mono">
                ⚡ Protocol Enforcement: Multi-sig Gram Sabha voting via SNS DAO requiring cryptographic quorum for project consent.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Community Benefits */}
      {activeSubTab === 'benefits' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <h3 className="text-xs font-bold font-mono text-emerald-300 uppercase tracking-wider">
              Quantifiable Socio-Economic Benefits Delivered by Moolnivashi AI
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              How the technological layers translate into real-world protection, economic independence, and social justice.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Permanent Land Tenure & Defense against Illegal Land Grabs',
                benefit: 'Protects ancestral lands from fraudulent revenue officer alterations and illegal corporate mining leases.',
                mechanism: 'Gram Sabhas record boundary coordinates and resolutions directly to the ICP audit_registry canister. Once recorded, no state bureaucrat or private corporation can alter or delete the record.',
                badge: 'Land Sovereignty'
              },
              {
                title: 'Democratized Vernacular Legal Literacy & Atrocity FIR Filings',
                benefit: 'Eliminates reliance on corrupt local power structures to register criminal complaints under the SC/ST PoA Act.',
                mechanism: 'AI co-pilot speaks Gondi, Santhali, Bhili, Hindi, and Marathi. It translates victim testimony into exact legal sections, drafting ready-to-file complaints with permanent on-chain timestamps.',
                badge: 'Legal Defense'
              },
              {
                title: 'Freedom from 60–120% Loan Shark Usury via 14-Chain Liquidity',
                benefit: 'Allows rural Self-Help Groups (SHGs) and forest cooperatives to access global low-cost credit directly.',
                mechanism: '14-chain native interoperability bridges Bitcoin, Solana, and Ethereum stablecoins directly to local community accounts, bypassing banking redlining and predatory village usurers.',
                badge: 'Economic Liberation'
              },
              {
                title: 'Bio-Piracy Defense & Ethnobotanical Patent Protection',
                benefit: 'Stops multinational pharmaceutical conglomerates from stealing and patenting indigenous herbal remedies.',
                mechanism: 'Traditional ecological knowledge is timestamped with NIST FIPS 204 ML-DSA post-quantum signatures, establishing undeniable international Prior Art under the Patent Cooperation Treaty.',
                badge: 'Cultural Preservation'
              },
              {
                title: 'Zero Leakage in Community Funds via Service Nervous System (SNS) DAO',
                benefit: 'Prevents corrupt middlemen and contractors from siphoning off government tribal development allocations.',
                mechanism: 'Treasuries operate as transparent smart contracts. Every expenditure requires transparent community neuron voting with verifiable on-chain receipts.',
                badge: 'Democratic Governance'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-400 flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono">{item.title}</h4>
                  </div>
                  <p className="text-xs text-indigo-200 pl-7">{item.benefit}</p>
                  <p className="text-xs text-slate-400 pl-7 leading-relaxed">{item.mechanism}</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full self-start">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Architecture */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <h3 className="text-xs font-bold font-mono text-purple-300 uppercase tracking-wider">
              Technological Sovereignty: ICP Chain Fusion + PQC + Human-in-the-Loop AI
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Zero cloud vendor lock-in. 100% decentralized canisters running on independent node providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase text-indigo-400">
                11 Sovereign ICP Smart Canisters
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li>• <strong className="text-white">agent_orchestrator:</strong> AI intent reasoning + Human-in-the-Loop Gate</li>
                <li>• <strong className="text-white">chain_router:</strong> 14-Chain cross-ledger dispatch</li>
                <li>• <strong className="text-white">wallet_manager:</strong> Deterministic BIP-44 address derivation</li>
                <li>• <strong className="text-white">x402_gateway:</strong> Fail-closed HTTP 402 micro-settlements</li>
                <li>• <strong className="text-white">audit_registry:</strong> Immutable append-only legal & land ledger</li>
                <li>• <strong className="text-white">pqc_attestation:</strong> NIST FIPS 204 ML-DSA signature verifier</li>
                <li>• <strong className="text-white">governance:</strong> SNS DAO neuron staking & democratic voting</li>
                <li>• <strong className="text-white">automation:</strong> Native canister timers for periodic sweeps</li>
                <li>• <strong className="text-white">token_registry:</strong> ckBTC, ckETH, ckSOL liquidity mapping</li>
                <li>• <strong className="text-white">identity_auth:</strong> Biometric WebAuthn to multi-chain DIDs</li>
                <li>• <strong className="text-white">transaction_orchestrator:</strong> Atomic multi-chain rollbacks</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase text-emerald-400">
                14-Chain Universal Chain Fusion
              </h4>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">Tier A (Native ICP Consensus):</strong> Bitcoin & Dogecoin. 
                  Zero external RPC nodes; direct UTXO reading on-chain with threshold ECDSA/Schnorr signing.
                </p>
                <p>
                  <strong className="text-white">Tier B (Dedicated RPC Infrastructure):</strong> Ethereum, Arbitrum, Base, and Solana. 
                  Built-in RPC consensus validation with threshold Ed25519 & ECDSA.
                </p>
                <p>
                  <strong className="text-white">Tier C (Universal Outcalls):</strong> Aptos, Avalanche, Cardano, Cosmos, NEAR, Polkadot, Stellar, TON, and XRP. 
                  Threshold cryptographic signatures with HTTPS outcall consensus.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
                  🔒 Zero Bridge Risk: Eliminates wrapped multi-sigs and custodial relay hacks completely.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Rights Simulator */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold font-mono text-indigo-300 uppercase tracking-wider">
              Interactive Rights AI Co-Pilot & Grievance Dispatch Simulator
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Simulate how Moolnivashi AI processes statutory land disputes, atrocity complaints, and Gram Sabha resolutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Select Legal Protection Framework:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fra', label: 'Forest Rights (FRA)' },
                    { id: 'poa', label: 'SC/ST Atrocities' },
                    { id: 'pesa', label: 'PESA Gram Sabha' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSimCategory(btn.id as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border text-center transition-all ${
                        simCategory === btn.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Incident / Claim Description (English or Vernacular text):
                </label>
                <textarea
                  value={simDetails}
                  onChange={(e) => setSimDetails(e.target.value)}
                  placeholder="e.g. Forest department officials threatened community members cultivating traditional land held since 1998, demanding eviction without Gram Sabha hearing..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <button
                onClick={handleRunSim}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Process with Vernacular AI Legal Co-Pilot</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase flex items-center justify-between">
                <span>AI Advisory & Cryptographic Recordation</span>
                {simOutput && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    ANALYSIS GENERATED
                  </span>
                )}
              </h4>

              {simOutput ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Governing Statute</span>
                    <p className="text-white font-medium">{simOutput.statute}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Applicable Sections</span>
                    <div className="flex flex-wrap gap-1.5">
                      {simOutput.sections.map((sec, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-mono border border-slate-700">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Immediate Action Protocol</span>
                    <ul className="space-y-1 pl-4 text-slate-300 list-disc">
                      {simOutput.actionItems.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase">Immutable Canister Hash</span>
                      <button
                        onClick={() => handleCopyHash(simOutput.onChainHash)}
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px]"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <code className="text-[11px] text-indigo-200 font-mono break-all block">
                      {simOutput.onChainHash}
                    </code>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Human-in-the-Loop Gate Enforced: Awaiting biometric signature before external dispatch.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl text-slate-500">
                  <Scale className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs font-mono">Select a category and click "Process" to generate statutory advice & cryptographic audit proofs.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
