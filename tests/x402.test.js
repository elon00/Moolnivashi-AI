import test from 'node:test';
import assert from 'node:assert/strict';
import { x402Gateway } from '../packages/x402-sdk/src/index.js';

test('x402 Cross-Chain Gateway: issues 402 challenge and unlocks access on valid proof', () => {
  const challenge = x402Gateway.createInvoice('ai-inference-multichain', '0.005', 'USDC');

  assert.equal(challenge.status, 402);
  assert.equal(challenge.protocol, 'x402-cross-chain-v1');
  assert.ok(challenge.invoiceId.startsWith('x402-inv-'));
  assert.ok(challenge.acceptedChains.length >= 7);

  const proof = {
    invoiceId: challenge.invoiceId,
    chainId: 'solana',
    txHash: '0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b',
    senderAddress: '9u3y9z9z8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f',
    amount: '0.005',
    timestamp: Date.now()
  };

  const outcome = x402Gateway.verifyPaymentProof(proof);
  assert.equal(outcome.success, true);
  assert.ok(outcome.accessToken?.startsWith('jwt-qmoosa-cf-'));
});
