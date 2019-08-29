import React, { Component } from 'react'
import { MediumHeader, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import ProductForm from '../components/productForm.js'
import ExitButtonContainer from '../components/exitButton.js'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class ProductModal extends Component {
  render() {
    const {product, productTypes, toggleFields, handleCloseModal} = this.props;
    console.log(product);
    return (
      <ModalContent>
        <ModalMainPart height="100%">
          <ModalHeader>
          <div className="exitButtonContainer"
            css={css`
              height: 21px;
              width: 21px;
              margin-left: auto;
            `}
          >
            <ExitButtonContainer lineColor="green" />
          </div>
          </ModalHeader>
          <ProductForm product={product} productTypes={productTypes} toggleFields={toggleFields} handleCloseModal={handleCloseModal}/>
        </ModalMainPart>
      </ModalContent>
    )
  }
}

export default ProductModal
