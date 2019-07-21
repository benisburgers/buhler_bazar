import React, { Component } from 'react'
import withFilter from './withFilter'

class OverviewProductList extends Component {

  render() {
    const { filteredProducts, toggleModal, selectedProducts, credits, creditClassName, chooseProduct } = this.props;
    return (
      <div>
        <ProductList filteredProducts={filteredProducts} selectedProducts={selectedProducts} credits={credits} chooseProduct={chooseProduct} />
      </div>
    )
  }
}

class ProductList extends Component {
  render() {
    const { filteredProducts, selectedProducts, credits, chooseProduct } = this.props;
    const productList = filteredProducts.map((entry, index) => {
      return (
        <div>
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
        </div>
      )
    })
    return (
      <ul>{productList}</ul>
    )
  }
}

export default withFilter(OverviewProductList)
