import React, { Component } from 'react';
import TopBar from '../components/topbar.js'
import AdminProductList from '../components/adminProductList.js'
import { Link } from 'react-router-dom';


class AdminProducts extends Component {
  render() {
    const { products, productTypes, userinfo } = this.props;
    return (
      <section className="admin_productList">
        <TopBar title="PRODÜKT" userinfo={userinfo} />
        <NewProductButton />
        <AdminProductList productTypes={productTypes} products={products} />
      </section>
    )
  }
}

function NewProductButton (props) {
  return (
    <Link to={'/admin/admin_productPage/new'}>
      <button>Add New Product</button>
    </Link>
  )
}

export default AdminProducts
