/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';

import { Button, input, Section, SelectForm, selectForm } from '../../components/style';
import {
  clickHandler,
  uploadHandler,
  resetUpload,
  handleModal,
  openHandler,
  handlerClickOutSide,
} from '../../utils/handlerFactory';
import { Heading, PropertyForm } from '../../components';
import { init } from '../../utils/web3/init';
import Marketplace from '../../contracts/Marketplace.json';
import { getCollections } from '../../utils/web3/getter';
import { client } from '../../lib/sanity';
import { NFTsQuery } from '../../lib/query';

export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);

  return {
    props: {
      NFTs,
    },
  };
}

export default function Create({ addressConnected, NFTs }) {
  const [NFTImage, setNFTImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NFTPropertie, setNFTPropertie] = useState();
  const [open, setOpen] = useState(false);
  const [addressCollection, setAddressCollection] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      getCollections(userCollections, setUserCollections, NFTs);
      setNFTPropertie()
      setLoading(true);
    }
  }, [NFTs, loading, userCollections]);

  if (open) {
    handlerClickOutSide(open, setOpen, '#collection');
  }

  const ListItem = ({ value }) => {
    return <li onClick={(e) => setSelected(e.target.innerText)}>{value}</li>;
  };

  console.log(NFTPropertie);
  return (
    <>
      <Heading
        image="https://aws1.vdkimg.com/film/1/3/6/6/1366865_backdrop_scale_1280xauto.jpg"
        title="Create collection"
      />

      <Section id="form">
        <h2 className="title">Create new NFT </h2>
        <span style={{ fontSize: 'var(--small-font-size)' }}>
          <i style={{ color: 'crimson', marginRight: '0.2rem' }}>*</i>Required fields
        </span>
        <Form>
          <ContainerInputImage>
            <h3>
              Image, Video, Audio, or 3D Model <span> *</span>
            </h3>
            <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>

            {NFTImage ? (
              <div>
                <ImageDisplay>
                  <img src={URL.createObjectURL(NFTImage[0])} alt="new nft" />
                  <i onClick={() => clickHandler(hiddenFileInput)} className="bx bxs-image" />
                  <i onClick={() => resetUpload(setNFTImage)} className="bx bx-x" />
                  <div></div>
                </ImageDisplay>
              </div>
            ) : (
              <div onClick={() => clickHandler(hiddenFileInput)}>
                <i className="bx bxs-image" />
              </div>
            )}
            <input
              ref={hiddenFileInput}
              name="media"
              accept="image/*,video/*,audio/*,.glb,.gltf"
              type="file"
              onChange={(e) => uploadHandler(e, setNFTImage)}
              style={{ display: 'none' }}
            />
          </ContainerInputImage>

          <Container>
            <h3>
              NFT's Name <span>*</span>
            </h3>
            <input type="text" name="Item name" />
          </Container>

          <Container>
            <h3>Collection</h3>
            <SelectForm style={{ marginTop: '0.5rem' }} open={open}>
              <button id="collection" onClick={(e) => openHandler(e, setOpen, open)}>
                <a>{selected ? selected : 'Choice a collection'} </a>
                <i className={`bx bx-chevron-${open ? 'up' : 'down'}`} />
              </button>
              {open && (
                <ListOptions className="Choice a collection">
                  {userCollections.map((collection, index) => (
                    <ListItem key={index} value={collection.name} />
                  ))}
                </ListOptions>
              )}
            </SelectForm>
          </Container>

          <Container>
            <h3>Description</h3>

            <textarea />
          </Container>

          <ContainerProperties>
            <div>
              <i className="bx bx-list-ul" />
              <div>
                <h3>Properties</h3>
                <i>Textual traits that show up as rectangles</i>
              </div>
            </div>

            <Button onClick={(e) => handleModal(e, setIsModalOpen, isModalOpen)} outline={true}>
              <i className="bx bxs-add-to-queue"></i>
            </Button>
          </ContainerProperties>

          <Button style={{ marginTop: '2rem' }}>Create</Button>
        </Form>
        <HyperModal
          isFullscreen={true}
          isOpen={isModalOpen}
          requestClose={(e) => handleModal(e, setIsModalOpen, isModalOpen)}>
          <Section style={{ padding: '1rem', paddingBottom: '2rem' }}>
            <h2 className="title">Add properties</h2>
            <p>
              Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
              {NFTPropertie}
            </p>
            <PropertyForm NFTPropertie={NFTPropertie} setNFTPropertie={setNFTPropertie} NFTImage={NFTImage} />
          </Section>
        </HyperModal>
      </Section>
    </>
  );
}

const Container = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}

  textarea {
    height: 8rem;
    resize: vertical;
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

const ListOptions = styled.ul`
  width: 11rem;
  position: absolute;
  top: 3rem;
  height: max-content;
  bottom: -30.5rem;
  //width: 100%;
  background: white;
  border-radius: 0.5rem;
  z-index: var(--z-fixed);

  li {
    width: 100%;
    position: relative;
    padding: 1.3rem 1rem 1.3rem 0.5rem;
    font-weight: var(--font-bold);
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: 1px solid #e8e9ea;
    }

    &:hover {
      background-color: #e7eff5;
    }
  }

  li:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
    &::before {
      border: none;
    }
  }

  li:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const ContainerProperties = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  justify-content: space-between;

  & > div {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    i:first-child {
      font-size: 1.7rem;
    }
  }

  div i {
    font-size: var(--small-font-size);
  }

  button {
    color: var(--dark-color);
    font-size: 1.2rem;
    box-shadow: 0 4px 7px hsla(206, 4%, 4%, 0.2);

    &:hover {
      color: var(--dark-color);
    }
  }

  .hm_hyperModalWrapper .hm_hyperModalContentWrapper {
    width: 90% !important;
  }
`;

const Form = styled.form`
  margin-top: 1rem;

  span {
    color: crimson;
  }

  #save {
    margin-top: 3rem;
    display: block;
    margin-inline: auto;
  }

  #plus {
    margin-top: 3rem;

    i {
      font-size: 1.5rem;
    }
  }
`;
