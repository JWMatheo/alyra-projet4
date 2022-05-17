/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { Button, input } from './style';


const PropertyForm = ({ NFTPropertie, setNFTPropertie, NFTImage }) => {
  function handleDeleteClick(e, indexInput) {
    e.preventDefault();
    const input = document.querySelector(`#item${indexInput}`);
    input.style.display = 'none';
    input.ariaHidden = true;
  }


  return (
    <Form style={{ height: '350px' }}>
      {NFTImage ? (
        <ContainerImage>
          <img src={URL.createObjectURL(NFTImage[0])} alt="new nft" />
        </ContainerImage>
      ) : (
        <p style={{ marginBottom: '2rem', color: 'crimson' }}>You don't upload your NFT image</p>
      )}

      {NFTPropertie &&
        NFTPropertie.map((property, index) => (
          <PropertieModal id={`item${index}`} key={index}>
            <div>
              <h4 style={{ marginLeft: '3.7rem' }}>Type</h4>
              <div>
                <Button>
                  <a onClick={(e) => handleDeleteClick(e, index)}>
                    <i className="bx bxs-layer-minus" />
                  </a>
                </Button>
                <input type="text" placeholder="property" />
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
          NFTPropertie ? setNFTPropertie([...NFTPropertie, `item`]) : setNFTPropertie([`item`]);
          const button = document.querySelector('#plus');
          button.scrollIntoView();
        }}
        id="plus">
        <i className="bx bxs-layer-plus" />
      </Button>

      <Button id="save">Save</Button>
      <br />
    </Form>
  );
};

export default PropertyForm;

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

const PropertieModal = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  ${input}

  div div {
    display: flex;
    align-items: center;

    button {
      height: 4rem;
      margin-top: 0.5rem;
      border-radius: 0.5rem 0 0 0.5rem;
      border-right-color: transparent;
    }
    i {
      font-size: 1.5rem;
    }
    input {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
`;

const ContainerImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: 2px solid var(--dark-color);
    border-radius: 0.5rem;
  }
`;
