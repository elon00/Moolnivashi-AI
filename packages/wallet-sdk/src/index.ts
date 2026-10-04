import crypto from 'node:crypto';
import { ALL_SUPPORTED_CHAINS, SupportedChain, getChainAdapter } from '../../chain-sdk/src/index.js';

export interface DerivedWalletAddress {
  chainId: SupportedChain;
  name: string;
  symbol: string;
  tier: string;
  derivationPath: string;
  address: string;
}

export class UniversalWalletManager {
  private readonly rootSeed: Buffer;

  constructor(seedHex?: string) {
    if (seedHex) {
      this.rootSeed = Buffer.from(seedHex, 'hex');
    } else {
      // Deterministic ephemeral seed for universal derivation
      this.rootSeed = crypto.createHash('sha256').update('qmoosa-universal-identity-root-baseline').digest();
    }
  }

  async deriveAllAddresses(identityPrincipal: string): Promise<DerivedWalletAddress[]> {
    const results: DerivedWalletAddress[] = [];

    for (const chainId of ALL_SUPPORTED_CHAINS) {
      const adapter = getChainAdapter(chainId);
      const derivationPath = `m/44'/icp'/0'/${chainId}`;
      
      // Derive distinct deterministic key per chain from principal + seed
      const keyMaterial = crypto
        .createHash('sha256')
        .update(this.rootSeed)
        .update(identityPrincipal)
        .update(chainId)
        .digest();

      const address = await adapter.generateAddress(derivationPath, new Uint8Array(keyMaterial));

      results.push({
        chainId,
        name: adapter.metadata.name,
        symbol: adapter.metadata.symbol,
        tier: adapter.metadata.tier,
        derivationPath,
        address
      });
    }

    return results;
  }
}

export const universalWalletManager = new UniversalWalletManager();
