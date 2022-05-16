/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled, { css } from 'styled-components';
import NFTCard from './NFTCard';
import { Button, Section } from './style';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const BestCollection = ({ bestNFTs }) => {
  const [animated, setAnimated] = useState(false);

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
        <Link href={'/collection/kuroko-no-basket'}>
          <Button outline={true}>View Collection</Button>
        </Link>
      </DetailCollection>
      <Content id="best">
        <ContainerCard animated={animated}>
          <NFTCard
            maxWidth={true}
            NFTimage={bestNFTs[0].image}
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
            sensei={bestNFTs[0].sensei.username}
          />
          <SecondCard id="second">
            <NFTCard
              maxWidth={true}
              NFTimage={bestNFTs[2].image}
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
              sensei={bestNFTs[2].sensei.username}
            />
          </SecondCard>

          <LastCard id="last">
            <NFTCard
              maxWidth={true}
              NFTimage={bestNFTs[1].image}
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
              sensei={bestNFTs[1].sensei.username}
            />
          </LastCard>
        </ContainerCard>
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

      p{
        height: 100px;
      }

      #image{
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
export default BestCollection;
