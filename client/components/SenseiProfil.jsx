/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';
import { useEffect, useState, useRef } from 'react';

import NFTCollection from './NFTCollection';
import { Button, input, largeLayout, Section, smallLayout } from './style';
import NFTCard from './NFTCard';
import Filter from './Filter';
import Link from 'next/link';
import { getCollections, getListOfNFTfromUser } from '../utils/web3/getter';
import { clickHandler, convertDate, resetUpload, uploadHandler } from '../utils/handlerFactory';
import { css } from 'styled-components';
import { client } from '../lib/sanity';

import { NFTsDetails } from '../lib/query';
import { notification } from '../utils/notification';
import { Web3Storage } from 'web3.storage';

const SenseiProfil = ({ setSwitchLayout, switchLayout, senseiConnected, otaku }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState();
  const [email, setEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState();
  const hiddenFileInput = useRef(null);

  const handleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const init = async () => {
      // 1) Get all collections
      const getUserCollection = await getCollections();
      const getUser = await client.fetch(`*[_type == "users" && address == "${senseiConnected.toLowerCase()}"][0]`);
      const getUserNFTs = await client.fetch(`*[_type == "nft" && references("${getUser._id}")]{
        ${NFTsDetails}
      }`);

      // 2) Update statement
      setUserCollections(getUserCollection);
      setUserNFTs(getUserNFTs);
      setBio(getUser.bio);
      setUsername(getUser.username);
      setUserAvatar(getUser.avatarUrl);
      setEmail(getUser.email);
    };

    init();
  }, [senseiConnected, setUserAvatar]);

  const date = convertDate(otaku._createdAt);

  // Update profil
  const updateProfil = async (e) => {
    e.preventDefault();
    // Upload image to web3 storage

    const cid = await storeFiles();

    const avatarUrl = `https://${cid}.ipfs.dweb.link/${userAvatar[0].name}`;
    client
      .patch(`${otaku._id}`)
      .set({ bio, username, email, avatarUrl })
      .commit()
      .then((data) => {
        data ? notification('success', 'Profil updated succesfully') : notification('error', 'Something wrong');
        setTimeout(() => {
          handleModal();
        }, 1000);
      });
  };

  const storeFiles = async () => {
    const makeStorageClient = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STOTAGE_KEY });
    // Upload NFT image to web3 storage
    const client = makeStorageClient;
    const cid = await client.put(userAvatar);
    return cid;
  };
  return (
    <>
      <Section id="form" style={{ display: 'grid', gap: '4rem' }}>
        <ContainerProfil>
          <div>
            {/*           <img
              src={otaku.avatarUrl ? otaku.avatarUrl : 'https://nftavatarmaker.com/assets/main-nft.png'}
              alt="avatar"
              loading="lazy"
            /> */}

            <img
              src={
                typeof userAvatar === 'string'
                  ? userAvatar || otaku.avatarUrl
                  : (userAvatar && userAvatar.length >= 1 && URL.createObjectURL(userAvatar[0])) ||
                    'https://nftavatarmaker.com/assets/main-nft.png'
              }
              alt="new nft"
            />
            <p>{otaku.username} </p>
            <i>
              Joined {date.month} {date.year}
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
          <Container
            switchLayout={switchLayout}
            largeLayout={largeLayout}
            smallLayout={smallLayout}
            userCollections={userCollections}>
            <NFTCollection userCollections={userCollections} />
          </Container>
        </section>

        <section>
          <ContainerTitle>
            <h2 className="title">Items</h2>
            {senseiConnected && (
              <Link href="/nft/create">
                <a>
                  <Button outline={true}>New item</Button>
                </a>
              </Link>
            )}
          </ContainerTitle>

          <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
            {userNFTs.map((nft, index) => (
              <NFTCard
                key={index}
                NFTimage={nft.NFTUrl}
                NFTname={nft.name}
                slug={nft.slug}
                description={nft.description}
                price={nft.price}
                date={nft.endOfAuction}
                sensei={nft.creator.username}
                senseiRef={nft.senseiRef}
              />
            ))}
          </Container>
        </section>

        <HyperModal isOpen={isModalOpen} requestClose={handleModal}>
          <Section style={{ paddingTop: '1rem' }}>
            <h2 className="title">Sensei settings</h2>

            <Form>
              <ContainerInputImage>
                {userAvatar ? (
                  <div>
                    <ImageDisplay>
                      <img
                        src={
                          typeof userAvatar === 'string'
                            ? userAvatar || otaku.avatarUrl
                            : URL.createObjectURL(userAvatar[0])
                        }
                        alt="new nft"
                      />
                      <i onClick={() => clickHandler(hiddenFileInput)} className="bx bxs-image" />
                      <i onClick={() => resetUpload(setUserAvatar)} className="bx bx-x" />
                      <div></div>
                    </ImageDisplay>
                  </div>
                ) : (
                  <div id="display" onClick={() => clickHandler(hiddenFileInput)}>
                    <i className="bx bxs-image" />
                  </div>
                )}
              </ContainerInputImage>
              <input
                ref={hiddenFileInput}
                name="media"
                accept="image/*,video/*,audio/*,.glb,.gltf"
                type="file"
                onChange={(e) => uploadHandler(e, setUserAvatar)}
                style={{ display: 'none' }}
              />

              <div>
                <span>Change username</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={otaku.username}
                  type="text"
                />
              </div>

              <div>
                <span>Bio</span>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  placeholder="Tell the world your story ! "
                />
              </div>

              <div>
                <span>email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="texemailt"
                  placeholder="Enter email"
                />
              </div>

              <Button className="save-profil" onClick={(e) => updateProfil(e)}>
                Save
              </Button>
            </Form>
          </Section>
        </HyperModal>
      </Section>
    </>
  );
};

const Container = styled.div`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1.3rem;
  margin-top: 1.5rem;
  ${({ userCollections }) =>
    userCollections &&
    userCollections.length <= 1 &&
    css`
      grid-template-columns: 400px;

      & > div {
        display: grid;
        grid-template-rows: 250px max-content;

        img {
          width: 100%;
          object-fit: cover;
        }
      }
      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    `}
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

  .hm_hyperModalWrapper .hm_hyperModalContentWrapper {
    max-width: 900px;
  }
`;

const ContainerProfil = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  img {
    width: 120px;
    box-shadow: var(--shadow);
    border-radius: 0.5rem;
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

  & > div {
    width: 400px;
  }
`;

const ContainerInputImage = styled.div`
  display: grid;
  gap: 0.5rem;
  & > div {
    max-width: 350px;
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: 3px dashed rgb(204, 204, 204);
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;

    i {
      font-size: 20rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 0.5rem;
    }
  }
  p {
    font-size: var(--small-font-size);
  }
`;

const ImageDisplay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem;
  }

  i {
    z-index: var(--z-tooltip);
  }

  i,
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem !important;
    opacity: 0;
  }

  .bx-x {
    top: 1rem;
    right: 0;
    left: auto;
    font-size: 1.5rem !important;
    color: crimson;
  }

  div {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
  &:hover div {
    background-color: rgba(204, 204, 204, 0.4);
    opacity: 1;
    transition: all 0.3s;
  }

  &:hover i {
    opacity: 1;
    transition: all 0.3s;
  }
`;

export default SenseiProfil;
