const Web3 = require('web3')
const web3 = new Web3("https://ropsten.infura.io/v3/862f780f2a9943e78b9e5efeceeb730d")
require('dotenv').config();

const privateKey1 = process.env.PRIVATE_KEY_1
const preparedSmartContract = "hexadata"


// Create the transaction credentials
const txCredentials = {
    data: preparedSmartContract,
    value: web3.utils.toWei('0.10', 'ether'),
    gas: 1000000,
    gasPrice: web3.utils.toWei('10', 'gwei')
}

// Sign the transaction
const signedTransaction = web3.eth.accounts.signTransaction(txCredentials, privateKey1);

// Broadcast the transaction
signedTransaction.then(signedTx => {
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    sentTx.on("receipt", receipt => {
        console.log("receipt: ", receipt);
    });
    sentTx.on("error", err => {
        console.log(err.message)
    });
});