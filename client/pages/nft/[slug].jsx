/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Heading } from '../../components';
import ListingModal from '../../components/ListingModal';
import { Button, Section } from '../../components/style';
import { NFTQuery } from '../../lib/query';
import { client } from '../../lib/sanity';
import { viewsPage } from '../../utils/handlerFactory';
import { notification } from '../../utils/notification';
import { walletConnected } from '../../utils/web3/authHandler';
import { buyNFT, cancelListingNFT, listingNFT } from '../../utils/web3/listingHandler';
// This gets called on every request
export async function getServerSideProps(pageContext) {
  const NftData = await client.fetch(NFTQuery(pageContext.query.slug));

  return {
    props: {
      NftData,
      name: NftData.name,
      image: NftData.image,
      description: NftData.description,
      category: NftData.category,
      collection: NftData.collection.name,
      endOfAuction: NftData.endOfAuction,
      NFTUrl: NftData.NFTUrl,
      owner: NftData.owner,
      sensei: NftData.creator,
      ownerAdress: NftData.owner.address,
      metadata: NftData.metadata,
      price: NftData.price,
      sellable: NftData.sellable,
      ownerRef: NftData.otakuRef,
      senseiRef: NftData.senseiRef,
      listingId: NftData.listingId,
      NFTId: NftData._id,
    },
  };
}

