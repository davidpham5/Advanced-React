import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import ImagePreview from "./styles/ImagePreview";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_MUTATION($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val }); // [name] will compute to any input's name
  };

  handleSave = async (e, updateItemMutation) => {
    e.preventDefault();
    const { image, largerImage } = this.state;

    const resp = await updateItemMutation({
      variables: { 
        id: this.props.id,
        ...this.state
      }
    });

    // go to detail view for item created
    // Router.push({
    //   pathname: "/item/",
    //   query: { id: resp.data.createItem.id }
    // });
    console.log('Updated')
  };

  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          const { title, price, description, id } = data.item;

          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {this.props.id} </p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error, called, data }) => (
                <Form onSubmit={e => this.handleSave(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        defaultValue={price}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                        defaultValue={description}
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
