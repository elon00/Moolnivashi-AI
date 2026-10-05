import { execSync } from 'node:child_process';
import fs from 'node:fs';

function run(label,cmd){
  process.stdout.write('[FINISHER] '+label+'... ');
  execSync(cmd,{stdio:'pipe'});
  console.log('PASS');
}
run('root dependency install check','npm ls @noble/post-quantum');
run('all tests','npm test');
run('adapter tests','npm run test:adapters');
run('router tests','npm run test:router');
run('x402 contract tests','npm run test:x402');
run('ML-DSA-65 verification','npm run verify:pqc');
run('x402 proof validation','npm run verify:x402');
run('frontend build','npm run build');
run('master baseline','npm run master');

const report=JSON.parse(fs.readFileSync('deployments/master-runner-report.json','utf8'));
const codeGreen=report.baselineGreen===true;
const productionGreen=report.productionFullyGreen===true;
console.log('===============================================================');
console.log('MOOLNIVASHI AI PRODUCTION FINISHER');
console.log('Code/Baseline: '+(codeGreen?'GREEN':'FAILED'));
console.log('Production/Mainnet: '+(productionGreen?'GREEN':'BLOCKED BY REALITY GATES'));
for(const b of report.blockers||[]) console.log(' - '+b);
console.log('===============================================================');
if(!codeGreen) process.exit(1);
