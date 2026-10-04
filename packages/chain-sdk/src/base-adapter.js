import crypto from 'node:crypto';

export class BaseChainAdapter {
  async generateAddress(derivationPath, compressedPublicKey) {
    if (!compressedPublicKey || compressedPublicKey.length === 0) {
      throw new Error(`Invalid public key provided for ${this.metadata.name}`);
    }
    return this.formatAddress(compressedPublicKey);
  }

  async readBalance(address) {
    const hash = crypto.createHash('sha256').update(address + this.metadata.id).digest('hex');
    const pseudoBal = (parseInt(hash.slice(0, 6), 16) / 10000).toFixed(4);

    return {
      chainId: this.metadata.id,
      address,
      balance: pseudoBal,
      decimals: this.metadata.symbol === 'BTC' || this.metadata.symbol === 'DOGE' ? 8 : 18,
      symbol: this.metadata.symbol,
      confirmed: true
    };
  }

  async getNetworkStatus() {
    const mockHeight = 1_000_000 + Math.floor(Date.now() / 1000 / this.metadata.blockTimeSeconds);
    return {
      chainId: this.metadata.id,
      isOnline: true,
      blockHeight: mockHeight,
      latencyMs: Math.floor(Math.random() * 40) + 15,
      rpcEndpoint: `icp-fusion://${this.metadata.id}.rpc.dfinity.network`,
      syncStatus: 'SYNCED'
    };
  }

  async estimateFee(txReq) {
    const fees = this.calculateFee(txReq);
    return {
      chainId: this.metadata.id,
      estimatedFee: fees.estimated,
      feeAsset: this.metadata.symbol,
      slowFee: fees.slow,
      fastFee: fees.fast
    };
  }

  async buildUnsignedTransaction(txReq) {
    const rawPayload = this.serializePayload(txReq);
    const hashToSign = crypto.createHash('sha256').update(rawPayload).digest('hex');
    const txId = `tx-${this.metadata.id}-${Date.now().toString(36)}-${crypto.randomBytes(4).toString('hex')}`;

    return {
      txId,
      chainId: this.metadata.id,
      rawPayload,
      hashToSign,
      signatureScheme: this.metadata.signatureScheme,
      metadata: {
        sender: txReq.sender,
        recipient: txReq.recipient,
        amount: txReq.amount,
        createdAt: Date.now()
      }
    };
  }

  async chainKeySign(unsignedTx, signatureBytes) {
    if (!signatureBytes || signatureBytes.length === 0) {
      throw new Error(`Signature bytes missing for chain-key execution on ${this.metadata.name}`);
    }

    const sigHex = Buffer.from(signatureBytes).toString('hex');
    const signerPubKey = crypto.createHash('sha256').update(sigHex).digest('hex').slice(0, 64);
    const serializedTx = JSON.stringify({
      raw: unsignedTx.rawPayload,
      sig: sigHex,
      scheme: unsignedTx.signatureScheme
    });

    return {
      txId: unsignedTx.txId,
      chainId: this.metadata.id,
      serializedTx,
      signature: sigHex,
      signerPublicKey: signerPubKey
    };
  }

  async broadcast(signedTx) {
    const txHash = '0x' + crypto.createHash('sha256').update(signedTx.serializedTx).digest('hex');
    return {
      txHash,
      chainId: this.metadata.id,
      broadcastTime: Date.now(),
      status: 'CONFIRMED',
      explorerUrl: `${this.metadata.explorerUrl}/tx/${txHash}`
    };
  }

  async verifyTransaction(txHash) {
    return {
      txHash,
      chainId: this.metadata.id,
      status: 'CONFIRMED',
      confirmations: 12,
      blockNumber: 1_234_567,
      timestamp: Date.now()
    };
  }
}
