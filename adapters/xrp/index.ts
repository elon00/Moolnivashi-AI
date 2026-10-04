import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class XrpAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.xrp;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'r' + ripemd160.slice(0, 33);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.000012', // 12 drops
      slow: '0.000010',
      fast: '0.000050'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      TransactionType: 'Payment',
      Account: req.sender,
      Destination: req.recipient,
      Amount: req.amount,
      Fee: '12',
      Sequence: 4,
      Flags: 2147483648
    });
  }
}

export const xrpAdapter = new XrpAdapter();
