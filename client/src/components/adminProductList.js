import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withFilter from '../components/withFilter'
import { VerySmallHeader, ListImage, ProductsUsersItem, NakedUl } from "../styling/theme";
import ChevronLink from '../components/chevronLink'


class AdminProductList extends Component {
  openProduct = (productId) => {
    console.log('productId');
    console.log(productId);
  }

  render() {
    const { filteredProducts } = this.props;
    let productItems = filteredProducts.map((entry, index) => {
      return (
        <ProductsUsersItem key={index}>
          <VerySmallHeader>{entry.name}</VerySmallHeader>
          <ListImage src={entry.picturePath} alt={entry.name} />
          <ChevronLink to={{
              pathname: `/admin/admin_productPage/${entry.id}`,

          }}>
            Check it out
          </ChevronLink>
        </ProductsUsersItem>
      )
    })
    return (
        <NakedUl>
          {productItems}
        </NakedUl>
    )
  }
}

export default withFilter(AdminProductList)
