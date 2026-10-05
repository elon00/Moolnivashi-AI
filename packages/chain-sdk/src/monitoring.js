// Production Cycles & Health Monitoring Engine
export class ProductionObservabilityEngine {
  constructor() {
    this.thresholds = {
      healthyRunwayDays: 90,
      warningRunwayDays: 30,
      burnRateAlertPerDay: 1_000_000_000_000n // 1 TC per day
    };
    this.metrics = {
      rpcSuccessCount: 0,
      rpcFailureCount: 0,
      txSigningLatencyMs: [],
      cyclesBalance: 25_000_000_000_000n // Starting pool in cycles
    };
  }

  calculateRunway(currentCycles, burnRatePerDay) {
    if (burnRatePerDay === 0n) return { runwayDays: Infinity, status: 'GREEN' };
    const days = Number(currentCycles / burnRatePerDay);
    let status = 'GREEN';
    if (days < this.thresholds.warningRunwayDays) {
      status = 'RED';
    } else if (days < this.thresholds.healthyRunwayDays) {
      status = 'YELLOW';
    }
    return { runwayDays: days, status };
  }

  recordRpcCall(success, latencyMs) {
    if (success) {
      this.metrics.rpcSuccessCount++;
    } else {
      this.metrics.rpcFailureCount++;
    }
  }

  recordSigningLatency(latencyMs) {
    this.metrics.txSigningLatencyMs.push(latencyMs);
    if (this.metrics.txSigningLatencyMs.length > 100) {
      this.metrics.txSigningLatencyMs.shift();
    }
  }

  getHealthSummary() {
    const runway = this.calculateRunway(this.metrics.cyclesBalance, 100_000_000_000n); // 0.1 TC / day baseline
    const totalRpc = this.metrics.rpcSuccessCount + this.metrics.rpcFailureCount;
    const rpcUptimePct = totalRpc === 0 ? 100 : ((this.metrics.rpcSuccessCount / totalRpc) * 100).toFixed(2);
    return {
      status: runway.status,
      runwayDays: runway.runwayDays,
      rpcUptimePct,
      cyclesBalance: this.metrics.cyclesBalance.toString()
    };
  }
}

export const observabilityEngine = new ProductionObservabilityEngine();
