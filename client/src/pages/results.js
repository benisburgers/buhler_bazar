import React, {Component} from 'react';

class Results extends Component {

  state = {
    orderNumbers: {
      1: 6,
      2: 3,
      3: 12,
      4: 2,
      5: 19,
      6: 2,
      7: 2,
      8: 7,
      9: 8
    },
    rawResults:
    [
      [1, 7, 5],
      [3, 9, 5],
      [4, 3, 1],
      [9, 1, 5]
    ]
  }

  render() {
    const { food, findProperItem, rawResults } = this.props;

    return (
      <section className="results">
        <div className="topBar">
          <h2>Results</h2>
          <WeekNumber />
        </div>
        <div className="results">
          <FoodList orderNumbers={this.state.orderNumbers} food={food} findProperItem={findProperItem} rawResults={this.state.rawResults}/>
        </div>
      </section>
    )
  }
}

class WeekNumber extends Component {

  render() {
    Date.prototype.getWeekNumber = function(){
      var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
      var dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
    };
    return (
      <div className="weekNumberContainer">
        <div className="weekNumberCircle">
          <span className="weekNumber">{new Date().getWeekNumber()}</span>
        </div>
        <span className="weekNumberDescription">Kalenderwoche</span>
      </div>

    )
  }
}

function voteScore(score) {
  let scoreArray = [];
  for (let i = 0; i < score; i++) {
    scoreArray.push(
      <li>
        <span>hand</span>
      </li>
    )
  }
  return scoreArray
}

class FoodList extends Component {
  render() {
    const { food, orderNumbers, findProperItem, rawResults } = this.props;

    var mergedResults = [].concat.apply([], rawResults);
    var counts = {};
    var sortedCounts = [];

    for (let vote of mergedResults) {
      counts[vote] = counts[vote] ? counts[vote] + 1 : 1;
    }

    for (let eachCount in counts) {
      sortedCounts.push([parseInt(eachCount), counts[eachCount]])
    };

    sortedCounts.sort((a, b) => b[1] - a[1]);

    let foodList = sortedCounts.map((entry, index) => {
        return (
          <li key={index}>
            <span>{findProperItem(food, entry[0]).name}</span>
            <ul>
              {voteScore(entry[1])}
            </ul>
            <br></br>
          </li>
        )
    })

    return (
      <div>
        <ul>
          {foodList}
        </ul>
      </div>
    )
  }
}

export default Results;
