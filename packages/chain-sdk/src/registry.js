export const CHAIN_METADATA_REGISTRY = {
  bitcoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    tier: 'TierA',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'direct_protocol',
    blockTimeSeconds: 600,
    explorerUrl: 'https://mempool.space'
  },
  dogecoin: {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    tier: 'TierA',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'direct_protocol',
    blockTimeSeconds: 60,
    explorerUrl: 'https://dogechain.info'
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    tier: 'TierB',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'dedicated_rpc_canister',
    blockTimeSeconds: 12,
    explorerUrl: 'https://etherscan.io'
  },
  evm: {
    id: 'evm',
    name: 'EVM Layer 2 (Base/Arbitrum)',
    symbol: 'ETH',
    tier: 'TierB',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'dedicated_rpc_canister',
    blockTimeSeconds: 2,
    explorerUrl: 'https://basescan.org'
  },
  solana: {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    tier: 'TierB',
    signatureScheme: 'ed25519',
    rpcType: 'dedicated_rpc_canister',
    blockTimeSeconds: 0.4,
    explorerUrl: 'https://explorer.solana.com'
  },
  aptos: {
    id: 'aptos',
    name: 'Aptos',
    symbol: 'APT',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 0.2,
    explorerUrl: 'https://explorer.aptoslabs.com'
  },
  avalanche: {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    tier: 'TierC',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 1,
    explorerUrl: 'https://snowtrace.io'
  },
  cardano: {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 20,
    explorerUrl: 'https://cardanoscan.io'
  },
  cosmos: {
    id: 'cosmos',
    name: 'Cosmos Hub',
    symbol: 'ATOM',
    tier: 'TierC',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 6,
    explorerUrl: 'https://www.mintscan.io/cosmos'
  },
  near: {
    id: 'near',
    name: 'NEAR Protocol',
    symbol: 'NEAR',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 1.2,
    explorerUrl: 'https://nearblocks.io'
  },
  polkadot: {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 6,
    explorerUrl: 'https://polkadot.subscan.io'
  },
  stellar: {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 5,
    explorerUrl: 'https://stellar.expert'
  },
  ton: {
    id: 'ton',
    name: 'The Open Network (TON)',
    symbol: 'TON',
    tier: 'TierC',
    signatureScheme: 'ed25519',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 5,
    explorerUrl: 'https://tonviewer.com'
  },
  xrp: {
    id: 'xrp',
    name: 'XRP Ledger',
    symbol: 'XRP',
    tier: 'TierC',
    signatureScheme: 'ecdsa_secp256k1',
    rpcType: 'chain_key_https_outcalls',
    blockTimeSeconds: 3.5,
    explorerUrl: 'https://xrpscan.com'
  }
};

export const ALL_SUPPORTED_CHAINS = Object.keys(CHAIN_METADATA_REGISTRY);
