import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components';
import { Section } from '../../components/style';
import koruko from '../../public/assets/bestOf01.jpeg';

export default function Nft({slug}) {
  return (
    <>
      <Heading
        title="Kuroko #1"
        image="https://www.japanfm.fr/wp-content/uploads/2020/12/Kurokos-Basketball-Saison-4-Pouvons-nous-nous-attendre-a-une-suite.jpg"
      />
      <Section>
        <Link href={`collection/${slug}`}>
          <i>Kuroko No Basket</i>
        </Link>
        <ContainerImage>
          <Image src={koruko} />
        </ContainerImage>
      </Section>
    </>
  );
}

const ContainerImage = styled.div`

border-radius: 0.5rem;
  max-width: 300px;
  height: 250px;
  overflow: hidden;
border: 3px solid var(--first-color);
  img {
    object-fit: cover;
  }`;
