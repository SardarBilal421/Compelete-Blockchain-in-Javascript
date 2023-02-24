// const { ec } = require("elliptic");

// // Create a new EC curve object
// const curve = new ec("secp256k1");

// // Define the transaction data
// const transaction = {
//   from: "Alice",
//   to: "Bob",
//   amount: 100,
// };

// // Convert the transaction data to a string
// const transactionStr = JSON.stringify(transaction);

// // Create three key pairs, with each party having one share of the private key
// const keyPair1 = curve.genKeyPair();
// const keyPair2 = curve.genKeyPair();
// const keyPair3 = curve.genKeyPair();

// // Combine the public keys of the three parties to create a group public key
// const groupPublicKey = keyPair1
//   .getPublic()
//   .add(keyPair2.getPublic())
//   .add(keyPair3.getPublic());

// // Define the number of required signatures (2 out of 3)
// const threshold = 2;

// // Each party calculates their share of the message hash
// const hash = curve.hash().update(transactionStr).digest();
// const share1 = keyPair1.sign(hash);
// const share2 = keyPair2.sign(hash);
// const share3 = keyPair3.sign(hash);

// // The first two parties combine their shares to create a partial signature
// const partialSignature1 = ec.Signature.fromDER(
//   Buffer.concat([
//     share1.r.toArrayLike(Buffer),
//     curve.n.sub(share1.s).toArrayLike(Buffer),
//   ])
// ).add(
//   ec.Signature.fromDER(
//     Buffer.concat([
//       share2.r.toArrayLike(Buffer),
//       curve.n.sub(share2.s).toArrayLike(Buffer),
//     ])
//   )
// );

// // The third party combines their share with the partial signature to create the final signature
// const finalSignature = ec.Signature.fromDER(
//   Buffer.concat([
//     partialSignature1.r.toArrayLike(Buffer),
//     partialSignature1.s.toArrayLike(Buffer),
//   ])
// ).add(
//   ec.Signature.fromDER(
//     Buffer.concat([
//       share3.r.toArrayLike(Buffer),
//       curve.n.sub(share3.s).toArrayLike(Buffer),
//     ])
//   )
// );

// // Verify the signature using the group public key
// const isVerified = groupPublicKey.verify(hash, finalSignature);

// console.log("Transaction data: ", transaction);
// console.log("Group public key: ", groupPublicKey.encode("hex"));
// console.log("Signature verified: ", isVerified);

// const EC = require("elliptic").ec;
// const ec = new EC("secp256k1");

// // Transaction to sign
// const tx = {
//   from: "0x123456789",
//   to: "0x987654321",
//   value: 10,
// };

// // Private keys of the signers
// const privateKeys = [
//   "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
//   "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543211",
// ];

// // Sign transaction with each private key
// const signatures = privateKeys.map((privateKey) => {
//   const key = ec.keyFromPrivate(privateKey);
//   const hash = Buffer.from(JSON.stringify(tx));
//   let signature = key.sign(hash);
//   signature = signature.toDER("hex");
//   const isSignatureValid = key.verify(hash, signature);
//   return isSignatureValid;
// });

// // Add signatures to the transaction
// tx.signatures = signatures;

// console.log("Signed transaction:", tx);

const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");

// Signers private and public key pairs
const signers = [
  {
    privateKey:
      "a57b9e2d3c3b2277b6a33a6c3d2162be55f5e36c7817e8db859527b9ad789d4a",
    publicKey:
      "040d39427b5a907b1a73a99f8d098e819c9ac5e5f5b56a5a17c529d0a87a74359eae60b410be04a92f9ba0ef1e47c33a8e1d71447ba618b6c413f901e7d11b94f",
  },
  {
    privateKey:
      "1dc8e1c777f64d6bced422c57e88384f3b6e9af6fcd3a3f3646b58d037c7f60d",
    publicKey:
      "04f2a260a74204e97d46cbbda87ec69633c5b27a5a0e1a73b99e8a106abb5d0e18fc5b5fc5ee5d3f00fb2d3e5c1667b8d872e14d9d4e4d4cde4cc828bdc17d90d",
  },
];

// Transaction data to be signed
const txData = "Transaction Data";

// Create the transaction object
const tx = {
  data: txData,
  signatures: [],
};

// Loop through each signer and sign the transaction
signers.forEach((signer) => {
  // Create a key pair from the private key
  const keyPair = ec.keyFromPrivate(signer.privateKey);
  // console.log(typeof signer.privateKey);
  // Sign the transaction data using the key pair
  const signature = keyPair.sign(txData);

  // Add the signature to the transaction object
  tx.signatures.push({
    publicKey: signer.publicKey,
    signature: {
      r: signature.r.toString(16),
      s: signature.s.toString(16),
    },
  });
});

console.log(tx);
