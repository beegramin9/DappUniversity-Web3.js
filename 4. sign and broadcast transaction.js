// 모든 transaction은 authenticity을 증명하기 위해 signed되어야 한다.
// I want to have a private key locally, so no one from outside can see it
const Web3 = require('web3')
const web3 = new Web3("https://ropsten.infura.io/v3/862f780f2a9943e78b9e5efeceeb730d")
require('dotenv').config();

const account1Address = "0x269012B275Db0e20b67911e457FCfE461e3c7eE0";
const account2Address = "0x067883FDC654AAbf7ad4688B8e8D24A4478b1Cec";

// import private key: npm i dotenv --save
const privateKey1 = process.env.PRIVATE_KEY_1

web3.eth.getBalance(account1Address, (error, balance) => {
    console.log("account 1 balance:",web3.utils.fromWei(balance, 'ether'));
});
web3.eth.getBalance(account2Address, (error, balance) => {
    console.log("account 2 balance:",web3.utils.fromWei(balance, 'ether'));
});

// 1. build the transaction, all in hexadecimal
const txCredentials = {
    // nonce: safeguard that prevents double-spending, transaction 개수에 따라간다, 신버전에서는 삭제됨, 왜냐면 자동적으로 transactionCount와 같으니까
    // From이 없다, private_key를 이용해서 transaction를 보낼건데, 그러면 이미 from을 알기 때문이다.
    to: account2Address,
    value: web3.utils.toWei('0.10', 'ether'),
    gas: 21000,
    gasPrice: web3.utils.toWei('10', 'gwei')
}
// 2. sign the transaction
const signedTransaction = web3.eth.accounts.signTransaction(txCredentials, privateKey1);

// 3. broadcast the transaction
signedTransaction.then(signedTx => {
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    sentTx.on("receipt", receipt => {
        console.log("receipt: ", receipt);
        // txHash = ID of the newly made TX
    });
    sentTx.on("error", err => {
        console.log(err.message)
    });
});