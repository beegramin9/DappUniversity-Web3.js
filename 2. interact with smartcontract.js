const Web3 = require('web3');
const fs = require('fs');

const url = 'https://mainnet.infura.io/v3/a70072a8bba74ad2a6a7c9f434bb5853';
const web3 = new Web3(url)          


// instantiate Smart Contract with ABI & address
const getABIFromJSONFile = filePath => {
    return new Promise(  (resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err); 
            resolve(JSON.parse(data));
        })
    })

}

getABIFromJSONFile('uniswapABI.json')
.then(data => {
    const ABI = JSON.parse(data.result);
    const contractAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    const contract = new web3.eth.Contract(ABI, contractAddress)
    return contract
})
.then(contract => new Promise( (resolve, reject) => {
    resolve(contract.methods);
}))
.then(methods => {
    console.log(methods)
    return methods.symbol().call()
})
.then(result => console.log(result))
.catch(err => console.log(err))