import React, { Component } from 'react';
import TopBar from '../components/topbar.js'
import { Link } from 'react-router-dom';

class AdminProductList extends Component {
  render() {
    const { food, userinfo } = this.props;
    return (
      <section className="admin_productList">
        <TopBar title="PRODÜKT" userinfo={userinfo} />
        <NewProductButton />
        <ProductList food={food}/>
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

class ProductList extends Component {
  openProduct = (productId) => {
    console.log('productId');
    console.log(productId);
  }

  render() {
    const { food } = this.props;
    let foodItems = food.map((entry, index) => {
      return (
        <li key={index}>
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <Link to={{
              pathname: `/admin/admin_productPage/${entry.id}`,

          }}>
            Check it out
          </Link>

          <br></br>
          <br></br>
        </li>
      )
    })
    return (
        <div>
          <ul>{foodItems}</ul>
        </div>
    )
  }
}

class AdminProductPage extends Component {
  render() {
    const { match } = this.props;
    console.log(match);
    console.log(match.params.id);
    return (
      <section className="admin_productPage">
        <h2>AdminProductPage</h2>
      </section>
    )
  }
}


export default AdminProductList
