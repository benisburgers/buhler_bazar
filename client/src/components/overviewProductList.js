import React, { Component } from 'react'
import withFilter from './withFilter'

class OverviewProductList extends Component {
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
    const { filteredProducts, toggleModal } = this.props;
    const { selectedProducts, credits, creditClassName } = this.state;
    const { chooseProduct } = this;
    return (
      <div>
        <CreditScore credits={credits} selectedProducts={selectedProducts} creditClassName={creditClassName} />
        <ProductList filteredProducts={filteredProducts} selectedProducts={selectedProducts} credits={credits} chooseProduct={chooseProduct} />
        <ModalButtons submitVote={this.submitVote} toggleModal={toggleModal} selectedProducts={selectedProducts}/>
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

class ProductList extends Component {
  render() {
    const { filteredProducts, selectedProducts, credits, chooseProduct } = this.props;
    const productList = filteredProducts.map((entry, index) => {
      return (
        <div>
          <li
            key={index}
            onClick={ (e) => chooseProduct(e, entry) }
            className={(selectedProducts.includes(entry) ? 'active' : null)}
          >
            <span>{entry.name}</span>
            <br></br>
            <span>{entry.picturePath}</span>
            <br></br>
            <br></br>
          </li>
        </div>
      )
    })
    return (
      <ul>{productList}</ul>
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

export default withFilter(OverviewProductList)
