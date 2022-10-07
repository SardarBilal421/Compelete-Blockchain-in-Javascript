const { Blockchain, Transactions } = require("./src/blockhain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// Your private key goes here
const myKey = ec.keyFromPrivate(
  "d75292ea9c825dd2eb99d0461a991b700a93ca1e19ccae729cf5fbbbc40b1b1a"
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic("hex");

let savjeeCoin = new Blockchain();

const tx1 = new Transactions(myWalletAddress, "address2", 10);

tx1.signTransaction(myKey);
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

// console.log("Starting the miningggg...");
// savjeeCoin.minePendingTrasactions("SardarBilla---Address");

// console.log(
//   "Balance of Bilala is ..." +
//     savjeeCoin.getBalanceOfAddress("SardarBilla---Address")
// );

// console.log("Mining Block 1 ...");
// savjeeCoin.addBlock(new Block(1, " 10/07/2017 ", { amount: 4 }));

// console.log(JSON.stringify(savjeeCoin, null, 4));

// console.log("Mining Block 2 ...");
// savjeeCoin.addBlock(new Block(2, " 12/07/2017 ", { amount: 10 }));

// console.log(JSON.stringify(savjeeCoin, null, 4));
