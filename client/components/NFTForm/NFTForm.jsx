/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Web3Storage, getFilesFromPath } from 'web3.storage';

import { Button, input } from '../style';
import InputImage from './InputImage';
import PropertyInput from './property/PropertyInput';
import PropertyDisplay from './property/PropertyDisplay';
import SelectInput from './SelectInput';
import { mintNFTCollection } from '../../utils/web3/mintHandler';

const NFTForm = ({ userCollections, addressConnected }) => {
  const [NFTImage, setNFTImage] = useState(null);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [NFTPropertie, setNFTPropertie] = useState();

  const hiddenFileInput = useRef(null);

  const mintNFT = async (e) => {
    e.preventDefault();

    const cid = await storeFiles();
    // Mint a collection: require name, symbol, baseURI, and quantity
    await mintNFTCollection(name, symbol, cid, 1, addressConnected).then((data) => console.log(data));
    console.log(cid);
  };

  // console.log(NFTImage);

  const storeFiles = async () => {
    const makeStorageClient = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STOTAGE_KEY });
    // Upload NFT image to web3 storage
    const client = makeStorageClient;
    const cid = await client.put(NFTImage);
    console.log('stored files with cid:', cid);
    return cid;
  };

  return (
    <Form>
      <InputImage NFTImage={NFTImage} setNFTImage={setNFTImage} hiddenFileInput={hiddenFileInput} />
      <Container>
        <h3>
          NFT's Name <span>*</span>
        </h3>
        <input type="text" name="Item name" onChange={(e) => setName(e.target.value)} />
      </Container>

      <Container>
        <h3>
          NFT's Symbol <span>*</span>
        </h3>
        <input type="text" name="Item name" onChange={(e) => setSymbol(e.target.value)} />
      </Container>
      <SelectInput userCollections={userCollections} />

      <Container>
        <h3>Description</h3>
        <textarea onChange={(e) => setDescription(e.target.value)} />
      </Container>

      <PropertyInput NFTImage={NFTImage} setNFTImage={setNFTImage} />
      <PropertyDisplay NFTPropertie={NFTPropertie} setNFTPropertie={setNFTPropertie} />
      <Button onClick={mintNFT} style={{ marginTop: '2rem' }}>
        Create
      </Button>
    </Form>
  );
};

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

const Container = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}

  textarea {
    height: 8rem;
    resize: vertical;
  }
`;

export default NFTForm;
