/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import HyperModal from 'react-hyper-modal';
import styled, { css } from 'styled-components';
import { convertDate } from '../utils/handlerFactory';
import { walletConnected } from '../utils/web3/authHandler';
import { getListing } from '../utils/web3/getter';
import { buyNFT, listingNFT } from '../utils/web3/listingHandler';
import { Button, containerCard, input } from './style';

const NFTCard = ({
  NFTimage,
  alt,
  NFTname,
  description,
  price,
  date,
  slug,
  sensei,
  senseiRef,
  maxWidth,
  owner,
  sellable,
  listingId,
  best,
  handleModal,
  setListingMyNFT,
  setIsModalOpen,
  isModalOpen,
  nftId,
  setNFTId,
  cancelListingHandler,
  priceListing,
  index,
  setId,
}) => {
  const [addressConnected, setAddressConnected] = useState();
  const [sellableNFT, setSellableNFT] = useState();

  useEffect(() => {
    const init = async () => {
      await walletConnected(setAddressConnected);

      if (!isNaN(listingId)) {
        const checkIsListing = await getListing(Number(listingId));
        checkIsListing.status === '1' ? setSellableNFT(true) : setSellableNFT(false);
      }
    };

    init();
  }, [setAddressConnected, addressConnected, setSellableNFT, sellable, listingId]);

  const openModal = (e) => {
    e.preventDefault();

    const listingIdNFT = e.target.dataset.listingid;
    setListingMyNFT(listingIdNFT);
    setNFTId(e.target.dataset.nftid);
    setIsModalOpen(!isModalOpen);
    setId(e.target.id);
  };

  const buyNFTHandler = async (e) => {
    e.preventDefault();

    await buyNFT(Number(e.target.dataset.listingid), price, nftId, NFTname, owner);
    setTimeout(() => {
      window.location.reload();
    }, 7000);
  };

  return (
    <section>
      <Container maxWidth={maxWidth}>
        <Link href={`/nft/${slug}`}>
          <div>
            <Card maxWidth={maxWidth}>
              <ContainerImage id="image">
                <img src={NFTimage} alt={alt} />
              </ContainerImage>

              <ContainerData>
                <div>
                  <h2>{NFTname} </h2>
                  <p>{description} </p>
                </div>

                <ContainerInfo id="info">
                  {sellableNFT ? (
                    <>
                      <Price>
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/ethereum-16-646072.png"
                          loading="lazy"
                          alt={slug}
                        />
                        <span>{price ? price : priceListing}</span>
                      </Price>

                      <Time>
                        <i className="bx bxs-time" />
                        <span>{date}</span>
                      </Time>
                    </>
                  ) : (
                    <NotSellable>
                      <p> No listing</p>
                    </NotSellable>
                  )}
                </ContainerInfo>

                <ContainerAction>
                  <hr />
                  <a href={`/sensei/${senseiRef}`}> {sensei}</a>
                  {/*  <Link href={`/sensei/${senseiRef}`}> <a> {sensei}</a></Link> */}
                </ContainerAction>
              </ContainerData>
            </Card>
          </div>
        </Link>
        {!best && (
          <>
            {addressConnected && addressConnected.toLowerCase() === owner ? (
              sellableNFT ? (
                <div style={{ zIndex: '100', position: 'absolute', right: '1rem', bottom: '0.7rem' }}>
                  <Button
                    data-listingid={listingId}
                    data-nftid={nftId}
                    className="cancel-button"
                    id={`${index}`}
                    onClick={(e) => cancelListingHandler(e)}>
                    Cancel listing
                  </Button>
                </div>
              ) : (
                <div style={{ zIndex: '100', position: 'absolute', right: '1rem', bottom: '0.7rem' }}>
                  <Button data-listingid={listingId} data-nftid={nftId} id={`${index}`} onClick={(e) => openModal(e)}>
                    List it
                  </Button>
                </div>
              )
            ) : (
              sellableNFT && (
                <div style={{ zIndex: '100', position: 'absolute', right: '1rem', bottom: '0.7rem' }}>
                  <Button onClick={(e) => buyNFTHandler(e)} data-listingid={listingId}>
                    Buy Now
                  </Button>
                </div>
              )
            )}
          </>
        )}
      </Container>
    </section>
  );
};

const Container = styled.div`
  user-select: none;
  width: 100%;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: 300px;
    `}
  border: 1px solid #ffffff22;
  border-radius: 0.5rem;
  background-color: #282c34;
  background: linear-gradient(0deg, #282c34 0%, rgba(17, 0, 32, 0.5) 100%);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 1s all;

  & ::before {
    content: '';
    position: fixed;
    box-shadow: 0 0 100px 40px #ffffff08;
    top: -10%;
    left: -250%;
    transform: rotate(-45deg);
    height: 60rem;
    transition: 1s all;
  }

  &:hover {
    border: 1px solid #ffffff44;
    transform: scale(1.015);
    filter: brightness(1.1);
  }

  &:hover ::before {
    filter: brightness(0.5);
    top: -100%;
    left: 200%;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: 300px;
    `}
  //max-width: 300px;
  border: 1px solid #ffffff22;
  background-color: var(--dark-color);
  background: linear-gradient(0deg, hsl(217, 60%, 19%) 0%, hsla(217, 89%, 15%, 0.8) 100%);
  border-radius: 0.7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  padding: 1rem;
  padding-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: 0.5s all;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContainerImage = styled.div`
  border-radius: 0.5rem;
  max-width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const ContainerData = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  grid-template-rows: 150px 1fr;

  P {
    height: 100%;
    display: inline-block;
    overflow: hidden;
  }

  h2 {
    color: var(--body-color);
    margin-bottom: 1rem;
  }

  hr {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--text-color);
    margin-top: 0;
  }

  a {
    color: var(--first-color);
  }
`;

const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  span {
    font-size: var(--normal-font-size);
    color: var(--first-color);
  }
`;

const Price = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 1.2rem;
  }

  span {
    color: var(--text-color);
    font-weight: var(--font-bold);
  }
`;

const Time = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NotSellable = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-bold);
  color: crimson;
`;

const ContainerAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  button {
    z-index: 100;
    background-color: black;
  }
`;

export default NFTCard;
