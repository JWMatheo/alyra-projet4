import { init, instanceContract } from './init';
import { client } from '../../lib/sanity';

export const getCollections = async () => {
  const instance = await instanceContract();
  const web3 = await init();
  const address = await web3.eth.getAccounts();
  const getter = await instance.methods.getUserCollections(address[0]).call();
  const getUserFromSanity = await client.fetch(`*[_type == "users" && address == "${address[0].toLowerCase()}"][0]`);
  const getCollectionFromSanity = await client.fetch(
    `*[_type == "collection" && references("${getUserFromSanity._id}")]`
  );

  let array = [];
  getter.map((addressCollection) => {
    getCollectionFromSanity.map((item) => {
      if (item && item.address === addressCollection) {
        array.push({ address: item.address, name: item.name, _id: item._id });
      }
    });
  });

  return array;
};

export const getListOfNFTfromUser = async (setUserNFTs) => {
  const instance = await instanceContract();
  const web3 = await init();
  const address = await web3.eth.getAccounts();

  const getNFTs = await instance.methods.getListOfNFTfromUser(address[0]).call();
  setUserNFTs(getNFTs);
};
