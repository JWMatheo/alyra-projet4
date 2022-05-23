/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Web3Storage } from 'web3.storage';

import { Button, input } from '../style';
import InputImage from './InputImage';
import PropertyInput from './property/PropertyInput';
import SelectInput from './SelectInput';
import { mintNFTCollection } from '../../utils/web3/mintHandler';
import { notification } from '../../utils/notification';

const NFTForm = ({ userCollections, addressConnected }) => {
  const [NFTImage, setNFTImage] = useState(null);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('');
  const [NFTPropertie, setNFTPropertie] = useState();
  const [valueMinted, setValueMinted] = useState();
  const hiddenFileInput = useRef(null);

  const mintNFTHandler = async (e) => {
    e.preventDefault();
    
    // Check input required
    if (!NFTImage || selected || name || quantity) {
      return notification('error', 'You forget to enter a value.');
    }
    const cid = await storeFiles();
    // Mint a collection: require name, symbol, baseURI, and quantity
    await mintNFTCollection(name, symbol, selected.cid, quantity, setValueMinted);
    if (valueMinted) {
      const owner = await client.fetch(`*[_type == 'users' && address match '${addressConnected}'][0]{
      _id
    }`);
      const collection = await client.fetch(`*[_type == 'collection' && cid match '${selected.cid}'][0]{
      _id
    }`);
      const NFTUrl = `https://${cid}.ipfs.dweb.link/${NFTImage[0].name}`;
      const doc = {
        _type: 'nft',
        name,
        description,
        token: valueMinted.token,
        tokenId: valueMinted.tokenId,
        //address: data.address,
        owner: {
          _type: 'reference',
          _ref: owner._id,
        },
        creator: {
          _type: 'reference',
          _ref: owner._id,
        },
        NFTUrl,
        collection: {
          _type: 'reference',
          _ref: collection._id,
        },
      };

      if (NFTPropertie) {
        client.create(doc).then((doc) => {
          if (doc._id) {
            NFTPropertie.map((item) => {
              client
                .patch(doc._id)
                .setIfMissing({ metadata: [] })
                .insert('after', 'metadata[-1]', [{ property: item[0], value: item[1] }])
                .commit({
                  autoGenerateArrayKeys: true,
                });
            });

            notification('success', 'Collection created successful !');
          }
        });
      } else {
        client.create(doc).then((doc) => {
          if (doc._id) {
            notification('success', 'Collection created successful !');
          }
        });
      }
    }
  };

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

      <ContainerInput>
        <div>
          <h3>
            NFT's Name <span>*</span>
          </h3>
          <input required type="text" name="Item name" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <h3>
            Quantity <i>(nummber)</i> <span>*</span>
          </h3>
          <input required type="number" name="Item name" onChange={(e) => setQuantity(e.target.value)} />
        </div>
      </ContainerInput>

      <SelectInput userCollections={userCollections} selected={selected} setSelected={setSelected} />

      <Container>
        <h3>Description</h3>
        <textarea onChange={(e) => setDescription(e.target.value)} />
      </Container>

      <PropertyInput
        NFTImage={NFTImage}
        setNFTImage={setNFTImage}
        NFTPropertie={NFTPropertie}
        setNFTPropertie={setNFTPropertie}
      />

      <Button onClick={mintNFTHandler} style={{ marginTop: '2rem' }}>
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
`;

export default NFTForm;
