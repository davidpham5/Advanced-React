import styled from 'styled-components';
import UpdateItem from '../components/UpdateItem';

const ContainerStyles = styled.div`
  max-width: 460px;
  margin: 0 auto;
`;
const Update = ({ query }) => {
  return (
    <ContainerStyles>
      <UpdateItem id={query.id} />
    </ContainerStyles>
  )
}

export default Update
