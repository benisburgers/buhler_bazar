import React, { Component } from 'react';
import TopBar from '../components/topbar.js'
import AdminProductList_List from '../components/admin_productList_list.js'
import { Link } from 'react-router-dom';


class AdminProductList extends Component {
  render() {
    const { products, productTypes, userinfo, filteredProducts, Test } = this.props;
    return (
      <section className="admin_productList">
        <TopBar title="PRODÜKT" userinfo={userinfo} />
        <NewProductButton />
        <AdminProductList_List productTypes={productTypes} products={products} />
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

export default AdminProductList
