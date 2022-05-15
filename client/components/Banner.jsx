/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import illutration from '../public/assets/illutration.jpg';
import { Button } from './style';

const Banner = () => {
  return (
    <Section id="banner">
      <Container>
        <Content>
          <h1>
            Welcome to NFT Manga<span>.</span>
          </h1>
          <p>Discover, collect, and sell extraordinary NFTs.</p>

          <div>
            <Data>
              <h2>20K</h2>
              <h3>NFTs created</h3>
              <p>Find your favorite NFT with NFT's collection listed</p>
              <Button>
                <Link href="/explore">Explore</Link>
              </Button>
            </Data>

            <Data>
              <h2>200</h2>
              <h3>Creators</h3>
              <p>Become a NFT creator easily with ous marketplace</p>
              <Button outline={true}>Create</Button>
            </Data>
          </div>
        </Content>
      </Container>
      <Image src={illutration} alt="" layout="intrinsic" />
    </Section>
  );
};

const Section = styled.section`
  display: grid;
  gap: 0;

  @media screen and (min-width: 810px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
    position: relative;
  }
  img {
    object-fit: cover;
  }
  /*=====   @media screen and (min-width: 1700px) {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  } =====*/
`;

const Container = styled.div`
  padding: 3rem 0 2.5rem;
  background: linear-gradient(160deg, var(--dark-color) -4%, var(--dark-color-alt) 46%);
  grid-row: 2/3;

  h1 {
    color: #fff;
    font-size: var(--biggest-font-size);
    margin-bottom: 1.5rem;

    & > span {
      color: var(--first-color);
    }
  }

  p {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 810px) {
    height: auto;
    grid-row: 1/2;
    padding-top: 7rem;
  }

  @media screen and (min-width: 1200px) {
    padding-top: 10rem;

    h1 {
      margin-bottom: 2rem;
    }

    p {
      margin-bottom: 3rem;
    }
  }
`;

const Content = styled.div`
  max-width: 1024px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  & > div {
    border-top: 1px solid var(--text-color);
    padding-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
  }
`;

const Data = styled.div`
  h2 {
    color: var(--first-color);
    font-size: var(--h1-font-size);
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #fff;
    font-size: var(--h3-font-size);
    margin-bottom: 0.5rem;
  }
`;

export default Banner;
