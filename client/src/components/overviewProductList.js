import React, { Component } from 'react'
import withFilter from './withFilter'

class OverviewProductList extends Component {
  render() {
    const { filteredProducts, selectedProducts, chooseProduct } = this.props;
    const productList = filteredProducts.map((entry, index) => {
      return (
        <li
          key={index}
          onClick={ (e) => chooseProduct(e, entry) }
          className={(selectedProducts.includes(entry) ? 'active' : null)}
        >
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <br></br>
        </li>
      )
    })
    return (
      <ul>{productList}</ul>
    )
  }
}

export default withFilter(OverviewProductList)
