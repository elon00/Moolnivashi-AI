import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class DogecoinAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.dogecoin;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'D' + ripemd160.slice(0, 33);
  }

  calculateFee(req) {
    return { estimated: '1.00000000', slow: '0.50000000', fast: '2.00000000' };
  }

  serializePayload(req) {
    return JSON.stringify({
      version: 1,
      vin: [{ txid: 'doge-utxo-' + req.sender.slice(0, 8), vout: 0 }],
      vout: [{ value: req.amount, address: req.recipient }]
    });
  }
}

export const dogecoinAdapter = new DogecoinAdapter();
