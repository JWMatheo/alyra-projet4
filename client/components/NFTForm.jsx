/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';

import Heading from './Heading';
import { Button, input, Section } from './style';
import { css } from 'styled-components';

const NFTForm = () => {
  const [NFTImage, setNFTImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NFTPropertie, setNFTPropertie] = useState([1]);

  const clickHandler = () => hiddenFileInput.current.click();
  const uploadHandler = (e) => e.target.files[0] && setNFTImage(URL.createObjectURL(e.target.files[0]));
  const resetUpload = () => setNFTImage(null);

  const handleModal = (e) => {
    !isModalOpen && e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };



  return (
    <>
      <Heading image="https://aws1.vdkimg.com/film/1/3/6/6/1366865_backdrop_scale_1280xauto.jpg" title="Explore" />

      <Section id="form">
        <h2 className="title">Create new collection </h2>
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
                  <img src={NFTImage} alt="new nft" />
                  <i onClick={clickHandler} className="bx bxs-image" />
                  <i onClick={resetUpload} className="bx bx-x" />
                  <div></div>
                </ImageDisplay>
              </div>
            ) : (
              <div onClick={clickHandler}>
                <i className="bx bxs-image" />
              </div>
            )}
            <input
              ref={hiddenFileInput}
              name="media"
              accept="image/*,video/*,audio/*,.glb,.gltf"
              type="file"
              onChange={(e) => uploadHandler(e)}
              style={{ display: 'none' }}
            />
          </ContainerInputImage>

          <Container>
            <h3>
              Collection Name <span>*</span>
            </h3>
            <input type="text" name="Item name" id="" />
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

            <Button onClick={handleModal} outline={true}>
              <i className="bx bxs-add-to-queue"></i>
            </Button>
          </ContainerProperties>
        </Form>
        <HyperModal isFullscreen={true} isOpen={isModalOpen} requestClose={handleModal}>
          <Section style={{ padding: '1rem' }}>
            <h2 className="title">Add properties</h2>
            <p>
              Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
            </p>
            <Form style={{ height: '350px', overflow: 'scroll' }}>
              {NFTPropertie.map((property, index) => (
                <PropertieModal key={index}>
                  <div>
                    <h4>Type</h4>
                    <div>
                      <Button outline={true}>
                        <i className="bx bxs-layer-minus" />
                      </Button>
                      <input type="text" placeholder="type" name="" id="" />
                      <p>{index}</p>
                    </div>
                  </div>
                  <div>
                    <h4>Value</h4>
                    <input type="text" placeholder="value" />
                  </div>
                </PropertieModal>
              ))}

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setNFTPropertie([...NFTPropertie, 'new']);
                }}
                id="plus">
                <i className="bx bxs-layer-plus" />
              </Button>

              <Button id="save">Save</Button>
            </Form>
          </Section>
        </HyperModal>
      </Section>
    </>
  );
};

const Form = styled.form`
  margin-top: 1rem;
  span {
    color: crimson;
  }

  #save {
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
  }

  #plus {
    margin-top: 3rem;

    i {
      font-size: 1.5rem;
    }
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

const Container = styled.div`
  margin-block: 1.4rem;
  ${input}

  textarea {
    height: 8rem;
    resize: vertical;
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

const PropertieModal = styled.div`
  display: flex;
  gap: 1rem;
  ${input}

  div div {
    display: flex;
    align-items: center;

    button {
      height: 4rem;
      margin-top: 0.5rem;
    }
    i {
      font-size: 1.5rem;
      color: var(--dark-color);
    }
    input {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
`;
export default NFTForm;
