import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class XrpAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.xrp;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'r' + ripemd160.slice(0, 33);
  }

  calculateFee(req) {
    return { estimated: '0.000012', slow: '0.000010', fast: '0.000050' };
  }

  serializePayload(req) {
    return JSON.stringify({ TransactionType: 'Payment', Account: req.sender, Destination: req.recipient, Amount: req.amount });
  }
}

export const xrpAdapter = new XrpAdapter();
