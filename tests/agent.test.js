import test from 'node:test';
import assert from 'node:assert/strict';
import { agentOrchestrator } from '../agents/universal_agents.js';

test('AI Agentic Layer: interprets intent and enforces human approval gate', () => {
  const prompt = 'Send $10 equivalent from Solana to Stellar choosing the cheapest route';
  const plan = agentOrchestrator.interpretIntent(prompt);

  assert.ok(plan.planId.startsWith('plan-'));
  assert.equal(plan.requiresHumanApproval, true);
  assert.equal(plan.status, 'PENDING_APPROVAL');
  assert.ok(plan.riskAssessment.notes.length > 0);

  const approved = agentOrchestrator.approvePlan(plan);
  assert.equal(approved.status, 'APPROVED');
  assert.equal(approved.requiresHumanApproval, false);
});
