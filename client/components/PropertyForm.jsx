/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styled from 'styled-components';
import { notification } from '../utils/notification';
import { Button, input } from './style';

const PropertyForm = ({ NFTPropertie, setNFTPropertie, NFTImage }) => {
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([1]);
  const [property, setProperty] = useState('');
  const [value, setValue] = useState('');

  function handleDeleteClick(e, indexInput) {
    e.preventDefault();

    const copy = NFTPropertie;

    const remove = copy.filter((value, index) => {
      console.log(index, indexInput);
      return index !== indexInput;
    });

    const input = document.querySelector(`#item${indexInput}`);
    input.style.display = 'none';
    input.ariaHidden = true;

    setNFTPropertie(remove);
    setIndex(index - 1);
  }

  const addInput = (e) => {
    e.preventDefault();
    if (property !== '' && value !== '') {
      NFTPropertie ? setNFTPropertie([...NFTPropertie, [property, value]]) : setNFTPropertie([[property, value]]);
      setOptions([...options, 1]);
      setProperty('');
      setValue('');
      setIndex(index++);
    } else {
      notification('error', "You don't entre a value");
    }

    const button = document.querySelector('#plus');
    button.scrollIntoView();
  };

  return (
    <Form style={{ height: '350px' }}>
      {NFTImage ? (
        <ContainerImage>
          <img src={URL.createObjectURL(NFTImage[0])} alt="new nft" />
        </ContainerImage>
      ) : (
        <p style={{ marginBottom: '2rem', color: 'crimson' }}>You don't upload your NFT image</p>
      )}

      {options.map((property, index) => (
        <PropertieModal id={`item${index}`} key={index}>
          <div>
            <h4 style={{ marginLeft: '3.7rem' }}>Type</h4>
            <div>
              <Button onClick={(e) => handleDeleteClick(e, index)}>
                <i className="bx bxs-layer-minus" />
              </Button>
              <input type="text" onChange={(e) => setProperty(e.target.value)} placeholder="property" />
            </div>
          </div>
          <div>
            <h4>Value</h4>
            <input type="text" onChange={(e) => setValue(e.target.value)} placeholder="value" />
          </div>
        </PropertieModal>
      ))}

      <Button onClick={addInput} id="plus">
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
