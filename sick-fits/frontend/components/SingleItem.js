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
import Head from 'next/head';

const ContainerStyles = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem;
`;

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
                <Title>
                  <a href="">{item.title}</a>
                </Title>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <p>{item.description}</p>
                <div className="buttonList">
                  <Link href={{ pathname: "update", query: { id: item.id } }}>
                    <a>Edit ✏️</a>
                  </Link>
                  <button>Add to cart ➕</button>
                  <DeleteItem id={item.id}>Delete Item 🗑</DeleteItem>
                </div>
              </ItemStyles>
            </ContainerStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
