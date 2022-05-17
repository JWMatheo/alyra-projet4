import Web3 from 'web3';
import { notification } from './notification';

export const init = () => {
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
};

// Check Network connected
export const networkConnected = async () => {
  const web3 = await init();
  if (web3 && web3.eth) {
    const network = await web3.eth.net.getNetworkType();
    network !== 'rinkeby' && notification('warn', "You doesn't use Rinkeby network");
  }
};

// Onchange Network Handler
export const onChangeNetwork = () => {
  // detect Network account change
  window.ethereum.on('chainChanged', function (networkId) {
    // If network is not 4, so rinkeby
    if (networkId === '0x4' || networkId === '4') {
      return notification('success', 'Good choose ! Welcome back 😃', networkId);
    } else {
      return notification('warn', "You doesn't use Rinkeby network", networkId);
    }
  });
};


// Check if wallet is already connected
export const walletConnected = (setAddressConnected) => {
  if (window.ethereum) {
    window.ethereum.selectedAddress ? setAddressConnected(window.ethereum.selectedAddress) : setAddressConnected(false)
  }
};

// Connect wallet using buttom from front
export const connectWallet = async () => {
  // Check if Metamask extension is downloaded in brownser
  const detectProvider = () => {
    let provider;

    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      notification('warn', 'No Ethereum Browser/MetaMask detected');
    }

    return provider;
  };

  // Connect wallet
  const provider = detectProvider();

  if (provider) {
    if (provider !== window.ethereum) {
      notification('error', 'Not window.ethereum provider');
    }

    const result = await provider.request({ method: 'eth_requestAccounts' });
    if (result) {
      notification('success', 'You are successful connected ! ');
      return true;
    } else {
      notification('warn', 'You wwallet is not connected');
    }
  }
};
