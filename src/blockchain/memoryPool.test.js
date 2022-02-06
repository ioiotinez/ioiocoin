import MemoryPool from "./memoryPool";
import Wallet, { Transaction } from "../wallet";

describe("MemoryPool", () => {
	let memoryPool;
	let wallet;
	let transaction;

	beforeEach(() => {
		memoryPool = new MemoryPool();
		wallet = new Wallet();
		transaction = Transaction.create(wallet, "r3cip13nt", 5);
		memoryPool.addOrUpdate(transaction);
	});

	it("has one transaction", () => {
		expect(memoryPool.transactions.length).toEqual(1);
	});

	it("updates a transaction", () => {
		const nextAmount = 3;
		const nextRecipient = "n3xt-4ddr355";
		const nextTransaction = transaction.update(
			wallet,
			nextRecipient,
			nextAmount
		);
		memoryPool.addOrUpdate(nextTransaction);
		expect(memoryPool.transactions.length).toEqual(1);
	});

	it("adds a transaction to the memoryPool", () => {
		const found = memoryPool.transactions.find(
			({ id }) => id === transaction.id
		);
		expect(found).toEqual(transaction);
	});

	it("updates a transaction in memoryPool", () => {
		const txOld = JSON.stringify(transaction);
		const txNew = transaction.update(wallet, "r3cip13nt", 10);

		memoryPool.addOrUpdate(txNew);
		expect(memoryPool.transactions.length).toEqual(1);

		const found = memoryPool.transactions.find(
			({ id }) => id === transaction.id
		);
		expect(JSON.stringify(found)).not.toEqual(txOld);

		expect(txNew).toEqual(txNew);
	});

	it("wipes transactions", () => {
		memoryPool.wipe();
		expect(memoryPool.transactions.length).toEqual(0);
	});
});
