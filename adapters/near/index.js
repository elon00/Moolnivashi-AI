import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class NearAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.near;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return hash.slice(0, 64);
  }

  calculateFee(req) {
    return { estimated: '0.000050', slow: '0.000030', fast: '0.000100' };
  }

  serializePayload(req) {
    return JSON.stringify({ signerId: req.sender, receiverId: req.recipient, deposit: req.amount });
  }
}

export const nearAdapter = new NearAdapter();
