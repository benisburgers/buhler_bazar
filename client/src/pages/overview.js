import React, {Component} from 'react';
import './css/overview.css'
import TopBar from '../components/topbar.js'
import VotingModal from '../components/votingModal.js'
import { Link } from 'react-router-dom'

class Overview extends Component {

  state = {
    modalOpen: false,
  }

  toggleModal = () => {
    var modalOpen = this.state.modalOpen;
    this.setState({
      modalOpen: !modalOpen,
    })
  }

  render() {
    const { userinfo, products, findProperItem, productTypes } = this.props;
    const { modalOpen } = this.state;
    return (
      <section className="overview">
        <h2>Overview</h2>
        <TopBar userinfo={userinfo} title="FUUD" />
        <OverviewInfo userinfo={userinfo} products={products} findProperItem={findProperItem} />
        <OverviewButtons toggleModal={this.toggleModal} />
        <VotingModal products={products} modalOpen={modalOpen} toggleModal={this.toggleModal} productTypes={productTypes} />
      </section>
    );
  };
}

class OverviewInfo extends Component {
  render() {
    const { userinfo, products, findProperItem } = this.props;
    return (
      <div className="overviewInfo">
        <CountDown />
        <PreviousOrder userinfo={userinfo} products={products} findProperItem={findProperItem} />
      </div>
    )
  }
}

class CountDown extends Component {
  render() {
    return (
      <div className="countDown">
        <span>Dä nöchschti Ichauf folgt in</span>
        <br></br>
        <span> <DaysLeft /> TÄG</span>
      </div>
    )
  }
}

function DaysLeft(props) {
  var nextMonday = new Date();
  var today = new Date();
  nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
  const diffTime = Math.abs(nextMonday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

class PreviousOrder extends Component {
  render() {
    const { userinfo, products, findProperItem } = this.props;

    const dateString = (() => {
      var previousOrderDate = new Date(userinfo.lastOrderDate);
      var options = { month: 'long', day: 'numeric' };
      return previousOrderDate.toLocaleDateString('de-DE', options);
    })


    const previousOrder = userinfo.lastOrder.map((entry, index) => {
      return (
        <li key={index}>
          <span>{ findProperItem(products, entry).name }</span>
          <br></br>
          <span>{ findProperItem(products, entry).picturePath }</span>
        </li>
      )
    })

    return (
      <div className="previousOrder">
        <span>Dis Voting am {dateString()}</span>
        <ul className="previousOrderList">
          {previousOrder}
        </ul>
      </div>
    )
  }
}

class OverviewButtons extends Component {
  render() {
    const  { toggleModal } = this.props;
    return (
      <div className="overviewButtons">
        <Link to={'/results'}>TSCHARTS</Link>
        <br></br>
        <button onClick={toggleModal}>VOUTÄ</button>
      </div>
    )
  }
}

export default Overview;
