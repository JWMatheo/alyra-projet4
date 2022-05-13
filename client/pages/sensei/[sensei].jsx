/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import { Filter, Heading, NFTCard } from '../../components';
import NFTCollection from '../../components/NFTCollection';
import { largeLayout, Section, smallLayout } from '../../components/style';

import koruko from '../../public/assets/bestOf01.jpeg';
import kagami from '../../public/assets/bestOf2.jpeg';
import aomine from '../../public/assets/bestOf3.jpeg';

export default function Sensei({ setSwitchLayout, switchLayout }) {
  return (
    <>
      <Heading
        title="Shonen Jump"
        image="https://media.comicbook.com/2021/06/dragon-ball-1270606.jpeg?auto=webp&width=1200&height=626&crop=1200:626,smart"
      />
      <Section style={{ display: 'grid', gap: '4rem' }}>
        <ContainerProfil>
          <img src="https://nftavatarmaker.com/assets/main-nft.png" alt="avatar" />
          <p>Otaku #1</p>
          <i>Joined May 2022</i>
        </ContainerProfil>

        <section>
          <h2 className="title">Collections</h2>
          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
            <NFTCollection link='text' image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
          </Container>
        </section>

        <section>
          <h2 className="title">items</h2>

          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
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
          </Container>
        </section>
      </Section>
    </>
  );
}

const Container = styled.div`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1.3rem;
  margin-top: 1.5rem;
`;

const ContainerProfil = styled.section`
  img {
    width: 120px;
  }

  p {
    font-size: var(--normal-font);
    font-weight: var(--font-bold);
    color: var(--dark-color);
  }
`;
