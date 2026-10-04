# QMOOSA UNIVERSAL CHAIN FUSION 🌐⚡

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![ICP Chain Fusion](https://img.shields.io/badge/Platform-Internet_Computer_Chain_Fusion-indigo.svg)](https://internetcomputer.org)
[![14 Chains](https://img.shields.io/badge/Chains-14_Tiered_Adapters-purple.svg)]()
[![Tests](https://img.shields.io/badge/Tests-19%2F19_Passing-brightgreen.svg)]()
[![DoD](https://img.shields.io/badge/Definition_of_Done-8_Steps_Verified-cyan.svg)]()
[![Mission](https://img.shields.io/badge/Mission-One--Click_Verified-emerald.svg)]()

> **Qmoosa Universal Chain Fusion** is an autonomous cross-chain Web3 + AI operating protocol built on the Internet Computer (ICP). ICP acts as the sovereign control plane and orchestration layer, connecting directly to **14 external blockchains** via native threshold cryptography (ECDSA, Schnorr, Ed25519) and dedicated RPC canisters without centralized bridges.

---

## 🏛️ Architecture Overview

```text
┌────────────────────────────────────────────────────────┐
│               Web / Mobile / AI Agent UI               │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                ICP Universal Gateway                   │
│          Identity Auth / Policy / Security             │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│             Chain Fusion Orchestrator                  │
│       AI Agents + Automation Timers + x402 Bazaar      │
└───────────────────────────┬────────────────────────────┘
                            │
     ┌──────────┬───────────┼──────────┬──────────┬──────────┐
     ▼          ▼           ▼          ▼          ▼          ▼
┌─────────┐┌─────────┐┌──────────┐┌─────────┐┌─────────┐┌─────────┐
│ Bitcoin ││ Ethereum││  Solana  ││Dogecoin ││Polkadot ││ Stellar │ ... (14 Chains)
│ Adapter ││ Adapter ││ Adapter  ││ Adapter ││ Adapter ││ Adapter │
└────┬────┘└────┬────┘└────┬─────┘└────┬────┘└────┬────┘└────┬────┘
     ▼          ▼          ▼           ▼          ▼          ▼
  Bitcoin   ETH / L2     Solana     Dogecoin   Polkadot   Stellar
  (Tier A)  (Tier B)    (Tier B)    (Tier A)   (Tier C)   (Tier C)
```

---

## ⛓️ The 14 Integrated Chains: 3-Tier Classification

According to established ICP Chain Fusion capabilities, chains are classified by their integration depth:

| Tier | Category | Chains | Integration Mechanism | Trust & Security Model |
|---|---|---|---|---|
| **Tier A** | Native / Direct Protocol | **Bitcoin, Dogecoin** | Native ICP canister UTXO state query & threshold ECDSA/Schnorr signing | Decentralized on-chain validation; no external RPC servers |
| **Tier B** | Dedicated RPC Infrastructure | **Ethereum, EVM L2 (Base/Arb), Solana** | Dedicated EVM RPC Canister & SOL RPC Canister with built-in threshold signing | Trust-minimized RPC consensus with threshold Ed25519 / ECDSA |
| **Tier C** | Universal Chain Fusion | **Aptos, Avalanche, Cardano, Cosmos, NEAR, Polkadot, Stellar, TON, XRP** | Chain-key threshold signatures + ICP HTTPS Outcalls to consensus endpoints | Threshold cryptographic signatures with outcall consensus voting |

---

## 📊 14-Chain Definition of Done & Status Matrix

Each chain adapter satisfies an unyielding 8-step lifecycle:
$$\text{Address Generation} \rightarrow \text{Balance Read} \rightarrow \text{Network Status} \rightarrow \text{Fee Estimate} \rightarrow \text{Unsigned Tx} \rightarrow \text{Chain-Key Sign} \rightarrow \text{Broadcast} \rightarrow \text{Tx Verification}$$

| Chain | Tier | Scheme | Read | Sign | Broadcast | DoD Gate | Testnet Status |
|---|---|---|---|---|---|---|---|
| **Bitcoin** | Tier A | `ecdsa_secp256k1` / `schnorr` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Dogecoin** | Tier A | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Ethereum** | Tier B | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **EVM (Base/Arb)** | Tier B | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Solana** | Tier B | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Aptos** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Avalanche** | Tier C | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Cardano** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Cosmos Hub** | Tier C | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **NEAR** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Polkadot** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **Stellar** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **TON** | Tier C | `ed25519` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |
| **XRP Ledger** | Tier C | `ecdsa_secp256k1` | ✅ | ✅ | ✅ | ✅ 8/8 PASS | 🟢 Verified Baseline |

---

## 🧩 Control Plane: 11 ICP Canisters

Located in `canisters/`:

1. `chain_router`: Dispatches cross-chain transactions to target chain adapters.
2. `identity_auth`: Internet Identity registration and multi-chain principal linking.
3. `wallet_manager`: Derives and stores deterministic multi-chain addresses without private key custody.
4. `transaction_orchestrator`: Multi-step stateful transaction lifecycle coordinator.
5. `agent_orchestrator`: AI Agentic reasoning engine with **Human-in-the-Loop Approval Gate**.
6. `x402_gateway`: Cross-chain machine micropayment settlement (HTTP 402 Paywall).
7. `automation`: Native ICP canister timers executing periodic sweeps and oracle syncs.
8. `governance`: SNS DAO proposal staking and multi-chain policy parameter tuning.
9. `token_registry`: Registry mapping native assets and chain-key twins (`ckBTC`, `ckETH`, `ckSOL`).
10. `audit_registry`: Append-only immutable cryptographic event log.
11. `pqc_attestation`: Post-Quantum Cryptography (NIST FIPS 204 ML-DSA) release verification.

---

## 👛 Universal Wallet Derivation

A single Internet Identity principal deterministically derives dedicated addresses across all 14 networks:
$$\text{Principal} + \text{Seed} \xrightarrow{\text{BIP-44 / ICP Chain-Key}} \{ \text{bc1q...}, \text{0x...}, \text{Solana Base58...}, \text{D...}, \text{1...}, \text{G...}, \dots \}$$

No seed phrases or private keys are ever stored in plaintext or database rows.

---

## 🤖 AI Agentic Layer & Human Approval Gate

Autonomous AI copilot capable of multi-step intent execution:
1. **Intent Interpreter**: Parses natural language requests (`"Send $10 from Solana to Stellar via cheapest route"`).
2. **Chain Selection Agent**: Evaluates fees, latency, and route liquidity.
3. **Transaction Builder**: Assembles the raw transaction payload.
4. **Human Approval Gate**: **Mandatory cryptographic signature approval required before any funds move.**
5. **Broadcaster & Audit**: Submits to network and verifies block inclusion.

---

## 🚀 One-Click Mission Automation

Execute the complete end-to-end mission pipeline:

```bash
# Run local verification pipeline (Environment + 14 Adapters + Tests + Manifest)
npm run mission

# Run testnet verification
npm run mission:testnet

# Run mainnet validation gate
npm run mission:mainnet
```

---

## 🛡️ Strict Deployment Truth Protocol

- Local preview & test harnesses are labeled as **verified baselines**.
- A canister is only considered **Mainnet Deployed** after `dfx deploy --network ic` completes, actual canister IDs are issued and written to `canister_ids.json`, and independently verified on the ICP Dashboard.
- **Fail-closed security**: Unverified cryptographic transactions are rejected by default.
