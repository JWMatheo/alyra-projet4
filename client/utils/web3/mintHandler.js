import { client } from '../../lib/sanity';
import { notification } from '../notification';
import { init, instanceContract } from './init';

// Mint a collection: require name, symbol, baseURI, and quantity
export const mintNFTCollection = async (
  name,
  symbol = 'DF',
  baseURI,
  NumberOfNftToMint,
  NFTPropertie,
  NFTImage,
  description
) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  // 1) Create collection on Blockchain
  const mint = await instance.methods
    .DeployMyNFTCollection(name, symbol, baseURI, NumberOfNftToMint)
    .send({ from: owner[0] });

  // 2) Retrieve event data
  let event;
  if (mint.status) {
    if (mint.events.Showed.length > 1) {
      event = mint.events.Showed;
    } else {
      const result = mint.events.Showed.returnValues;
      event = result;
    }

    if (mint) {
      // 3) Get _id user connected
      const userConnected = await client.fetch(`*[_type == 'users' && address match '${owner[0]}'][0]{
    _id }`);

      // 4) Prepare collection creating
      const collection = {
        _type: 'collection',
        name,
        symbol,
        cid: baseURI,
        address: mint.events.Showed.length > 1 ? event[0].returnValues.token : event[0].token,
        creator: {
          _type: 'reference',
          _ref: userConnected._id,
        },
      };
      // 5) Create collection on Sanity
      client.create(collection).then((doc) => {
        // 6) Map to event data for prepare creating NFT
        event.map((minted, index) => {
          // Rename file
          const NFTName = `${name}#${index < 10 ? `0${index}` : index}`;
          const NFTUrl = `https://${baseURI}.ipfs.dweb.link/${NFTImage[index].name}`;
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
              _ref: userConnected._id,
            },
            creator: {
              _type: 'reference',
              _ref: userConnected._id,
            },
            NFTUrl,
            collection: {
              _type: 'reference',
              _ref: doc._id,
            },
          };
          if (NFTPropertie) {
            // 7) If propreties add it to the document
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
  } else {
    return notification('error', 'There are an error');
  }
};

export const addItemToCollection = async (
  collectionAddress,
  NFTImage,
  NFTPropertie,
  description,
  cid,
  selected,
  name
) => {
  const instance = await instanceContract();
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  const mint = await instance.methods.addItemToCollection(collectionAddress).send({ from: owner[0] });

  const result = mint.events.Showed.returnValues;

  if (result) {
    //Prepare for create a new nft on sanity
    const NFTUrl = `https://${cid}.ipfs.dweb.link/${NFTImage[0].name}`;

    const isConnected = await client.fetch(`*[_type == 'users' && address match '${owner[0]}'][0]{
    _id
  }`);
    const nft = {
      _type: 'nft',
      name,
      description,
      listingId: result.listingId,
      tokenId: result.tokenId,
      //address: data.address,
      owner: {
        _type: 'reference',
        _ref: isConnected._id,
      },
      creator: {
        _type: 'reference',
        _ref: isConnected._id,
      },
      NFTUrl,
      collection: {
        _type: 'reference',
        _ref: JSON.parse(selected.collection)._id,
      },
    };

    if (NFTPropertie) {
      client.create(nft).then((doc) => {
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

          notification(`success', 'NFT added to ${selected.name} successful !`);
        }
      });
    } else {
      client.create(doc).then((doc) => {
        if (doc._id) {
          notification(`success', 'NFT added to ${selected.name} successful !`);
        }
      });
    }
  }
};

export const mintDefaultCollection = async () => {
  const web3 = await init();
  const owner = await web3.eth.getAccounts();

  // 1) Create Collection on Blockchain
  const mint = await mintNFTCollection(
    'Defaults collection',
    'DFTs2',
    'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
    1
  );

  // 2) If created successfully
  if (mint) {
    const userConnected = await client.fetch(`*[_type == 'users' && address == "${owner[0]}"]{
    _id
  }`);

    const collection = {
      _type: 'collection',
      name: mint.collectionName,
      symbol: 'DFT',
      creator: {
        _type: 'reference',
        _ref: userConnected._id,
      },
      address: mint.token,
      cid: 'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
    };

    // 3) Create collection on Sanity
    client.create(collection);
    return notification('success', 'Collection created successful !');
  } else {
    return notification('error', 'There are an error');
  }
};
