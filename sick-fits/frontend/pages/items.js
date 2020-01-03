import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../components/Item';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${ perPage } ) {
    items(first: $first, skip: $skit, orderBy: createdAt_DESC) {
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
  /* display: grid;
  grid-template-columns: 615px;
  grid-gap: 60px 0; */
  /* max-width: 960px; */
  margin: 0 auto;
`
export default class Items extends Component {

  // TODO: redesign list view. Instagram iPad List View
  render () {
    const { page } = this.props.query;
    return (
      <ContentContainer className="content-container">
        <Pagination page={page} />

        <Query query={ALL_ITEMS_QUERY} variables={{ skip: 2, first: 3 }}>
          {({ data, error, loading }) => {
            if (loading) {
              return (
                <h1>Loading ...</h1>
              )
            } else if (error) {
              return `Error: ${error.message}`
            } else {
              return (
                <div className="layout__main-with-sidebar">
                  <ItemsList>
                    {data.items.map(item => <Item key={item.id} item={item}/>).reverse()}
                  </ItemsList>
                  <Sidebar className="sidebar" page={page}></Sidebar>
                </div>
              )
            }
          }}
        </Query>
        <Pagination page={page}/>
      </ContentContainer>
    )
  }
}

export { ALL_ITEMS_QUERY };
