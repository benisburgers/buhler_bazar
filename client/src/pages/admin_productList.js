import React, { Component } from 'react';
import TopBar from '../components/topbar.js'

class AdminProductList extends Component {
  render() {
    const { food, userinfo } = this.props;
    return (
      <section className="admin_productList">
        <TopBar title="PRODÜKT" userinfo={userinfo} />
        <ProductList food={food}/>
      </section>
    )
  }
}

class ProductList extends Component {
  openProduct = (productId) => {
    console.log('productId');
    console.log(productId);
  }

  render() {
    const { food } = this.props;
    let foodItems = food.map((entry, index) => {
      return (
        <li key={index}>
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <span onClick={ () => this.openProduct(entry.id) }>Open fruit</span>
          <br></br>
          <br></br>
        </li>
      )
    })
    return (
      <ul>{foodItems}</ul>
    )
  }
}

export default AdminProductList
