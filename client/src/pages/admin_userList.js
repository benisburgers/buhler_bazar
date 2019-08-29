import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import './css/overview.css';
import TopBarContainer from '../components/topbar.js'
import ChevronButton from '../components/chevronButton'
import { Link } from 'react-router-dom';
import { VerySmallHeader, ListImage, ProductsUsersItem, NakedUl } from "../styling/theme";
import starIcon from "../components/images/star.svg"
import ReactModal from 'react-modal';
import ProfileModal from '../components/profileModal.js'

class AdminUserList extends Component {

  state = {
    showModal: false,
    userList:[
      {
        id: 1,
        admin: true,
        firstName: "Marko",
        lastName: "Lukac",
        email: "marko@buehler-buehler.ch",
        picturePath: "https://pbs.twimg.com/profile_images/966014949377085440/4Ttk9Ose_400x400.jpg"
      },
      {
        id: 2,
        admin: true,
        firstName: "Beni",
        lastName: "Bar-Gera",
        email: "beni@buehler-buehler.ch",
        picturePath: "https://benibargera.com/assets/images/headshot-7d571b0d4ed696cd327956ab44c4adf9.jpg"
      },
      {
        id: 3,
        admin: false,
        firstName: "Salvatore",
        lastName: "Viola",
        email: "savlatore@buehler-buehler.ch",
        picturePath: "https://www.buehler-buehler.ch/media/navigation/sitemap/13/salvatore-2.jpg"
      },
      {
        id: 4,
        firstName: "Sarah",
        lastName: "Michi",
        picturePath: "sarah4.jpeg"
      },
      {
        id: 5,
        firstName: "Krissy",
        lastName: "Yolo",
        picturePath: "krissy5.jpeg"
      },
      {
        id: 6,
        firstName: "Raphael",
        lastName: "Bühler",
        picturePath: "raphael6.jpeg",
        admin: true
      },
      {
        id: 7,
        firstName: "Doris",
        lastName: "Bühler",
        picturePath: "doris7.jpeg"
      },
    ],
    activeUserId: undefined
  }

  handleOpenModal = (content) => {
    console.log('handleOpenModal');
    console.log(content);
    this.setState({
      activeUserId: content,
      showModal: true
    });
  }

  handleCloseModal = () => {
    console.log('handleCloseModal');
    this.setState({
      showModal: false,
      activeUserId: undefined
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#main');
  }

  render() {
    const { userinfo, toggleFields } = this.props;
    const { userList, activeUserId } = this.state;
    return (
      <section className="admin_userList">
        <TopBarContainer userinfo={userinfo} title="JUSER" />
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
          <ProfileModal userinfo={userList.find(user => user.id === activeUserId)} handleCloseModal={this.handleCloseModal} toggleFields={toggleFields} />
        </ReactModal>
      </section>
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
                width: 18px;
                height: 18px;
                padding: 3px;
                background: green;
                border-radius: 100%;
                box-sizing: border-box;
                margin-left: 10px;
              `}
            >
              <img src={starIcon} alt="Star Icon"/>
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
