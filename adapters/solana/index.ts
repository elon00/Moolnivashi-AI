import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';
import { UnsignedTxRequest } from '../../packages/chain-sdk/src/types.js';

// Base58 simple mock encoder
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function toBase58(buffer: Buffer): string {
  let num = BigInt('0x' + buffer.toString('hex'));
  let result = '';
  while (num > 0n) {
    result = ALPHABET[Number(num % 58n)] + result;
    num = num / 58n;
  }
  return result;
}

export class SolanaAdapter extends BaseChainAdapter {
  readonly metadata = CHAIN_METADATA_REGISTRY.solana;

  formatAddress(publicKey: Uint8Array): string {
    const buf = Buffer.from(publicKey.slice(0, 32));
    return toBase58(buf).padEnd(44, '1').slice(0, 44);
  }

  calculateFee(req: UnsignedTxRequest): { estimated: string; slow: string; fast: string } {
    return {
      estimated: '0.00000500', // 5000 lamports
      slow: '0.00000500',
      fast: '0.00002500' // priority fee
    };
  }

  serializePayload(req: UnsignedTxRequest): string {
    return JSON.stringify({
      recentBlockhash: 'EkSnNWid2cvwEVnPx9aZaINbdRZ82y2mW5gnBQGzqbpx',
      feePayer: req.sender,
      instructions: [
        {
          programId: '11111111111111111111111111111111', // SystemProgram
          keys: [
            { pubkey: req.sender, isSigner: true, isWritable: true },
            { pubkey: req.recipient, isSigner: false, isWritable: true }
          ],
          data: { lamports: req.amount }
        }
      ]
    });
  }
}

export const solanaAdapter = new SolanaAdapter();
