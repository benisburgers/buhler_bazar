import { Component } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import './css/overview.css';
import TopBarContainer from '../components/topbar.js'
import ChevronButton from '../components/chevronButton'
import { VerySmallHeader, ListImage, ProductsUsersItem, NakedUl, FullHeightSection, PrimaryColor } from "../styling/theme";
import starIcon from "../components/images/star.svg"
import ReactModal from 'react-modal';
import ProfileModal from '../components/profileModal.js'

class AdminUserList extends Component {

  state = {
    showModal: false,
    userList: [],
    activeUserId: undefined
  }

  handleOpenModal = (content) => {
    console.log('handleOpenModal()');
    this.setState({
      activeUserId: content,
      showModal: true
    });
  }

  handleCloseModal = async () => {
    console.log('handleCloseModal()');
    await this.fetchUserList();
    this.setState({
      showModal: false,
      activeUserId: undefined
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#main');
    this.props.mountUserList();
    this.fetchUserList();
  }

  processUserList = async (userList) => {
    var result = userList.map(userObject => {
      userObject.picturePath = `/images/users/${userObject.fileName}.${userObject.fileFormat}`
      delete userObject.fileName;
      delete userObject.fileFormat;
      return userObject
    });
    return result;
  }


  fetchUserList = async () => {
    console.log('fetchUserList()');
    fetch('/api/userList')
    .then(res => res.json())
    .then(result => this.processUserList(result))
    .then(userList => {
      this.setState({
        userList: userList
      })
    })
  }

  render() {
    const { userInfo } = this.props;
    const { userList, activeUserId } = this.state;
    return (
      <FullHeightSection className="admin_userList">
        <TopBarContainer userInfo={userInfo} title="JUSER" />
        <UserList userList={this.state.userList} handleOpenModal={this.handleOpenModal}/>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Menu Modal"
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
          <ProfileModal currentUser={userInfo} targetUser={activeUserId ? userList.find(user => user.id === activeUserId) : undefined} handleCloseModal={this.handleCloseModal} />
        </ReactModal>
      </FullHeightSection>
    )
  }
}

class UserList extends Component {
  render() {
    const { userList, handleOpenModal } = this.props;
    let userItems = userList.map((entry, index) => {
      return (
        <ProductsUsersItem key={index} className="oneUser">
          <VerySmallHeader>{entry.firstName} {entry.lastName}</VerySmallHeader>
          {
            entry.admin === true ?
            <div className="starContainer"
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                background: ${PrimaryColor};
                border-radius: 100%;
                box-sizing: border-box;
                margin-left: 10px;
              `}
            >
              <img src={starIcon} alt="Star Icon"
                css={css`
                  max-width: 12px;
                  padding-bottom: 1px;
                `}
              />
            </div>
            : null
          }
          <ListImage round src={entry.picturePath} alt={`${entry.firstName} ${entry.lastName}`} />
          <ChevronButton onClick={() => handleOpenModal(entry.id)} />
        </ProductsUsersItem>
      )
    })
    return (
      <NakedUl className="userList">
        {userItems}
      </NakedUl>
    )
  }
}

export default AdminUserList
