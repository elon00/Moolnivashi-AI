import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { ALL_SUPPORTED_CHAINS, getChainAdapter } from '../packages/chain-sdk/src/index.js';

test('14-Chain adapter contract baseline: verifies interface behavior in simulation mode', async (t) => {
  assert.equal(ALL_SUPPORTED_CHAINS.length, 14, 'Must register exactly 14 chains');

  for (const chainId of ALL_SUPPORTED_CHAINS) {
    await t.test(`Adapter: ${chainId} satisfies baseline interface contract`, async () => {
      const adapter = getChainAdapter(chainId);
      assert.ok(adapter, `Adapter ${chainId} exists`);

      const mockPubKey = crypto.randomBytes(33);
      const address = await adapter.generateAddress("m/44'/0'/0'/0", new Uint8Array(mockPubKey));
      assert.ok(address.length > 5);

      const balance = await adapter.readBalance(address);
      assert.equal(balance.chainId, chainId);

      const status = await adapter.getNetworkStatus();
      assert.equal(status.chainId, chainId);

      const fee = await adapter.estimateFee({
        chainId,
        sender: address,
        recipient: address,
        amount: '1.0'
      });
      assert.ok(parseFloat(fee.estimatedFee) > 0);

      const unsignedTx = await adapter.buildUnsignedTransaction({
        chainId,
        sender: address,
        recipient: address,
        amount: '1.0'
      });
      assert.ok(unsignedTx.hashToSign.length > 0);
      assert.equal(unsignedTx.chainId, chainId);

      const simulationSignature = crypto.randomBytes(64);
      const signedTx = await adapter.chainKeySign(unsignedTx, new Uint8Array(simulationSignature));
      assert.equal(signedTx.chainId, chainId);

      const broadcast = await adapter.broadcast(signedTx);
      assert.equal(broadcast.chainId, chainId);

      const verify = await adapter.verifyTransaction(broadcast.txHash);
      assert.equal(verify.chainId, chainId);
    });
  }
});
