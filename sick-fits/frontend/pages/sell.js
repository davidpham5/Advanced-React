import Link from 'next/link';
import styled from 'styled-components';
import CreateItem from '../components/CreateItem';

const ContainerStyles = styled.div`
  max-width: 460px;
  margin: 0 auto;
`;
const Sell = props => {
  return (
    <ContainerStyles>
      <CreateItem />
    </ContainerStyles>
  )
}

export default Sell
