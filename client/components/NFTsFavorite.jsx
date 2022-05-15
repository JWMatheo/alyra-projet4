/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import NFTCard from './NFTCard';
import { Section } from './style';

import { countdownMidnight, getDayLeft } from '../utils/handlerFactory';

const NFTsFavorite = ({ featuresNFT }) => {
  console.log(featuresNFT);
  return (
    <Section>
      <h2 className="title">popular feature artwork</h2>
      <NFTContainer>
        {featuresNFT.map((feature) => (
          <NFTCard
            key={feature._key}
            maxWidth={true}
            NFTimage={feature.image}
            NFTname={feature.name}
            alt={feature.name}
            description={feature.description}
            price={feature.price}
            date={`${getDayLeft(feature.endOfAuction) ? getDayLeft(feature.endOfAuction) : countdownMidnight()} left`}
            creator={feature.sensei.username}
          />
        ))}
      </NFTContainer>
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
    & > div {
      display: grid;
    }
  }
`;

export default NFTsFavorite;
