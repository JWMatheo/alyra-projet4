import { Heading, SenseiProfil } from '../../components';

export default function Sensei({ setSwitchLayout, switchLayout }) {
  return (
    <>
      <Heading
        title="Shonen Jump"
        image="https://media.comicbook.com/2021/06/dragon-ball-1270606.jpeg?auto=webp&width=1200&height=626&crop=1200:626,smart"
      />
      <SenseiProfil switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />;
    </>
  );
}
