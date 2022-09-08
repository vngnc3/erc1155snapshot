# ERC1155 Snapshot Tool
### 📸 Snapshot a single ERC1155 token owners with balance. 

---  

✨ A more recent tool is available under [vngnc3/ercsnapshot](https://github.com/vngnc3/ercsnapshot), capable of snapshotting previous block for ERC-721 collection.

---   

📤 Exports as JSON object and CSV file.  

⌚ This tool is unable to snapshot a previous block, due to the limitations in alchemy-web3 library, and reliability issues in Alchemy NFT API.    

⚡ This tool is due for an upgrade when Alchemy NFT API reliability issues have been resolved. The `getOwnersForContract()` endpoint will sometime return incorrect token balances. Hence, the use of slower `getNfts()` endpoint for more accurate result.  

🔰 &nbsp;Use at your own risk, always verify, do your own research.  

🔼 Get your Alchemy API key on https://www.alchemy.com/  

---  

## Requirements  

- Node.js
- Alchemy API key  

*This tool was created with Node 18.1.0, and have not been tested with other versions of Node.* 


---  

## Usage  

- Clone or download this repo to your local machine. 
- Download dependencies with `npm install`
- Make a new `.env` file in the directory with your Alchemy API key like so:
> `ALCHEMY_KEY="<YOUR-ALCHEMY-KEY-GOES-HERE>"`  
- Configure the snapshot in `index.js` file. 
> - Set the **file output** name, 
> - **Ethereum Smart Contract address** to snapshot from,
> - and the **NFT token id** to snapshot from.  
- Run `node index` and let the tool do its thing.  

--- 

## Maintenance

I created this tool to enhance the experience I'm creating with my NFT collections. Specifically the ever-ongoing [Incomplete Design](https://id.xxxxizzy.eth.limo/) and the experiments I'm doing around it.   

Hit me up on Twitter [@vngnc](https://twitter.com/vngnc) for anything you have in mind about this code (or everything else). 🖤