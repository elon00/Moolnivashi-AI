import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class SolanaAdapter extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.solana;

  formatAddress(publicKey) {
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let num = BigInt('0x' + Buffer.from(publicKey.slice(0, 32)).toString('hex'));
    let result = '';
    while (num > 0n) {
      result = ALPHABET[Number(num % 58n)] + result;
      num = num / 58n;
    }
    return result.padEnd(44, '1').slice(0, 44);
  }

  calculateFee(req) {
    return { estimated: '0.00000500', slow: '0.00000500', fast: '0.00002500' };
  }

  serializePayload(req) {
    return JSON.stringify({
      recentBlockhash: 'EkSnNWid2cvwEVnPx9aZaINbdRZ82y2mW5gnBQGzqbpx',
      feePayer: req.sender,
      instructions: [{ programId: '11111111111111111111111111111111', keys: [], data: { lamports: req.amount } }]
    });
  }
}

export const solanaAdapter = new SolanaAdapter();
