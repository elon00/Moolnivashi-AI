import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class PolkadotAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.polkadot;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '1' + hash.slice(0, 47);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.015000', // 15 millidot
      slow: '0.010000',
      fast: '0.025000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      call: 'balances.transferKeepAlive',
      dest: req.recipient,
      value: req.amount,
      era: 'immortal',
      nonce: 8,
      tip: 0
    });
  }
}

export const polkadotAdapter = new PolkadotAdapter();
