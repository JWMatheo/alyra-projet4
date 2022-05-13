/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled, { css } from 'styled-components';
import NFTCard from './NFTCard';
import { Button, Section } from './style';
import koruko from '../public/assets/bestOf01.jpeg';
import kagami from '../public/assets/bestOf2.jpeg';
import aomine from '../public/assets/bestOf3.jpeg';
import { useEffect, useState } from 'react';

const BestCollection = () => {
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

  return (
    <Section>
      <h2 className="title">Best week's collection </h2>
      <DetailCollection>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione esse ducimus laborum, itaque doloribus a
          impedit distinctio unde velit mollitia. Neque, exercitationem error molestiae eum fugit eos harum illo ducimus
          incidunt unde quas facere. Quia aut animi provident fugiat et.
        </p>

        <Button outline={true}>View Collection</Button>
      </DetailCollection>
      <Content id="best">
        <ContainerCard animated={animated}>
          <NFTCard
            maxWidth={true}
            NFTimage={koruko}
            NFTname="Kuroko #1"
            alt="Koruko"
            description="Our Kibertopiks will give you nothing"
            price="1.3"
            date="11 days left"
            creator="ShonenJump"
          />
          <SecondCard id="second">
            <NFTCard
              maxWidth={true}
              NFTimage={kagami}
              NFTname="Kagami #2"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="1.5"
              date="11 days left"
              creator="ShonenJump"
            />
          </SecondCard>

          <LastCard id="last">
            <NFTCard
              maxWidth={true}
              NFTimage={aomine}
              NFTname="Aomine #3"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="2.3"
              date="11 days left"
              creator="ShonenJump"
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
          }

          #last {
            left: 7rem;
            transition: 0.5s;

            @media screen and (max-width: 610px) {
              left: 3rem;
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
