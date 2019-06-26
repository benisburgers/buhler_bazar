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
    }
  }

  render() {
    const { food, findProperItem } = this.props;
    return (
      <section class="results">
        <div class="topBar">
          <h2>Results</h2>
          <WeekNumber />
        </div>
        <div class="results">
          <FoodList orderNumbers={this.state.orderNumbers} food={food} findProperItem={findProperItem} />
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
      <div class="weekNumberContainer">
        <div class="weekNumberCircle">
          <span class="weekNumber">{new Date().getWeekNumber()}</span>
        </div>
        <span class="weekNumberDescription">Kalenderwoche</span>
      </div>

    )
  }
}

class FoodList extends Component {
  render() {
    const { food, orderNumbers, findProperItem } = this.props;
    console.log(orderNumbers);
    var sortedResults = [];

    for (var product in orderNumbers) {
      sortedResults.push([product, orderNumbers[product]]);
    }

    sortedResults.sort((a, b) => {
      return b[1] - a[1];
    })

    let foodList = sortedResults.map((entry, index) => {
        return (
          <li>
            <span>{findProperItem(food, parseInt(entry[0])).name}: {entry[1]}</span>
            <br></br>
          </li>          
        )
    })

    sortedResults.map((entry, index) => {
      console.log(entry);
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
