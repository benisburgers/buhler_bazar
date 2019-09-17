import { Component } from 'react'
import withFilter from './withFilter'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ListItemText, NakedUl } from "../styling/theme"

class OverviewProductList extends Component {
  render() {
    const { filteredProducts, selectedProducts, chooseProduct } = this.props;
    const productList = filteredProducts.map((entry, index) => {
      return (
        <li
          key={index}
          onClick={ (e) => chooseProduct(e, entry) }
          css={css`
            width: 80px;
            height: 100px;
            border: ${selectedProducts.includes(entry) ? '2px solid #A9EEC2' : 'none'};
            box-sizing: border-box;
            border-radius: 13px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 15px 0;
          `}
        >
          <img src={entry.picturePath} alt={entry.name}
            css={css`
              width: 60px;
              height: 60px;
            `}
          />
          <ListItemText>
            {entry.name}
          </ListItemText>
        </li>
      )
    })
    return (
      <NakedUl
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
      >
        {productList}
      </NakedUl>
    )
  }
}

export default withFilter(OverviewProductList)
