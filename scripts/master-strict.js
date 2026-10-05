import fs from 'node:fs';
import path from 'node:path';

console.log('======================================================================');
console.log('   🛡️ MOOLNIVASHI-AI / QMOOSA — STRICT PRODUCTION REALITY GATE 🛡️    ');
console.log('======================================================================\n');

const truthPath = path.join('deployments', 'production-readiness.json');
if (!fs.existsSync(truthPath)) {
  console.error('❌ FAIL: deployments/production-readiness.json not found!');
  process.exit(1);
}

const truth = JSON.parse(fs.readFileSync(truthPath, 'utf8'));
const layers = truth.layers;
const blockers = [];
let passedCount = 0;
let totalCount = 0;

for (const [key, val] of Object.entries(layers)) {
  totalCount++;
  if (val.status === 'GREEN') {
    passedCount++;
    console.log(`✅ [GREEN] ${key}: ${val.evidence || 'Verified'}`);
  } else {
    blockers.push({ layer: key, status: val.status, blocker: val.blocker });
    console.log(`🔴 [${val.status}] ${key}: ${val.blocker || 'Pending'}`);
  }
}

console.log('\n----------------------------------------------------------------------');
console.log(`📊 STRICT REALITY SCORE: ${passedCount}/${totalCount} Layers Genuinely Green`);
console.log('----------------------------------------------------------------------\n');

if (blockers.length > 0) {
  console.log('⛔ PRODUCTION GATE BLOCKED: The following layers must be made genuinely green');
  console.log('   BEFORE any real funds or cycles are expended on ICP mainnet:\n');
  blockers.forEach((b, i) => {
    console.log(`  ${i + 1}. [${b.layer}] -> ${b.blocker}`);
  });
  console.log('\n🛡️ Financial Protection Active: Exiting with code 1 to prevent premature mainnet spend.\n');
  process.exit(1);
} else {
  console.log('🎉 ALL LAYERS ARE 100% GENUINELY GREEN! Safe to proceed to production.\n');
  process.exit(0);
}
