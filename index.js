/// ███ Import dependencies █████████████████████████████████████████
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import fetch from 'node-fetch';
import 'dotenv/config';
import fs from 'fs';


/// ███ Define some stuff ███████████████████████████████████████████
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;                            // Read key from .env file
const FILE_OUTPUT = 'temp.json';                                        // Define file output path.
const CONTRACT_ADDRESS = '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177';  // using Incomplete Design
const TOKEN_ID = 1;                                                     // Set tokenID
const BLOCK_NUMBER = 14295197;                                          // Set block height.


/// ███ Write and verify function ███████████████████████████████████
async function writeToFile(pushedOwnerData) {
    const fileName = FILE_OUTPUT.split('.')[0];
    const output = `${fileName}_${CONTRACT_ADDRESS}_at_${web3.eth.defaultBlock}.json`;
    fs.writeFileSync(output, (JSON.stringify(pushedOwnerData, null, 4)));
    const exportedJSON = JSON.parse(fs.readFileSync(output));
    console.log(`${(newOwnerSet.length === ownersJSON.owners.length) ? (`✅ ownerSet length verified (${newOwnerSet.length})`) : (`🛑 ownerSet length mismatch!!!`)}`);
    console.log(`${(exportedJSON.length === ownersJSON.owners.length) ? (`✅ exported owners length verified (${newOwnerSet.length})`) : (`🛑 exported owners length mismatch!!!`)}`);
    console.log(`🌈 data saved successfully to ${output} 🌈`);
};


/// ███ Create AlchemyWeb3 instance █████████████████████████████████
const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);


/// ███ Set defaultBlock for this instance █████████████████████████
web3.eth.defaultBlock = BLOCK_NUMBER;

function defaultBlock() {
    return web3.eth.defaultBlock;
};


/// ███ Fetch owners for a token ████████████████████████████████████
/// !!! WARN: Alchemy NFT API IGNORES web3.eth.defaultBlock !!!
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const method = 'getOwnersForToken';
const alchemyURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}/${method}`;
const fetchURL = `${alchemyURL}?contractAddress=${CONTRACT_ADDRESS}&tokenId=${TOKEN_ID}`;
console.log('🔄 fetching owners...')

const ownersResponse = await fetch(fetchURL, requestOptions);
const ownersJSON = await ownersResponse.json();

console.log(`✅ total owners: ${ownersJSON.owners.length}`);
console.log(' ');


/// ███ Fetch balance for every owners ██████████████████████████████
function alchemyParameters(item) {
    return {owner: item, withMetadata: false, contractAddresses: [CONTRACT_ADDRESS.toLowerCase()]};
};
function idFilter(ownedNftsArray) {
    const filteredNft = ownedNftsArray.ownedNfts.filter(function filter(nft) {
        return nft.id.tokenId == 1; // filtering just the tokenID #1
    });
    return filteredNft;
};

let newOwnerSet = []; // Create new array for objectified owners.

async function pushBalance(item) {
    try {
        // Fetch
        console.log(`🔄 fetching NFTs for ${item}...`);
        const response = await web3.alchemy.getNfts(alchemyParameters(item));
        // Filter
        const incompleteDesign = idFilter(response);
        const incompleteBalance = incompleteDesign[0].balance;
        // Turn every balance into object, matching its owner.
        let owner = {};
        owner.address = item;
        owner.balance = incompleteBalance;
        newOwnerSet.push(owner);

        // check if ownerset length matches ownersjson
        // call write function when all owners have been pushed.
        console.log(`🔄 ${newOwnerSet.length} holders pushed out of ${ownersJSON.owners.length}...`)
        if (newOwnerSet.length == ownersJSON.owners.length) {
            console.log(`✅ ${newOwnerSet.length} holders pushed! Writing data...`);
            writeToFile(newOwnerSet);
        };
    }
    catch(error) {
        console.error(error);
    }
};

async function snapshot() {
    await ownersJSON.owners.forEach(pushBalance);
    console.log(`🌀 ${ownersJSON.owners.length} holders data requested.`);
};

snapshot();


// then do everything with web3.eth.defaultBlock
// READ -- https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#defaultblock
// WARN -- Alchemy NFT API IGNORES web3.eth.defaultBlock