import crypto from 'node:crypto';
import { ALL_SUPPORTED_CHAINS, getChainAdapter } from '../../chain-sdk/src/index.js';

export class UniversalWalletManager {
  constructor(seedHex) {
    if (seedHex) {
      this.rootSeed = Buffer.from(seedHex, 'hex');
    } else {
      this.rootSeed = crypto.createHash('sha256').update('qmoosa-universal-identity-root-baseline').digest();
    }
  }

  async deriveAllAddresses(identityPrincipal) {
    const results = [];

    for (const chainId of ALL_SUPPORTED_CHAINS) {
      const adapter = getChainAdapter(chainId);
      const derivationPath = `m/44'/icp'/0'/${chainId}`;
      
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
