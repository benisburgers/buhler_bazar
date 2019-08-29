import React, { Component } from 'react'
import { MediumHeader, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import ProductForm from '../components/productForm.js'

class ProductModal extends Component {
  render() {
    const {product, productTypes, toggleFields, handleCloseModal} = this.props;
    console.log(product);
    return (
      <ModalContent>
        <ModalMainPart>
          <ModalHeader>
            <MediumHeader>
              ProductModal
            </MediumHeader>
          </ModalHeader>
          <ProductForm product={product} productTypes={productTypes} toggleFields={toggleFields} handleCloseModal={handleCloseModal}/>
        </ModalMainPart>
      </ModalContent>
    )
  }
}

export default ProductModal
