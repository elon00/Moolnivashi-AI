import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAIN_METADATA_REGISTRY, ALL_SUPPORTED_CHAINS } from '../packages/chain-sdk/src/registry.js';

test('Universal Router Registry: validates 3-tier classification and signature schemes', () => {
  assert.equal(ALL_SUPPORTED_CHAINS.length, 14);

  // Tier A: Native direct
  assert.equal(CHAIN_METADATA_REGISTRY.bitcoin.tier, 'TierA');
  assert.equal(CHAIN_METADATA_REGISTRY.bitcoin.rpcType, 'direct_protocol');
  assert.equal(CHAIN_METADATA_REGISTRY.dogecoin.tier, 'TierA');
  assert.equal(CHAIN_METADATA_REGISTRY.dogecoin.rpcType, 'direct_protocol');

  // Tier B: Dedicated RPC canisters
  assert.equal(CHAIN_METADATA_REGISTRY.ethereum.tier, 'TierB');
  assert.equal(CHAIN_METADATA_REGISTRY.ethereum.rpcType, 'dedicated_rpc_canister');
  assert.equal(CHAIN_METADATA_REGISTRY.solana.tier, 'TierB');
  assert.equal(CHAIN_METADATA_REGISTRY.solana.signatureScheme, 'ed25519');

  // Tier C: Chain-key + HTTPS outcalls
  assert.equal(CHAIN_METADATA_REGISTRY.polkadot.tier, 'TierC');
  assert.equal(CHAIN_METADATA_REGISTRY.cardano.tier, 'TierC');
  assert.equal(CHAIN_METADATA_REGISTRY.stellar.tier, 'TierC');
  assert.equal(CHAIN_METADATA_REGISTRY.cosmos.tier, 'TierC');
  assert.equal(CHAIN_METADATA_REGISTRY.ton.tier, 'TierC');
  assert.equal(CHAIN_METADATA_REGISTRY.xrp.tier, 'TierC');
});
