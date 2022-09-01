# ERC1155 Snapshot Tool
### 📸 Snapshot ERC1155 token owners with balance. 

---  

📤 Exports as JSON object and CSV file.  
⌚ This tool is unable to snapshot a previous block, due to the limitations in Alchemy's NFT API.  
🔰 &nbsp;Use at your own risk, always verify, do your own research.  

---

⚡ This tool uses two Alchemy Ethereum APIs:
- https://eth-mainnet.g.alchemy.com/v2/
- https://eth-mainnet.alchemyapi.io/nft/v2/  

🔼 Get your Alchemy API key on https://www.alchemy.com/  

---  

## Requirements  

- Node.JS
- Alchemy API access  

*This tool was created with Node 18.1.0, and it may or may not work with previous or newer versions of Node.* 


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

In the future, it would be nice if this tool has the option to snapshot from a previous block, but I have not found a convenient way to do so as of now.  

Hit me up on Twitter [@vngnc](https://twitter.com/vngnc) for anything you have in mind about this code (or everything else). 🖤