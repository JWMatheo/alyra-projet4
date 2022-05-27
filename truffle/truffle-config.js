const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// You have to install dotenv and hdwallet-provider

module.exports = {
  contracts_build_directory: path.join(__dirname, '../client/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: { phrase: `${process.env.MNEMONIC}` },
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
        });
      },
      network_id: 3,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: { phrase: `${process.env.MNEMONIC}` },
          providerOrUrl: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
        });
      },
      network_id: 42,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: { phrase: `${process.env.MNEMONIC}` },
          providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
        });
      },
      network_id: 4,
    },
    mumbai: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: { phrase: `${process.env.MNEMONIC}` },
          providerOrUrl: `https://rpc-mumbai.maticvigil.com`,
        });
      },
      network_id: 80001,
      gasPrice: 7000000000,
    },
  },
  plugins: ['solidity-coverage'],
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      gasPrice: 1,
      token: 'ETH',
      showTimeSpent: true,
    },
  },
  compilers: {
    solc: {
      version: '0.8.14',
    },
  },
};
