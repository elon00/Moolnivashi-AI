import test from 'node:test';
import assert from 'node:assert/strict';
import { x402Gateway } from '../packages/x402-sdk/src/index.js';

test('x402 Cross-Chain Gateway: fails closed without independent on-chain verification', () => {
  const challenge = x402Gateway.createInvoice('ai-inference-multichain', '0.005', 'USDC');

  assert.equal(challenge.status, 402);
  assert.equal(challenge.protocol, 'x402-cross-chain-v1');
  assert.ok(challenge.invoiceId.startsWith('x402-inv-'));

  const proof = {
    invoiceId: challenge.invoiceId,
    chainId: 'solana',
    txHash: '5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b',
    senderAddress: 'example-sender',
    amount: '0.005',
    timestamp: Date.now()
  };

  const unverified = x402Gateway.verifyPaymentProof(proof);
  assert.equal(unverified.success, false);
  assert.match(unverified.error, /not been independently verified/i);

  const verified = x402Gateway.verifyPaymentProof(proof, {
    verified: true,
    verifier: 'live-rpc',
    invoiceId: proof.invoiceId,
    chainId: proof.chainId,
    txHash: proof.txHash,
    amount: proof.amount
  });

  assert.equal(verified.success, true);
  assert.equal(verified.settlement, 'VERIFIED_ON_CHAIN');
  assert.ok(verified.accessToken?.startsWith('jwt-qmoosa-cf-'));
});

test('x402 Cross-Chain Gateway: rejects mismatched verification evidence', () => {
  const challenge = x402Gateway.createInvoice('service', '1', 'USDC');
  const proof = {
    invoiceId: challenge.invoiceId,
    chainId: 'ethereum',
    txHash: '0xabc123',
    amount: '1'
  };

  const outcome = x402Gateway.verifyPaymentProof(proof, {
    verified: true,
    verifier: 'live-rpc',
    invoiceId: proof.invoiceId,
    chainId: proof.chainId,
    txHash: '0xdifferent',
    amount: proof.amount
  });

  assert.equal(outcome.success, false);
});
