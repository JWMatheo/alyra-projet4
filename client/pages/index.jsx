import { Banner, BestCollection, HowIsWork, NFTCreator, NFTsFavorite } from '../components';
import { Section } from '../components/style';
import { bestNFTsQuery, featuresQuery, NFTsQuery, senseiQuery } from '../lib/query';
import { client } from '../lib/sanity';

export default function Home({ NFTs, allSenseis, bestNFTs, featuresNFT }) {
  return (
    <>
      <Banner />
      <BestCollection bestNFTs={bestNFTs} />
      <Section>
        <h2 className="title">popular feature artwork</h2>
        <NFTsFavorite featuresNFT={featuresNFT} />
      </Section>
      <NFTCreator />
      <HowIsWork />
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);
  const allSenseis = await client.fetch(senseiQuery);
  const result = await client.fetch(bestNFTsQuery);
  const resultFeature = await client.fetch(featuresQuery);
  const bestNFTs = result[0].nfts;
  const featuresNFT = resultFeature[0].nfts;

  return {
    props: {
      NFTs,
      allSenseis,
      bestNFTs,
      featuresNFT,
    },
  };
}
