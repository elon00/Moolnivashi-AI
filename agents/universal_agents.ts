import { SupportedChain, ALL_SUPPORTED_CHAINS, getChainAdapter } from '../packages/chain-sdk/src/index.js';

export interface UserIntent {
  rawPrompt: string;
  sourceAsset?: string;
  targetAsset?: string;
  targetChain?: SupportedChain;
  amount?: string;
  maxFeeUsd?: number;
}

export interface ProposedPlan {
  planId: string;
  intent: UserIntent;
  selectedChain: SupportedChain;
  estimatedFee: string;
  estimatedDurationSeconds: number;
  riskAssessment: {
    riskScore: number; // 0-100
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    notes: string[];
  };
  requiresHumanApproval: boolean;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'EXECUTING' | 'COMPLETED' | 'REJECTED';
}

export class UniversalAgentOrchestrator {
  interpretIntent(prompt: string): ProposedPlan {
    let selectedChain: SupportedChain = 'ethereum';
    const lower = prompt.toLowerCase();

    for (const chain of ALL_SUPPORTED_CHAINS) {
      if (lower.includes(chain)) {
        selectedChain = chain;
        break;
      }
    }

    if (lower.includes('btc') || lower.includes('bitcoin')) selectedChain = 'bitcoin';
    if (lower.includes('sol') || lower.includes('solana')) selectedChain = 'solana';
    if (lower.includes('dot') || lower.includes('polkadot')) selectedChain = 'polkadot';
    if (lower.includes('doge')) selectedChain = 'dogecoin';
    if (lower.includes('stellar') || lower.includes('xlm')) selectedChain = 'stellar';
    if (lower.includes('base') || lower.includes('arbitrum')) selectedChain = 'evm';

    const adapter = getChainAdapter(selectedChain);
    const planId = `plan-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

    return {
      planId,
      intent: {
        rawPrompt: prompt,
        targetChain: selectedChain
      },
      selectedChain,
      estimatedFee: adapter.metadata.tier === 'TierB' ? '0.000045' : '0.001',
      estimatedDurationSeconds: adapter.metadata.blockTimeSeconds * 2,
      riskAssessment: {
        riskScore: adapter.metadata.tier === 'TierA' ? 10 : 25,
        level: 'LOW',
        notes: [
          `Route selected: ${adapter.metadata.name} (${adapter.metadata.tier})`,
          `Signature scheme: ${adapter.metadata.signatureScheme}`,
          'Strict human-in-the-loop approval gate enforced for all fund movements.'
        ]
      },
      requiresHumanApproval: true,
      status: 'PENDING_APPROVAL'
    };
  }

  approvePlan(plan: ProposedPlan): ProposedPlan {
    return {
      ...plan,
      status: 'APPROVED',
      requiresHumanApproval: false
    };
  }
}

export const agentOrchestrator = new UniversalAgentOrchestrator();
