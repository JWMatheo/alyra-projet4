/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import NFTCard from './NFTCard';
import { Section } from './style';

import { countdownMidnight, getDayLeft } from '../utils/handlerFactory';

const NFTsFavorite = ({ featuresNFT }) => {
  return (
    <Section>
      <h2 className="title">popular feature artwork</h2>
      <NFTContainer>
        {featuresNFT.map((feature, index) => (
          <NFTCard
            key={index}
            maxWidth={true}
            slug={feature.slug.current}
            NFTimage={feature.image}
            NFTname={feature.name}
            alt={feature.name}
            description={feature.description}
            price={feature.price}
            date={`${getDayLeft(feature.endOfAuction) ? getDayLeft(feature.endOfAuction) : countdownMidnight()} left`}
            sensei={feature.sensei.username}
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
    margin: auto;

    & > div {
      display: grid;
    }
  }
`;

export default NFTsFavorite;
