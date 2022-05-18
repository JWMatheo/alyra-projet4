import { instanceContract } from './init';
import Marketplace from '../../contracts/Marketplace.json';

// Mint a collection: require name, symbol, baseURI, and quantity
export const mintNFTCollection = async (name, symbol, baseURI, NumberOfNftToMint, addressConnected) => {
  const instance = await instanceContract();

  await instance.methods.DeployMyNFT(name, symbol, baseURI, NumberOfNftToMint).send({ from: addressConnected });
};
