import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class CosmosAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.cosmos;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'cosmos1' + ripemd160.slice(0, 38);
  }

  calculateFee(req) {
    return { estimated: '0.005000', slow: '0.002500', fast: '0.010000' };
  }

  serializePayload(req) {
    return JSON.stringify({ body: { messages: [{ typeUrl: '/cosmos.bank.v1beta1.MsgSend', amount: req.amount }] } });
  }
}

export const cosmosAdapter = new CosmosAdapter();
