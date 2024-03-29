const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Transactions {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
  calculateHash() {
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();

    //     return crypto
    //       .createHash('sha256')
    //       .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
    //       .digest('hex');
  }
  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You Cannot Sign Transactions for other Wallets !!!");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");

    this.signature = sig.toDER("hex");
  }

  isValid() {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(" ")
    ) {
      this.nonce++;
      // this.hash = this.calculateHash();
    }
    this.hash = this.calculateHash();
    console.log(" Block mined : " + this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 0;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  createGenesisBlock() {
    return new Block(" 01/01/2017 ", " Genesis block ", "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }

  minePendingTrasactions(miningRewardAddress) {
    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.chain[this.chain.length - 1].hash
    );
    block.mineBlock(this.difficulty);

    console.log("Block Successfully Mined");

    this.chain.push(block);

    this.pendingTransactions = [
      new Transactions(null, miningRewardAddress, this.miningReward),
    ];
  }

  addTransaction(transactions) {
    if (!transactions.fromAddress || !transactions.toAddress) {
      throw new Error("Transaction must include from and to address");
    }

    // Verify the transactiion
    if (!transactions.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
    }

    this.pendingTransactions.push(transactions);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        console.log("1");
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(i, "2");
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        if (i != 1) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Transactions = Transactions;
