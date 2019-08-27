import React, { Component } from 'react';
import TopBarContainer from '../components/topbar.js'
import PlusButton from '../components/plusButton.js'
import AdminProductList from '../components/adminProductList.js'
import { NakedLink } from "../styling/theme";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';


class AdminProducts extends Component {
  render() {
    const { products, productTypes, userinfo } = this.props;
    return (
      <section className="admin_productList"
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <TopBarContainer title="PRODÜKT" userinfo={userinfo} />
        <NewProductButton
          css={css`
            align-self: flex-end;
          `}
        />
        <AdminProductList productTypes={productTypes} products={products} />
      </section>
    )
  }
}

function NewProductButton (props) {
  return (
    <NakedLink to={'/admin/admin_productPage/new'}
      css={css`
        align-self: flex-end;
      `}
    >
      <PlusButton/>
    </NakedLink>
  )
}

export default AdminProducts
