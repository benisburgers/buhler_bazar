import React, {Component} from 'react';
import OverviewProductList from '../components/overviewProductList.js'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { MediumHeader, PrimaryButton, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import PointsLeft from '../components/pieChart.js'
import ExitButtonContainer from '../components/exitButton.js'
import UserContext from './UserContext'

class VotingModal extends Component {
  state = {
    selectedProducts: [],
    credits: 4,
    highlightCredits: false
  }

  static contextType = UserContext

  submitVote = async () => {
    console.log('submitVote');
    //convert selectedProducts array (object array) into simple array of integers (ids)
    let chosenProductIDs = [];
    this.state.selectedProducts.forEach((entry, index) => {
      chosenProductIDs = [...chosenProductIDs, entry.id]
    })

    //convert array to string to make it sql-compatible
    let arrayString = chosenProductIDs;

    let result = await this.pushProductIds(arrayString)
    // console.log(result);

    if (result) {
      await this.context.updateUserData()
      this.props.handleCloseModal();
    }
  }

  pushProductIds = (input) => {
    console.log('pushProductIds()');
    return new Promise((resolve, reject) => {
      (async () => {
        const rawResponse = await fetch('/api/voteProducts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });
        const content = await rawResponse.json();
        resolve(content);
      })();
    })
  }

  highlightCredit = () => {
    console.log('highlightCredit');
    const { highlightCredits } = this.state;
    this.setState({
      highlightCredits: true
    })
    setTimeout(() => {
      this.setState({
        highlightCredits: false
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
    const { credits, selectedProducts, highlightCredits } = this.state;
    const { chooseProduct, submitVote } = this;

    return (
      <ModalContent className="votingModal">
        <ModalMainPart className="mainPart">
          <ModalHeader>
            <MediumHeader>
              Vout für dini Liebling
            </MediumHeader>
            <CreditScore credits={credits} selectedProducts={selectedProducts} highlightCredits={highlightCredits} />
          </ModalHeader>
          <OverviewProductList selectedProducts={selectedProducts} productTypes={productTypes} products={products} handleCloseModal={handleCloseModal} chooseProduct={chooseProduct}/>
        </ModalMainPart>
        <ModalButtons submitVote={submitVote} handleCloseModal={handleCloseModal} selectedProducts={selectedProducts}/>
      </ModalContent>
    )
  }
}

class CreditScore extends Component {
  render() {
    const { credits, selectedProducts, highlightCredits } = this.props;
    return (
      <div className="pieChart-container">
        <PointsLeft credits={credits} selectedProducts={selectedProducts} highlightCredits={highlightCredits} />
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
          margin-top: 30px;
          width: 100%;
          display: flex;
        `}
      >
        <PrimaryButton width="75%" onClick={submitVote}
          css={css`
            margin-right: 10px;
          `}>
          VOUTÄ
        </PrimaryButton>
        <PrimaryButton negative width="25%" onClick={handleCloseModal}>
          <ExitButtonContainer width="25px" />
        </PrimaryButton>
      </div>
    )
  }
}

export default VotingModal;
