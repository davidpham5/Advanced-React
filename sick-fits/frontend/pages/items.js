import React, { Component } from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../components/Item';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id,
      title,
      price,
      description,
      image,
      largeImage
    }
  }
`;
const ContentContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`
export default class Items extends Component {
  render () {
    return (
      <ContentContainer className="content-container">
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            console.log({data, error, loading })
            if (loading) {
              return (
                <h1>Loading ...</h1>
              )
            } else if (error) {
              return `Error: ${error.message}`
            } else {
              return (
                <ItemsList>
                  {data.items.map(item => <Item key={item.id} item={item}/>)}
                </ItemsList>
              )
            }
          }}
        </Query>
      </ContentContainer>
    )
  }
}
