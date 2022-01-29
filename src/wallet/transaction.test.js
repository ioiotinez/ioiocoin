import { it } from "eslint/lib/rule-tester/rule-tester";
import Transaction from "./transaction";
import Wallet from "./wallet";

describe("Transaction", () => {
  let wallet;
  let transaction;
  let amount;
  let recipientAddress;

  beforeEach(() => {
    wallet = new Wallet();
    recipientAddress = "r3cip13nt";
    amount = 5;
    transaction = Transaction.create(wallet, recipientAddress, amount);
  });

  it("outputs the amount substracted from the wallet balance", () => {
    const output = transaction.outputs.find(
      ({ address }) => address === wallet.publicKey
    );
    expect(output.amount).toEqual(wallet.balance - amount);
  });

  it("outputs the amount added to the recipient", () => {
    const output = transaction.outputs.find(
      ({ address }) => address === recipientAddress
    );
    expect(output.amount).toEqual(amount);
  });

  it("input the balance of the wallet", () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it("input the sender address of the wallet", () => {
    expect(transaction.input.address).toEqual(wallet.publicKey);
  });
});
