import React, { Component } from 'react'
import { MediumHeader, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import ProductForm from '../components/productForm.js'

class ProductModal extends Component {
  render() {
    const {product, productTypes, toggleFields} = this.props;
    console.log(product);
    return (
      <ModalContent>
        <ModalMainPart>
          <ModalHeader>
            <MediumHeader>
              ProductModal
            </MediumHeader>
          </ModalHeader>
          <ProductForm product={product} productTypes={productTypes} toggleFields={toggleFields} />
        </ModalMainPart>
      </ModalContent>
    )
  }
}

export default ProductModal
