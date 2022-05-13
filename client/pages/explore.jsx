import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Filter, Heading, SearchBar } from '../components';
import NFTCard from '../components/NFTCard';
import { Section } from '../components/style';
import koruko from '../public/assets/bestOf01.jpeg';
import kagami from '../public/assets/bestOf2.jpeg';
import aomine from '../public/assets/bestOf3.jpeg';

export default function Explore() {
  const [switchLayout, setSwitchLayout] = useState(false);

  const largeLayout = css`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
        </ContainerCard>
      </Section>
    </>
  );
}

const ContainerFilter = styled.div`
  display: grid;
  width: 100%;
  gap: 2rem;
`;

const ContainerCard = styled.section`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1rem;
  margin-top: 2rem;
`;
