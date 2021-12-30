// anything that write data, call functions that write data, deploy a smart contract
// into ethereum blockchain is transaction
// any transaction costs gas and changes the state of the blockchain
const Web3 = require('web3')

// install Ganache application
// 테스트용 간이 블록체인, 로컬에서 작동한다
const web3 = new Web3("HTTP://127.0.0.1:7545")
const address1 = "0x03220a0F8De0b1b37398f527fCC749Db1B352691"
const address2 = "0x6a20a230779faF60E1257b32b7F9Ca4a61AfAEf6"

const getBalanceOfAccount = (address) => {
    return new Promise( (resolve,reject) =>{
    web3.eth.getBalance(address, (error, result) => {
        resolve(result)
        reject(error)
    })
})}


const sendOneEtherFromTo = (account1, account2) => {
    return new Promise( (resolve,reject) =>{
        web3.eth.sendTransaction({from: account1, to: account2, value: web3.utils.toWei('1','ether')}, (error, result) => {
            resolve(result)
            reject(error)
        })
    })
}


getBalanceOfAccount(address1)
.then(balanceOfAccount1 => console.log(balanceOfAccount1))

sendOneEtherFromTo(address1, address2)
.then(result => {
    console.log(result)
    getBalanceOfAccount(address1)
    .then(balanceOfAccount1 => console.log(balanceOfAccount1))
});

