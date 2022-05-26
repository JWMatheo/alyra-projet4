import { Heading, SenseiProfil } from '../../components';
import { client } from '../../lib/sanity';

export default function Sensei({ setSwitchLayout, switchLayout, data, senseiConnected }) {


  return (
    <>
      <Heading
        title="Shonen Jump"
        image="https://media.comicbook.com/2021/06/dragon-ball-1270606.jpeg?auto=webp&width=1200&height=626&crop=1200:626,smart"
      />
      <SenseiProfil switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} otaku={data} senseiConnected={senseiConnected.sensei} />;
    </>
  );
}


export async function getServerSideProps(pageContext) {
  //pageContext.query.slug
  console.log(pageContext.query.slug);
  const data = await client.fetch(`*[_type == "users" && address == "${pageContext.query.sensei}"][0]`);

  return {
    props: {
      data,
      senseiConnected: pageContext.query
    },
  };
}