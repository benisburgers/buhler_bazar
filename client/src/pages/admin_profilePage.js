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
    const { match } = this.props;
    const handle = match.params.id;

    // fetch(`https://api.twitter.com/user/${handle}`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })
  }
  render() {
    const userinfo = this.state.user;
    const { history } = this.props;
    return (
      <section className="profile">
        <button onClick={history.goBack}>back</button>
        <h2>adminProfilePage</h2>
        <ProfileForm userinfo={userinfo} />
      </section>
    )
  }
}

export default adminProfilePage;
