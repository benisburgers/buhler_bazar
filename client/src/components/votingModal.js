import React, {Component} from 'react';
import OverviewProductList from '../components/overviewProductList.js'


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
    this.state.selectedProducts.map((entry, index) => {
      chosenProductIDs = [...chosenProductIDs, entry.id];
    })
    // close voting modal
    this.props.toggleModal();
    //refresh overview page (update/fetch 'previous voting')
  }

  highlightCredit = () => {
    console.log('highlightCredit');
    const { creditClassName } = this.state;
    this.setState({
      creditClassName: 'creditScore highlight'
    })
    setTimeout(() => {
      this.setState({
        creditClassName: "creditScore"
      })
    }, 500);
  }

  chooseProduct = (e, product) => {
    console.log('chooseProduct');

    let productType = product.type
    let clickedTarget = e.currentTarget

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
    const { food, toggleModal, modalOpen, productTypes } = this.props;
    const { credits, selectedProducts, creditClassName } = this.state;
    const { chooseProduct, submitVote } = this;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4>Vout für dini Lieblings</h4>
          <CreditScore credits={credits} selectedProducts={selectedProducts} creditClassName={creditClassName} />
          <OverviewProductList selectedProducts={selectedProducts} productTypes={productTypes} products={food} toggleModal={toggleModal} chooseProduct={chooseProduct}/>
          <ModalButtons submitVote={submitVote} toggleModal={toggleModal} selectedProducts={selectedProducts}/>
        </div>
      )
    }
    else {
      return null;
    }
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
    const { submitVote, toggleModal, selectedProducts } = this.props;
    if ( selectedProducts.length > 0 ) {
      return (
        <div>
          <button onClick={submitVote}>VOUTÄ</button>
          <button onClick={toggleModal}>X</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={toggleModal}>X</button>
        </div>
      )
    }
  }
}

export default VotingModal;
