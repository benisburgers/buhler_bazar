import React, { Component } from 'react'
import withFilter from './withFilter'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class OverviewProductList extends Component {
  render() {
    const { filteredProducts, selectedProducts, chooseProduct } = this.props;
    const productList = filteredProducts.map((entry, index) => {
      return (
        <li
          key={index}
          onClick={ (e) => chooseProduct(e, entry) }
          css={css`
            width: 90px;
            height: 90px;
            background-color: ${selectedProducts.includes(entry) ? '#363636' : 'initial'};
            display: inline-block;
            text-align: center;
            margin: 15px 0;
          `}
        >
          <span
            css={css`
              display: block;
            `}
          >
            {entry.name}
          </span>
          <img src={entry.picturePath} alt={entry.name}
            css={css`
              width: 60px;
              height: 60px;
            `}
          />
        </li>
      )
    })
    return (
      <ul
        css={css`
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
      >
        {productList}
      </ul>
    )
  }
}

export default withFilter(OverviewProductList)
