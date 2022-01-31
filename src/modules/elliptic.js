import Elliptic from "elliptic";
import hash from "./hash.js";

const ec = new Elliptic.ec("secp256k1");

export default {
	createKeyPair: () => ec.genKeyPair(),

	verifySignature: (publicKey, signature, data) => {
		const key = ec.keyFromPublic(publicKey, "hex");
		return key.verify(hash(data), signature);
	},
};
