import { client } from '../../lib/sanity';
import { notification } from '../notification';
import { init } from './init';
import { mintNFTCollection } from './mintHandler';

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
export const walletConnected = async (setAddressConnected) => {
  if (window.ethereum) {
    const web3 = await init();
    const address = await web3.eth.getAccounts();
    address ? setAddressConnected(address[0]) : setAddressConnected('');
  }
};

// Connect wallet using buttom from front
export const connectWallet = async (setAddressConnected) => {
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
      const allUsers = await client.fetch(`*[_type == 'users']`);
      // Already created or not
      let bool = false;

      const doc = {
        _type: 'users',
        address: result[0],
        username: `Otaku #${allUsers.length + 1}`,
      };

      allUsers.map(async (user) => {
        if (user.address === result[0]) {
          return (bool = true);
        }
      });

      // If no yet create a collection
      if (!bool) {
        client.create(doc).then(async (doc) => {
          await mintNFTCollection(
            'Defaults',
            'DFT',
            'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
            0
          ).then(async (data) => {
            console.log(data);
            const collection = {
              _type: 'name',
              owner: {
                _type: 'reference',
                _ref: doc._id,
              },
              address: data.address,
              cid: 'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
            };
            await client.create(collection);
          });
        });
      }

      notification('success', 'You are successful connected ! ');
      setAddressConnected(result[0]);
      // Set value to local storage
      localStorage.setItem('isConnected', true);
      //await mintNFTCollection('Default', 'DFT', 'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e', 0);
      return true;
    } else {
      notification('warn', 'You wwallet is not connected');
    }
  }
};
