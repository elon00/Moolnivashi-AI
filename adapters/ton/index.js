import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class TonAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.ton;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('base64url');
    return 'EQ' + hash.slice(0, 46);
  }

  calculateFee(req) {
    return { estimated: '0.005000', slow: '0.003000', fast: '0.010000' };
  }

  serializePayload(req) {
    return JSON.stringify({ workchain: 0, messages: [{ to: req.recipient, value: req.amount }] });
  }
}

export const tonAdapter = new TonAdapter();
