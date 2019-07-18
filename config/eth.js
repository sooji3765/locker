//------------------------
// Web3 Connect
//------------------------

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
//web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

const LockerContractAddress = "0xf4d53d937b1f906a9f48a5de0b58b086b2cacacf";
//0x57c4d7c0bfaef0c3fdd56546ff86559ac85da798

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

exports.getEther = function (value) {
	//return Web3.utils.fromWei(value, 'ether');
	//var weiAmout = value/350000 * 1e18;
	return web3.toWei(value/350000);

/* 
		const decimal = 18;
    const amountToSendinDecimal = value * ( 10 ** decimal) ;
		return this.toBigNumber(amountToSendinDecimal);
 */		
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

//----------------------------
// unlockAccount (Web3)
//----------------------------
exports.unlockAccount = function (from, passphase, callback) {
	web3.personal.unlockAccount(from, passphase, function (err, hash) {
			if (err) {
					console.log(err);
					return callback(err, '');
			} else {
					console.log("* unlock : " + from + ', ' + passphase );
					return callback(null, hash);
			}
	});
};

exports.sendTransaction = function(from, to, value, gas, callback) {

	var value = parseInt(value)/35000;
	console.log(">>>>>>>>>>>" + value);
	if (to == null)
		to =	web3.eth.defaultAccount;
	//+++++++  STEP 4. SET Exercise ++++++++++++
	web3.eth.sendTransaction({
			to: to,
			from: from,
			value: web3.toWei(value,'ether'),
			//value: value,
			gas: gas}, function (err, hash) {
			if (err) {
					console.log(err);
					return callback(err, '');
			} else {
					console.log("* sendTransaction txhash : " + hash );
					return callback(null, hash);
			}
	});
};