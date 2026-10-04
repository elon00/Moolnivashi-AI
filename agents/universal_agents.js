import { ALL_SUPPORTED_CHAINS, getChainAdapter } from '../packages/chain-sdk/src/index.js';

export class UniversalAgentOrchestrator {
  interpretIntent(prompt) {
    let selectedChain = 'ethereum';
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

  approvePlan(plan) {
    return {
      ...plan,
      status: 'APPROVED',
      requiresHumanApproval: false
    };
  }
}

export const agentOrchestrator = new UniversalAgentOrchestrator();
