import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Wrench
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  model?: string;
  text: string;
  toolCall?: {
    name: string;
    canister: string;
    status: 'Executed' | 'Pending Confirmation';
  };
}

export const AgentChatTab: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<'blockchain' | 'tokenomics' | 'marketing' | 'security' | 'deployment'>('blockchain');
  const [selectedModel, setSelectedModel] = useState<string>('claude-3-5-sonnet');
  const [inputPrompt, setInputPrompt] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      agentName: 'Qmoosa Blockchain Architect',
      model: 'ICP On-Chain LLM',
      text: 'Greetings. I am connected directly to your ICP canisters. How can I assist you with ICRC ledger verification, SNS DAO proposal drafting, or x402 payment settlement?',
      toolCall: {
        name: 'icrc1_balance_of',
        canister: 'token',
        status: 'Executed'
      }
    }
  ]);

  const agentsList = [
    { id: 'blockchain', name: 'Blockchain Architect', icon: '⛓️' },
    { id: 'tokenomics', name: 'Tokenomics & DAO', icon: '📊' },
    { id: 'marketing', name: 'Marketing Engine', icon: '📢' },
    { id: 'security', name: 'Quantum Sentinel', icon: '🛡️' },
    { id: 'deployment', name: 'Deployment Agent', icon: '🚀' },
  ];

  const modelsList = [
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro' },
    { id: 'icp-onchain-llm', name: 'ICP On-Chain LLM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputPrompt
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputPrompt;
    setInputPrompt('');

    // Simulate multi-model agent reasoning with tool call
    setTimeout(() => {
      let agentReply = '';
      let toolInfo: any = null;

      if (selectedAgent === 'blockchain') {
        agentReply = `I have inspected your ICRC token ledger. All parameters are valid: Decimals: 8, Transfer fee: 10,000 e8s, and uncapped mint authority is restricted exclusively to the SNS DAO Governance canister.`;
        toolInfo = { name: 'get_token_metadata', canister: 'token', status: 'Executed' };
      } else if (selectedAgent === 'tokenomics') {
        agentReply = `I have verified the economic distribution. Genesis allocation of 1B QMOOSA aligns with global standard tokenomics: 30% ecosystem rewards, 24.5% locked in governance neurons, and any future minting requires an on-chain timelock.`;
        toolInfo = { name: 'get_dao_stats', canister: 'dao_governance', status: 'Executed' };
      } else if (selectedAgent === 'security') {
        agentReply = `I have validated the NIST FIPS 204 ML-DSA-65 post-quantum release manifest against the bytecode hash. All lattice parameters check out cleanly with zero quantum vulnerability.`;
        toolInfo = { name: 'verify_signature', canister: 'pqc', status: 'Executed' };
      } else if (selectedAgent === 'marketing') {
        agentReply = `Brand assets and technical whitepaper draft have been synthesized. The positioning highlights true sovereign decentralization on ICP with x402 machine micropayments and zero deceptive yield claims.`;
      } else {
        agentReply = `PocketIC test suite and Candid interfaces are verified. The canister state is ready for mainnet canary deployment via scripts/qmoosa-mission.sh.`;
        toolInfo = { name: 'audit_canister_health', canister: 'automation', status: 'Executed' };
      }

      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentName: agentsList.find(a => a.id === selectedAgent)?.name,
        model: modelsList.find(m => m.id === selectedModel)?.name,
        text: agentReply,
        toolCall: toolInfo
      };

      setMessages(prev => [...prev, agentMsg]);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold font-mono text-white">Agentic Multi-Model AI Orchestrator</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous AI agents equipped with verified ICP Canister tools, cryptographic zero-trust bounds, and multi-model routing.
            </p>
          </div>
          <div className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-1.5 rounded-lg">
            Multi-Model Router • Safe Tool Execution Policies
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Persona & Model Selector */}
        <div className="space-y-4">
          {/* Agent Selector */}
          <div className="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase mb-2">Select Agent Persona</h4>
            {agentsList.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAgent(a.id as any)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all text-left ${
                  selectedAgent === a.id
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80'
                }`}
              >
                <span>{a.icon}</span>
                <span>{a.name}</span>
              </button>
            ))}
          </div>

          {/* Model Selector */}
          <div className="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase mb-2">Inference Model</h4>
            {modelsList.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all text-left ${
                  selectedModel === m.id
                    ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80'
                }`}
              >
                <span>{m.name}</span>
                {selectedModel === m.id && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Conversation & Tool Console */}
        <div className="lg:col-span-3 glass-card rounded-xl p-6 border border-slate-800 flex flex-col justify-between h-[600px]">
          {/* Message List */}
          <div className="overflow-y-auto space-y-4 pr-2 flex-1 mb-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'agent' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3.5 font-mono text-xs ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950/90 border border-slate-800 text-slate-200'
                  }`}
                >
                  {m.sender === 'agent' && (
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] text-cyan-400 font-bold border-b border-slate-800/80 pb-1">
                      <span>{m.agentName}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-indigo-300 font-normal">{m.model}</span>
                    </div>
                  )}

                  <p className="leading-relaxed">{m.text}</p>

                  {/* Tool Call Box */}
                  {m.toolCall && (
                    <div className="mt-3 p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Wrench className="w-3 h-3 text-cyan-400" />
                        <span>Tool: <strong className="text-white">{m.toolCall.name}</strong> on <strong className="text-indigo-400">{m.toolCall.canister}</strong></span>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                        {m.toolCall.status}
                      </span>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/40 border border-indigo-700/50 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-indigo-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Qmoosa Agents to query canisters, draft DAO proposals, or audit code..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
