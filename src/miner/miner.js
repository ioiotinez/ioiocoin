import { blockchainWallet, Transaction } from "../wallet";
import { MESSAGE } from "../service/p2p";

class Miner {
	constructor(blockchain, p2pService, wallet) {
		this.blockchain = blockchain;
		this.p2pService = p2pService;
		this.wallet = wallet;
	}

	mine() {
		const {
			blockchain: { memoryPool },
		} = this;

		if (memoryPool.transaction.length === 0)
			throw Error("There are no transactions to mine.");

		memoryPool.transaction.push(Transaction.reward(wallet, blockchainWallet));
		const block = this.blockchain.addBlock(memoryPool.transactions);
		this.p2pService.sync();
		memoryPool.wipe();
		this.p2pService.broadcast(MESSAGE.WIPE);
	}
}

export default Miner;
