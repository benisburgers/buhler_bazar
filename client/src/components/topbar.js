import React, { Component } from 'react';
import { Link } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class TopBar extends Component {

  state = {
    menuOpen: false,
  }

  toggleMenu = () => {
    var menuOpen = this.state.menuOpen;
    this.setState({
      menuOpen: !menuOpen,
    })
  }

  render() {
    const { userinfo, title } = this.props;
    return (
      <div className="topBar">
        <ProfileButton userinfo={userinfo} />
        <TopBarHeader title={title} />
        <Hamburger toggleMenu={this.toggleMenu} />
        <Menu userinfo={userinfo} menuOpen={this.state.menuOpen} />
    </div>
    )
  }
}

class TopBarHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <div
        css={css`
          font-size: 22px;
          font-weight: 900;
          line-height: 30px;
          color: #F1F1F1;
        `}
      >
        <span>{title}</span>
      </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <Link to={'/profile'}>
        <div className="profileButton" userinfo={userinfo}>
          <div className="profileThumbnail">
            <img src={ userinfo.picturePath } alt="user portrait" />
            <br></br>
            <span>{`${userinfo.firstName} ${userinfo.lastName}`}</span>
          </div>
        </div>
      </Link>
    )
  }
}

class Hamburger extends Component {
  render() {
    const {toggleMenu} = this.props;
    return (
      <div
        className="hamburger"
        onClick={toggleMenu}
        css={css`
          height: 9px;
          width: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
        >
        <HamburgerBar/>
        <HamburgerBar/>
      </div>
    )
  }
}

class HamburgerBar extends Component {
  render() {
    return(
      <span
        css={css`
          height: 3px;
          width: 100%;
          border-radius: 1.5px;
          background-color: #A9EEC2;
          display: block;
        `}
      />
    )
  }
}

class Menu extends Component {
  render() {
    const isAdmin = this.props.userinfo.admin
    const { menuOpen } = this.props;

    if (menuOpen) {
      return (
        <MenuOptions isAdmin={isAdmin} />
      )
    }
    else {
      return null;
    }
  }
}

class MenuOptions extends Component {
  render() {
    const {isAdmin} = this.props
    return (
      <div>
          {isAdmin ? (
            <div>
              <AdminMenuOptions />
            </div>
          ) : (
            <div>
              <BasicMenuOptions />
            </div>
          )}
      </div>
    )
  }
}

function BasicMenuOptions(props) {
  return (
    <ul>
      <li>
        <Link to={'/overview'}>Overview</Link>
      </li>
      <li>
        <Link to={'/logout'}>Logout</Link>
      </li>
    </ul>
  )
}

function AdminMenuOptions(props) {
  return (
    <ul>
      <li>
        <Link to={'/overview'}>Overview</Link>
      </li>
      <li>
        <Link to={'/admin/admin_userList'}>AdminUserList</Link>
      </li>
      <li>
        <Link to={'/admin/admin_productList'}>AdminProductList</Link>
      </li>
      <li>
        <Link to={'/logout'}>Logout</Link>
      </li>
    </ul>
  )
}

export default TopBar;
