import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import './css/overview.css';
import TopBarContainer from '../components/topbar.js'
import RoundArrowButton from '../components/roundArrowButton'
import { Link } from 'react-router-dom';
import { VerySmallHeader } from "../styling/theme";
import chevronIcon from "../components/images/chevron.svg"
import starIcon from "../components/images/star.svg"

class AdminUserList extends Component {

  state = {
    userList:[
      {
        id: 1,
        firstName: "Marko",
        lastName: "Lukac",
        picturePath: "https://pbs.twimg.com/profile_images/966014949377085440/4Ttk9Ose_400x400.jpg"
      },
      {
        id: 2,
        firstName: "Beni",
        lastName: "Bar-Gera",
        picturePath: "https://benibargera.com/assets/images/headshot-7d571b0d4ed696cd327956ab44c4adf9.jpg"
      },
      {
        id: 3,
        firstName: "Salvatore",
        lastName: "Viola",
        picturePath: "salvatore3.jpeg"
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
    ]
  }

  render() {
    const { userinfo } = this.props;
    return (
      <section className="admin_userList">
        <TopBarContainer userinfo={userinfo} title="JUSER" />
        <UserList userList={this.state.userList}/>
      </section>
    )
  }
}

class UserList extends Component {
  render() {
    const { userList } = this.props;
    let userItems = userList.map((entry, index) => {
      return (
        <li key={index} className="oneUser"
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            &:after {
              content: '';
              background-color: #D8D8D8;
              width: 100%;
              height: 1px;
              position: absolute;
              bottom: 0;
            }
          `}
        >
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
          <img src={entry.picturePath} alt={`${entry.firstName} ${entry.lastName}`}
            css={css`
              max-width: 60px;
              border-radius: 100%;
              margin-right: 10px;
              margin-left: auto;
            `}
          />
        <Link to={{ pathname: `/admin/admin_profilePage/${entry.id}` }}
          css={css`
            background: black;
            height: 21px;
            width: 21px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            position: relative;
          `}
        >
          <img src={chevronIcon} alt="chevronIcon"
            css={css`
              max-width: 7px;
              padding-left: 2px;
            `}
          />
        </Link>
        </li>
      )
    })
    return (
      <ul className="userList"
        css={css`
          list-style: none;
          padding: 0;
        `}
      >
        {userItems}
      </ul>
    )
  }
}

export default AdminUserList
