import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from '../pages/items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem( id: $id ) {
      id  
    }
  }
`;

class DeleteItem extends Component {
  handleDeletion = (e, deleteItem) => {
    e.preventDefault()
    if (confirm('are you sure you want to delete this item?')) {
      deleteItem();
    }
  }
  update = (cache, payload) => {
    // 1. read the cache from apollo (list of items)
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    console.log({data})
    // 2. filter delete item out of the page 
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    // 3. update items list 
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data})
  }
  render () {
    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{id: this.props.id}} update={this.update}>
        {(deleteItem, { error }) => (
          <button onClick={(e) => this.handleDeletion(e, deleteItem)}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem;