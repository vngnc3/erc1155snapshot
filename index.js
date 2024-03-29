/// ███ ERC-1155 SNAPSHOT TOOL ██████████████████████████████████████

/// ██ Fetch, count, and organize owners of semi-fungible token. █
/// ██ Usage: Define Alchemy API key in .env file                █
/// ██        Set file output, contract address, and tokenID.    █

/// ██ This tool is unable to snapshot a historical block, due   █
/// ██ to limitations in Alchemy's NFT API, and possible reli-   █
/// ██ ability issues. Use at your own risk.                     █

/// ███████████████████████████████████████████████████████████████████


// TODO -- Filter out a set of address against the snapshot JSON, removing Incomplete Design airdrop recipients.
// WARN -- Alchemy NFT API doesn't use web3.eth.defaultBlock
// NEXT -- Do all of these but with web3.eth.defaultBlock
// READ -- https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#defaultblock


/// ███ Import dependencies █████████████████████████████████████████
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import fetch from 'node-fetch';
import 'dotenv/config';
import fs from 'fs';


/// ███ Configure the snapshot ██████████████████████████████████████
// Read key from .env file
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
// Define output filename
const FILE_OUTPUT = 'snapshot';
// Accepts ERC-1155 contract
const CONTRACT_ADDRESS = '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177';
// Select the tokenID
const TOKEN_ID = 1;
// Set the delay between requests in ms.
const DELAY = 360;


/// ███ Write and verify function ███████████████████████████████████
let csv = `(address,balanceOf ${TOKEN_ID})`;
async function writeToFile(pushedOwnerData) {
    const fileName = FILE_OUTPUT;
    const output = `${fileName}_${CONTRACT_ADDRESS.slice(0, 8)}_at_${currentBlock}`;
    // JSON export
    fs.writeFileSync(`${output}.json`, (JSON.stringify(pushedOwnerData, null, 4)));
    const exportedJSON = JSON.parse(fs.readFileSync(`${output}.json`));
    console.log(`${(newOwnerSet.length === ownersJSON.owners.length) ? (`✅ ownerSet length verified (${newOwnerSet.length})`) : (`🛑 ownerSet length mismatch!!!`)}`);
    console.log(`${(exportedJSON.length === ownersJSON.owners.length) ? (`✅ exported owners length verified (${newOwnerSet.length})`) : (`🛑 exported owners length mismatch!!!`)}`);
    // CSV export, if and only if exported JSON is verified.
    if (exportedJSON.length === ownersJSON.owners.length) {
        pushedOwnerData.forEach(csvStringify);
        fs.writeFileSync(`${output}.csv`, csv);
    } else {
        console.log(`🛑 exported owners length mismatch!!! CSV export aborted.`);
    };
    console.log(`🌈 data saved successfully to ${output}.json and ${output}.csv🌈`);
};

async function csvStringify(object){
    csv += `\n${object.address},${object.balance}`;
};


/// ███ Create AlchemyWeb3 instance █████████████████████████████████
const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);


/// ███ Set defaultBlock for this instance █████████████████████████
const BLOCK_NUMBER = 'latest';         
web3.eth.defaultBlock = BLOCK_NUMBER;


/// ███ Get current block number ████████████████████████████████████
let currentBlock = await web3.eth.getBlockNumber();


/// ███ Fetch owners for a token ████████████████████████████████████
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
        return nft.id.tokenId == TOKEN_ID; // filtering just the tokenID #1
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

function delayedForEach(array, callback, delay) {
    let i = 0;
    let intervalId = setInterval(function() {
        callback(array[i++]);
        if (i >= array.length) {
            clearInterval(intervalId);
        }
    }, delay);
};

async function snapshot() {
    // await ownersJSON.owners.forEach(pushBalance);
    delayedForEach(ownersJSON.owners, pushBalance, DELAY);
    console.log(`🌀 ${ownersJSON.owners.length} holders data requested.`);
};

snapshot();