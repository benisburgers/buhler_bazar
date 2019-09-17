import React, { Component } from 'react';
import withFilter from '../components/withFilter'
import { VerySmallHeader, ListImage, ProductsUsersItem, NakedUl } from "../styling/theme";
import ChevronButton from '../components/chevronButton'


class AdminProductList extends Component {

  render() {
    const { filteredProducts, handleOpenModal } = this.props;
    let productItems = filteredProducts.map((entry, index) => {
      return (
        <ProductsUsersItem key={index}>
          <VerySmallHeader>{entry.name}</VerySmallHeader>
          <ListImage src={entry.picturePath} alt={entry.name} />
          <ChevronButton onClick={() => handleOpenModal(entry.id)} />
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
