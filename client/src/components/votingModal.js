import React, {Component} from 'react';
import OverviewProductList from '../components/overviewProductList.js'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { MediumHeader, PrimaryButton } from "../styling/theme"

class VotingModal extends Component {
  state = {
    selectedProducts: [],
    credits: 4,
    creditClassName: 'creditScore'
  }

  submitVote = () => {
    console.log('submitVote');
    //push selected fruits to database -- what format?
    let chosenProductIDs = [];
    this.state.selectedProducts.forEach((entry, index) => {
      chosenProductIDs = [...chosenProductIDs, entry.id]
    })
    // close voting modal
    this.props.handleCloseModal();
    //refresh overview page (update/fetch 'previous voting')
  }

  highlightCredit = () => {
    console.log('highlightCredit');
    const { creditClassName } = this.state;
    this.setState({
      creditClassName: `${creditClassName} + highlight`
    })
    setTimeout(() => {
      this.setState({
        creditClassName: `${creditClassName}`
      })
    }, 500);
  }

  chooseProduct = (e, product) => {
    console.log('chooseProduct');

    //is this product activated? I.e does it exist in selectedProducts?
      //yes: this product has been selected (unchoose it)
      if (this.state.selectedProducts.includes(product)) {

        // ==> remove fruit from selectedProducts
        let selectedProducts = this.state.selectedProducts;
        let newSelectedProducts = selectedProducts.filter(item => item !== product)
        this.setState({
          selectedProducts: newSelectedProducts
        })
      }

      //no: this product has not been selcted (choose it)
      else {

        //are there any more credits left?
        //yes (there are credits left) ==>
        if (this.state.selectedProducts.length < this.state.credits) {
            // ==> add fruit to selectedProducts
            let selectedProducts = this.state.selectedProducts;
            let newSelectedProducts = [...selectedProducts, product];
            this.setState({
              selectedProducts: newSelectedProducts
            })
        }

        //no (there are no credits left) ==>
        else {
            // ==> highlight credits for a second
            this.highlightCredit();
        }
      }
  }

  render() {
    const { products, handleCloseModal, modalOpen, productTypes } = this.props;
    const { credits, selectedProducts, creditClassName } = this.state;
    const { chooseProduct, submitVote } = this;
    return (
      <div className="votingModal"
        css={css`
          padding: 0px;
          height: 100%;
          overflow-y: hidden;
        `}>
        <div className="mainPart"
          css={css`
            padding: 21px;
            background: white;
            height: 80%;
            overflow: scroll;
            border-radius: 13px;
          `}
        >
          <MediumHeader>
            Vout für dini Liebling
          </MediumHeader>
          <CreditScore credits={credits} selectedProducts={selectedProducts} creditClassName={creditClassName} />
          <OverviewProductList selectedProducts={selectedProducts} productTypes={productTypes} products={products} handleCloseModal={handleCloseModal} chooseProduct={chooseProduct}/>
        </div>
        <ModalButtons submitVote={submitVote} handleCloseModal={handleCloseModal} selectedProducts={selectedProducts}/>
      </div>
    )
  }
}

class CreditScore extends Component {
  render() {
    const { credits, selectedProducts, creditClassName } = this.props;
    return (
      <div className={creditClassName}>
        <span>{credits - selectedProducts.length}</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class ModalButtons extends Component {
  render() {
    const { submitVote, handleCloseModal, selectedProducts } = this.props;
    return (
      <div
        css={css`
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
        `}
      >
        <PrimaryButton onClick={submitVote}
          css={css`
            width: 75%;
            margin-right: 10px;
          `}>
          VOUTÄ
        </PrimaryButton>
        <PrimaryButton negative onClick={handleCloseModal}
          css={css`
            width: 25%;
          `}
        >
          X
        </PrimaryButton>
      </div>
    )
  }
}

export default VotingModal;
