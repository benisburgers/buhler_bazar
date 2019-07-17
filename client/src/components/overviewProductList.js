import React, { Component } from 'react'
import withFilter from './withFilter'

class OverviewProductList extends Component {

  render() {
    const { products, productTypes } = this.props;
    return (
      <p>overview list</p>
    )
  }
}

export default withFilter(OverviewProductList)
