import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class CardanoAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.cardano;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'addr1q' + hash.slice(0, 52);
  }

  calculateFee(req) {
    return { estimated: '0.170000', slow: '0.155000', fast: '0.220000' };
  }

  serializePayload(req) {
    return JSON.stringify({ type: 'cardano_babbage_tx', outputs: [{ address: req.recipient, amount: req.amount }] });
  }
}

export const cardanoAdapter = new CardanoAdapter();
