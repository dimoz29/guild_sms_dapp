require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    Goerli: {
      url: `${process.env.POKT_Goerli_URL}`,
      accounts: [`${process.env.Goerli_PRIVATE_KEY}`],
    } 
  }
};
