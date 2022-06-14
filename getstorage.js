// Installation instructions: https://github.com/alchemyplatform/alchemy-web3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

async function main() {

   	// Replace with your Alchemy API key:
	const apiKey = process.env.ALCHEMY_KEY;
	
	// Initialize an alchemy-web3 instance:
	const web3 = createAlchemyWeb3(
	  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);
	
	// Query the blockchain (replace example parameters)
    	const val = await web3.eth.getStorageAt({
	    address: '0x6a46B8591679f53AE1AEd3Bae673F4D2208f7177',
		quantity: '0x0',
		tag: 'latest',
	  }); 
    
	// Print the output to console
	console.log(val);
   }

main();