import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const strict = process.argv.includes('--strict');
const results = [];
const root = process.cwd();

function run(title, command) {
  const start = Date.now();
  process.stdout.write(`[MASTER] ${title}... `);
  try {
    execSync(command, { cwd: root, stdio: 'pipe', env: process.env });
    const duration = ((Date.now()-start)/1000).toFixed(2);
    console.log(`PASS (${duration}s)`);
    results.push({title,status:'PASS',duration});
  } catch (e) {
    const duration = ((Date.now()-start)/1000).toFixed(2);
    console.log(`FAIL (${duration}s)`);
    results.push({title,status:'FAIL',duration,error:e.message});
    if (strict) process.exit(e.status || 1);
  }
}

function exists(p) { return fs.existsSync(path.join(root,p)); }

console.log('================================================================');
console.log(' MOOLNIVASHI AI — REALITY-BASED MASTER RUNNER');
console.log('================================================================');

run('All unit/integration tests','npm test');
run('14-chain adapter contract tests','npm run test:adapters');
run('Universal router tests','npm run test:router');
run('x402 fail-closed/replay tests','npm run test:x402');
run('ML-DSA-65 cryptographic verification','npm run verify:pqc');
run('x402 proof-contract verification','npm run verify:x402');
run('Truth-aligned mission pipeline','npm run mission');
run('Production frontend build','npm run build');

const dfxConfigured = exists('dfx.json');
const canisterCount = dfxConfigured ? Object.keys(JSON.parse(fs.readFileSync('dfx.json','utf8')).canisters || {}).length : 0;
const mainnetEvidencePath = path.join(root,'deployments','mainnet-evidence.json');
let mainnetEvidence = false;
let evidenceDetail = 'missing deployments/mainnet-evidence.json';
if (fs.existsSync(mainnetEvidencePath)) {
  try {
    const e=JSON.parse(fs.readFileSync(mainnetEvidencePath,'utf8'));
    const ids=Object.values(e.canisters || {});
    mainnetEvidence = ids.length === canisterCount && ids.every(x => typeof x === 'string' && x.length > 10)
      && e.verification?.independentlyVerified === true;
    evidenceDetail = mainnetEvidence ? 'verified' : 'present but not independently verified/complete';
  } catch { evidenceDetail='invalid JSON'; }
}

const missionSource=fs.readFileSync('scripts/mission.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const codeTruth={
  testsGreen: results.every(r=>r.status==='PASS'),
  dfxConfigured,
  canisterCount,
  fourteenChainArchitecture: exists('adapters') && readme.includes('14'),
  liveChainEvidenceVerified: !missionSource.includes('SIMULATION_BASELINE_ONLY') && mainnetEvidence,
  thresholdSigningVerified: !missionSource.includes('realThresholdSigningVerified: false'),
  realBroadcastVerified: !missionSource.includes('realBroadcastVerified: false'),
  mldsaCryptographicVerification: exists('deployments/pqc-verification.json'),
  icpMainnetEvidenceVerified: mainnetEvidence
};

const blockers=[];
if(!codeTruth.liveChainEvidenceVerified) blockers.push('14-chain live RPC/testnet evidence is not independently verified');
if(!codeTruth.thresholdSigningVerified) blockers.push('real ICP threshold signing proof is still pending');
if(!codeTruth.realBroadcastVerified) blockers.push('real external-chain broadcast/confirmation evidence is still pending');
if(!codeTruth.mldsaCryptographicVerification) blockers.push('real ML-DSA cryptographic verification is still pending');
if(!codeTruth.icpMainnetEvidenceVerified) blockers.push('ICP mainnet canister IDs are not independently verified');

const report={
  project:'Moolnivashi AI',
  generatedAt:new Date().toISOString(),
  strict,
  results,
  codeTruth,
  blockers,
  baselineGreen: results.every(r=>r.status==='PASS'),
  productionFullyGreen: blockers.length===0,
  evidenceDetail
};
fs.mkdirSync('deployments',{recursive:true});
fs.writeFileSync('deployments/master-runner-report.json',JSON.stringify(report,null,2)+'\n');

console.log('----------------------------------------------------------------');
console.log(`Baseline: ${report.baselineGreen ? 'GREEN' : 'FAILED'}`);
console.log(`Production: ${report.productionFullyGreen ? 'GREEN' : 'BLOCKED'}`);
if(blockers.length) {
  console.log('Reality blockers:');
  blockers.forEach((b,i)=>console.log(` ${i+1}. ${b}`));
}
console.log('Report: deployments/master-runner-report.json');
console.log('----------------------------------------------------------------');

if (strict && blockers.length) process.exit(2);
