// FILE TO TEST MINE BLOCKS

import Block from "./src/blockchain/block";

const { genesis } = Block;
console.log(genesis.toString());

const block1 = Block.mine(genesis, "d4t4");
console.log(block1.toString());

const block2 = Block.mine(block1, "datazo");
console.log(block2.toString());
