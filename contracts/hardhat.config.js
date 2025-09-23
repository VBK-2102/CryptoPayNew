require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/274652f7e2a2472b8c64593c6031e1ad",
      accounts: ["69c0809402f6dcf757bd5ef83aafa39c672febbdf822212d9ae15bccb97e8e2b"],
      gasPrice: "auto"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
