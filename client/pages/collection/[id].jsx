import styled from 'styled-components';
import { Filter, Heading, NFTCard } from '../../components';
import { largeLayout, Section, smallLayout } from '../../components/style';


import koruko from '../../public/assets/bestOf01.jpeg';
import kagami from '../../public/assets/bestOf2.jpeg';
import aomine from '../../public/assets/bestOf3.jpeg';


export default function Collection({ setSwitchLayout, switchLayout }) {
  return (
    <>
      <Heading
        title="Kuroko No Basket"
        image="https://www.japanfm.fr/wp-content/uploads/2020/12/Kurokos-Basketball-Saison-4-Pouvons-nous-nous-attendre-a-une-suite.jpg"
      />

      <Section>
        <h2 className="title">All items</h2>

        <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} />
          <Container switchLayout={switchLayout} largeLayout={largeLayout} smallLayout={smallLayout}>
            <NFTCard
              NFTimage={koruko}
              NFTname="Kuroko #1"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="1.3"
              date="11 days left"
              creator="ShonenJump"
            />
            <NFTCard
              NFTimage={kagami}
              NFTname="Kagami #2"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="1.5"
              date="11 days left"
              creator="ShonenJump"
            />
            <NFTCard
              NFTimage={aomine}
              NFTname="Aomine #3"
              alt="Koruko"
              description="Our Kibertopiks will give you nothing"
              price="2.3"
              date="11 days left"
              creator="ShonenJump"
            />
          </Container>
      </Section>
    </>
  );
}


const Container = styled.div`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1.3rem;
  margin-top: 1.5rem;
`;
