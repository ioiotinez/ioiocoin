// FILE TO TEST HOW TO ADD BLOCKS

import Blockchain from "./src/blockchain";

/**
 * Create a new blockchain.
 * Add 10 blocks to the blockchain.
 * Log each block.
 */
const blockchain = new Blockchain();

for (let i = 0; i < 10; i++) {
	const block = blockchain.addBlock(`block-${i + 1}`);
	console.log(block.toString());
}
