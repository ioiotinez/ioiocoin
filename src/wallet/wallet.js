import { elliptic, hash } from "../modules";
import Transaction from "./transaction";

const INITIAL_BALANCE = 100;

class Wallet {
	constructor(blockchain, initialBalance = INITIAL_BALANCE) {
		this.balance = INITIAL_BALANCE;
		this.keyPair = elliptic.createKeyPair();
		this.publicKey = this.keyPair.getPublic().encode("hex");
		this.blockchain = blockchain;
	}

	toString() {
		const { balance, publicKey } = this;

		return `Wallet - 
        publicKey    : ${publicKey.toString()}
        balance      : ${balance}
      `;
	}

	sign(data) {
		return this.keyPair.sign(hash(data));
	}

	createTransaction(recipientAddress, amount) {
		const {
			blockchain: { memoryPool },
		} = this;
		const balance = this.currentBalance;
		if (amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

		let tx = memoryPool.find(this.publicKey);
		if (tx) {
			tx.update(this, recipientAddress, amount);
		} else {
			tx = Transaction.create(this, recipientAddress, amount);
			memoryPool.addOrUpdate(tx);
		}

		return tx;
	}

	get currentBalance() {
		const {
			blockchain: { blocks = [] },
			publicKey,
		} = this;
		let { balance } = this;

		const txs = [];

		blocks.forEach(({ data = [] }) => {
			if (Array.isArray(data)) data.forEach((tx) => txs.push(tx));
		});

		const walletInputTxs = txs.filter((tx) => tx.input.address === publicKey);
		let timestamp = 0;

		if (walletInputsTxs.length > 0) {
			const recentInputTx = walletInputTxs
				.sort((a, b) => a.input.timestamp - b.input.timestamp)
				.pop();

			balance = recentInputTx.outputs.find(
				({ address }) => address === publicKey
			).amount;
			timestamp = recentInputTx.input.timestamp;
		}

		txs
			.filter(({ input }) => input.timestamp > timestamp)
			.forEach(({ outputs }) => {
				outputs.find(({ address, amount }) => {
					if (address == publicKey) balance += amount;
				});
			});

		return balance;
	}
}
export { INITIAL_BALANCE };
export default Wallet;