export default function Nft({
  name,
  image,
  collection,
  description,
  category,
  endOfAuction,
  NFTUrl,
  owner,
  sensei,
  metadata,
  price,
  sellable,
  senseiRef,
  ownerRef,
  ownerAdress,
  listingId,
  NFTId,
  NftData,
}) {
  const [priceUSDT, setpriceUSDT] = useState('');
  const [addressConnected, setAddressConnected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceListing, setPriceListing] = useState();
  const [listingMyNFT, setListingMyNFT] = useState();
  const [sellableNFT, setSellableNFT] = useState();
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const convert = async () => {
      const ethValue = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
        .then((data) => data.json())
        .then((result) => result[0].current_price);
      await walletConnected(setAddressConnected);
      setpriceUSDT(parseFloat(ethValue * price).toFixed(4));
    };
    setSellableNFT(sellable);
    setTimeout(() => {
      convert();
    }, 1000);

    // Add view page
    viewsPage(NFTId);
  }, [price, sellable]);

  const listingNFTHandler = async (e, sellable) => {
    e.preventDefault();

    await listingNFT(
      listingId,
      priceListing,
      NFTId,
      setSellableNFT,
      setPriceListing,
      setListingMyNFT,
      setIsModalOpen,
      isModalOpen
    );
  };

  const cancelListingHandler = async (e) => {
    e.preventDefault();

    const asking = confirm('are you sure you want to cancel the listing of this NFT ? ');

    if (asking && listingId) {
      await cancelListingNFT(Number(listingId));

      client.patch(`${NFTId}`).set({ sellable: false }).commit();

      setSellableNFT(false);

      return notification('success', 'Your NFT are successfully listing 🎉');
    }
  };

  const buyNFTHandler = async (e) => {
    e.preventDefault();

    await buyNFT(Number(e.target.dataset.listingid), price, NFTId, name, ownerAdress);
    setTimeout(() => {
      window.location.reload();
    }, 7000);
  };
  return (
    <>
      <Heading title={name} image={NFTUrl} />
      <section style={{ paddingBottom: '3rem' }}>
        <Section>
          <Container>
            <RightSide>
              <NFT>
                <TopNFT>
                  <Link href={`collection/${collection}`}>
                    <i>{collection}</i>
                  </Link>
                  <ContainerLike>
                    <i className="bx bx-heart" />
                    <em>14</em>

                    <em>123 👀</em>
                  </ContainerLike>
                </TopNFT>
                <ContainerImage>
                  <img src={NFTUrl} alt={`nft-${collection}-${name}`} />
                </ContainerImage>
                <BottomNFT>
                  <p>
                    Owned by{' '}
                    <Link href={`/sensei/${owner.address}`} passHref>
                      <a>{owner.username} </a>
                    </Link>
                  </p>
                  <p>
                    Sensei by{' '}
                    <Link href={`/sensei/${sensei.address}`} passHref>
                      <a>{sensei.username} </a>
                    </Link>
                  </p>
                </BottomNFT>
              </NFT>

              {/*             {addressConnected && addressConnected.toLowerCase() === owner ? (
              sellable ? (
                <div>
                  <Button
                    data-listingid={listingId}
                    data-nftid={nftId}
                    id={`${index}`}
                    onClick={(e) => cancelListingHandler(e)}>
                    Cancel listing
                  </Button>
                </div>
              ) : (
                <div>
                  <Button data-listingid={listingId} data-nftid={nftId} id={`${index}`} onClick={(e) => openModal(e)}>
                    List it
                  </Button>
                </div>
              )
            ) : (
              <div>
                <Button>Place a bid</Button>
              </div>
            )} */}

              {addressConnected && addressConnected.toLowerCase() === ownerAdress ? (
                sellableNFT ? (
                  <div>
                    <Button onClick={(e) => cancelListingHandler(e)}>Cancel listing</Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={(e) => handleModal(e)}>List it</Button>
                  </div>
                )
              ) : sellableNFT ? (
                <ContainerAction>
                  <Price>
                    <i>Current price</i>
                    <div>
                      <img src="https://cdn.iconscout.com/icon/free/png-256/ethereum-16-646072.png" alt="etheruem" />
                      <p>{price}</p>
                      <span>
                        (<b>{priceUSDT}</b> USDT)
                      </span>
                    </div>
                  </Price>
                  <div>
                    <Button onClick={(e) => buyNFTHandler(e)} data-listingid={listingId}>
                      Buy Now{' '}
                    </Button>
                    {/* <Button outline={true}>Buy now</Button> */}
                  </div>
                </ContainerAction>
              ) : (
                <>
                  <NotSellable>
                    <p> No listing</p>
                  </NotSellable>
                  {/*  <div>
                    <Button>Place a bid </Button>
                    <Button outline={true}>Buy now</Button>
                  </div> */}
                </>
              )}
            </RightSide>

            <div>
              <h2>Detail</h2>

              <LeftSide>
                <details>
                  <summary>Description</summary>
                  <br /> <hr /> <br />
                  <small>created by {sensei.username}</small>
                  <p>{description}</p>
                </details>

                <details>
                  <summary>Propreties</summary>
                  <br /> <hr /> <br />
                  <ul>
                    {metadata &&
                      metadata.map((property) => (
                        <li key={property._key}>
                          {property.property}: {property.value}
                        </li>
                      ))}
                  </ul>
                </details>

                <details>
                  <summary>Item activity</summary>
                  <br /> <hr /> <br />
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut cupiditate harum consequuntur inventore
                  sint! Et alias fugit maiores est doloribus odio! Delectus iure facilis maxime tenetur. Iusto,
                  mollitia! Voluptatem, officia.
                </details>
              </LeftSide>
            </div>
          </Container>

          <ListingModal
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            priceListing={priceListing}
            setPriceListing={setPriceListing}
            listingMyNFT={listingId}
            listingNFTHandler={listingNFTHandler}
          />
        </Section>
      </section>
    </>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: space-between;
  gap: 2rem;

  h2 {
    font-size: var(--h2-font-size);
    color: var(--dark-color);
  }
`;

const RightSide = styled.div`
  display: grid;
  gap: 1.2rem;
  @media screen and (max-width: 580px) {
    align-items: center;
    justify-content: center;
  }
`;

const NFT = styled.div`
  max-width: 400px;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  color: var(--body-color);
  background-color: var(--dark-color);
  box-shadow: var(--shadow);
  border-radius: 0.5rem;
`;

const TopNFT = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerLike = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  color: var(--dark-color);
  font-size: var(--normal-font-size);
  i {
    font-size: 1.2rem;
  }

  & > em::before {
    content: '';
    height: 10px;
    width: 2px;
    background-color: black;
  }
`;

const ContainerImage = styled.div`
  position: relative;
  height: 250px;
  border-radius: 0.5rem;
  overflow-y: hidden;
  box-shadow: var(--shadow);

  &:hover {
    border: 1px solid #ffffff44;
    transform: scale(1.015);
    filter: brightness(1.02);
    transition: all 0.5s;
  }

  img {
    object-fit: cover;
  }
`;

const BottomNFT = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: var(--first-color);
    margin-right: 0.5rem;
  }
`;

const ContainerAction = styled.div`
  display: grid;
  gap: 2rem;

  & > div:last-child {
    display: flex;
    gap: 1.5rem;
  }

  button:last-child {
    color: var(--text-color);
  }
`;

const Price = styled.div`
  i {
    font-size: var(--smaller-font-size);
  }

  div {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    img {
      width: 1.2rem;
    }

    p {
      font-size: var(--biggest-font-size);
    }
    span {
      font-size: var(--small-font-size);
    }
  }
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.8rem;
  margin-top: 2rem;

  details {
    width: 100%;
    padding: 1rem;
    box-shadow: var(--shadow);
    border-radius: 0.5rem;
    color: var(--dark-color);
    font-size: var(--normal-font-size);

    p {
      font-size: var(--small-font-size);
      color: var(--text-color);
    }

    small {
      color: var(--first-color);
    }
  }
`;

const NotSellable = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-bold);
  color: crimson;
`;
