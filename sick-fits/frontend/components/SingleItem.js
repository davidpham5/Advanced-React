import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage.js";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney.js";
import DeleteItem from "./DeleteItem";
import styled from "styled-components";
import Head from "next/head";

const ContainerStyles = styled.div`
  display: grid;
  grid-template-columns: 600px 1fr;
  grid-gap: 30px;
  max-width: 1200px;
`;

const SidebarStyles = styled.div`
  margin-top: 30px;
  .title {
    text-align: left;
    a {
      font-size: 32px;
    }
  }
`;

const ButtonList = styled.div`
  display: grid;
  width: 100%;
  border: 1px solid ${props => props.theme.lightGrey};
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
  background: ${props => props.theme.lightGrey};
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
`
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error)
            return (
              <p>
                <Error error={error} />
              </p>
            );
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for this {this.props.id}</p>;
          const { item } = data;
          // TODO: redesign as a single view product page. no card styles
          return (
            <ContainerStyles>
              <Head>
                <title>Pham 5 | {data.item.title}</title>
              </Head>
              <ItemStyles>
                {item.largeImage && (
                  <img src={item.largeImage} alt={item.title} />
                )}
              </ItemStyles>

              <SidebarStyles>
                <Title className="title">
                  <a href="">{item.title}</a>
                </Title>
                <p><PriceTag>{formatMoney(item.price)}</PriceTag></p>
                <p>{item.description}</p>
                <ButtonList>
                  <Link href={{ pathname: "update", query: { id: item.id } }}>
                    <a>Edit ✏️</a>
                  </Link>
                  <button>Add to cart ➕</button>
                  <DeleteItem id={item.id}>Delete Item 🗑</DeleteItem>
                </ButtonList>
              </SidebarStyles>
            </ContainerStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
