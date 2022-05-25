/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Web3Storage } from 'web3.storage';

import { Button, input } from '../style';
import InputImage from './InputImage';
import PropertyInput from './property/PropertyInput';
import SelectInput from './SelectInput';
import { addItemToCollection, mintNFTCollection } from '../../utils/web3/mintHandler';
import { notification } from '../../utils/notification';
import InputCollectionImage from './InputCollectionImage';
import { client } from '../../lib/sanity';

const NFTForm = ({ userCollections, addressConnected, collection }) => {
  const [NFTImage, setNFTImage] = useState();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('');
  const [NFTPropertie, setNFTPropertie] = useState([]);
  const hiddenFileInput = useRef(null);

  // Add nft to collection
  const mintNFTHandler = async (e) => {
    e.preventDefault();
    // If all required fields isn't entrered
    if (!name || !selected || !NFTImage)
      return notification('error', 'I had to fill in all the following fields: image, name and collection');

    const cid = await storeFiles();
    //Selected is Address collection choiced
    await addItemToCollection(JSON.parse(selected.collection).address, NFTImage, NFTPropertie, description, cid, selected, name);
  };

  // Create a Collection
  const mintCollectionHandler = async (e) => {
    e.preventDefault();
    setQuantity(NFTImage);
    // Check input required
    if (!NFTImage || !name || !quantity) {
      return notification('error', 'You forget to enter a value.');
    }
    const cid = await storeFiles();
    // Mint a collection: require name, symbol, baseURI, and quantity
    await mintNFTCollection(name, symbol, cid, NFTImage.length, NFTPropertie, NFTImage, description);
  };

  // Upload image to web3 storage
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
      {collection ? (
        <InputCollectionImage NFTImage={NFTImage} setNFTImage={setNFTImage} hiddenFileInput={hiddenFileInput} />
      ) : (
        <InputImage NFTImage={NFTImage} setNFTImage={setNFTImage} hiddenFileInput={hiddenFileInput} />
      )}
      {collection ? (
        <ContainerInput>
          <div>
            <h3>
              Collection Name <span>*</span>
            </h3>
            <small>The default NFT name will inherit example: collection name collectionName #1 </small>
            <input required type="text" name="Item name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <h3>
              Collection Symbol <span>*</span>
            </h3>
            <input required type="text" name="Item name" onChange={(e) => setSymbol(e.target.value)} />
          </div>
        </ContainerInput>
      ) : (
        <ContainerInput>
          <div>
            <h3>
              NFT's Name <span>*</span>
            </h3>
            <input required type="text" name="Item name" onChange={(e) => setName(e.target.value)} />
          </div>

          <SelectInput userCollections={userCollections} selected={selected} setSelected={setSelected} />
        </ContainerInput>
      )}

      <Container>
        <h3>Description</h3>
        <textarea onChange={(e) => setDescription(e.target.value)} />
      </Container>

      <PropertyInput
        NFTImage={NFTImage}
        setNFTImage={setNFTImage}
        NFTPropertie={NFTPropertie}
        setNFTPropertie={setNFTPropertie}
        collection={collection}
        name={name}
      />

      <Button onClick={collection ? mintCollectionHandler : mintNFTHandler} style={{ marginTop: '2rem' }}>
        {collection ? 'Create collection' : 'Add to collection'}
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

  i {
    font-size: var(--smaller-font-size);
    color: crimson;
  }

  textarea {
    height: 8rem;
    resize: vertical;
  }
`;

const ContainerInput = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  & > div {
    align-self: end;
  }

  small {
    font-size: var(--smaller-font-size);
  }
`;

export default NFTForm;
