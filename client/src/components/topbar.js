import { Component } from 'react';
import { Link } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ExitButtonContainer from '../components/exitButton.js'
import { StyledMenuLink, NegativeSecondaryButton } from "../styling/theme"

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
    const { menuOpen } = this.state;
    if (menuOpen) {
      return (
        <div>
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
          </div>
          <div className="menuModal"
            css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 60px;
            padding-bottom: 100px;
          `}
          >
            <Menu userinfo={userinfo} menuOpen={this.state.menuOpen} toggleMenu={this.toggleMenu} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
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
          </div>
        </div>
      )
    }
  }
}

class ProfileButton extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <div className="profileButton" userinfo={userinfo}
        css={css`
          margin-left: -20px;
          flex: 1;
          display: flex;
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
                margin-top: 20px;
                `}
            />
            <span
              css={css`
                background: grey;
                color: green;
                font-size: 13px;
                line-height: 18px;
                padding: 1px 10px;
                border-radius: 11px;
                display: block;
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
            margin-right: 20px;
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
    const { toggleMenu } = this.props;
    return (
      <div
        css={css`
        width: 100%;
        height: 100%;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: grey;
        padding: 20px 15px 60px;
        `}
        >
        <div onClick={e => toggleMenu()}
          css={css`
          align-self: flex-end;
          height: 21px;
          width: 21px;
        `}
          >
          <ExitButtonContainer lineColor="green" />
        </div>
        {isAdmin ? (
            <AdminMenuOptions />
        ) : (
            <BasicMenuOptions />
        )}
        <Link to={'/logout'}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <NegativeSecondaryButton
            css={css`
              background-color: red;
              font-size: 13px;
              font-weight: bold;
              line-height: 18px;
              padding: 1px 15px;
              border-radius: 11px;
              `
            }
          >
          Logout
        </NegativeSecondaryButton>
        </Link>
      </div>
    )
  }
}

function BasicMenuOptions(props) {
  return (
    <ul>
      <li>
        <StyledMenuLink to={'/overview'}>Overview</StyledMenuLink>
      </li>
    </ul>
  )
}

function AdminMenuOptions(props) {
  return (
    <ul
      css={css`
        list-style: none;
      `}
    >
      <li>
        <StyledMenuLink to={'/overview'}>Overview</StyledMenuLink>
      </li>
      <li>
        <StyledMenuLink to={'/admin/admin_userList'}>AdminUserList</StyledMenuLink>
      </li>
      <li>
        <StyledMenuLink to={'/admin/admin_productList'}>AdminProductList</StyledMenuLink>
      </li>
    </ul>
  )
}

export default TopBar;
