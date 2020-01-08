import styled from 'styled-components';

const Item = styled.div`
  background: #fff;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.lightGrey};
  border-radius: 6px;
  max-width: 475px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 475px;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    text-align: center;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightGrey};
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightGrey};
    overflow: hidden;
    padding-bottom: 10px;
    & > * {
      background: white;
      border: 0;
      font-size: 1.3rem;
      padding: 1rem;
      text-align: center;
      font-family: helvetica, arial, sans-serif;
      font-weight: 400;
      text-transform: uppercase;
    }
  }
  header {
    display: grid;
    grid-template-columns: 100px auto;
    grid-template-rows: auto;
    grid-gap: 20px;
    height: 60px;
    .item-price {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2,
    h3,
    h4 {
      margin: 0;
      font-family: Helvetica, Arial, sans-serif;
      font-weight: 100;
      line-height: 1.2;
    }
  }
`;

export default Item;
