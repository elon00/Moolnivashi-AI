import fs from 'node:fs';
import path from 'node:path';

const adapters = [
  {
    chain: 'bitcoin',
    className: 'BitcoinAdapter',
    exportName: 'bitcoinAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'bc1q' + ripemd160.slice(0, 38);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00015000', slow: '0.00008000', fast: '0.00030000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({
      version: 2,
      locktime: 0,
      vin: [{ txid: 'mock-utxo-' + req.sender.slice(0, 8), vout: 0 }],
      vout: [{ value: req.amount, scriptPubKey: req.recipient }]
    });
  }`
  },
  {
    chain: 'dogecoin',
    className: 'DogecoinAdapter',
    exportName: 'dogecoinAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'D' + ripemd160.slice(0, 33);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '1.00000000', slow: '0.50000000', fast: '2.00000000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({
      version: 1,
      vin: [{ txid: 'doge-utxo-' + req.sender.slice(0, 8), vout: 0 }],
      vout: [{ value: req.amount, address: req.recipient }]
    });
  }`
  },
  {
    chain: 'ethereum',
    className: 'EthereumAdapter',
    exportName: 'ethereumAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.slice(24);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00120000', slow: '0.00080000', fast: '0.00250000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({
      nonce: 42,
      gasLimit: '21000',
      maxFeePerGas: '25000000000',
      to: req.recipient,
      value: req.amount,
      data: '0x'
    });
  }`
  },
  {
    chain: 'evm',
    className: 'EvmAdapter',
    exportName: 'evmAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.slice(24);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00004500', slow: '0.00002000', fast: '0.00009000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({
      chainId: 8453,
      nonce: 10,
      gasLimit: '21000',
      maxFeePerGas: '100000000',
      to: req.recipient,
      value: req.amount,
      data: '0x'
    });
  }`
  },
  {
    chain: 'solana',
    className: 'SolanaAdapter',
    exportName: 'solanaAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let num = BigInt('0x' + Buffer.from(publicKey.slice(0, 32)).toString('hex'));
    let result = '';
    while (num > 0n) {
      result = ALPHABET[Number(num % 58n)] + result;
      num = num / 58n;
    }
    return result.padEnd(44, '1').slice(0, 44);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00000500', slow: '0.00000500', fast: '0.00002500' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({
      recentBlockhash: 'EkSnNWid2cvwEVnPx9aZaINbdRZ82y2mW5gnBQGzqbpx',
      feePayer: req.sender,
      instructions: [{ programId: '11111111111111111111111111111111', keys: [], data: { lamports: req.amount } }]
    });
  }`
  },
  {
    chain: 'aptos',
    className: 'AptosAdapter',
    exportName: 'aptosAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha3-256').update(publicKey).digest('hex');
    return '0x' + hash;
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00002000', slow: '0.00001000', fast: '0.00005000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ sender: req.sender, sequence_number: '12', payload: { function: '0x1::coin::transfer', amount: req.amount } });
  }`
  },
  {
    chain: 'avalanche',
    className: 'AvalancheAdapter',
    exportName: 'avalancheAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.slice(24);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.00150000', slow: '0.00100000', fast: '0.00300000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ chainId: 43114, nonce: 5, gasLimit: '21000', to: req.recipient, value: req.amount });
  }`
  },
  {
    chain: 'cardano',
    className: 'CardanoAdapter',
    exportName: 'cardanoAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'addr1q' + hash.slice(0, 52);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.170000', slow: '0.155000', fast: '0.220000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ type: 'cardano_babbage_tx', outputs: [{ address: req.recipient, amount: req.amount }] });
  }`
  },
  {
    chain: 'cosmos',
    className: 'CosmosAdapter',
    exportName: 'cosmosAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'cosmos1' + ripemd160.slice(0, 38);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.005000', slow: '0.002500', fast: '0.010000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ body: { messages: [{ typeUrl: '/cosmos.bank.v1beta1.MsgSend', amount: req.amount }] } });
  }`
  },
  {
    chain: 'near',
    className: 'NearAdapter',
    exportName: 'nearAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return hash.slice(0, 64);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.000050', slow: '0.000030', fast: '0.000100' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ signerId: req.sender, receiverId: req.recipient, deposit: req.amount });
  }`
  },
  {
    chain: 'polkadot',
    className: 'PolkadotAdapter',
    exportName: 'polkadotAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '1' + hash.slice(0, 47);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.015000', slow: '0.010000', fast: '0.025000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ call: 'balances.transferKeepAlive', dest: req.recipient, value: req.amount });
  }`
  },
  {
    chain: 'stellar',
    className: 'StellarAdapter',
    exportName: 'stellarAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return 'G' + hash.slice(0, 55).toUpperCase();
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.000010', slow: '0.000010', fast: '0.000100' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ sourceAccount: req.sender, operations: [{ destination: req.recipient, amount: req.amount }] });
  }`
  },
  {
    chain: 'ton',
    className: 'TonAdapter',
    exportName: 'tonAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('base64url');
    return 'EQ' + hash.slice(0, 46);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.005000', slow: '0.003000', fast: '0.010000' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ workchain: 0, messages: [{ to: req.recipient, value: req.amount }] });
  }`
  },
  {
    chain: 'xrp',
    className: 'XrpAdapter',
    exportName: 'xrpAdapter',
    formatAddress: `
  formatAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return 'r' + ripemd160.slice(0, 33);
  }`,
    calculateFee: `
  calculateFee(req) {
    return { estimated: '0.000012', slow: '0.000010', fast: '0.000050' };
  }`,
    serializePayload: `
  serializePayload(req) {
    return JSON.stringify({ TransactionType: 'Payment', Account: req.sender, Destination: req.recipient, Amount: req.amount });
  }`
  }
];

for (const a of adapters) {
  const content = `import crypto from 'node:crypto';
import { BaseChainAdapter } from '../../packages/chain-sdk/src/base-adapter.js';
import { CHAIN_METADATA_REGISTRY } from '../../packages/chain-sdk/src/registry.js';

export class ${a.className} extends BaseChainAdapter {
  metadata = CHAIN_METADATA_REGISTRY.${a.chain};
${a.formatAddress}
${a.calculateFee}
${a.serializePayload}
}

export const ${a.exportName} = new ${a.className}();
`;
  const dir = path.join('adapters', a.chain);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.js'), content, 'utf8');
}
console.log('14 JS adapters built successfully.');
