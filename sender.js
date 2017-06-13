'use strict';
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

//initialize connection
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('insert ethereum node url here'));

var toAccount = 'insert sender account address here';
var fromAccount = 'insert receiver account address here';
var privateKey = new Buffer('insert private key for sender here', 'hex');

var gasPriceHex = web3.toHex(4000000000);
var gasLimitHex = web3.toHex(21000);
var value = web3.toHex(1); //amount to send in wei
var nonce = web3.eth.getTransactionCount(fromAccount);
var nonceHex = web3.toHex(nonce);

var rawTx = {
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    to: toAccount,
    from: fromAccount,
    value: value,
    data: ''
};

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

web3.eth.sendRawTransaction(serializedTx.toString('hex'), function (err, hash) {
    if (err) {
        console.log("" + err)
    }
    else {
        console.log(hash); 
    }
});