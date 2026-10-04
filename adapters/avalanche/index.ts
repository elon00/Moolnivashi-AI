import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class AvalancheAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.avalanche;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.slice(24);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.00150000',
      slow: '0.00100000',
      fast: '0.00300000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      chainId: 43114, // Avalanche C-Chain
      nonce: 5,
      gasLimit: '21000',
      maxFeePerGas: '27000000000',
      to: req.recipient,
      value: req.amount
    });
  }
}

export const avalancheAdapter = new AvalancheAdapter();
