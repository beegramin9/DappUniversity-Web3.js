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
    const accountAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    
    const retrieveContract = new Promise( (resolve, reject) => {
        const contract = new web3.eth.Contract(ABI, accountAddress)
        resolve(contract);
    })
    return retrieveContract
})
.then(retrievedContract => retrievedContract.methods)
.then(methods => {
    console.log(methods)
    const contractAddress ="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
    return methods.balanceOf(contractAddress).call()
})
.then(result => console.log(result))
.catch(err => console.log(err))
