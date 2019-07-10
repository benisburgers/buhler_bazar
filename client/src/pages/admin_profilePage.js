import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js'

class adminProfilePage extends Component {
  state = {
    user: {
      //get from userList
      id: 1,
      admin: false,
      firstName: "Beni",
      lastName: "Bar-Gera",
      email: "beni@buehler-buehler.ch",
      picturePath: "/beni.jpg"
    }
  }
  componentDidMount () {
    const { handle } = this.props.match.params.id;

    // fetch(`https://api.twitter.com/user/${handle}`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })
  }
  render() {
    const userinfo = this.state.user;
    return (
      <section className="profile">
        <h2>adminProfilePage</h2>
        <ProfileForm userinfo={userinfo} />
      </section>
    )
  }
}

export default adminProfilePage;
