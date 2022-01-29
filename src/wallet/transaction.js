import { transformAsync } from "@babel/core";
import { v4 as uuidv4 } from "uuid";

class Transaction {
  constructor() {
    this.id = uuidv4();
    this.input = null;
    this.outputs = [];
  }

  static create(senderWallet, recipientAddress, amount) {
    const { balance, publicKey } = senderWallet;

    if (amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

    const transaction = new Transaction();
    transaction.outputs.push(
      ...[
        { amount: balance - amount, address: publicKey },
        { amount, address: recipientAddress },
      ]
    );

    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(transaction.outputs),
    };

    return transaction;
  }
}

export default Transaction;
