/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { clickHandler, resetUpload, uploadHandler } from '../../utils/handlerFactory';

const InputImage = ({ hiddenFileInput, setNFTImage, NFTImage }) => {
  return (
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
  );
};

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

export default InputImage;
