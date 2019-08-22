import { Component } from 'react';
import { Link } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ExitButtonContainer from '../components/exitButton.js'
import { StyledMenuLink, NegativeSecondaryButton } from "../styling/theme"
import ReactModal from 'react-modal';

class TopBarContainer extends Component {

  state = {
    showModal: false
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#main');
  }

  render() {
    const { userinfo, title } = this.props;

    return (
      <div>
        <TopBar userinfo={userinfo} title={title} handleOpenModal={this.handleOpenModal} />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Menu Modal"
        >
          <Menu userinfo={userinfo} handleCloseModal={this.handleCloseModal} />
        </ReactModal>
      </div>
    )
  }
}

class TopBar extends Component {
  render() {

    const userImageHeight = 90;
    const userNameHeight = 20;
    const topBarHeight = 55;

    const { userinfo, title, handleOpenModal } = this.props;

    return (
      <div className="topBar"
        css={css`
          display: flex;
          align-items: center;
          height: ${topBarHeight}px;
          border-radius: 27.5px;
          background-color: #363636;
          margin-left: 20px;
          margin-bottom: ${((userImageHeight - topBarHeight)/2 + userNameHeight)}px;
        `}
      >
        <ProfileButton userImageHeight={userImageHeight} userNameHeight={userNameHeight} userinfo={userinfo} />
        <TopBarHeader title={title} />
        <Hamburger handleOpenModal={handleOpenModal} />
      </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    const { userinfo, userImageHeight, userNameHeight } = this.props;
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
                height: ${userImageHeight}px;
                width: ${userImageHeight}px;
                box-sizing: border-box;
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
                height: ${userNameHeight}px;
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
    const { handleOpenModal } = this.props;
    return (
      <div className="HamburgerContainer"
        onClick={handleOpenModal}
        css={css`
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        `}
      >
        <div
          className="hamburger"
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
        className="HamburgerBar"
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

// class MenuModal extends Component {
//   render() {
//     const { userinfo } = this.props;
//     return (
//       <div
//         className="menuModal"
//         css={css`
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: green;
//         box-sizing: border-box;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         padding-top: 60px;
//         padding-bottom: 100px;
//       `}
//       >
//         <Menu userinfo={userinfo} />
//       </div>
//
//     )
//   }
// }


// TODO: Remove Padding and decrease inset for ReactModal ==> How?

class Menu extends Component {
  render() {
    const isAdmin = this.props.userinfo.admin
    const { handleCloseModal } = this.props;
    return (
      <div
        className="menu"
        css={css`
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: grey;
        height: 100%;
        `}
        >
        <div onClick={e => handleCloseModal()}
          css={css`
          margin-left: auto;
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
    <ul
      css={css`
        padding: 0;
        list-style: none;
      `}
    >
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
        padding: 0;
        list-style: none;
      `}
    >
      <li
        css={css`
          display: inline-block;
          width: auto;
        `}
      >
        <StyledMenuLink to={'/overview'}>Overview</StyledMenuLink>
      </li>
      <li
        css={css`
          display: inline-block;
          width: auto;
        `}
      >
        <StyledMenuLink to={'/admin/admin_userList'}>AdminUserList</StyledMenuLink>
      </li>
      <li
        css={css`
          display: inline-block;
          width: auto;
        `}
      >
        <StyledMenuLink to={'/admin/admin_productList'}>AdminProductList</StyledMenuLink>
      </li>
    </ul>
  )
}

export default TopBarContainer;
