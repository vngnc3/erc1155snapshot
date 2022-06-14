/// Import dependencies.
import fetch from 'node-fetch';
import 'dotenv/config';

/// Import values.
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

/// Use alchemy to find owners a single erc1155 token. 
const CONTRACT_ADDRESS = '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177'; // incomplete design proxy
const TOKEN_ID = 1;
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const method = 'getOwnersForToken'; // see Alchemy docs
const alchemyURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}/${method}`;
const fetchURL = `${alchemyURL}?contractAddress=${CONTRACT_ADDRESS}&tokenId=${TOKEN_ID}`;

console.log('fetching owners...')

const ownersResponse = await fetch(fetchURL, requestOptions);
const owners = await ownersResponse.json();
console.log(owners);
console.log(owners.owners.length, 'owners total.');

/// Find out how many tokens each holders have.

// use alchemy or web3.js to check how many tokens each address on the step before have. 

// then do everything with web3.eth.defaultBlock
// READ -- https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#defaultblock