/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Web3Storage } from 'web3.storage';

import { Button, input } from '../style';
import InputImage from './InputImage';
import PropertyInput from './property/PropertyInput';
import SelectInput from './SelectInput';
import { mintNFTCollection } from '../../utils/web3/mintHandler';
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
  const [valueMinted, setValueMinted] = useState();
  const hiddenFileInput = useRef(null);

  const mintNFTHandler = async (e) => {
    e.preventDefault();
    // Check input required
    if (!NFTImage || !selected || !name || !quantity) {
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
  // address collection "0x94fAA5cEe0462eeF8DDe2a60BA4353c0C3BF3346"
  // Collection
  const mintCollectionHandler = async (e) => {
    e.preventDefault();
    setQuantity(NFTImage);
    // Check input required
    if (!NFTImage || !name || !quantity) {
      return notification('error', 'You forget to enter a value.');
    }
    const cid = await storeFiles();
    // Mint a collection: require name, symbol, baseURI, and quantity
    const mint = await mintNFTCollection(name, symbol, cid, NFTImage.length, setValueMinted);

    if (mint) {
      const owner = await client.fetch(`*[_type == 'users' && address match '${addressConnected}'][0]{
    _id }`);

      const collection = {
        _type: 'collection',
        name,
        symbol,
        cid,
        address: mint[0].address,
        creator: {
          _type: 'reference',
          _ref: owner._id,
        },
      };

      client.create(collection).then((doc) => {
        mint.map((minted, index) => {
          // Rename file
          const NFTName = `${name}#${index < 10 ? `0${index}` : index}`;
          const NFTUrl = `https://${cid}.ipfs.dweb.link/${NFTImage[index].name}`;
          const nft = {
            _type: 'nft',
            name: NFTName,
            description,
            token: minted.returnValues.token,
            tokenId: minted.returnValues.tokenId,
            listingId: minted.returnValues.listingId,
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
              _ref: doc._id,
            },
          };
          if (NFTPropertie) {
            console.log(NFTPropertie);
            client.create(nft).then((doc) => {
              console.log(doc);
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
            client.create(doc).then((nft) => {
              if (nft._id) {
                notification('success', 'Collection created successful !');
              }
            });
          }
        });
      });
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
      {collection ? (
        <InputCollectionImage NFTImage={NFTImage} setNFTImage={setNFTImage} hiddenFileInput={hiddenFileInput} />
      ) : (
        <InputImage NFTImage={NFTImage} setNFTImage={setNFTImage} hiddenFileInput={hiddenFileInput} />
      )}
      {collection ? (
        <ContainerInput>
          <div>
            <h3>
              Collection Symbol <span>*</span>
            </h3>
            <input required type="text" name="Item name" onChange={(e) => setSymbol(e.target.value)} />
          </div>

          <div>
            <h3>
              Collection Name <span>*</span>
            </h3>
            <small>The default NFT name will inherit example: collection name collectionName #1 </small>
            <input required type="text" name="Item name" onChange={(e) => setName(e.target.value)} />
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

          <div>
            <h3>
              Quantity <i>(nummber)</i> <span>*</span>
            </h3>
            <input required type="number" name="Item name" onChange={(e) => setQuantity(e.target.value)} />
          </div>
        </ContainerInput>
      )}
      {!collection && <SelectInput userCollections={userCollections} selected={selected} setSelected={setSelected} />}

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

  & > div {
    align-self: end;
  }

  small {
    font-size: var(--smaller-font-size);
  }
`;

export default NFTForm;
