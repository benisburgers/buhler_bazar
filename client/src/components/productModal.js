import { Component } from 'react'
import { ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import ProductForm from '../components/productForm.js'
import ExitButtonContainer from '../components/exitButton.js'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class ProductModal extends Component {
  render() {
    const {product, productTypes, handleCloseModal } = this.props;
    return (
      <ModalContent>
        <ModalMainPart
          css={css`
            text-align: center;
            display: flex;
            flex-direction: column;
          `}
        >
          <ModalHeader>
            <div className="exitButtonContainer"
              css={css`
                height: 30px;
                width: 30px;
                margin-left: auto;
              `}
              onClick={e => handleCloseModal()}
            >
              <ExitButtonContainer />
            </div>
          </ModalHeader>
          <ProductForm product={product} productTypes={productTypes} handleCloseModal={handleCloseModal}/>
        </ModalMainPart>
      </ModalContent>
    )
  }
}

export default ProductModal
