/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import { Heading } from '../components';
import { containerCard, Section } from '../components/style';

export default function Team() {
  return (
    <>
      <Heading
        image="https://adala-news.fr/wp-content/uploads/2021/08/anime-Blue-Lock-image-teaser.png"
        title="Our team"
      />

      <Section>
        <h2 className="title">Our team</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia laboriosam, aspernatur pariatur sapiente
          iusto excepturi vero ipsa molestiae amet facilis fuga laudantium! Dolore aliquam quaerat perferendis corrupti
          soluta? Voluptatibus cupiditate ea voluptatum, animi itaque voluptatem quibusdam nobis possimus modi eum.
          Maxime dolorum modi accusamus ipsa nisi incidunt repellat pariatur quasi inventore eum eaque, nulla
          praesentium? Blanditiis odio minus quibusdam doloribus, placeat vitae quos ipsam molestias ratione nisi nemo
          totam quisquam?
        </p>
        <Container>
          <Card>
            <div>
              <img
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                src={
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60'
                }
                alt=""
              />
            </div>
            <ContainerData>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequuntur perferendis quis placeat, ad
                eveniet exercitationem laborum ipsam ipsa deserunt temporibus quidem consectetur omnis molestiae atque
                pariatur corporis ipsum debitis!
              </p>
              <div>
                <i className="bx bxl-linkedin"></i>
                <span> @monCompteLinkedin</span>
              </div>
            </ContainerData>
          </Card>

          <Card>
            <div>
              <img
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                src={
                  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60'
                }
                alt=""
              />
            </div>
            <ContainerData>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequuntur perferendis quis placeat, ad
                eveniet exercitationem laborum ipsam ipsa deserunt temporibus quidem consectetur omnis molestiae atque
                pariatur corporis ipsum debitis!
              </p>
              <div>
                <i className="bx bxl-linkedin"></i>
                <span> @monCompteLinkedin</span>
              </div>
            </ContainerData>
          </Card>

          <Card>
            <div>
              <img
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                src={
                  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60'
                }
                alt=""
              />
            </div>
            <ContainerData>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequuntur perferendis quis placeat, ad
                eveniet exercitationem laborum ipsam ipsa deserunt temporibus quidem consectetur omnis molestiae atque
                pariatur corporis ipsum debitis!
              </p>
              <div>
                <i className="bx bxl-linkedin"></i>
                <span> @monCompteLinkedin</span>
              </div>
            </ContainerData>
          </Card>
        </Container>

        <section>
          <h2 className="title">About the project</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, maiores soluta adipisci qui aspernatur odit ex
            amet dicta, incidunt doloremque ad alias assumenda quae molestias. Eligendi sapiente consequuntur cupiditate
            natus harum possimus magni fuga distinctio! Id exercitationem voluptatem ullam asperiores assumenda nisi,
            placeat perferendis iure illo dolores quis blanditiis, suscipit consectetur eligendi repellat aperiam saepe.
            In, soluta autem! Iusto labore vitae provident quaerat rerum consequuntur ducimus sapiente consectetur
            reiciendis dignissimos. Hic ratione esse consequuntur, iusto aspernatur architecto sit maiores
            necessitatibus excepturi animi harum assumenda, qui est doloribus quidem vero deleniti culpa eius error
            accusamus delectus nam at reprehenderit. Quas, ipsam.
          </p>
        </section>
      </Section>
    </>
  );
}

const Container = styled.section`
  margin-block: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px , 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  ${containerCard}

  overflow: hidden;
  & > div {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ContainerData = styled.div`
  display: grid;
  row-gap: 1rem;
  padding: 1rem;
  margin-top: -0.2rem;
  background-color: var(--dark-color);
  background: linear-gradient(0deg, hsl(217, 60%, 19%) 0%, hsla(217, 89%, 15%, 0.8) 100%);
  border-top: 1px solid var(--body-color);
  border-radius: 0 0 0.5rem 0.5rem;
  color: var(--body-color);

  i {
    color: var(--body-color);
    font-size: 1.3rem;
  }

  span {
    color: var(--first-color);
  }
`;
