//------------------------
// Web3 Connect
//------------------------

var Web3 = require('web3');
var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

const LockerContractAddress = "0x2b41511C3dc23249E51736a26a30982AcBaBC893";

//------------------------
// Smart Contract Connect
//------------------------
// Token Contract
var lockerAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialMessage",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMessage",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var LockerContract = web3.eth.contract(lockerAbi).at(LockerContractAddress);

web3.eth.defaultAccount = web3.eth.accounts[0];

//-------------------------------------
//   (LockerContract : getMessage)
//-------------------------------------
exports.getMessage = function () {
    return LockerContract.getMessage();
};

//-------------------------------------
//   (LockerContract : setMessage)
//-------------------------------------
exports.setMessage = function (message, gas, callback) {

  if(web3.personal.unlockAccount(web3.eth.defaultAccount,"admin")){

    LockerContract.setMessage(message, {gas: gas}, function (err, hash) {
      if (err) {
          console.log(err);
          return callback(err, '');
      } else {
          console.log("* sendTransaction txhash : " + hash );
          return callback(null, hash);
      }
    });
  }
};
