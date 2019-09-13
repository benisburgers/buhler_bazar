import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import './css/overview.css'
import TopBarContainer from '../components/topbar.js'
import VotingModal from '../components/votingModal.js'
import ResultsModal from '../components/resultsModal.js'
import { PrimaryButton, PrimaryButtonLink, InfoText, FullHeightSection, NakedUl } from "../styling/theme"
import ReactModal from 'react-modal';

class Overview extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      modalContent: undefined
    };
  }

  handleOpenModal = (content) => {
    console.log('handleOpenModal()');
    this.setState({
      modalContent: content,
      showModal: true
    });
  }

  handleCloseModal = () => {
    console.log('handleCloseModal');
    this.setState({
      modalContent: undefined,
      showModal: false
    });
  }

  async componentDidMount() {
    console.log('componentDidMount() overview.js');
    this.props.mountOverview();
  }

  render() {
    const { userInfo, products, productTypes } = this.props;
    return (
      <FullHeightSection className="overview"
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <TopBarContainer userInfo={userInfo} title="OWERWIU" />
        <div className="mainPart"
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: center;
          `}
        >
          <OverviewButtons handleOpenModal={this.handleOpenModal} />
          <CountDown />
          {
            userInfo.lastOrderDate === undefined
            ? null
            : <PreviousOrder userInfo={userInfo} products={products} />
          }
        </div>
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
        {
          this.state.modalContent === 'voting'
          ? <VotingModal products={products} handleCloseModal={this.handleCloseModal} productTypes={productTypes} />
          : <ResultsModal handleCloseModal={this.handleCloseModal} products={products} />
        }
        </ReactModal>
      </FullHeightSection>
    );
  };
}

class OverviewButtons extends Component {
  render() {
    const  { handleOpenModal } = this.props;
    return (
      <div className="overviewButtons"
        css={css`
          display: flex;
          justify-content: space-between;
        `}>
        <PrimaryButton width="48%" onClick={() => handleOpenModal('results')}>WUCHEVOITING</PrimaryButton>
        <PrimaryButton width="48%" onClick={() => handleOpenModal('voting')}>VOUTÄ</PrimaryButton>
      </div>
    )
  }
}

class CountDown extends Component {
  render() {
    return (
      <div className="countDown">
        <InfoText
          css={css`
            margin-bottom: 20px;
          `}
        >
          Dä nöchschti Ichauf folgt in
        </InfoText>
          <span
            css={css`
            	color: #515151;
            	font-family: "Avenir Next";
            	font-size: 34px;
            	font-weight: bold;
            	line-height: 46px;
              display: block;
            `}
            >
            <DaysLeft /> TÄG
          </span>
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
    const { userInfo, products } = this.props;

    const dateString = (() => {
      var previousOrderDate = new Date(userInfo.lastOrderDate);
      var options = { month: 'long', day: 'numeric' };
      return previousOrderDate.toLocaleDateString('de-DE', options);
    })

    const previousOrder = userInfo.lastOrderProducts.split(",").map((entry, index) => {
      const specificProduct = products.find(product => product.id === entry)
      return (
        <li key={index}>
          <img src={ specificProduct.picturePath } alt={ specificProduct.name }
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
          >{ specificProduct.name }</span>
        </li>
      )
    })

    return (
      <div className="previousOrder">
        <InfoText
          css={css`
            margin-bottom: 20px;
          `}
        >
          Dis Voting am {dateString()}
        </InfoText>
        <NakedUl className="previousOrderList"
          css={css`
            display: flex;
            justify-content: space-around;
            `
          }>
          {previousOrder}
        </NakedUl>
      </div>
    )
  }
}

export default Overview;
