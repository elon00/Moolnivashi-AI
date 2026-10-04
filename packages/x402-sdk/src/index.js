import crypto from 'node:crypto';

export class X402CrossChainGateway {
  createInvoice(serviceId, price, asset) {
    const invoiceId = `x402-inv-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    return {
      status: 402,
      protocol: 'x402-cross-chain-v1',
      invoiceId,
      serviceId,
      price,
      asset,
      acceptedChains: ['bitcoin', 'ethereum', 'evm', 'solana', 'dogecoin', 'polkadot', 'stellar'],
      expiresAt: Date.now() + 600_000
    };
  }

  /**
   * Fail-closed settlement gate.
   *
   * A syntactically plausible transaction hash is NOT payment evidence.
   * The second argument must come from a trusted live-chain verifier layer
   * after it has queried the target ledger/RPC and matched the invoice.
   */
  verifyPaymentProof(proof, verification = null) {
    if (!proof?.invoiceId || !proof?.chainId || !proof?.txHash || !proof?.amount) {
      return { success: false, error: 'Incomplete x402 payment proof' };
    }

    if (!verification || verification.verified !== true) {
      return { success: false, error: 'On-chain settlement has not been independently verified' };
    }

    const fieldsMatch =
      verification.invoiceId === proof.invoiceId &&
      verification.chainId === proof.chainId &&
      verification.txHash === proof.txHash &&
      String(verification.amount) === String(proof.amount) &&
      verification.verifier === 'live-rpc';

    if (!fieldsMatch) {
      return { success: false, error: 'Ledger verification evidence does not match the submitted proof' };
    }

    const token = `jwt-qmoosa-cf-${crypto
      .createHash('sha256')
      .update(proof.txHash + proof.invoiceId + proof.chainId)
      .digest('hex')
      .slice(0, 32)}`;

    return {
      success: true,
      accessToken: token,
      settlement: 'VERIFIED_ON_CHAIN'
    };
  }
}

export const x402Gateway = new X402CrossChainGateway();
