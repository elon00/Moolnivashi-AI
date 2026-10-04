import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class TonAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.ton;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('base64url');
    return 'EQ' + hash.slice(0, 46);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.005000', // 5,000,000 nanotons
      slow: '0.003000',
      fast: '0.010000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      workchain: 0,
      walletVersion: 'v4R2',
      seqno: 15,
      messages: [
        {
          to: req.recipient,
          value: req.amount,
          bounce: false,
          body: req.memo || ''
        }
      ]
    });
  }
}

export const tonAdapter = new TonAdapter();
