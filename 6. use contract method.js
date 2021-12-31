const Web3 = require('web3')
const web3 = new Web3("https://ropsten.infura.io/v3/862f780f2a9943e78b9e5efeceeb730d")
const fs = require('fs')
require('dotenv').config();

// const account1Address = "0x269012B275Db0e20b67911e457FCfE461e3c7eE0";
// const account2Address = "0x067883FDC654AAbf7ad4688B8e8D24A4478b1Cec";
const privateKey1 = process.env.PRIVATE_KEY_1

const targetedSmartContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
// instantiate Smart Contract with ABI & address
const getABIFromJSONFile = filePath => {
    return new Promise(  (resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err); 
            resolve(JSON.parse(data));
        })
    })
}

getABIFromJSONFile('newContractABI.json')
.then(targetedSmartContractABI => {
    const retrieveContract = new Promise( (resolve, reject) => {
        const contract = new web3.eth.Contract(targetedSmartContractABI, targetedSmartContractAddress)
        resolve(contract);
    })
    return retrieveContract
})
.then(targetedSmartContract => {
    // Create the transaction credentials
    const txCredentials = {
        to: targetedSmartContractAddress,
        data: targetedSmartContract.methods.WETH().encodeABI(), // should be encoded into Hexadecimal
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
})
