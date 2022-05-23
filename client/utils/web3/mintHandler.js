import { notification } from '../notification';
import { init, instanceContract } from './init';

// Mint a collection: require name, symbol, baseURI, and quantity
export const mintNFTCollection = async (name, symbol = 'DF', baseURI, NumberOfNftToMint, setValueMinted) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  const mint = await instance.methods
    .DeployMyNFTCollection(name, symbol, baseURI, NumberOfNftToMint)
    .send({ from: owner[0] });

  if (mint.status) {
    const result = mint.events.Showed.returnValues;

    return setValueMinted({ token: result.token, tokenId: result.tokenId, listingId: result.listingId });
  } else {
    return notification('error', 'There are an error');
  }
};
export const addItemToCollection = async (collectionAddress) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  const res = await instance.methods.DeployMyNFTCollection(collectionAddress).send({ from: owner[0] });
};
