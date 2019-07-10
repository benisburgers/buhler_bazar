import React, {Component} from 'react';
import TopBar from '../components/topbar.js'
import { Link } from 'react-router-dom';



class AdminUserList extends Component {

  state = {
    userList:[
      {
        id: 1,
        firstName: "Marko",
        lastName: "Lukac",
        picturePath: "marko1.jpeg"
      },
      {
        id: 2,
        firstName: "Beni",
        lastName: "Bar-Gera",
        picturePath: "beni2.jpeg"
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
        picturePath: "raphael6.jpeg"
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
        <TopBar userinfo={userinfo} title="JUSER" />
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
        <li key={index}>
          <span>{entry.firstName} {entry.lastName}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <Link to={{
              pathname: `/admin/admin_profilePage/${entry.id}`
          }}>
            Open profie
          </Link>
          <br></br>
          <br></br>
        </li>
      )
    })
    return (
      <ul className="userList">
        {userItems}
      </ul>
    )
  }
}

export default AdminUserList
