import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class CardanoAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.cardano;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'addr1q' + hash.slice(0, 52);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.170000', // 170k lovelace
      slow: '0.155000',
      fast: '0.220000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      type: 'cardano_babbage_tx',
      inputs: [{ txHash: 'mock-utxo-' + req.sender.slice(0, 8), index: 0 }],
      outputs: [{ address: req.recipient, amount: req.amount }],
      fee: '170000'
    });
  }
}

export const cardanoAdapter = new CardanoAdapter();
