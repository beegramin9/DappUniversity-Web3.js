const Web3 = require('web3');

// https://infura.io/dashboard/ethereum/a70072a8bba74ad2a6a7c9f434bb5853/settings
const url = 'https://mainnet.infura.io/v3/a70072a8bba74ad2a6a7c9f434bb5853';
const web3 = new Web3(url);

const address = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
web3.eth.getBalance(address, (error, wei) => {
    let balance = web3.utils.fromWei(wei, 'ether');
    console.log(balance);
});