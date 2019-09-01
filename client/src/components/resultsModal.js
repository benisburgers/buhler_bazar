import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { MediumHeader, PrimaryButton, SmallHeader, ModalContent, ModalMainPart, ModalHeader, PrimaryColor, NakedUl } from "../styling/theme"
import handIcon from "../components/images/hand.png"
import ExitButtonContainer from '../components/exitButton.js'


class ResultsModal extends Component {
  state = {
    rawResults:
    [
      [1, 7, 5],
      [3, 9, 5],
      [4, 3, 1],
      [4, 3, 1],
      [4, 3, 1],
      [4, 3, 1],
      [4, 3, 1],
      [9, 1, 5]
    ]
  }

  render() {
    const { handleCloseModal, products, findProperItem } = this.props;
    return (
      <ModalContent className="votingModal">
        <ModalMainPart className="mainPart">
          <ModalHeader>
            <MediumHeader>
              Results
            </MediumHeader>
            <WeekNumber />
          </ModalHeader>
          <ProductList products={products} findProperItem={findProperItem} rawResults={this.state.rawResults}/>
        </ModalMainPart>
        <ModalButtons handleCloseModal={handleCloseModal} />
      </ModalContent>
    )
  }
}

class WeekNumber extends Component {
  render() {
    function getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      return weekNo;
    }
    return (
      <div className="weekNumberContainer">
        <div
          css={css`
            background-color: #363636;
            box-shadow: 0 0 20px 5px rgba(0,0,0,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 60px;
            border-radius: 100%;
          `}
        >
          <span className="weekNumber"
            css={css`
              color: ${PrimaryColor};
              font-weight: bold;
              font-size: 25px;
            `}
          >
            {getWeekNumber(new Date())}
          </span>
        </div>
      </div>

    )
  }
}

class ModalButtons extends Component {
  render() {
    const { handleCloseModal } = this.props;
    return (
      <div
        css={css`
          margin-top: 30px;
          width: 100%;
          display: flex;
        `}
      >
        <PrimaryButton width="25%" negative onClick={handleCloseModal}
          css={css`
            margin-left: auto;
          `}
        >
          <ExitButtonContainer width="25px" />
        </PrimaryButton>
      </div>
    )
  }
}

function voteScore(score) {
  let scoreArray = [];
  for (let i = 0; i < score; i++) {
    scoreArray.push(
      <li key={i}
        css={css`
          margin-right: 5px;
        `}
      >
        <img src={handIcon} alt="Hand Icon"
          css={css`
            max-width: 15px;
            color: green;
            margin-right: 2px;
          `}
        />
      </li>
    )
  }
  return scoreArray
}

class ProductList extends Component {

  render() {
    // access raw results from state (each array represents one user's choice for the week) (rawResults)
    const { products, findProperItem, rawResults } = this.props;

    //merge all these choices into one array (mergedResults)
    var mergedResults = [].concat.apply([], rawResults);

    // create an object with each key representing one product id and the value representing how often it was chosen (mergedResults => counts)
    var counts = {};
    for (let vote of mergedResults) {
      counts[vote] = counts[vote] ? counts[vote] + 1 : 1;
    }

    // create an array of sub-array pairs [product.id, votes for this product] (sortedCounts)
    var sortedCounts = [];
    for (let eachCount in counts) {
      sortedCounts.push([parseInt(eachCount), counts[eachCount]])
    };

    //sort this array by votes (the more votes a product has, the earlier it is in the arrray)
    sortedCounts.sort((a, b) => b[1] - a[1]);

    //map through each product in sortedCounts and return the number of hands for each of its votes
    let productItems = sortedCounts.map((entry, index) => {
      let specificProduct = products.find(product => product.id === entry[0])
      console.log(specificProduct);
      console.log(entry[1]);
        return (
          <li key={index} className="oneProduct"
            css={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;

              &:last-child {
                margin-bottom: 0;
              }
            `}
          >
          <div>
            <SmallHeader className="productName">
              {specificProduct.name}
            </SmallHeader>
            <NakedUl
              className="productScore"
              css={css`
                list-style: none;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
              `}
            >
              {voteScore(entry[1])}
            </NakedUl>
          </div>
          <img className="productImage"
            src={specificProduct.picturePath} alt={specificProduct.name}
            css={css`
              max-width: 60px;
              margin-left: 20px;
            `}
          />
          </li>
        )
    })

    return (
      <div>
        <NakedUl
          css={css`
            list-style: none;
            padding: 0;
          `}
        >
          {productItems}
        </NakedUl>
      </div>
    )
  }
}

export default ResultsModal
