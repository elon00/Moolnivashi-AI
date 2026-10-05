import test from 'node:test';
import assert from 'node:assert/strict';
import { observabilityEngine } from '../packages/chain-sdk/src/monitoring.js';

test('Observability: calculates cycles runway and returns warning thresholds', () => {
  // 90+ days -> GREEN
  const healthy = observabilityEngine.calculateRunway(20_000_000_000_000n, 100_000_000_000n);
  assert.equal(healthy.status, 'GREEN');
  assert.ok(healthy.runwayDays >= 90);

  // 15 days -> RED
  const low = observabilityEngine.calculateRunway(1_500_000_000_000n, 100_000_000_000n);
  assert.equal(low.status, 'RED');
  assert.equal(low.runwayDays, 15);
});

test('Observability: tracks RPC call metrics and health telemetry', () => {
  observabilityEngine.recordRpcCall(true, 150);
  observabilityEngine.recordRpcCall(true, 180);
  observabilityEngine.recordSigningLatency(45);

  const health = observabilityEngine.getHealthSummary();
  assert.ok(health.status);
  assert.ok(parseFloat(health.rpcUptimePct) > 0);
});
