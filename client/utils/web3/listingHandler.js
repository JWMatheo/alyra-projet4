import Web3 from 'web3';
import { client } from '../../lib/sanity';
import { notification } from '../notification';
import { init, instanceContract } from './init';

export const listingNFT = async (
  listingId,
  price,
  NFTId,
  setSellableNFT,
  setPriceListing,
  setListingMyNFT,
  setIsModalOpen,
  isModalOpen
) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  if (!price) return notification('error', 'You have to enter a price');

  const convertEtherToWei = Web3.utils.toWei(price, 'ether');

  const listing = await instance.methods.listToken(listingId, convertEtherToWei).send({ from: owner[0] });

  if (listing.status) {
    const result = listing.events.Listed;
    client
      .patch(`${NFTId}`)
      .set({ listingId: result.listingId, price: price, sellable: true })
      .commit();
    setSellableNFT(true);
    setListingMyNFT(result.listingId);
    setIsModalOpen(!isModalOpen);
    return notification('success', 'Your NFT are successfully listing 🎉');
  } else {
    return notification('error', 'There was a mistake try again later');
  }
};

//cancel

export const cancelListingNFT = async (listingId) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  const cancel = await instance.methods.cancel(listingId).send({ from: owner[0] });
  return cancel.events.Cancelled.returnValues;
};

export const buyNFT = async (listingId, price, nftId, NFTName, setOwnerNFT) => {
  const instance = await instanceContract();
  const web3 = await init();
  const seller = await web3.eth.getAccounts();

  if (!price) return notification('error', 'There are an error try again later');
  const convertString = price.toString();

  const weiValue = Web3.utils.toWei(convertString, 'ether');

  const buyToken = await instance.methods.buyToken(listingId).send({ from: seller[0], value: weiValue });
  if (buyToken.status) {
    const idSeller = await client.fetch(`*[_type == "users" && address match "${seller[0]}"][0]`);
    client
      .patch(nftId)
      .set({ owner: { _type: 'reference', _ref: idSeller._id }, sellable: false })
      .commit()
      .then((data) => {
        if (data) {
          notification('success', `Congratulations you are the new owner of ${NFTName}`);
        }
      });
  }
};
