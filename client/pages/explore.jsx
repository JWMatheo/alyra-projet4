import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { Filter, Heading, SearchBar } from '../components';
import ListingModal from '../components/ListingModal';
import NFTCard from '../components/NFTCard';
import { Section } from '../components/style';
import { NFTsQuery } from '../lib/query';
import { client } from '../lib/sanity';
import { notification } from '../utils/notification';
import { cancelListingNFT, listingNFT } from '../utils/web3/listingHandler';

export default function Explore({ setSwitchLayout, switchLayout, NFTs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceListing, setPriceListing] = useState();
  const [listingMyNFT, setListingMyNFT] = useState();
  const [NFTId, setNFTId] = useState();
  const [sellableNFT, setSellableNFT] = useState();
  const [allNFTs, setAllNFTs] = useState(NFTs);
  const [copy, setCopy] = useState(NFTs)
  const [id, setId] = useState();
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelListingHandler = async (e) => {
    e.preventDefault();

    const asking = confirm('are you sure you want to cancel the listing of this NFT ? ');

    if (asking) {
      await cancelListingNFT(Number(e.target.dataset.listingid));

      client.patch(`${e.target.dataset.nftid}`).set({ sellable: false }).commit();
      setSellableNFT(false);

      return notification('success', 'Your NFT are successfully listing 🎉');
    }
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

    setSellableNFT(true);
  };

  const largeLayout = css`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    #info {
      margin-top: 0;
    }
  `;

  const smallLayout = css`
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  `;

  return (
    <>
      <Heading
        image="https://medhaavi.in/wp-content/uploads/2022/01/featured-image-anime-character-810x456.jpg"
        title="Explore"
      />
      <Section>
        <ContainerFilter>
          <SearchBar allNFTs={allNFTs} setAllNFTs={setAllNFTs} copy={copy} />
          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} setAllNFTs={setAllNFTs} allNFTs={allNFTs} />
        </ContainerFilter>
        <ContainerCard allNFTs={allNFTs.length} switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
          {allNFTs ? allNFTs.map(
            (NFT, index) =>
              NFT.name &&
              NFT.owner && (
                <NFTCard
                  key={index}
                  NFTimage={NFT.NFTUrl}
                  NFTname={NFT.name}
                  alt={NFT.name}
                  description={NFT.description}
                  price={NFT.price}
                  slug={NFT.slug.current}
                  date={NFT.endOfAuction}
                  sensei={NFT.owner.username}
                  owner={NFT.owner.address}
                  handleModal={handleModal}
                  listingId={NFT.listingId}
                  isModalOpen={isModalOpen}
                  sellable={NFT.sellable}
                  setListingMyNFT={setListingMyNFT}
                  setIsModalOpen={setIsModalOpen}
                  nftId={NFT._id}
                  setNFTId={setNFTId}
                  setSellableNFT={setSellableNFT}
                  sellableNFT={sellableNFT}
                  cancelListingHandler={cancelListingHandler}
                  setId={setId}
                />
              )
          ) : <p>No Item</p> }
        </ContainerCard>

        <ListingModal
          isModalOpen={isModalOpen}
          handleModal={handleModal}
          priceListing={priceListing}
          setPriceListing={setPriceListing}
          listingMyNFT={listingMyNFT}
          listingNFTHandler={listingNFTHandler}
        />
      </Section>
    </>
  );
}

const ContainerFilter = styled.div`
  display: grid;
  width: 100%;
  gap: 2rem;
  row-gap: 5rem;
`;

const ContainerCard = styled.section`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1rem;
  margin-top: 2rem;

  & > div {
    & > div {
      display: grid;
      grid-template-rows: 1fr;
    }
  }

  ${({allNFTs}) => allNFTs === 1 && css`
  width: 300px;
  `}
`;

export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);

  return {
    props: {
      NFTs,
    },
  };
}
