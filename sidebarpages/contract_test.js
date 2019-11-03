//http://jaeyunkim.com/lockable-smart-contract-4/

var Web3 = require(web3);
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var promissory = web3.eth.contract(require(`../truffle/build/contracts/Promissory`).abi).at("0x946F24A83461CEFcEb30b9714c5e4Cb3f701E289");

console.log(abi);