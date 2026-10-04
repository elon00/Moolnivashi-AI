import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const modeArgIndex = args.indexOf('--mode');
const mode = modeArgIndex >= 0 ? args[modeArgIndex + 1] : 'baseline';
const allowedModes = new Set(['baseline', 'testnet', 'mainnet']);

if (!allowedModes.has(mode)) {
  console.error('Unsupported mode: ' + mode + '. Use baseline, testnet, or mainnet.');
  process.exit(2);
}

const root = process.cwd();
const evidenceDir = path.join(root, 'deployments');
const evidenceFile = path.join(evidenceDir, mode + '-evidence.json');

function run(label, command) {
  process.stdout.write('[finisher] ' + label + '... ');
  try {
    execSync(command, { stdio: 'inherit', env: process.env });
    console.log('PASS');
  } catch (error) {
    console.log('FAIL');
    process.exit(error.status || 1);
  }
}

function requireEvidence() {
  if (!fs.existsSync(evidenceFile)) {
    console.error('[finisher] Missing ' + mode + ' evidence file: deployments/' + mode + '-evidence.json. Live-chain modes are fail-closed until independently verifiable transaction/canister evidence is recorded.');
    process.exit(3);
  }

  const evidence = JSON.parse(fs.readFileSync(evidenceFile, 'utf8'));
  const required = ['network', 'generatedAt', 'transactions', 'verification'];
  for (const field of required) {
    if (!(field in evidence)) {
      console.error('[finisher] Evidence file is missing required field: ' + field);
      process.exit(4);
    }
  }

  if (!Array.isArray(evidence.transactions) || evidence.transactions.length === 0) {
    console.error('[finisher] Evidence file contains no live transactions.');
    process.exit(5);
  }

  if (evidence.verification?.independentlyVerified !== true) {
    console.error('[finisher] Evidence has not been independently verified.');
    process.exit(6);
  }
}

console.log('===============================================================');
console.log(' MOOLNIVASHI AI — MISSION FINISHER');
console.log(' Mode: ' + mode.toUpperCase());
console.log('===============================================================');

run('Baseline unit/integration contract tests', 'npm test');
run('Truth-aligned mission pipeline', 'node scripts/mission.js --network ' + (mode === 'baseline' ? 'local' : mode));
run('Frontend production build', 'npm run build');

if (mode !== 'baseline') {
  requireEvidence();
  console.log('[finisher] ' + mode + ' live-evidence gate: PASS');
} else {
  console.log('[finisher] Baseline mode intentionally skips live-chain evidence and deployment.');
}

const report = {
  project: 'Moolnivashi AI',
  mode,
  completedAt: new Date().toISOString(),
  baselineVerified: true,
  liveEvidenceVerified: mode === 'baseline' ? false : true,
  productionClaimAllowed: mode !== 'baseline',
  status: mode === 'baseline' ? 'AUTOMATION_BASELINE_COMPLETE' : 'LIVE_EVIDENCE_GATE_COMPLETE'
};

fs.mkdirSync(evidenceDir, { recursive: true });
fs.writeFileSync(path.join(evidenceDir, 'mission-finisher-' + mode + '.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');

console.log('===============================================================');
console.log(mode === 'baseline' ? 'MISSION FINISHER BASELINE COMPLETED SUCCESSFULLY' : 'MISSION FINISHER ' + mode.toUpperCase() + ' EVIDENCE GATE COMPLETED SUCCESSFULLY');
console.log('===============================================================');
