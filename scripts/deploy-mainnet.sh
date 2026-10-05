#!/usr/bin/env bash
set -euo pipefail

echo "=== Moolnivashi AI ICP Mainnet Deployment ==="
command -v dfx >/dev/null 2>&1 || { echo "ERROR: dfx is required"; exit 10; }

echo "[preflight] Running baseline master gates..."
node scripts/master-runner.js

echo "[preflight] ICP connectivity..."
dfx ping ic >/dev/null

IDENTITY="$(dfx identity whoami)"
PRINCIPAL="$(dfx identity get-principal)"
echo "[preflight] Identity: $IDENTITY"
echo "[preflight] Principal: $PRINCIPAL"

if [[ "${MOOLNIVASHI_CONFIRM_MAINNET:-}" != "YES" ]]; then
  echo "ERROR: set MOOLNIVASHI_CONFIRM_MAINNET=YES to authorize real on-chain deployment."
  exit 11
fi

echo "[deploy] Building frontend..."
npm run build

echo "[deploy] Deploying configured ICP canisters..."
dfx deploy --network ic

mkdir -p deployments
node <<'NODE'
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const dfx = JSON.parse(fs.readFileSync('dfx.json','utf8'));
const names = Object.keys(dfx.canisters || {});
const canisters = {};
for (const name of names) {
  canisters[name] = execFileSync('dfx',['canister','id','--network','ic',name],{encoding:'utf8'}).trim();
}
const evidence = {
  network:'ic-mainnet',
  deployedAt:new Date().toISOString(),
  canisters,
  frontendUrl: canisters.frontend ? `https://${canisters.frontend}.icp0.io` : null,
  verification:{
    independentlyVerified:false,
    note:'Deployment IDs were captured from dfx. Mark true only after independent ICP Dashboard/status verification.'
  }
};
fs.writeFileSync('deployments/mainnet-evidence.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify(evidence,null,2));
NODE

echo "Deployment complete. Independent verification is still required before productionFullyGreen=true."
