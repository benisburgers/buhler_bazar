import React, {Component} from 'react';

class VotingModal extends Component {

  state = {
    selectedProducts: [],
    credits: 4,
    creditClassName: 'creditScore',
    filteredProducts: [],
    selectedTypes: []
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

        // ==> increase credit
        this.setState((state) => {
          return {
            credits: state.credits + 1
          }
        })

        // ==> deactivate fruit (visually)
        clickedTarget.classList.remove("active")
      }

      //no: this product has not been selcted (choose it)
      else {

        //are there any more credits left?
        //yes (there are credits left) ==>
        if (this.state.credits > 0) {
            // ==> add fruit to selectedProducts
            let selectedProducts = this.state.selectedProducts;
            let newSelectedProducts = [...selectedProducts, product];
            this.setState({
              selectedProducts: newSelectedProducts
            })

            // ==> decrease credits
            this.setState((state => {
              return {
                credits: state.credits - 1
              }
            }))

            // ==> activate fruit (visually)
            clickedTarget.classList.add("active")
        }

        //no (there are no credits left) ==>
        else {
            // ==> highlight credits for a second
            this.highlightCredit();
        }
      }
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

  selectType = (type) => {
    console.log('selectType');
    var selectedTypes = this.state.selectedTypes;
    var newSelectedTypes;
    //has this type selected?
    //yes:
    if (selectedTypes.includes(type)) {
      //==>unselect this type
      newSelectedTypes = selectedTypes.filter(item => item !== type)
    }
    //no:
    else {
      //==>select this type
      newSelectedTypes = [...selectedTypes, type]
    }
    //update selectedTypes in state
    this.setState({
      selectedTypes: newSelectedTypes
    })
  }

  render() {
    const { food, toggleModal, modalOpen, productTypes } = this.props;
    const { credits, creditClassName, selectedProducts } = this.state;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4>Vout für dini Lieblings</h4>
          <CreditScore credits={credits} creditClassName={creditClassName} />
          <TypeSelection food={food} selectedProducts={selectedProducts} productTypes={productTypes} selectType={this.selectType} />
          <FoodList food={food} chooseProduct={this.chooseProduct} />
          <ModalButtons submitVote={this.submitVote} toggleModal={toggleModal} selectedProducts={selectedProducts}/>
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
    const { credits, creditClassName } = this.props;
    return (
      <div className={creditClassName}>
        <span>{credits}</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class TypeSelection extends Component {
  render() {
    const { productTypes, selectType } = this.props;
    const types = productTypes.map((entry, index) => {
      return (
        <li key={index}>
          <button onClick={(e) => selectType(entry)}>
            {entry}
          </button>
        </li>
      )
    })
    return (
      <div>
        <ul>
          {types}
        </ul>
      </div>
    )
  }
}

class FoodList extends Component {
  render() {
    const { food, chooseProduct } = this.props;
    const foodItems = food.map((entry, index) => {
      return (
        <li key={index} onClick={ (e) => chooseProduct(e, entry) }>
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <br></br>
        </li>
      )
    })

    return (
      <ul className="foodList">
        {foodItems}
      </ul>
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
