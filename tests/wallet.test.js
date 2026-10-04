import test from 'node:test';
import assert from 'node:assert/strict';
import { universalWalletManager } from '../packages/wallet-sdk/src/index.js';

test('Universal Wallet: derives all 14 distinct chain accounts from single ICP identity', async () => {
  const mockPrincipal = 'ygwoo-ajcpq-dppl7-2ejwb-msjm2-tehg2-z56er-vbrxu-ne7hp-kdbth-2ae';
  const addresses = await universalWalletManager.deriveAllAddresses(mockPrincipal);

  assert.equal(addresses.length, 14, 'Must derive addresses for all 14 chains');

  const btc = addresses.find((a) => a.chainId === 'bitcoin');
  assert.ok(btc && btc.address.startsWith('bc1q'), 'Bitcoin SegWit address');

  const eth = addresses.find((a) => a.chainId === 'ethereum');
  assert.ok(eth && eth.address.startsWith('0x'), 'Ethereum hex address');

  const sol = addresses.find((a) => a.chainId === 'solana');
  assert.ok(sol && sol.address.length >= 32, 'Solana Base58 address');

  const doge = addresses.find((a) => a.chainId === 'dogecoin');
  assert.ok(doge && doge.address.startsWith('D'), 'Dogecoin address');

  const dot = addresses.find((a) => a.chainId === 'polkadot');
  assert.ok(dot && dot.address.startsWith('1'), 'Polkadot SS58 address');

  const xlm = addresses.find((a) => a.chainId === 'stellar');
  assert.ok(xlm && xlm.address.startsWith('G'), 'Stellar address');
});
