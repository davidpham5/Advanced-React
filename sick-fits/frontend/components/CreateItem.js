import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from 'next/router';
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Blue Wave mug",
    description: "2020 victory mug",
    image: "",
    largeImage: "",
    price: formatMoney(900)
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val }); // [name] will compute to any input's name
  };

  handleSubmit = async (e, createItem) => {
    e.preventDefault();
    const resp = await createItem();
    console.log(resp)
    // go to detail view for item created
    Router.push({
      pathname: '/item/',
      query: { id: resp.data.createItem.id }
    })
  };

   uploadFile = async (e) => {
    console.log('upload file')
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'dpham5');

    const resp = await fetch('https://api.cloudinary.com/v1_1/dpham5/image/upload/', {
      method: 'POST',
      body: data
    })

    const file = await resp.json();
    console.log(file)
    // https://cloudinary.com/documentation/javascript_integration#overview
    // this.setState({ image: file.secure.url, largeImage: file.eager[0].secure.url })
  }

  render() {
    const { title, image, price, description } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error, called, data}) => (
        <Form onSubmit={ e => {this.handleSubmit(e, createItem)} }>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="fileUpload">
              Image
              <input
                type="file"
                id="fileUpload"
                name="fileUpload"
                placeholder="upload an image"
                onChange={this.uploadFile}
                required
              />
            </label>
            <label htmlFor="price">
              Price
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={this.handleChange}
                required
              />
            </label>

            <label htmlFor="description">
              description
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                value={description}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
