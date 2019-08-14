import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 9.99
  }

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: val}); // [name] will compute to any input's name
  }

  render () {
    const { title, price } = this.state;
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={this.handleChange} required />
          </label>

          <label htmlFor="price">
            Price
            <input type="number" id="price" name="price" placeholder="Price" value={price} onChange={this.handleChange} required />
          </label>
        </fieldset>
      </Form>
    )
  }
}

export default CreateItem;