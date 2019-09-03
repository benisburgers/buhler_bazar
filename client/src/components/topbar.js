import { Component } from 'react';
import { Link } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ExitButtonContainer from '../components/exitButton.js'
import { StyledMenuLink, SecondaryButton } from "../styling/theme"
import ReactModal from 'react-modal';
import ProfileModal from '../components/profileModal.js'


class TopBarContainer extends Component {

  state = {
    showModal: false,
    modalContent: undefined
  }

  handleOpenModal = (content) => {
    console.log(content);
    this.setState({
      modalContent: content,
      showModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      modalContent: undefined
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#main');
  }

  render() {
    const { userInfo, title } = this.props;
    const { modalContent } = this.state;

    return (
      <div>
        <TopBar userInfo={userInfo} title={title} handleOpenModal={this.handleOpenModal} />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="React Modal"
          style={{
            content: {
              padding: 0,
              inset: '20px',
              backgroundColor: 'rgba(0,0,0,0)',
              border: 'none'
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.8)'
            }
          }}
        >
        {
          modalContent === 'menu'
          ? <Menu userInfo={userInfo} handleCloseModal={this.handleCloseModal} />
          : <ProfileModal targetUser={userInfo} handleCloseModal={this.handleCloseModal} />
        }
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

    const { userInfo, title, handleOpenModal } = this.props;

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
          margin-top: ${((userImageHeight - topBarHeight)/2)}px;
        `}
      >
        <ProfileButton userImageHeight={userImageHeight} userNameHeight={userNameHeight} userInfo={userInfo} handleOpenModal={handleOpenModal} />
        <TopBarHeader title={title} />
        <Hamburger handleOpenModal={handleOpenModal} />
      </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    const { userInfo, userImageHeight, userNameHeight, handleOpenModal } = this.props;
    return (
      <div className="profileButton" userInfo={userInfo} onClick={() => handleOpenModal('profile')}
        css={css`
          margin-left: -20px;
          flex: 1;
          display: flex;
        `}>
        <div className="profileThumbnail">
          <img src={ userInfo.picturePath } alt="user portrait"
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
            className="userName"
            css={css`
              background-color: #363636;
              color: #A9EEC2;
              font-weight: 500;
              font-size: 13px;
              line-height: 18px;
              padding: 1px 10px;
              border-radius: 11px;
              display: block;
              text-align: center;
              height: ${userNameHeight}px;
            `}
          >
          {`${userInfo.firstName}`}
        </span>
        </div>
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
          text-align: center;
          flex: 1;
        `}
      >
        <span
          css={css`
            font-size: 22px;
            font-weight: 900;
            line-height: 30px;
            font-family: "Avenir Next";
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
        onClick={() => handleOpenModal('menu')}
        css={css`
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        height: 100%;
        align-items: center;
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

// TODO: Remove Padding and decrease inset for ReactModal ==> How?

class Menu extends Component {
  render() {
    const isAdmin = this.props.userInfo.admin
    const { handleCloseModal } = this.props;
    return (
      <div
        className="menuContainer"
        css={css`
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: grey;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        padding: 18px 15px 60px;
        border-radius: 27.5px;
        `}
        >
        <div onClick={e => handleCloseModal()}
          css={css`
          margin-left: auto;
          height: 21px;
          width: 21px;
        `}
          >
          <ExitButtonContainer lineColor="#A9EEC2" />
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
          <SecondaryButton negative width="auto">
            Logout
          </SecondaryButton>
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
        <StyledMenuLink to={'/overview'}>Owerwiu</StyledMenuLink>
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
      <li>
        <StyledMenuLink to={'/overview'}>Owerwiu</StyledMenuLink>
      </li>
      <li>
        <StyledMenuLink to={'/admin/admin_userList'}>Benutzer</StyledMenuLink>
      </li>
      <li>
        <StyledMenuLink to={'/admin/admin_productList'}>Produkt</StyledMenuLink>
      </li>
    </ul>
  )
}

export default TopBarContainer;
