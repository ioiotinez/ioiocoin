import { it } from "eslint/lib/rule-tester/rule-tester";
import Blockchain from "../blockchain/blockchain";
import validate from "./validate";

describe("validate()", () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("validate a valid chain", () => {
    blockchain.addBlock("block-1");
    blockchain.addBlock("block-2");

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it("invalidate a chain with a corrupt genesis block", () => {
    blockchain.blocks[0].data = "b4d data";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid Genesis block");
  });

  it("invalidate a chain with a corrupt previousHash", () => {
    blockchain.addBlock("block-1");
    blockchain.blocks[1].previousHash = "hack";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid previous hash");
  });

  it("invalidate a chain with a corrupt hash", () => {
    blockchain.addBlock("block-1");
    blockchain.blocks[1].hash = "hack";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid hash");
  });
});
