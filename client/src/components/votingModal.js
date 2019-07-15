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

  updateSelectedTypes = (type) => {
    return new Promise((resolve, reject) => {
      console.log('updateSelectedTypes');
      var selectedTypes = this.state.selectedTypes;
      var newSelectedTypes;
      //has this type selected?
      //yes:
      if (selectedTypes.includes(type)) {
        //==>unselect this type (i.e remove from selectedTypes)
        newSelectedTypes = selectedTypes.filter(item => item !== type)
      }
      //no:
      else {
        //==>select this type (i.e. add to selectedTypes)
        newSelectedTypes = [...selectedTypes, type]
      }
      //update selectedTypes in state
      this.setState({
        selectedTypes: newSelectedTypes
      })
      resolve();
    })
  }

  filterProducts = () => {
    console.log('filterProducts');
    let products = this.props.food;
    let selectedTypes = this.state.selectedTypes;
    let filteredProducts;
    //if no types are selected ==> return ALL products as filteredProducts
    if (selectedTypes.length == 0) {
      filteredProducts = products;
    }
    //else, if types have been selected:
    else {
      //for each product, check if its type is included in selectedTypes. If yes, return this product
      filteredProducts = products.filter(product => selectedTypes.includes(product.type))
    }
    this.setState({
      filteredProducts: filteredProducts
    })
  }

  selectType = async (type) => {
    await this.updateSelectedTypes(type);
    this.filterProducts();
  }

  componentDidMount() {
    this.setState({
      filteredProducts: this.props.food
    })
  }

  render() {
    const { food, toggleModal, modalOpen, productTypes } = this.props;
    const { credits, creditClassName, selectedProducts, selectedTypes, filteredProducts } = this.state;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4 onClick={this.filterProducts}>
            hello
          </h4>
          <h4>Vout für dini Lieblings</h4>
          <CreditScore credits={credits} creditClassName={creditClassName} selectedProducts={selectedProducts} />
          <TypeSelection food={food} selectedProducts={selectedProducts} productTypes={productTypes} selectType={this.selectType} selectedTypes={selectedTypes} />
          <FoodList chooseProduct={this.chooseProduct} filteredProducts={filteredProducts} selectedProducts={selectedProducts} />
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
    const { credits, creditClassName, selectedProducts } = this.props;
    return (
      <div className={creditClassName}>
        <span>{credits - selectedProducts.length}</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class TypeSelection extends Component {
  render() {
    const { productTypes, selectType, selectedTypes } = this.props;
    const types = productTypes.map((entry, index) => {
      return (
        <li key={index}>
          <button
            onClick={(e) => selectType(entry)}
            className={(selectedTypes.includes(entry) ? 'active' : null)}
          >
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
    const { filteredProducts, chooseProduct, selectedProducts } = this.props;
    const foodItems = filteredProducts.map((entry, index) => {
      return (
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
