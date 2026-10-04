import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const modeIndex = args.indexOf('--mode');
const mode = modeIndex >= 0 ? args[modeIndex + 1] : 'baseline';
if (!['baseline','testnet','mainnet'].includes(mode)) {
  console.error('[master-green] Unsupported mode: ' + mode);
  process.exit(2);
}

function run(label, command) {
  process.stdout.write('[master-green] ' + label + '... ');
  try {
    execSync(command, { stdio: 'inherit', env: process.env });
    console.log('PASS');
  } catch (error) {
    console.log('FAIL');
    process.exit(error.status || 1);
  }
}

function assertFile(file) {
  if (!fs.existsSync(file)) {
    console.error('[master-green] Missing required file: ' + file);
    process.exit(10);
  }
}

function validateEvidence(targetMode) {
  const file = path.join('deployments', targetMode + '-evidence.json');
  assertFile(file);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(data.transactions) || data.transactions.length === 0) {
    console.error('[master-green] Evidence has no transactions.');
    process.exit(11);
  }
  const serialized = JSON.stringify(data).toLowerCase();
  if (serialized.includes('replace-with-real') || serialized.includes('example-chain') || serialized.includes('placeholder')) {
    console.error('[master-green] Placeholder evidence detected.');
    process.exit(12);
  }
  if (data.verification?.independentlyVerified !== true) {
    console.error('[master-green] Evidence is not independently verified.');
    process.exit(13);
  }
}

console.log('===============================================================');
console.log(' MOOLNIVASHI AI — MASTER ONE-CLICK GREEN MISSION');
console.log(' Mode: ' + mode.toUpperCase());
console.log('===============================================================');

assertFile('dfx.json');
assertFile('canisters/pqc_attestation/main.mo');
assertFile('canisters/x402_gateway/main.mo');
assertFile('scripts/mission-finisher.js');

run('All unit/integration tests', 'npm test');
run('14-chain adapter tests', 'npm run test:adapters');
run('Router tests', 'npm run test:router');
run('x402 fail-closed tests', 'npm run test:x402');
run('Truth-aligned mission baseline', 'npm run mission');
run('Frontend production build', 'npm run build');

if (mode !== 'baseline') {
  validateEvidence(mode);
  console.log('[master-green] ' + mode + ' evidence gate: PASS');
} else {
  console.log('[master-green] Baseline mode: live-chain evidence not claimed.');
}

const report = {
  project: 'Moolnivashi AI',
  mode,
  generatedAt: new Date().toISOString(),
  ciBaselineGreen: true,
  frontendBuildGreen: true,
  adapterContractTestsGreen: true,
  x402FailClosed: true,
  pqcSchemaPresent: true,
  pqcCryptographicVerification: false,
  liveEvidenceVerified: mode === 'baseline' ? false : true,
  productionFullyGreen: false,
  note: mode === 'baseline'
    ? 'Baseline automation is green. Production status still requires live chain evidence, threshold signing proof, ML-DSA verification, and ICP deployment IDs.'
    : 'Live evidence gate passed; production status still requires the remaining cryptographic/deployment gates to be independently verified.'
};

fs.mkdirSync('deployments', { recursive: true });
fs.writeFileSync('deployments/master-green-report.json', JSON.stringify(report, null, 2) + '\n', 'utf8');

console.log('===============================================================');
console.log('MASTER GREEN AUTOMATION BASELINE COMPLETED SUCCESSFULLY');
console.log('===============================================================');
