/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled from 'styled-components';
import { convertDate } from '../utils/handlerFactory';
import { containerCard } from './style';

const NFTCollection = ({ userCollections }) => {

  return (
    <>
      {userCollections.map((collection, index) => (
        <Link key={index} href={`/collection/${collection._id}`} passHref>
          <Container>
            <div>
              <img style={{ borderRadius: '0.5rem 0.5rem 0 0' }} src={collection.collectionUrl} alt="" />
            </div>

            <ContainerInfo>
              <li>Items: {collection.items}</li>
              <li>Owner: {collection.owners.length} </li>
              <li>
                Create at : {`${convertDate(collection._createdAt).month} ${convertDate(collection._createdAt).year} `}{' '}
              </li>
              <li>View</li>
            </ContainerInfo>
          </Container>
        </Link>
      ))}
    </>
  );
};

const Container = styled.div`
  ${containerCard}
`;

const ContainerInfo = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 0.5rem;
  padding: 1rem;
  margin-top: -0.2rem;
  background-color: var(--dark-color);
  background: linear-gradient(0deg, hsl(217, 60%, 19%) 0%, hsla(217, 89%, 15%, 0.8) 100%);
  border-top: 1px solid var(--body-color);
  border-radius: 0 0 0.5rem 0.5rem;
  color: var(--body-color);
`;

export default NFTCollection;
