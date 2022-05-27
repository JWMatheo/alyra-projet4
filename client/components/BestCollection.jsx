/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled, { css } from 'styled-components';
import NFTCard from './NFTCard';
import { Button, input, Section } from './style';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HyperModal from 'react-hyper-modal';

const BestCollection = ({ bestNFTs }) => {
  const [animated, setAnimated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceListing, setPriceListing] = useState();
  const [listingNFT, setListingNFT] = useState();

  useEffect(() => {
    const headerObserver = new IntersectionObserver(handleSticky, {
      root: null,
      threshold: 1,
      rootMargin: '-20px',
    });

    headerObserver.observe(document.querySelector('#best'));

    function handleSticky(entries) {
      const [entry] = entries;

      if (!entry.isIntersecting) setAnimated(true);
      else setAnimated(false);
    }
  }, [animated]);

  const handleModal = (e) => {
    e.preventDefault();
    const listingId = e.target.dataset.listingid;
    setListingNFT(listingId);
    setIsModalOpen(!isModalOpen);
  };

  // Day Left
  const getDayLeft = (endDate) => {
    const today = new Date();
    const endDay = new Date(endDate);

    const difference = today.getHours() - endDay.getHours();

    if (difference === 0) return false;
    if (difference < 0) return 'bid finished';
    return `${difference.toString().slice(1)} day${difference > 1 && 's'} `;
  };

  const countdownMidnight = () => {
    const day = new Date();
    const hours = 24 - day.getHours();
    const min = 60 - day.getMinutes();
    const sec = 60 - day.getSeconds();

    // add 0 if min or sec < 10
    const customTime = (params) => {
      if (params < 10) {
        return (params = `0${params}`);
      } else {
        return params;
      }
    };

    return `${hours}:${customTime(min)}:${customTime(sec)}`;
  };

  
  
  return (
    <Section>
      <h2 className="title">Best week's collection </h2>
      <DetailCollection>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione esse ducimus laborum, itaque doloribus a
          impedit distinctio unde velit mollitia. Neque, exercitationem error molestiae eum fugit eos harum illo ducimus
          incidunt unde quas facere. Quia aut animi provident fugiat et.
        </p>
        <Link href={'/collection/YaLUR16LAR66zf2wm9WbV6'}>
          <Button outline={true}>View Collection</Button>
        </Link>
      </DetailCollection>
      <Content id="best">
        <ContainerCard animated={animated}>
          <NFTCard
            maxWidth={true}
            NFTimage={bestNFTs[0].NFTUrl}
            NFTname={bestNFTs[0].name}
            alt={bestNFTs[0].name}
            description={bestNFTs[0].description}
            price={bestNFTs[0].price}
            slug={bestNFTs[0].slug.current}
            date={`${
              getDayLeft(bestNFTs[0].endOfAuction)
                ? getDayLeft(bestNFTs[0].endOfAuction)
                : countdownMidnight(getDayLeft(bestNFTs[0].endOfAuction))
            } left`}
            sensei={bestNFTs[0].creator.username}
            owner={bestNFTs[0].owner.address}
            sellable={bestNFTs[0].sellable}
            best={true}
          />
          <SecondCard id="second">
            <NFTCard
              maxWidth={true}
              NFTimage={bestNFTs[2].NFTUrl}
              NFTname={bestNFTs[2].name}
              alt={bestNFTs[2].name}
              description={bestNFTs[2].description}
              price={bestNFTs[2].price}
              slug={bestNFTs[2].slug.current}
              date={`${
                getDayLeft(bestNFTs[2].endOfAuction)
                  ? getDayLeft(bestNFTs[2].endOfAuction)
                  : countdownMidnight(getDayLeft(bestNFTs[2].endOfAuction))
              } left`}
              sensei={bestNFTs[2].creator.username}
              owner={bestNFTs[2].owner.address}
              sellable={bestNFTs[2].sellable}
              best={true}
            />
          </SecondCard>

          <LastCard id="last">
            <NFTCard
              maxWidth={true}
              NFTimage={bestNFTs[1].NFTUrl}
              NFTname={bestNFTs[1].name}
              alt={bestNFTs[1].name}
              description={bestNFTs[1].description}
              price={bestNFTs[1].price}
              slug={bestNFTs[1].slug.current}
              date={`${
                getDayLeft(bestNFTs[1].endOfAuction)
                  ? getDayLeft(bestNFTs[1].endOfAuction)
                  : countdownMidnight(getDayLeft(bestNFTs[1].endOfAuction))
              } left`}
              sensei={bestNFTs[1].creator.username}
              owner={bestNFTs[1].owner.address}
              sellable={bestNFTs[1].sellable}
              best={true}
            />
          </LastCard>
        </ContainerCard>
        <HyperModal isOpen={isModalOpen} requestClose={handleModal}>
          <ContainerModal>
            <p>Entre a price and date end of auction</p>

            <ContainerInput>
              <div>
                <h3>
                  price <span>*</span>
                </h3>
                <input required type="number" onChange={(e) => setPriceListing(e.target.value)} />
              </div>
              <div>
                <h3>
                  Listing ID <span>*</span>
                </h3>
                <input style={{ color: 'black' }} required value={listingNFT} type="text" disabled="disabled" />
              </div>
            </ContainerInput>
            <Button className="save-profil" onClick={''}>
              Listing my NFT
            </Button>
          </ContainerModal>
        </HyperModal>
      </Content>
    </Section>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  overflow: hidden;
`;

const ContainerCard = styled.div`
  position: relative;
  z-index: var(--z-tooltip);

  @media screen and (max-width: 460px) {
    & > div {
      width: 200px;

      p {
        height: 100px;
      }

      #image {
        height: 180px;
      }
    }
  }

  ${({ animated }) =>
    animated
      ? css`
          div:nth-child(2) {
            right: 0;
          }

          div:nth-child(3) {
            left: 0;
          }
        `
      : css`
          #second {
            right: 7rem;
            transition: 0.5s;

            @media screen and (max-width: 610px) {
              right: 3rem;
            }

            @media screen and (max-width: 410px) {
              right: 2.5rem;
            }
          }

          #last {
            left: 7rem;
            transition: 0.5s;

            @media screen and (max-width: 610px) {
              left: 3rem;
            }

            @media screen and (max-width: 410px) {
              left: 2.5rem;
            }
          }
        `}
`;

const SecondCard = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  transform: rotate(-5deg);
  transition: 0.5s;
  &:hover {
    z-index: 0;
    transform: rotate(0);
    transition: 054s;
  }
`;

const LastCard = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: -1;
  transform: rotate(5deg);
  transition: 0.5s;
  &:hover {
    width: 100%;
    z-index: 0;
    transform: rotate(0);
    transition: 054s;
  }
`;

const DetailCollection = styled.div`
  margin-bottom: 4rem;
  p {
    font-size: var(--normal-font-size);
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  button {
    color: var(--dark-color);

    &:hover {
      color: var(--dark-color-alt);
    }
  }
`;

const ContainerModal = styled.section`
  padding: 2rem;
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

const ContainerInput = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  & > div {
    align-self: end;
  }

  small {
    font-size: var(--smaller-font-size);
    color: crimson;
  }

  i {
    font-size: var(--smaller-font-size);
    color: crimson;
  }
`;
export default BestCollection;
