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
      <div className="topBar"
        css={css`
        display: flex;
        align-items: center;
        height: 55px;
        border-radius: 27.5px;
        background-color: #363636;
        margin-left: 20px;
        `}
      >
        <ProfileButton userinfo={userinfo} />
        <TopBarHeader title={title} />
        <Hamburger toggleMenu={this.toggleMenu} />
        <Menu userinfo={userinfo} menuOpen={this.state.menuOpen} />
    </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <div className="profileButton" userinfo={userinfo}
        css={css`
          margin-right auto;
          flex: 1;
          display: flex;
          margin-left: -20px;
        `}>
        <Link to={'/profile'}
            css={css`
            text-decoration: none
            `}
          >
          <div className="profileThumbnail">
            <img src={ userinfo.picturePath } alt="user portrait"
              css={css`
                height: 89px;
                width: 89px;
                border-radius: 100%;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
                border: 2px solid black;
                `}
            />
            <br></br>
            <span
              css={css`
                background: grey;
                color: green;
                font-size: 13px;
                line-height: 18px;
                padding: 1px 10px;
                border-radius: 11px;
              `}
            >
            {`${userinfo.firstName} ${userinfo.lastName}`}
          </span>
          </div>
        </Link>
      </div>
    )
  }
}

class TopBarHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="TopBarHeader"
        css={css`
          flex: 1;
        `}
      >
        <span
          css={css`
            font-size: 22px;
            font-weight: 900;
            line-height: 30px;
            color: #F1F1F1;
          `}
        >
          {title}
        </span>
      </div>
    )
  }
}

class Hamburger extends Component {
  render() {
    const {toggleMenu} = this.props;
    return (
      <div className="HamburgerContainer"
        css={css`
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        `}
      >
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
