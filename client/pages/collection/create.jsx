/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Section } from '../../components/style';
import { handlerClickOutSide } from '../../utils/handlerFactory';
import { CollectionForm, Heading, NFTForm } from '../../components';
import { getCollections } from '../../utils/web3/getter';
import { client } from '../../lib/sanity';
import { NFTsQuery } from '../../lib/query';
import { walletConnected } from '../../utils/web3/authHandler';
import Link from 'next/link';

export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);
  return {
    props: {
      NFTs,
    },
  };
}

const Create = ({ NFTs }) => {
  const [open, setOpen] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressConnected, setAddressConnected] = useState();
  const [NFTPropertie, setNFTPropertie] = useState();
  const [NFTImage, setNFTImage] = useState();
  const [name, setName] = useState('');
  useEffect(() => {
    if (!loading) {
      const init = async () => {
        await getCollections(userCollections, setUserCollections, NFTs);
        await walletConnected(setAddressConnected);
      };

      init();
      setLoading(true);
    }
  }, [ NFTs, addressConnected, loading, userCollections]);

  if (open) {
    handlerClickOutSide(open, setOpen, '#collection');
  }

  return (
    <>
      <Heading
        image="https://imgs.search.brave.com/4_nbgj3GkJh1D_RKR86G7cvXPHBVq9z7-X11A7gontA/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9hbmlt/ZWxhbmQuZnIvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDYv/c3B5aG9tZS5qcGc"
        title="Create Collection"
      />

      <Section id="form">
        <h2 className="title">Create new Collection </h2>
        <div style={{ marginBottom: '2rem' }}>
          <Link href={'/nft/create'}>
            <a style={{ color: 'var(--first-color)', fontSize: 'var(--h3-font-size)' }}>Create a NFT 🪅</a>
          </Link>
        </div>
        <span style={{ fontSize: 'var(--small-font-size)' }}>
          <i style={{ color: 'crimson', marginRight: '0.2rem' }}>*</i>Required fields
        </span>

        <NFTForm
          userCollections={userCollections}
          addressConnected={addressConnected}
          NFTPropertie={NFTPropertie}
          setNFTPropertie={setNFTPropertie}
          setNFTImage={setNFTImage}
          NFTImage={NFTImage}
          name={name}
          setName={setName}
          collection={true}
        />
      </Section>
    </>
  );
};

export default Create;
