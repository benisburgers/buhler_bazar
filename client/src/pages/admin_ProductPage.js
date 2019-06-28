import React, { Component } from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class AdminProductPage extends Component {
  render() {
    const { id } = this.props.match.params;
    const { food } = this.props.location.state;
    return (
      <section className="admin_productPage">
        <h2>AdminProductPage</h2>
      </section>
    )
  }
}

export default AdminProductPage;
