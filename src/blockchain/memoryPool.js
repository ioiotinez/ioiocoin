class MemoryPool {
	constructor() {
		this.transactions = [];
	}

	addOrUpdate(transaction) {
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
