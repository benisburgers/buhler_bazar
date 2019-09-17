// import Customers from './components/customers/customers';
import { Component } from 'react';
import './App.css';

/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { Router, Route } from 'react-router-dom'
import { UserProvider } from './components/UserContext'

import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import AdminUserList from './pages/admin_userList';
import AdminProducts from './pages/admin_productList';

import { history } from './components/history'

class App extends Component {

  state = {
    user: {
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      admin: undefined,
      lastOrderDate: undefined,
      lastOrderProducts: undefined,
      picturePath: undefined
    },
    products: [],
    productTypes: ['fruit', 'snack'],
    overviewMounted: false,
    productListMounted: false,
    userListMounted: false
  }

  mountOverview = async () => {
    console.log('mountOverview()');
    await this.checkLoggedIn();
    if (!this.state.overviewMounted) {
      let userInfo = await this.fetchUserData();
      let productsList = await this.fetchProductsData();
      this.setState({
        user: userInfo,
        products: productsList,
        overviewMounted: true
      })
    }
  }

  mountUserList = async () => {
    console.log('mountUserList()');
    await this.checkLoggedIn();
    await this.checkAdmin();
    if (!this.state.userListMounted) {
      let userInfo = await this.fetchUserData();
      let productsList = await this.fetchProductsData();
      this.setState({
        user: userInfo,
        products: productsList,
        userListMounted: true
      })
    }
  }

  mountProductList = async () => {
    console.log('mountProductList()');
    await this.checkLoggedIn();
    await this.checkAdmin();
    if (!this.state.productListMounted) {
      let userInfo = await this.fetchUserData();
      let productsList = await this.fetchProductsData();
      this.setState({
        user: userInfo,
        products: productsList,
        productListMounted: true
      })
    }
  }

  checkLoggedIn = async () => {
    console.log('checkLoggedIn()');
    let result = await fetch('/api/isLoggedIn')
    result = await result.json();
    if (!result) {
      history.push('/')
    }
  }

  checkAdmin = async () => {
    console.log('checkAdmin()');
    let result = await fetch('/api/isAdmin')
    result = await result.json();
    if (!result) {
      history.push('/')
    }
  }

  updateUserData = async () => {
    console.log('updateUserData()');
    let result = await this.fetchUserData();
    this.setState({
      user: result
    })
  }

  updateProductsData = async () => {
    console.log('updateProductsData()');
    let result = await this.fetchProductsData();
    this.setState({
      products: result
    })
  }

  fetchUserData = async () => {
    console.log('fetchUserData()');
    let result = await fetch('/api/userData')
    result = await result.json()
    result = await this.processUserData(result)
    return result
  }

  fetchProductsData = async () => {
    console.log('fetchProductsData()');
    let result = await fetch('/api/productsData');
    result = await result.json();
    result = await this.processProdutsData(result);
    return result;
  }

  processProdutsData = async (products) => {
    console.log('processProdutsData()');
    var processedProducts = await products.map(entry => {
      var clone = {
        id: entry.id,
        name: entry.productName,
        type: entry.productType,
        picturePath: `/images/products/${entry.fileName}.${entry.fileFormat}`,
        lastOrderDate: entry.lastOrderDate,
        numberOfVotes: entry.numberOfVotes
      }
      return clone;
    })
    return processedProducts
  }

  processUserData = async (input) => {
    console.log('processUserData()');
    var clone = Object.assign({}, input)

    //prepare input: replace null with undefiend, and set up image src, delete useless information (fileFormat)
    clone.picturePath = `/images/users/${input.fileName}.${input.fileFormat}`
    clone.lastOrderDate = clone.lastOrderDate === null ? undefined : clone.lastOrderDate
    clone.lastOrderProducts = clone.lastOrderProducts === null ? undefined : clone.lastOrderProducts
    delete clone.fileFormat;
    return clone
  }

  componentDidMount() {
    console.log('componentDidMount() App.js');
  }


  render() {
    return (
      <UserProvider
        value={{
          fetchUserData: this.fetchUserData,
          fetchProductsData: this.fetchProductsData,
          updateUserData: this.updateUserData,
          updateProductsData: this.updateProductsData
        }}
      >
        <Router history={history}>
          <div className="App" id="main">
            <Global
            styles={css`
              html, body, #root, #main {
                height: 100%;
              }
              * {
                &:active {
                  -webkit-tap-highlight-color: transparent;
                }
                &:focus {
                  outline-color: transparent;
                }
                }
            `}
            />
            <Route exact path="/" component={ () => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/overview" component={ () => <Overview mountOverview={this.mountOverview} fetchProductsData={this.fetchProductsData} fetchUserData={this.fetchUserData} userInfo={this.state.user} products={this.state.products} productTypes={this.state.productTypes} /> } />
            <Route exact path="/admin/admin_userList" component={ () => <AdminUserList mountUserList={this.mountUserList} userInfo={this.state.user} /> } />
            <Route exact path="/admin/admin_productList" component={ () => <AdminProducts mountProductList={this.mountProductList} products={this.state.products} productTypes={this.state.productTypes} userInfo={this.state.user} />} />
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
