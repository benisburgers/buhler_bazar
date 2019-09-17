import { Component } from 'react';
import TopBarContainer from '../components/topbar.js'
import PlusPuttonContainer from '../components/plusButton.js'
import ProductList from '../components/productList.js'
import { FullHeightSection } from "../styling/theme";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ReactModal from 'react-modal';
import ProductModal from '../components/productModal'

class AdminProducts extends Component {
  state = {
    showModal: false,
    activeProductId: undefined
  }

  handleOpenModal = (content) => {
    console.log('handleOpenModal');
    console.log(content);
    this.setState({
      activeProductId: content,
      showModal: true
    });
  }

  handleCloseModal = () => {
    console.log('handleCloseModal');
    this.setState({
      showModal: false,
      activeProductId: undefined
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#main');
    this.props.mountProductList();
  }

  render() {
    const { products, productTypes, userInfo } = this.props;
    const { activeProductId } = this.state;
    return (
      <FullHeightSection className="admin_productList"
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <TopBarContainer title="PRODÜKT" userInfo={userInfo} />
        <div
          onClick={() => this.handleOpenModal()}
          css={css`
            align-self: flex-end;
            margin-bottom: 40px;
          `}
        >
          <PlusPuttonContainer />
        </div>
        <ProductList productTypes={productTypes} products={products} handleOpenModal={this.handleOpenModal} />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Menu Modal"
          style={{
            content: {
              padding: 0,
              inset: '20px',
              backgroundColor: 'rgba(0,0,0,0)',
              border: 'none'
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.8)'
            }
          }}
        >
          <ProductModal product={activeProductId ? products.find(product => product.id === activeProductId) : undefined} productTypes={productTypes} handleCloseModal={this.handleCloseModal} />
        </ReactModal>
      </FullHeightSection>
    )
  }
}

export default AdminProducts
