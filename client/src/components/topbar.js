import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TopBar extends Component {
  render() {
    const { userinfo, title } = this.props;
    return (
      <div className="topBar">
        <ProfileButton userinfo={userinfo} />
        <TopBarHeader title={title} />
        <Hamburger />
    </div>
    )
  }
}

class TopBarHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
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
            <span>{ userinfo.picturePath }</span>
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
    return (
      <div className="hamburger">
        <span>Hamburger</span>
      </div>
    )
  }
}

export default TopBar;
