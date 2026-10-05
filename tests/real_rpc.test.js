import test from 'node:test';
import assert from 'node:assert/strict';
import { multiProviderRpc } from '../packages/chain-sdk/src/rpc-provider.js';

test('Real RPC: queries Ethereum Sepolia block height', async () => {
  const res = await multiProviderRpc.getEthereumBlockHeight();
  assert.ok(typeof res.height === 'number');
  assert.ok(res.height > 6_000_000, `Expected Sepolia height > 6M, got ${res.height}`);
  assert.ok(res.provider);
});

test('Real RPC: queries Solana slot and recent blockhash', async () => {
  const slotRes = await multiProviderRpc.getSolanaSlot();
  assert.ok(typeof slotRes.slot === 'number');
  assert.ok(slotRes.slot > 300_000_000, `Expected Solana slot > 300M, got ${slotRes.slot}`);

  const hashRes = await multiProviderRpc.getSolanaLatestBlockhash();
  assert.ok(typeof hashRes.blockhash === 'string');
  assert.ok(hashRes.blockhash.length >= 32);
});

test('Real RPC: queries Bitcoin testnet tip height', async () => {
  const res = await multiProviderRpc.getBitcoinTipHeight();
  assert.ok(typeof res.height === 'number');
  assert.ok(res.height > 2_500_000, `Expected Bitcoin testnet height > 2.5M, got ${res.height}`);
});

test('Real RPC: fallback handles network timeout gracefully', async () => {
  const fastClient = Object.create(multiProviderRpc);
  fastClient.timeoutMs = 1; // force timeout
  const ethFallback = await fastClient.getEthereumBlockHeight();
  assert.ok(ethFallback.height > 0);
  assert.ok(ethFallback.status);
});
