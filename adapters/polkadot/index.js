import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class PolkadotAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.polkadot;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '1' + hash.slice(0, 47);
  }

  calculateFee(req) {
    return { estimated: '0.015000', slow: '0.010000', fast: '0.025000' };
  }

  serializePayload(req) {
    return JSON.stringify({ call: 'balances.transferKeepAlive', dest: req.recipient, value: req.amount });
  }
}

export const polkadotAdapter = new PolkadotAdapter();
