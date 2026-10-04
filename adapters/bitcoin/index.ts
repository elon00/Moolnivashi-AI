import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class BitcoinAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.bitcoin;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'bc1q' + ripemd160.slice(0, 38);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.00015000',
      slow: '0.00008000',
      fast: '0.00030000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      version: 2,
      locktime: 0,
      vin: [{ txid: 'mock-utxo-' + req.sender.slice(0, 8), vout: 0 }],
      vout: [{ value: req.amount, scriptPubKey: req.recipient }]
    });
  }
}

export const bitcoinAdapter = new BitcoinAdapter();
