import { init, instanceContract } from './init';

export const getCollections = async (userCollections, setUserCollections, NFTs) => {
  const instance = await instanceContract();
  const web3 = await init();
  const address = await web3.eth.getAccounts();
  const getter = await instance.methods.getUserCollections(address[0]).call();

  getter.map((addressCollection) => {
    NFTs.map((NFT) => {
      if (NFT.collection.address === addressCollection) {
        setUserCollections([...userCollections, { address: NFT.collection.address, name: NFT.collection.name }]);
      }
    });
  });
};
