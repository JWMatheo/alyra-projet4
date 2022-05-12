import Web3 from 'web3';

export const init = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }

    // Legacy dapp browsers...
    else if (window.web3) {
      const web3 = window.web3;
      resolve(web3);
    } else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      const web3 = new Web3(provider);
      resolve(web3);
    }
  });

// Connect wallet using buttom from front
export const connectWallet = () => {
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
    provider.request({
      method: 'eth_requestAccounts',
    });
  }
};

// Check Network connected
export const networkConnected = async () => {
  const web3 = await init();

  return web3.eth.net.getNetworkType();
};
