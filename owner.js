import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import fs from 'fs';
import 'dotenv/config';
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

// Using HTTPS
console.log('connecting to alchemy...')
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}`,
);

const ownerAddr = "0x37b7458c5f14822bf423965aed077a20269011c5";

console.log('fetching data...');
const nftSet = await web3.alchemy.getNfts({owner: ownerAddr});
// ownedNfts is an object array to nftSet, wrapped as an object;

// contract address data is available in every ownednft object
// const contractAddr = nftSet.ownedNfts[0].contract.address;

// define the filter
const incompleteContract = '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177';

// return nft objects for a incomplete design contract address
const filteredNfts = nftSet.ownedNfts.filter(function filter(nft) {
    return nft.contract.address == incompleteContract.toLowerCase();
});

// return just the incomplete design id 1
const incompleteDesign = nftSet.ownedNfts.filter(function filter(nft) {
    return  nft.contract.address == incompleteContract.toLowerCase() &&
            nft.id.tokenId == '0x01';            
});

console.log(incompleteDesign);
console.log(`>> Total nft passing the filter: ${filteredNfts.length}/${nftSet.ownedNfts.length}`);
console.log(`>> Balance of Incomplete Design: ${incompleteDesign[0].balance}`);