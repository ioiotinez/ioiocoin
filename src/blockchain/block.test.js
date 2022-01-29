import { it } from "eslint/lib/rule-tester/rule-tester";
import { execMap } from "nodemon/lib/config/defaults";
import Block from "./block";
import { DIFFICULTY } from "./block";

describe("Block", () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;

  // Se invoca con cada test
  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = "t3st-d4t4";
    hash = "h4s4";
    nonce = 128;
  });

  it("create an instance with parameters", () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.nonce).toEqual(nonce);
  });

  it("use static mine()", () => {
    const block = Block.mine(previousBlock, data);
    const { difficulty } = block;

    expect(block.hash.length).toEqual(64);
    expect(block.hash.substring(0, difficulty)).toEqual("0".repeat(difficulty));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.nonce).not.toEqual(0);
    expect(block.data).toEqual(data);
  });

  it("use static hash()", () => {
    hash = Block.hash(timestamp, previousBlock.hash, data, nonce);
    const hashOutput =
      "fbae641d418cfda1014e35f54da47adc9373606fa27aaafc7e857724c202c678";

    expect(hash).toEqual(hashOutput);
  });
});
