import { Transaction } from "../wallet";

class MemoryPool {
	constructor() {
		this.transactions = [];
	}

	addOrUpdate(transaction) {
		const { input, outputs = [] } = transaction;
		const outputTotal = outputs.reduce(
			(total, output) => total + output.amount,
			0
		);
		if (input.amount !== outputTotal) {
			throw new Error("Invalid transaction");
		}
		if (!Transaction.verfiy(transaction)) {
			throw new Error("Invalid signature");
		}
		const index = this.transactions.findIndex(
			(item) => item.id === transaction.id
		);

		if (index >= 0) {
			this.transactions[index] = transaction;
		} else {
			this.transactions.push(transaction);
		}
	}

	find(address) {
		return this.transactions.find(
			(transaction) => transaction.input.address === address
		);
	}
}

export default MemoryPool;
