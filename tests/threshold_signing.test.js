import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { thresholdSigner } from '../packages/chain-sdk/src/threshold-signer.js';

test('Threshold ECDSA: derives public key and signs message for Bitcoin/Ethereum', async () => {
  const principal = '6ppwb-h7r62-p4vkr-6cz2b-fi4qk-vz2xe-ezaaj-s3ftc-ggu4l-4265s-5qe';
  const path = thresholdSigner.formatDerivationPath(principal, 'ethereum', 0);
  
  const pubKey = thresholdSigner.deriveThresholdEcdsaPublicKey(path);
  assert.equal(pubKey.curve, 'secp256k1');
  assert.equal(pubKey.publicKey.length, 33); // 33-byte compressed pubkey

  // 32-byte message hash
  const rawTx = JSON.stringify({ to: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE', value: '10000000000000000', nonce: 1 });
  const txHash = crypto.createHash('sha256').update(rawTx).digest();

  const sig = await thresholdSigner.signWithEcdsa(txHash, path);
  assert.equal(sig.curve, 'secp256k1');
  assert.equal(sig.signature.length, 64);
  assert.ok(sig.r && sig.s);

  const isValid = thresholdSigner.verifyEcdsa(txHash, sig.signature, pubKey.publicKey);
  assert.equal(isValid, true);
});

test('Threshold Schnorr: derives Ed25519 key and signs message for Solana', async () => {
  const principal = '6ppwb-h7r62-p4vkr-6cz2b-fi4qk-vz2xe-ezaaj-s3ftc-ggu4l-4265s-5qe';
  const path = thresholdSigner.formatDerivationPath(principal, 'solana', 0);

  const pubKey = thresholdSigner.deriveThresholdSchnorrPublicKey(path);
  assert.equal(pubKey.algorithm, 'ed25519');
  assert.equal(pubKey.publicKey.length, 32);

  const message = Buffer.from('solana-transfer-instruction-payload', 'utf8');
  const sig = await thresholdSigner.signWithSchnorr(message, path);
  assert.equal(sig.algorithm, 'ed25519');
  assert.equal(sig.signature.length, 64);

  const isValid = thresholdSigner.verifySchnorr(message, sig.signature, pubKey.publicKey);
  assert.equal(isValid, true);
});

test('Threshold Signer: fails-closed on invalid input parameters', async () => {
  const path = thresholdSigner.formatDerivationPath('2vxsx-fae', 'bitcoin', 0);

  // Short hash
  await assert.rejects(
    async () => thresholdSigner.signWithEcdsa(Buffer.from('short'), path),
    /requires a 32-byte message hash/
  );

  // Empty message
  await assert.rejects(
    async () => thresholdSigner.signWithSchnorr(Buffer.alloc(0), path),
    /requires non-empty message bytes/
  );
});
