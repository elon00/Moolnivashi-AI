import test from 'node:test';
import assert from 'node:assert/strict';
import { x402Gateway } from '../packages/x402-sdk/src/index.js';

test('Security Audit: Fail-Closed Gate — unverified settlement is rejected', () => {
  const inv = x402Gateway.createInvoice('audit-service-1', '0.01', 'USDC');
  const proof = {
    invoiceId: inv.invoiceId,
    chainId: 'ethereum',
    txHash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    senderAddress: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
    amount: '0.01',
    timestamp: Date.now()
  };

  // Without independent verification evidence, MUST FAIL
  const unverified = x402Gateway.verifyPaymentProof(proof);
  assert.equal(unverified.success, false);
  assert.match(unverified.error, /not been independently verified/i);

  // With valid independent verification, succeeds
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
});

test('Security Audit: Underpayment Attack Defense — partial amount rejected', () => {
  const inv = x402Gateway.createInvoice('audit-service-2', '10.0', 'USDC');
  const underpaidProof = {
    invoiceId: inv.invoiceId,
    chainId: 'solana',
    txHash: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    senderAddress: '9u3y9z9z8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f',
    amount: '1.0', // Underpayment!
    timestamp: Date.now()
  };

  // Verification evidence claiming 10.0 but proof only paid 1.0 -> MUST FAIL
  const attempt = x402Gateway.verifyPaymentProof(underpaidProof, {
    verified: true,
    verifier: 'live-rpc',
    invoiceId: underpaidProof.invoiceId,
    chainId: underpaidProof.chainId,
    txHash: underpaidProof.txHash,
    amount: '10.0'
  });
  assert.equal(attempt.success, false);
  assert.match(attempt.error, /does not match the submitted proof/i);
});
