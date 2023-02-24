const { Blockchain, Transactions } = require("./src/blockhain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
ec.key;
const signers = [
  {
    privateKey:
      "e0989fe83301f5598bea6ca7bcdcf3a6d588b221d72a409d159b2f76f6666468",
    publicKey:
      "040d39427b5a907b1a73a99f8d098e819c9ac5e5f5b56a5a17c529d0a87a74359eae60b410be04a92f9ba0ef1e47c33a8e1d71447ba618b6c413f901e7d11b94f",
  },
  {
    privateKey:
      "e418f9796fc7fc3895f08c573137ca3a2537c794303ab4716eff04efd35077c1",
    publicKey:
      "04f2a260a74204e97d46cbbda87ec69633c5b27a5a0e1a73b99e8a106abb5d0e18fc5b5fc5ee5d3f00fb2d3e5c1667b8d872e14d9d4e4d4cde4cc828bdc17d90d",
  },
];

// Your private key goes here
const myKey = ec.keyFromPrivate(signers.privateKey);

let myKey1 = ec.keyFromPrivate(
  "e418f9796fc7fc3895f08c573137ca3a2537c794303ab4716eff04efd35077c1"
  // "447634706469502b6b5356336f4f462f634b37474442455a616f446a764a78436142495a323839794269343d",
  // "C3OgP6A3V7qrVOFPFXJpD1dOjHPdU4PXFRQ8mCvX7DE="
);
// const a = "e418f9796fc7fc3895f08c573137ca3a2537c794303ab4716eff04efd35077c1";
// const b = myKey1.getPublic("hex");

// let binaryString = Buffer.from(a, "hex").toString("binary");
// const base64String = Buffer.from(binaryString, "binary").toString("base64");

// console.log(base64String);

// binaryString = Buffer.from(base64String, "base64").toString("binary");
// const hexString = Buffer.from(binaryString, "binary").toString("hex");

// console.log(hexString); // Output: "48656c6c6f"

// console.log(
//   "e418f9796fc7fc3895f08c573137ca3a2537c794303ab4716eff04efd35077c1",
//   myKey1.getPublic("hex")
// );

// let myKey;
// signers.forEach((signer) => {
//   // const myWalletAddress0 = myKey.getPublic("hex");
//   myKey = ec.keyFromPrivate(signer.privateKey);
//   // const tx1 = new Transactions(myWalletAddress0, "address2", 10);
// });
// // console.log(myKey.getPublic("hex"));

// // From that we can calculate your public key (which doubles as your wallet address)
// // const myWalletAddress0 = myKey.getPublic("hex");
// // const myWalletAddress1 = myKey1.getPublic("hex");

// // console.log(myWalletAddress0,"/n", myWalletAddress1 );

let savjeeCoin = new Blockchain();
const myWalletAddress =
  "04ea4bfa50d2ec427d693cf0078aae7b092298e21a0997871c890942e5051a2d88531f33e88422ea6cfc57b13233f6ae5e1026bd5669a93d196eb976ff16bce322";
const tx1 = new Transactions(myWalletAddress, "address2", 10);

// console.log(myKey);

tx1.signTransaction(myKey1);
// tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

console.log("Starting the miningggg...");
savjeeCoin.minePendingTrasactions(myWalletAddress);
console.log("Starting the miningggg...");
savjeeCoin.minePendingTrasactions(myWalletAddress);
console.log("Starting the miningggg...");
savjeeCoin.minePendingTrasactions(myWalletAddress);
console.log(
  "Balance of Bilala is ..." + savjeeCoin.getBalanceOfAddress(myWalletAddress)
);

// display Blockahin
console.log(savjeeCoin.chain[1].transactions);

// Check if chane is valid or not
console.log(savjeeCoin.isChainValid());
