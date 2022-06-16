/// Import dependencies.
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import fetch from 'node-fetch';
import 'dotenv/config';
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

/// Find owners of Incomplete Design token
const CONTRACT_ADDRESS = '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177'; 
const TOKEN_ID = 1;
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const method = 'getOwnersForToken';
const alchemyURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}/${method}`;
const fetchURL = `${alchemyURL}?contractAddress=${CONTRACT_ADDRESS}&tokenId=${TOKEN_ID}`;

console.log('fetching owners...')

const ownersResponse = await fetch(fetchURL, requestOptions);
const ownersJSON = await ownersResponse.json();

console.log(`[OK] total owners: ${ownersJSON.owners.length}`);

/// Turn every owner into an object in an array.
let newOwnerSet = []; // array of owner objects.
function pushOwners(item) {
    let owner = {};
    owner.address = item;
    newOwnerSet.push(owner);
};

ownersJSON.owners.forEach(pushOwners);

/// Find out how many tokens each holders have using AlchemyWeb3
const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}`,
);

/// Fetch and filter the API response.
async function fetchNFTs(item) {
    try {
        // Fetch
        console.log(`fetching nfts for ${item}...`);
        console.log(' ');
        const response = await web3.alchemy.getNfts({owner: item});
        // Filter
        const incompleteDesign = response.ownedNfts.filter(function filter(nft) {
            return  nft.contract.address == CONTRACT_ADDRESS &&
                        nft.id.tokenId == '0x01';
            });
        console.log(incompleteDesign);
    }
    catch(error) {
        console.error(error);
    }
};

console.log(fetchNFTs(ownersJSON.owners[0]));

// then do everything with web3.eth.defaultBlock
// READ -- https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#defaultblock