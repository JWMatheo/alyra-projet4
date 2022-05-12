/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Section } from './style';

const HowIsWork = () => {
  return (
    <Section>
      <h2 className="title">Create and sell your NFTs</h2>

      <Container>
        <Card>
          <img src="https://opensea.io/static/images/icons/wallet.svg" alt="wallet" />
          <h3>Set up your wallet</h3>
          <p>
            Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right
            corner. Learn about the{' '}
            <Link target={'_blank'} href="">
              wallets we support
            </Link>{' '}
          </p>
        </Card>

        <Card>
          <img src="https://opensea.io/static/images/icons/wallet.svg" alt="wallet" />
          <h3>Create your collection</h3>
          <p>
            Click{' '}
            <Link target={'_blank'} href="">
              My Collections
            </Link>{' '}
            and set up your collection. Add social links, a description, profile & banner images, and set a secondary
            sales fee.
          </p>
        </Card>

        <Card>
          <img src="https://opensea.io/static/images/icons/wallet.svg" alt="wallet" />
          <h3>Add your NFTs</h3>
          <p>
            Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with
            properties, stats, and unlockable content.
          </p>
        </Card>

        <Card>
          <img src="https://opensea.io/static/images/icons/wallet.svg" alt="wallet" />
          <h3>List them for sale</h3>
          <p>
            Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell
            your NFTs, and we help you sell them!
          </p>
        </Card>
      </Container>
    </Section>
  );
};

const Container = styled.div`
width: 80%;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2.5rem;
margin: auto;
`;

const Card = styled.div`
width: 100%;
display: grid;
text-align: center;
gap: 0.5rem;

img{
    display: block;
    margin: auto;
}
  a {
    color: var(--first-color);
    font-weight: var(--font-bold);
  }

`;

export default HowIsWork;
