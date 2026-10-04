export * from './registry.js';
export * from './base-adapter.js';

import { bitcoinAdapter } from '../../../adapters/bitcoin/index.js';
import { dogecoinAdapter } from '../../../adapters/dogecoin/index.js';
import { ethereumAdapter } from '../../../adapters/ethereum/index.js';
import { evmAdapter } from '../../../adapters/evm/index.js';
import { solanaAdapter } from '../../../adapters/solana/index.js';
import { aptosAdapter } from '../../../adapters/aptos/index.js';
import { avalancheAdapter } from '../../../adapters/avalanche/index.js';
import { cardanoAdapter } from '../../../adapters/cardano/index.js';
import { cosmosAdapter } from '../../../adapters/cosmos/index.js';
import { nearAdapter } from '../../../adapters/near/index.js';
import { polkadotAdapter } from '../../../adapters/polkadot/index.js';
import { stellarAdapter } from '../../../adapters/stellar/index.js';
import { tonAdapter } from '../../../adapters/ton/index.js';
import { xrpAdapter } from '../../../adapters/xrp/index.js';

export const ADAPTER_MAP = {
  bitcoin: bitcoinAdapter,
  dogecoin: dogecoinAdapter,
  ethereum: ethereumAdapter,
  evm: evmAdapter,
  solana: solanaAdapter,
  aptos: aptosAdapter,
  avalanche: avalancheAdapter,
  cardano: cardanoAdapter,
  cosmos: cosmosAdapter,
  near: nearAdapter,
  polkadot: polkadotAdapter,
  stellar: stellarAdapter,
  ton: tonAdapter,
  xrp: xrpAdapter
};

export function getChainAdapter(chainId) {
  const adapter = ADAPTER_MAP[chainId];
  if (!adapter) {
    throw new Error(`Chain adapter not registered for: ${chainId}`);
  }
  return adapter;
}
