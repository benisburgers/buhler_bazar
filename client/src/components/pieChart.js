import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';

class PointsLeft extends PureComponent {

  render() {
    const { credits, selectedProducts } = this.props;
    const creditsLeft = credits - selectedProducts.length

    const data = [];
    const activeColor = 'green';
    const inactiveColor = 'red';

    for (var i = 0; i < credits; i++) {
      data.push(
        { name: `group-${i}`, value: 10}
      )
    }

    return (
        <PieChart width={60} height={80} onMouseEnter={this.onPieEnter}>
          <text x='50%' y='38' textAnchor="middle" dominantBaseline="middle"
            style={{
              fontSize: 28,
              fontWeight: 'bold'
            }}
          >
            {creditsLeft}
          </text>
          <text x='50%' y="100%" textAnchor="middle" dominantBaseline="text-top"
            style={{
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            CRÄDITS
          </text>
          <Pie
            data={data}
            innerRadius={20}
            outerRadius={30}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            cy={30}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={index < creditsLeft ? 'green': 'grey'} />)
            }
          </Pie>
        </PieChart>
    );
  }
}

export default PointsLeft
