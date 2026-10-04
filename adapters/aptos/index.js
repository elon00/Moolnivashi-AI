import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class AptosAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.aptos;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha3-256').update(publicKey).digest('hex');
    return '0x' + hash;
  }

  calculateFee(req) {
    return { estimated: '0.00002000', slow: '0.00001000', fast: '0.00005000' };
  }

  serializePayload(req) {
    return JSON.stringify({ sender: req.sender, sequence_number: '12', payload: { function: '0x1::coin::transfer', amount: req.amount } });
  }
}

export const aptosAdapter = new AptosAdapter();
