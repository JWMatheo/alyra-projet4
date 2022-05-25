/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { Heading, NFTCard, SenseiProfil } from '../../components';
import { client } from '../../lib/sanity';

export default function Me({ addressConnected, setSwitchLayout, switchLayout, otaku, userConnected }) {

  return (
    <>
      {addressConnected ? (
        <>
          <Heading
            title="Sensei profil"
            image="https://www.ecranlarge.com/media/cache/1600x1200/uploads/image/001/398/baki-hanma-photo-1398254.jpg"
          />

          <SenseiProfil
            switchLayout={switchLayout}
            setSwitchLayout={setSwitchLayout}
            senseiConnected={userConnected}
            otaku={otaku}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
}

export async function getServerSideProps(pageContext) {
  const otaku = await client.fetch(`*[_type == "users" && address match "${pageContext.query.me[1]}"][0]`);
  return {
    props: {
      otaku,
      userConnected: pageContext.query.me[1]
    },
  };
}
