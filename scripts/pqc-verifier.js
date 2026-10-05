import fs from 'node:fs';
import crypto from 'node:crypto';
import { ml_dsa65 } from '@noble/post-quantum/ml-dsa.js';

const files=[
  'dfx.json',
  'canisters/chain_router/main.mo',
  'canisters/transaction_orchestrator/main.mo',
  'canisters/x402_gateway/main.mo',
  'canisters/pqc_attestation/main.mo'
];
const h=crypto.createHash('sha256');
for(const f of files){ if(fs.existsSync(f)) h.update(fs.readFileSync(f)); }
const digest=h.digest();
const keys=ml_dsa65.keygen();
if(keys.publicKey.length!==1952) throw new Error('Unexpected ML-DSA-65 public key size');
if(keys.secretKey.length!==4032) throw new Error('Unexpected ML-DSA-65 secret key size');
const sig=ml_dsa65.sign(digest,keys.secretKey);
if(sig.length!==3309) throw new Error('Unexpected ML-DSA-65 signature size');
if(!ml_dsa65.verify(sig,digest,keys.publicKey)) throw new Error('Valid ML-DSA-65 signature failed');
const tampered=Buffer.from(digest); tampered[0]^=0x01;
if(ml_dsa65.verify(sig,tampered,keys.publicKey)) throw new Error('Tampered digest was accepted');
const other=ml_dsa65.keygen();
if(ml_dsa65.verify(sig,digest,other.publicKey)) throw new Error('Wrong public key was accepted');
fs.mkdirSync('deployments',{recursive:true});
fs.writeFileSync('deployments/pqc-verification.json',JSON.stringify({
  algorithm:'ML-DSA-65',
  standard:'NIST FIPS 204',
  engine:'@noble/post-quantum',
  digestHex:Buffer.from(digest).toString('hex'),
  publicKeyBytes:keys.publicKey.length,
  signatureBytes:sig.length,
  positiveVerification:true,
  tamperRejected:true,
  wrongKeyRejected:true,
  verifiedAt:new Date().toISOString()
},null,2)+'\n');
console.log('ML-DSA-65: VERIFIED; tamper and wrong-key rejection: PASS');
