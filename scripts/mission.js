import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_SUPPORTED_CHAINS, CHAIN_METADATA_REGISTRY } from '../packages/chain-sdk/src/index.js';
import { universalWalletManager } from '../packages/wallet-sdk/src/index.js';
import { x402Gateway } from '../packages/x402-sdk/src/index.js';

console.log('================================================================');
console.log('   🚀 QMOOSA UNIVERSAL CHAIN FUSION — ONE-CLICK MISSION 🚀     ');
console.log('================================================================');

const mode = process.argv.includes('--network') ? process.argv[process.argv.indexOf('--network') + 1] : 'local';
console.log(`[*] Target Environment: ${mode.toUpperCase()}`);

const startTime = Date.now();

function step(num, label, fn) {
  process.stdout.write(`[Step ${num}] ${label}... `);
  try {
    const res = fn();
    console.log('✅ PASS');
    return res;
  } catch (err) {
    console.log('❌ FAIL');
    console.error(err.message || err);
    process.exit(1);
  }
}

step(1, 'Environment & Node runtime check', () => {
  const version = process.version;
  if (!version.startsWith('v20') && !version.startsWith('v22') && !version.startsWith('v24')) {
    throw new Error(`Unsupported Node version: ${version}`);
  }
  return true;
});

step(2, 'Repository & 14-Chain adapter structure audit', () => {
  for (const chain of ALL_SUPPORTED_CHAINS) {
    const p = path.join('adapters', chain, 'index.js');
    if (!fs.existsSync(p)) throw new Error(`Missing adapter file for ${chain}`);
  }
  return true;
});

step(3, 'Baseline contract tests (simulation; not live-chain evidence)', () => {
  execSync('node --test tests/*.test.js', { stdio: 'pipe' });
  return true;
});

step(4, 'Universal wallet derivation simulation', () => {
  const mockPrincipal = 'ygwoo-ajcpq-dppl7-2ejwb-msjm2-tehg2-z56er-vbrxu-ne7hp-kdbth-2ae';
  return universalWalletManager.deriveAllAddresses(mockPrincipal);
});

step(5, 'x402 fail-closed settlement gate', () => {
  const ch = x402Gateway.createInvoice('ai-inference-multichain', '0.005', 'USDC');
  const proof = {
    invoiceId: ch.invoiceId,
    chainId: 'solana',
    txHash: 'synthetic-proof-must-not-unlock',
    senderAddress: 'simulation-only',
    amount: '0.005',
    timestamp: Date.now()
  };
  const res = x402Gateway.verifyPaymentProof(proof);
  if (res.success) throw new Error('x402 gate unlocked without independent on-chain verification');
  return true;
});

step(6, 'PQC truth gate (schema present; cryptographic verifier still pending)', () => {
  const p = path.join('canisters', 'pqc_attestation', 'main.mo');
  if (!fs.existsSync(p)) throw new Error('PQC attestation canister missing');
  return true;
});

step(7, 'Generate truth-aligned mission manifest', () => {
  const liveEvidence = mode !== 'local' && fs.existsSync(path.join('deployments', `${mode}-evidence.json`));
  const manifest = {
    project: 'Qmoosa Universal Chain Fusion',
    version: '1.0.0',
    mode,
    timestamp: new Date().toISOString(),
    chains: ALL_SUPPORTED_CHAINS.map((id) => ({
      id,
      name: CHAIN_METADATA_REGISTRY[id].name,
      tier: CHAIN_METADATA_REGISTRY[id].tier,
      scheme: CHAIN_METADATA_REGISTRY[id].signatureScheme,
      rpcType: CHAIN_METADATA_REGISTRY[id].rpcType,
      status: liveEvidence ? 'EVIDENCE_FILE_PRESENT_REQUIRES_REVIEW' : 'SIMULATION_BASELINE_ONLY'
    })),
    canisters: [
      'chain_router',
      'identity_auth',
      'wallet_manager',
      'transaction_orchestrator',
      'agent_orchestrator',
      'x402_gateway',
      'automation',
      'governance',
      'token_registry',
      'audit_registry',
      'pqc_attestation'
    ],
    truthProtocol: {
      liveChainEvidencePresent: liveEvidence,
      isMainnetDeployed: false,
      x402FailClosed: true,
      realThresholdSigningVerified: false,
      realBroadcastVerified: false,
      mldsaCryptographicVerification: false,
      reason: 'Production status remains false until independently verifiable live-chain evidence and ICP deployment IDs exist.'
    }
  };

  const deployDir = path.join('deployments');
  if (!fs.existsSync(deployDir)) fs.mkdirSync(deployDir, { recursive: true });
  fs.writeFileSync(path.join(deployDir, 'mission-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  return true;
});

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
console.log('================================================================');
console.log(`🎉 BASELINE MISSION COMPLETED SUCCESSFULLY in ${elapsed}s — production truth gates remain fail-closed.`);
console.log('================================================================');
