export type ChainTier = 'TierA' | 'TierB' | 'TierC';

export type SignatureScheme = 'ecdsa_secp256k1' | 'schnorr_bip340' | 'ed25519';

export type SupportedChain =
  | 'bitcoin'
  | 'ethereum'
  | 'evm'
  | 'solana'
  | 'dogecoin'
  | 'aptos'
  | 'avalanche'
  | 'cardano'
  | 'cosmos'
  | 'near'
  | 'polkadot'
  | 'stellar'
  | 'ton'
  | 'xrp';

export interface ChainMetadata {
  id: SupportedChain;
  name: string;
  symbol: string;
  tier: ChainTier;
  signatureScheme: SignatureScheme;
  rpcType: 'direct_protocol' | 'dedicated_rpc_canister' | 'chain_key_https_outcalls';
  blockTimeSeconds: number;
  explorerUrl: string;
}

export interface NetworkStatus {
  chainId: SupportedChain;
  isOnline: boolean;
  blockHeight: number;
  latencyMs: number;
  rpcEndpoint: string;
  syncStatus: 'SYNCED' | 'SYNCING' | 'DEGRADED';
}

export interface BalanceInfo {
  chainId: SupportedChain;
  address: string;
  balance: string;
  decimals: number;
  symbol: string;
  confirmed: boolean;
}

export interface FeeEstimate {
  chainId: SupportedChain;
  estimatedFee: string;
  feeAsset: string;
  gasLimit?: string;
  gasPrice?: string;
  slowFee: string;
  fastFee: string;
}

export interface UnsignedTxRequest {
  chainId: SupportedChain;
  sender: string;
  recipient: string;
  amount: string;
  asset?: string;
  memo?: string;
}

export interface UnsignedTransaction {
  txId: string;
  chainId: SupportedChain;
  rawPayload: string;
  hashToSign: string;
  signatureScheme: SignatureScheme;
  metadata: Record<string, unknown>;
}

export interface SignedTransaction {
  txId: string;
  chainId: SupportedChain;
  serializedTx: string;
  signature: string;
  signerPublicKey: string;
}

export interface BroadcastResult {
  txHash: string;
  chainId: SupportedChain;
  broadcastTime: number;
  status: 'PENDING' | 'SUBMITTED' | 'CONFIRMED';
  explorerUrl: string;
}

export interface TransactionVerification {
  txHash: string;
  chainId: SupportedChain;
  status: 'CONFIRMED' | 'FAILED' | 'NOT_FOUND';
  confirmations: number;
  blockNumber: number;
  timestamp: number;
}

export interface ChainAdapter {
  readonly metadata: ChainMetadata;
  generateAddress(publicKeyDerivationPath: string, compressedPublicKey: Uint8Array): Promise<string>;
  readBalance(address: string): Promise<BalanceInfo>;
  getNetworkStatus(): Promise<NetworkStatus>;
  estimateFee(txReq: UnsignedTxRequest): Promise<FeeEstimate>;
  buildUnsignedTransaction(txReq: UnsignedTxRequest): Promise<UnsignedTransaction>;
  chainKeySign(unsignedTx: UnsignedTransaction, signatureBytes: Uint8Array): Promise<SignedTransaction>;
  broadcast(signedTx: SignedTransaction): Promise<BroadcastResult>;
  verifyTransaction(txHash: string): Promise<TransactionVerification>;
}
