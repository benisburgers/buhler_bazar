import React, {Component} from 'react';

class TypeSelection extends Component  {

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

export default TypeSelection
