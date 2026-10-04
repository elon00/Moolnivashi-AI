export type TabType = 
  | 'dashboard' 
  | 'token_dao' 
  | 'launchpad' 
  | 'x402_bazaar' 
  | 'conway_ai' 
  | 'agents_chat' 
  | 'automations' 
  | 'pqc_security' 
  | 'chain_fusion';

export type WalletType = 'Internet Identity' | 'Plug' | 'NFID' | 'OISY' | 'Bitfinity';

export interface TokenStats {
  name: string;
  symbol: string;
  decimals: number;
  fee: number;
  totalSupply: string;
  circulatingSupply: string;
  stakedInNeurons: string;
  daoTreasury: string;
  supplyModel: string;
}

export interface DAOProposal {
  id: number;
  proposer: string;
  title: string;
  description: string;
  proposalType: string;
  yesVotes: number;
  noVotes: number;
  quorum: number;
  deadline: string;
  status: 'Active' | 'Passed' | 'Rejected' | 'Executed';
}

export interface StakingNeuron {
  id: number;
  amount: number;
  dissolveDelayDays: number;
  votingPower: number;
  isDissolving: boolean;
}

export interface LaunchpadItem {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  supply: string;
  model: 'Fixed' | 'Mintable' | 'Governance' | 'Deflationary';
  canisterId: string;
  status: string;
}

export interface X402Service {
  id: string;
  name: string;
  category: string;
  priceQmoosa: number;
  endpoint: string;
  provider: string;
  description: string;
}

export interface ScheduledJobItem {
  id: number;
  name: string;
  interval: string;
  targetAction: string;
  isActive: boolean;
  lastTriggered: string;
  executions: number;
}

export interface PqcManifestItem {
  id: string;
  name: string;
  sha256: string;
  algorithm: string;
  publicKey: string;
  signature: string;
  isVerified: boolean;
}
