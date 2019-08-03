import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import './css/overview.css'
import TopBar from '../components/topbar.js'
import VotingModal from '../components/votingModal.js'
import { PrimaryButton, NakedLink, InfoText } from "../styling/theme"

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
        <TopBar userinfo={userinfo} title="FUUD" />
        <OverviewButtons toggleModal={this.toggleModal} />
        <OverviewInfo userinfo={userinfo} products={products} findProperItem={findProperItem} />
        <VotingModal products={products} modalOpen={modalOpen} toggleModal={this.toggleModal} productTypes={productTypes} />
      </section>
    );
  };
}

class OverviewButtons extends Component {
  render() {
    const  { toggleModal } = this.props;
    return (
      <div className="overviewButtons"
        css={css`
          display: flex;
        `}>
          <PrimaryButton>
            <NakedLink to={'/results'}>
              WUCHEVOITING
            </NakedLink>
          </PrimaryButton>
        <PrimaryButton onClick={toggleModal}>VOUTÄ</PrimaryButton>
      </div>
    )
  }
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
        <div>
          <InfoText>Dä nöchschti Ichauf folgt in</InfoText>
        </div>
        <div>
          <span
            css={css`
            	color: #515151;
            	font-family: "Avenir Next";
            	font-size: 34px;
            	font-weight: bold;
            	line-height: 46px;
            `}
            >
            <DaysLeft /> TÄG
          </span>
        </div>
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
          <img src={ findProperItem(products, entry).picturePath } alt={ findProperItem(products, entry).name }
            css={css`
              height: 100px;
              width: 100px;
              `
            }
          />
          <span
            css={css`
            display: block;
          `}
          >{ findProperItem(products, entry).name }</span>
        </li>
      )
    })

    return (
      <div className="previousOrder">
        <InfoText>Dis Voting am {dateString()}</InfoText>
        <ul className="previousOrderList"
          css={css`
            list-style: none;
            display: flex;
            justify-content: space-around;
            padding-left: 0;
            `
          }>
          {previousOrder}
        </ul>
      </div>
    )
  }
}

export default Overview;
