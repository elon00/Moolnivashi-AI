import test from 'node:test';
import assert from 'node:assert/strict';
import { x402Gateway } from '../packages/x402-sdk/src/index.js';

test('Security Audit: Replay Attack Defense — duplicate txHash is rejected', () => {
  const inv = x402Gateway.createInvoice('audit-service-1', '0.01', 'USDC');
  const validProof = {
    invoiceId: inv.invoiceId,
    chainId: 'ethereum',
    txHash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    senderAddress: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
    amount: '0.01',
    timestamp: Date.now()
  };

  // First settlement succeeds
  const first = x402Gateway.verifyPaymentProof(validProof);
  assert.equal(first.success, true);

  // Second settlement with SAME txHash MUST FAIL (Replay attack)
  const replayInv = x402Gateway.createInvoice('audit-service-2', '0.01', 'USDC');
  const replayProof = { ...validProof, invoiceId: replayInv.invoiceId };
  const replayAttempt = x402Gateway.verifyPaymentProof(replayProof);
  assert.equal(replayAttempt.success, false);
  assert.ok(replayAttempt.error.includes('Replay attack detected'));
});

test('Security Audit: Underpayment Attack Defense — partial amount rejected', () => {
  const inv = x402Gateway.createInvoice('audit-service-3', '10.0', 'USDC');
  const underpaidProof = {
    invoiceId: inv.invoiceId,
    chainId: 'solana',
    txHash: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    senderAddress: '9u3y9z9z8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f',
    amount: '1.0', // Underpayment!
    timestamp: Date.now()
  };

  const attempt = x402Gateway.verifyPaymentProof(underpaidProof);
  assert.equal(attempt.success, false);
  assert.ok(attempt.error.includes('Underpayment'));
});
