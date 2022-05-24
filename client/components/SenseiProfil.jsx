/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';
import { useState } from 'react';

import NFTCollection from './NFTCollection';
import { Button, input, largeLayout, Section, smallLayout } from './style';
import koruko from '../public/assets/bestOf01.jpeg';
import kagami from '../public/assets/bestOf2.jpeg';
import aomine from '../public/assets/bestOf3.jpeg';
import NFTCard from './NFTCard';
import Filter from './Filter';
import Link from 'next/link';

const SenseiProfil = ({ setSwitchLayout, switchLayout, senseiConnected, otaku }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);

  // Format date
  const initialDate = new Date(otaku._createdAt);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(initialDate);
  const year = initialDate.getFullYear();

  return (
    <>
      <Section style={{ display: 'grid', gap: '4rem' }}>
        <ContainerProfil>
          <div>
            <img src="https://nftavatarmaker.com/assets/main-nft.png" alt="avatar" />
            <p>Otaku #1</p>
            <i>
              Joined {month} {year}
            </i>
          </div>
          {senseiConnected && (
            <Button onClick={handleModal}>
              <i className="bx bx-slider-alt"></i>
            </Button>
          )}
        </ContainerProfil>
        <section>
          <h2 className="title">Description</h2>
          <p>{otaku.bio}</p>
        </section>
        <section>
          <ContainerTitle>
            <h2 className="title">Collections</h2>
            {senseiConnected && (
              <Link href="/collection/create">
                <Button outline={true}>New collection</Button>
              </Link>
            )}
          </ContainerTitle>
          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
            <NFTCollection
              link="text"
              image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'}
            />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
            <NFTCollection image={'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-139811-750x353.jpg'} />
          </Container>
        </section>

        <section>
          <ContainerTitle>
            <h2 className="title">Items</h2>
            {senseiConnected && (
              <Link href="/nft/create">
                <a>
                  <Button outline={true}>New iten</Button>
                </a>
              </Link>
            )}
          </ContainerTitle>

          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
            <NFTCard
              NFTimage={koruko}
              NFTname="Kuroko #1"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="1.3"
              date="11 days left"
              sensei="ShonenJump"
            />
            <NFTCard
              NFTimage={kagami}
              NFTname="Kagami #2"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="1.5"
              date="11 days left"
              sensei="ShonenJump"
            />
            <NFTCard
              NFTimage={aomine}
              NFTname="Aomine #3"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="2.3"
              date="11 days left"
              sensei="ShonenJump"
            />
          </Container>
        </section>
      </Section>

      <HyperModal isOpen={isModalOpen} requestClose={handleModal}>
        <Section style={{ paddingTop: '1rem' }}>
          <h2 className="title">Sensei settings</h2>

          <Form>
            <div>
              <span>Change username</span>
              <input type="text" placeholder="Shonen Jump" />
            </div>

            <div>
              <span>Bio</span>
              <textarea placeholder="Tell the world your story ! " />
            </div>

            <div>
              <span>email</span>
              <input type="texemailt" placeholder="Enter email" />
            </div>

            <Button>Save</Button>
          </Form>
        </Section>
      </HyperModal>
    </>
  );
};

const Container = styled.div`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1.3rem;
  margin-top: 1.5rem;
`;

const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button {
    color: var(--dark-color);

    &:hover {
      color: var(--dark-color);
    }
  }
`;

const ContainerProfil = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  img {
    width: 120px;
    box-shadow: var(--shadow);
  }

  p {
    font-size: var(--normal-font);
    font-weight: var(--font-bold);
    color: var(--dark-color);
  }

  button i {
    font-size: 1.4rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  align-items: center;
  gap: 1.5rem;

  ${input}

  textarea {
    height: 8rem;
    resize: vertical;
  }

  button {
    padding-block: 1.3rem;
  }
`;

export default SenseiProfil;