
import { Banner, BestCollection, HowIsWork, NFTCreator, NFTsFavorite } from '../components';
import sanity from '../lib/sanity'

export default function Home({data}) {
  console.log(data);
  return (
    <>
      <Banner />
      <BestCollection />
      <NFTsFavorite />
      <NFTCreator />
      <HowIsWork/>
    </>
  );
}


// This gets called on every request
export async function getServerSideProps() {
  const query = '*[ _type == "home"]';
  const data = await sanity.fetch('*[ _type == "nft"]');

  if (!data.length) {
    return {
      props: {
        data: 'error',
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}