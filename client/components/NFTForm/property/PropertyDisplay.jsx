import styled from 'styled-components';

const PropertyDisplay = ({ NFTPropertie }) => {
  return (
    <>
      {NFTPropertie && (
        <GroupProperties>
          {NFTPropertie.map((property, index) => (
            <Property key={index}>
              <small>Property #{index} </small>
              <p>
                {property[0]} : {property[1]}
              </p>
              <i className="bx bxs-x-circle"></i>
            </Property>
          ))}
        </GroupProperties>
      )}
    </>
  );
};

const GroupProperties = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const Property = styled.div`
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: var(--body-color);
  background: var(--dark-color);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);

  small {
    color: var(--first-color);
    font-weight: 600;
  }

  i {
    position: absolute;
    top: -0.4rem;
    right: -0.4rem;
    color: crimson;
    font-size: 1.2rem;
    opacity: 0;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
    i {
      opacity: 1;
      transition: 0.1s;
    }
  }
`;

export default PropertyDisplay;
