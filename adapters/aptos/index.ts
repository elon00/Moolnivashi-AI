import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

export class AptosAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.aptos;

  formatAddress(publicKey: Uint8Array): string {
    const hash = crypto.createHash('sha3-256').update(publicKey).digest('hex');
    return '0x' + hash;
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.00002000',
      slow: '0.00001000',
      fast: '0.00005000'
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      sender: req.sender,
      sequence_number: '12',
      max_gas_amount: '2000',
      gas_unit_price: '100',
      payload: {
        type: 'entry_function_payload',
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: [req.recipient, req.amount]
      }
    });
  }
}

export const aptosAdapter = new AptosAdapter();
