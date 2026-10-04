import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class EthereumAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.ethereum;

  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.slice(24);
  }

  calculateFee(req) {
    return { estimated: '0.00120000', slow: '0.00080000', fast: '0.00250000' };
  }

  serializePayload(req) {
    return JSON.stringify({
      nonce: 42,
      gasLimit: '21000',
      maxFeePerGas: '25000000000',
      to: req.recipient,
      value: req.amount,
      data: '0x'
    });
  }
}

export const ethereumAdapter = new EthereumAdapter();
