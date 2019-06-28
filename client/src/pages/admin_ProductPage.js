import React, { Component } from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class AdminProductPage extends Component {
  render() {
    const { findProperItem, food, match } = this.props;
    var properProduct = findProperItem(food, parseInt(match.params.id));
    return (
      <section className="admin_productPage">
        <h2>{properProduct.picturePath}</h2>
        <h2>{properProduct.name}</h2>
        <h2>{properProduct.type}</h2>
      </section>
    )
  }
}

export default AdminProductPage;
