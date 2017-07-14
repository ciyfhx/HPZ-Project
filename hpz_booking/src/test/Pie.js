import {Pie} from 'react-chartjs-2';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Daily extends Component {

  render() {
    const data = {
	labels: [
		'8AM',
		'9AM',
		'10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM'
	],
	datasets: [{
		data: [4, 5, 7, 2, 1, 5, 6, 3, 3, 8],
		backgroundColor: [
		'#FF0000',
		'#36A2EB',
		'#FFCE56',
    '#FF66FF',
    '#33FFFF',
    '#FF3399',
    '#FF9900',
    '#6600FF',
    '#000000',
    '#CCCCCC'
		],
		hoverBackgroundColor: [
		'#FF0000',
		'#36A2EB',
		'#FFCE56',
    '#FF66FF',
    '#33FFFF',
    '#FF3399',
    '#FF9900',
    '#6600FF',
    '#000000',
    '#CCCCCC'
		]
	}]
};
    return (
      <div>
        <h2>Daily Statistics</h2>
        <Pie data={data} />
      </div>);
  }



}
