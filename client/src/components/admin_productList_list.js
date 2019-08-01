import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withFilter from '../components/withFilter'

class AdminProductList_List extends Component {
  openProduct = (productId) => {
    console.log('productId');
    console.log(productId);
  }

  render() {
    const { filteredProducts } = this.props;
    let productItems = filteredProducts.map((entry, index) => {
      return (
        <li key={index}>
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <Link to={{
              pathname: `/admin/admin_productPage/${entry.id}`,

          }}>
            Check it out
          </Link>

          <br></br>
          <br></br>
        </li>
      )
    })
    return (
        <div>
          <ul>{productItems}</ul>
        </div>
    )
  }
}

export default withFilter(AdminProductList_List)
