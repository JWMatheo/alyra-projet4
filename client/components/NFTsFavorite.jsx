/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import NFTCard from './NFTCard';
import { Section } from './style';

import koruko from '../public/assets/bestOf01.jpeg';
import kagami from '../public/assets/bestOf2.jpeg';
import aomine from '../public/assets/bestOf3.jpeg';
const NFTsFavorite = () => {
  return (
    <Section>
      <h2 className="title">popular feature artwork</h2>
      <NFTContainer>
        <NFTCard
          NFTimage={koruko}
          NFTname="Kuroko #1"
          alt="Koruko"
          description="Our Kibertopiks will give you nothing"
          price="1.3"
          date="11 days left"
          creator="ShonenJump"
        />
        <NFTCard
          NFTimage={kagami}
          NFTname="Kagami #2"
          alt="Koruko"
          description="Our Kibertopiks will give you nothing"
          price="1.5"
          date="11 days left"
          creator="ShonenJump"
        />
        <NFTCard
          NFTimage={aomine}
          NFTname="Aomine #3"
          alt="Koruko"
          description="Our Kibertopiks will give you nothing"
          price="2.3"
          date="11 days left"
          creator="ShonenJump"
        />
      </NFTContainer>
    </Section>
  );
};

const NFTContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  align-items: center;
  gap: 1rem;
`;

export default NFTsFavorite;
