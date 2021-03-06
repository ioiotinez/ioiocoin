import { it } from "eslint/lib/rule-tester/rule-tester";
import adjustDifficult from "./adjustDifficult";

describe("adjustDifficult", () => {
  let block;

  beforeEach(() => {
    block = { timestamp: Date.now(), difficulty: 3 };
  });

  it("lowers the difficulty for  slowly mined blocks", () => {
    expect(adjustDifficult(block, block.timestamp + 60000)).toEqual(
      block.difficulty - 1
    );
  });

  it("increased the difficulty for quick mine blocks", () => {
    expect(adjustDifficult(block, block.timestamp + 1000)).toEqual(
      block.difficulty + 1
    );
  });
});
