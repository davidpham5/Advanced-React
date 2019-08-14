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
    price: 0
  }

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({title: val})
  }

  render () {
    const { title } = this.state;
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={this.handleChange} required />
          </label>
         
        </fieldset>
      </Form>
    )
  }
}

export default CreateItem;