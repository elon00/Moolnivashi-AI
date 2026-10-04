import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class NearAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.near;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return hash.slice(0, 64);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.000050',
      slow: '0.000030',
      fast: '0.000100'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      signerId: req.sender,
      receiverId: req.recipient,
      nonce: 101,
      actions: [{ Transfer: { deposit: req.amount } }],
      blockHash: 'Cu3b9iCg1zQvQ5yZfUvW5F2d3m5yYv1kL9m8N7v6P5'
    });
  }
}

export const nearAdapter = new NearAdapter();
