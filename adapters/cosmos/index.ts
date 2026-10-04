import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class CosmosAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.cosmos;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'cosmos1' + ripemd160.slice(0, 38);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.005000', // 5000 uatom
      slow: '0.002500',
      fast: '0.010000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      body: {
        messages: [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: req.sender,
              toAddress: req.recipient,
              amount: [{ denom: 'uatom', amount: req.amount }]
            }
          }
        ],
        memo: req.memo || ''
      },
      authInfo: {
        fee: { amount: [{ denom: 'uatom', amount: '5000' }], gasLimit: '200000' }
      }
    });
  }
}

export const cosmosAdapter = new CosmosAdapter();
