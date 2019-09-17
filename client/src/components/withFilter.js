import { Component } from 'react'
import { SelectionButton, NakedUl } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const withFilter = (WrappedComponent, test) => {
  class WithFilter extends Component {
    constructor(props) {
      super(props)

      this.state = {
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
      if (selectedTypes.length === 0) {
        filteredProducts = products;
      }
      //else, if types have been selected:
      else {
        //for each product, check if its type is included in selectedTypes. If yes, return this product
        filteredProducts = products.filter(product => selectedTypes.includes(product.type))
      }
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
            <SelectionButton
              onClick={(e) => selectType(entry)}
              active={(selectedTypes.includes(entry) ? true : false)}
            >
              {entry}
            </SelectionButton>
          </li>
        )
      })
      return (
        <div
          css={css`
            margin-bottom: 20px;
          `}
        >
          <NakedUl
            css={css`
              display: flex;
              justify-content: space-around;
            `}
          >
            {types}
          </NakedUl>
        </div>
      )
    }
  }

  return WithFilter
}

export default withFilter
