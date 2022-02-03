import Wallet, { INITIAL_BALANCE } from "./wallet";
import Blockchain from "../blockchain/blockchain";

describe("Wallet", () => {
	let wallet;
	let blockchain;

	beforeEach(() => {
		blockchain = new Blockchain();
		wallet = new Wallet(blockchain);
	});

	it("it is a healthy wallet", () => {
		expect(wallet.balance).toEqual(INITIAL_BALANCE);
		expect(typeof wallet.keyPair).toEqual("object");
		expect(typeof wallet.publicKey).toEqual("string");
		expect(wallet.publicKey.length).toEqual(130);
	});

	it("use sign()", () => {
		const signature = wallet.sign("Hello");
		expect(typeof signature).toEqual("object");
		expect(signature).toEqual(wallet.sign("Hello"));
	});

	describe("creating a transaction", () => {
		let tx;
		let amount;
		let recipientAddress;

		beforeEach(() => {
			recipientAddress = "r3c1p13nt";
			amount = 5;
			tx = wallet.createTransaction(recipientAddress, amount);
		});

		describe("and doing the same transaction", () => {
			beforeEach(() => {
				tx = wallet.createTransaction(recipientAddress, amount);
			});

			it("double the amount substracted from the wallet balance", () => {
				const output = tx.outputs.find(
					({ address }) => address === tx.publicKey
				);
				expect(output.amount).toEqual(wallet.balance - amount * 2);
			});

			it("close the amount output for the recipient", () => {
				const amount = tx.outputs.filter(
					({ address }) => address === recipientAddress
				);
				expect(amount).toEqual([{ address: recipientAddress, amount }]);
			});
		});
	});
});
