import React, { Component } from 'react'

const withFilter = (WrappedComponent, test) => {
  class WithFilter extends Component {
    constructor(props) {
      super(props)

      this.state = {
        test: 'test',
        selectedTypes: [],
        filteredProducts: [],
        products: []
      }
    }

    selectType = async (type) => {
      //reset selectedProducts to 0 to avoid bugs and confusion for the user
      this.setState({
        selectedProducts: []
      });
      await this.updateSelectedTypes(type);
      this.filterProducts();
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
      let products = this.props.products;
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
      console.log(filteredProducts);
      this.setState({
        filteredProducts: filteredProducts,
      })
    }

    componentDidMount() {
      this.setState({
        filteredProducts: this.props.products
      })
    }

    render() {
      const {productTypes, products} = this.props;
      return (
        <div>
          <TypeSelection selectType={this.selectType} selectedTypes={this.state.selectedTypes} productTypes={productTypes} products={products} />
          <WrappedComponent
            filteredProducts={this.state.filteredProducts}
            {... this.props}
            test=<Test/>
          />
        </div>
      )
    }
  }

  class TypeSelection extends Component {
    render() {
      const { selectType, selectedTypes, productTypes } = this.props;
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

  class Test extends Component {
    render() {
      return (
        <span>test</span>
      )
    }
  }

  return WithFilter
}

export default withFilter
