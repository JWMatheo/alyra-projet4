/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Section } from '../../components/style';
import { handlerClickOutSide } from '../../utils/handlerFactory';
import { Heading, NFTForm } from '../../components';
import { getCollections, getListOfNFTfromUser } from '../../utils/web3/getter';
import { client } from '../../lib/sanity';
import { NFTsQuery } from '../../lib/query';

export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);

  return {
    props: {
      NFTs,
    },
  };
}

export default function Create({ addressConnected, NFTs }) {
  const [open, setOpen] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [userNFTs, setUserNFTs] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      async () => {
        getCollections(userCollections, setUserCollections, NFTs);
        getListOfNFTfromUser(setUserNFTs);
        //setNFTPropertie();
      };
      setLoading(true);
    }
  }, [NFTs, loading, userCollections]);

  if (open) {
    handlerClickOutSide(open, setOpen, '#collection');
  }

  return (
    <>
      <Heading
        image="https://aws1.vdkimg.com/film/1/3/6/6/1366865_backdrop_scale_1280xauto.jpg"
        title="Create collection"
      />

      <Section id="form">
        <h2 className="title">Create new NFT </h2>
        <span style={{ fontSize: 'var(--small-font-size)' }}>
          <i style={{ color: 'crimson', marginRight: '0.2rem' }}>*</i>Required fields
        </span>

        <NFTForm userCollections={userCollections} addressConnected={addressConnected} />
      </Section>
    </>
  );
}
