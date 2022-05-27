/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled from 'styled-components';
import { convertDate } from '../utils/handlerFactory';
import { containerCard } from './style';

const NFTCollection = ({ userCollections }) => {
  return (
    <>
      {userCollections.map((collection, index) => (
        <>
          {/*  <Link key={index} href={`/collection/${collection._id}`} passHref>
        </Link> */}
          <Container key={index + 1854}>
            <div>
              <img style={{ borderRadius: '0.5rem 0.5rem 0 0' }} src={collection.collectionUrl} alt="" />
            </div>

            <ContainerInfo>
              <li id="name">{collection.name} </li>
              <li>Items: {collection.items}</li>
              <li>Owner: {collection.owners.length} </li>
              <li>
                Create at : {`${convertDate(collection._createdAt).month} ${convertDate(collection._createdAt).year} `}{' '}
              </li>
              <li>View: {collection.view ? collection.view : 0}</li>
            </ContainerInfo>
          </Container>
        </>
      ))}
    </>
  );
};

const Container = styled.div`
  ${containerCard}

  &>div {
    // height: 300px;
    height: 400px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
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

  #name {
    font-size: var(--h2-font-size);
    grid-column: 1/-1;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default NFTCollection;
