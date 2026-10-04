import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class StellarAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.stellar;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'G' + hash.slice(0, 55).toUpperCase();
  }

  calculateFee(req) {
    return { estimated: '0.000010', slow: '0.000010', fast: '0.000100' };
  }

  serializePayload(req) {
    return JSON.stringify({ sourceAccount: req.sender, operations: [{ destination: req.recipient, amount: req.amount }] });
  }
}

export const stellarAdapter = new StellarAdapter();
