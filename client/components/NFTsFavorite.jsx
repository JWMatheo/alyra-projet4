/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';
import NFTCard from './NFTCard';
import { Button, input, Section } from './style';

import { countdownMidnight, getDayLeft } from '../utils/handlerFactory';
import { notification } from '../utils/notification';
import { cancelListingNFT, listingNFT } from '../utils/web3/listingHandler';
import { client } from '../lib/sanity';
import Web3 from 'web3';
import ListingModal from './ListingModal';

const NFTsFavorite = ({ featuresNFT }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceListing, setPriceListing] = useState();
  const [listingMyNFT, setListingMyNFT] = useState();
  const [NFTId, setNFTId] = useState();
  const [date, setDate] = useState();
  const [sellableNFT, setSellableNFT] = useState();
  const [id, setId] = useState();
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = (e) => {
    e.preventDefault();
    const listingId = e.target.dataset.listingid;

    setListingMyNFT(listingId);
    setIsModalOpen(!isModalOpen);
  };

  const listingNFTHandler = async (e, sellable) => {
    e.preventDefault();

    await listingNFT(
      Number(listingMyNFT),
      priceListing,
      NFTId,
      setSellableNFT,
      setPriceListing,
      setListingMyNFT,
      setIsModalOpen,
      isModalOpen
    );
    featuresNFT.map((el, index) => {
      if (index === Number(id)) {
        featuresNFT[index].sellable = true;
        featuresNFT[index].price = priceListing;
      }
    });
  };

  const cancelListingHandler = async (e) => {
    e.preventDefault();

    const asking = confirm('are you sure you want to cancel the listing of this NFT ? ');

    if (asking) {
      const cancel = await cancelListingNFT(Number(e.target.dataset.listingid));

      client.patch(`${e.target.dataset.nftid}`).set({ sellable: false }).commit();
      setSellableNFT(false);

      featuresNFT.map((el, index) => {
        if (index === Number(id)) {
          featuresNFT[index].sellable = false;
        }
      });

      return notification('success', 'Your NFT are successfully listing 🎉');
    }
  };

  return (
    <Section>
      <h2 className="title">popular feature artwork</h2>
      <NFTContainer>
        {featuresNFT.map((feature, index) => (
          <NFTCard
            sellable={feature.sellable}
            key={index}
            index={index}
            maxWidth={true}
            slug={feature.slug}
            NFTimage={feature.NFTUrl}
            NFTname={feature.name}
            alt={feature.name}
            description={feature.description}
            price={feature.price}
            date={`${getDayLeft(feature.endOfAuction) ? getDayLeft(feature.endOfAuction) : countdownMidnight()} left`}
            sensei={feature.creator.username}
            owner={feature.owner.address}
            handleModal={handleModal}
            listingId={feature.listingId}
            isModalOpen={isModalOpen}
            setListingMyNFT={setListingMyNFT}
            setIsModalOpen={setIsModalOpen}
            nftId={feature._id}
            setNFTId={setNFTId}
            setSellableNFT={setSellableNFT}
            sellableNFT={sellableNFT}
            cancelListingHandler={cancelListingHandler}
            setId={setId}
          />
        ))}
      </NFTContainer>
      <ListingModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        priceListing={priceListing}
        setPriceListing={setPriceListing}
        listingMyNFT={listingMyNFT}
        listingNFTHandler={listingNFTHandler}
      />
      {/*       <HyperModal isOpen={isModalOpen} requestClose={handleModal}>
        <ContainerModal>
          <p>Entre a price and date end of auction</p>

          <ContainerInput>
            <div>
              <h3>
                price <span>*</span> <small>ETHER</small>
              </h3>
              <input value={priceListing} required type="number" onChange={(e) => setPriceListing(e.target.value)} />
            </div>
            <div>
              <h3>
                Listing ID <span>*</span>
              </h3>
              <input style={{ color: 'black' }} required value={listingMyNFT} type="text" disabled="disabled" />
            </div>
          </ContainerInput>
          <ContainerDate>
            <h3>
              date end of auction <small>optional</small>
            </h3>
            <input
              min={new Date().toISOString().split('T')[0]}
              format="yyyy-mm-dd"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
            />
          </ContainerDate>
          <Button className="save-profil" onClick={(e) => listingNFTHandler(e)}>
            Listing my NFT
          </Button>
        </ContainerModal>
      </HyperModal> */}
    </Section>
  );
};

const NFTContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 1fr;
  align-items: center;
  gap: 1rem;

  & > div {
    height: 100%;
    margin: auto;

    & > div {
      display: grid;
    }
  }
`;

export default NFTsFavorite;
