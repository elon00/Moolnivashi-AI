import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class StellarAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.stellar;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'G' + hash.slice(0, 55).toUpperCase();
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.000010', // 100 stroops
      slow: '0.000010',
      fast: '0.000100'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      sourceAccount: req.sender,
      fee: 100,
      seqNum: '1234567890',
      operations: [
        {
          type: 'payment',
          destination: req.recipient,
          asset: 'native',
          amount: req.amount
        }
      ]
    });
  }
}

export const stellarAdapter = new StellarAdapter();
