/// ███ Import dependencies █████████████████████████████████████████
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import 'dotenv/config';


/// ███ Define some stuff ███████████████████████████████████████████
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;                            // Read key from .env file
const BLOCK_NUMBER = 'latest';                                          // Set block height.
const ADDRESS = '0x37b7458C5f14822BF423965aed077a20269011C5';           // Address to check.


/// ███ Create AlchemyWeb3 instance ████████████████████████████████
const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);


/// ███ Set defaultBlock for this instance ████████████████████████
web3.eth.defaultBlock = BLOCK_NUMBER;


/// ███ Print the balance and block height ████████████████████████
function convertWei(wei) {
    const eth = web3.utils.fromWei(wei, 'ether');
    return eth;
};

async function printBalance() {
    console.log('fetching balance...')
    const wei = await web3.eth.getBalance(ADDRESS);
    const eth = convertWei(wei);
    const blockHeight = web3.eth.defaultBlock;
    console.log(`${ADDRESS} has ${eth} eth on block ${blockHeight}`);
    console.log(' ');
};

printBalance();