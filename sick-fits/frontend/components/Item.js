import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney.js'
import DeleteItem from './DeleteItem';

export default class Item extends Component {
  static propTypes = {
    items: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  }

  render () {
    const { item } = this.props;

    return (
      <ItemStyles>
        <header>
          <div className="item-price">
            <PriceTag>{formatMoney(item.price)}</PriceTag>
          </div>
          <div>
            <div>
              <h2></h2>
            </div>
            <div>
              <h3></h3>
            </div>
          </div>
        </header>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: "/item", query: { id: item.id } }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{ pathname: "update", query: { id: item.id } }}>
            <a>Edit ✏️</a>
          </Link>
          <button>Add to cart ➕</button>
          <DeleteItem id={item.id}>Delete Item 🗑</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}
