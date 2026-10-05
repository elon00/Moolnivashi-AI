import React, { useState } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  QRModal 
} from './components/QRModal';
import { 
  DashboardTab 
} from './components/DashboardTab';
import { 
  TokenDAOTab 
} from './components/TokenDAOTab';
import { 
  LaunchpadTab 
} from './components/LaunchpadTab';
import { 
  X402BazaarTab 
} from './components/X402BazaarTab';
import { 
  ConwayTab 
} from './components/ConwayTab';
import { 
  AgentChatTab 
} from './components/AgentChatTab';
import { 
  AutomationTab 
} from './components/AutomationTab';
import { 
  PQCTab 
} from './components/PQCTab';
import { 
  ChainFusionTab 
} from './components/ChainFusionTab';
import { 
  TabType, 
  WalletType 
} from './types';
import { 
  LayoutDashboard, 
  Coins, 
  Rocket, 
  Zap, 
  Cpu, 
  Bot, 
  Clock, 
  ShieldCheck, 
  Network 
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeWallet, setActiveWallet] = useState<WalletType | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isQROpen, setIsQROpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'token_dao', label: 'Token & SNS DAO', icon: <Coins className="w-4 h-4" /> },
    { id: 'launchpad', label: 'Launchpad', icon: <Rocket className="w-4 h-4" /> },
    { id: 'x402_bazaar', label: 'x402 Bazaar', icon: <Zap className="w-4 h-4" /> },
    { id: 'conway_ai', label: 'Conway AI', icon: <Cpu className="w-4 h-4" /> },
    { id: 'agents_chat', label: 'AI Agents', icon: <Bot className="w-4 h-4" /> },
    { id: 'automations', label: 'Timers', icon: <Clock className="w-4 h-4" /> },
    { id: 'pqc_security', label: 'PQC Hub', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'chain_fusion', label: 'Chain Fusion', icon: <Network className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation & App Bar */}
      <Header
        activeWallet={activeWallet}
        onConnectWallet={(w) => {
          if (w === 'OISY') {
            window.open('https://oisy.com/sign', '_blank', 'noopener,noreferrer');
            return;
          }
          setActiveWallet(null);
          setWalletAddress('');
        }}
        onDisconnectWallet={() => {
          setActiveWallet(null);
          setWalletAddress('');
        }}
        onOpenQR={() => setIsQROpen(true)}
        walletAddress={walletAddress}
      />

      {/* Primary Sub-Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md px-4 lg:px-8 py-2 sticky top-[69px] z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6">
        {activeTab === 'dashboard' && <DashboardTab onNavigate={setActiveTab} onOpenQR={() => setIsQROpen(true)} />}
        {activeTab === 'token_dao' && <TokenDAOTab />}
        {activeTab === 'launchpad' && <LaunchpadTab />}
        {activeTab === 'x402_bazaar' && <X402BazaarTab />}
        {activeTab === 'conway_ai' && <ConwayTab />}
        {activeTab === 'agents_chat' && <AgentChatTab />}
        {activeTab === 'automations' && <AutomationTab />}
        {activeTab === 'pqc_security' && <PQCTab />}
        {activeTab === 'chain_fusion' && <ChainFusionTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 lg:px-8 mt-auto text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">QMOOSA ICP PLATFORM</span>
            <span>•</span>
            <span>Version 1.0.0 Genesis</span>
            <span>•</span>
            <span className="text-cyan-400">Release SHA-256: e7b6ed5a8efb2f8177b958cb...</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Internet Computer (ICP)</span>
            <span>•</span>
            <span>ICRC-1/2/3</span>
            <span>•</span>
            <span>NIST FIPS 204 ML-DSA</span>
            <span>•</span>
            <span>x402 Protocol</span>
          </div>
        </div>
      </footer>

      {/* Interactive QR Code Modal */}
      <QRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        walletAddress={walletAddress}
      />
    </div>
  );
};
