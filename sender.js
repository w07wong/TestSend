'use strict';
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

//initialize connection
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://9t1f4yor7v5t521m4ra9xh24ggd2q4-node.ambisafe.co/'));

var toAccount = '0x251fdCe8D07B6194e0e3C3AaBF8307E53Eea71bE';
var fromAccount = '0x059345dE4c56C80A5d90AD3B170627e2a7339173';
var privateKey = new Buffer('', 'hex');

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
console.log(serializedTx);

web3.eth.sendRawTransaction(serializedTx.toString('hex'), function (err, hash) {
    if (err) {
        console.log("" + err)
    }
    else {
        console.log(hash);
    }
});
