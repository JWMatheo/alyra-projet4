import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Filter, Heading, SearchBar } from '../components';
import NFTCard from '../components/NFTCard';
import { Section } from '../components/style';
import { NFTsQuery } from '../lib/query';
import { client } from '../lib/sanity';

export default function Explore({ setSwitchLayout, switchLayout, NFTs }) {
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
          <SearchBar />
          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
        </ContainerFilter>
        <ContainerCard switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
          {NFTs.map((NFT, index) => (
            <NFTCard
              key={index}
              NFTimage={NFT.image}
              NFTname={NFT.name}
              alt={NFT.name}
              description={NFT.description}
              price={NFT.price}
              slug={NFT.slug.current}
              date={NFT.endOfAuction}
              sensei={NFT.sensei.username}
            />
          ))}
        </ContainerCard>
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
`;

export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);

  return {
    props: {
      NFTs,
    },
  };
}
