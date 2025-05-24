require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
module.exports = {
  solidity: "0.8.15",
  networks: {
    apothem: {
      url: process.env.APOTHEM_RPC_URL || "https://rpc.apothem.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
