import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { ALL_SUPPORTED_CHAINS, getChainAdapter } from '../packages/chain-sdk/src/index.js';

test('14-Chain Matrix: verifies complete 8-step lifecycle across all 14 adapters', async (t) => {
  assert.equal(ALL_SUPPORTED_CHAINS.length, 14, 'Must register exactly 14 chains');

  for (const chainId of ALL_SUPPORTED_CHAINS) {
    await t.test(`Adapter: ${chainId} satisfies full 8-step DoD`, async () => {
      const adapter = getChainAdapter(chainId);
      assert.ok(adapter, `Adapter ${chainId} exists`);

      // 1. Address Generation
      const mockPubKey = crypto.randomBytes(33);
      const address = await adapter.generateAddress("m/44'/0'/0'/0", new Uint8Array(mockPubKey));
      assert.ok(address.length > 5, `Address for ${chainId} is valid`);

      // 2. Balance Read
      const balance = await adapter.readBalance(address);
      assert.equal(balance.chainId, chainId);
      assert.ok(balance.confirmed);

      // 3. Network Status
      const status = await adapter.getNetworkStatus();
      assert.equal(status.isOnline, true);
      assert.ok(status.blockHeight > 0);

      // 4. Fee Estimate
      const fee = await adapter.estimateFee({
        chainId,
        sender: address,
        recipient: address,
        amount: '1.0'
      });
      assert.ok(parseFloat(fee.estimatedFee) > 0);

      // 5. Unsigned Transaction Building
      const unsignedTx = await adapter.buildUnsignedTransaction({
        chainId,
        sender: address,
        recipient: address,
        amount: '1.0'
      });
      assert.ok(unsignedTx.hashToSign.length > 0);
      assert.equal(unsignedTx.chainId, chainId);

      // 6. Chain-Key Signing
      const mockSig = crypto.randomBytes(64);
      const signedTx = await adapter.chainKeySign(unsignedTx, new Uint8Array(mockSig));
      assert.equal(signedTx.chainId, chainId);
      assert.ok(signedTx.signature.length > 0);

      // 7. Broadcast
      const broadcast = await adapter.broadcast(signedTx);
      assert.ok(broadcast.txHash.startsWith('0x'));
      assert.equal(broadcast.status, 'CONFIRMED');

      // 8. Transaction Verification
      const verify = await adapter.verifyTransaction(broadcast.txHash);
      assert.equal(verify.status, 'CONFIRMED');
      assert.ok(verify.confirmations > 0);
    });
  }
});
