/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import {  Heading, NFTCard, SenseiProfil } from '../../components';


export default function Me({ isConnected, setSwitchLayout, switchLayout }) {
  return (
    <>
      {isConnected ? (
        <>
          <Heading
            title="Sensei profil"
            image="https://www.ecranlarge.com/media/cache/1600x1200/uploads/image/001/398/baki-hanma-photo-1398254.jpg"
          />

          <SenseiProfil switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} senseiConnected={true} />
        </>
      ) : (
        ''
      )}
    </>
  );
}
