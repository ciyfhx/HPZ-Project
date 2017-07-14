import {Pie} from 'react-chartjs-2';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import getBookings from '../actions/bookingActions'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    bookings: store.bookings.bookings
  }
})
export default class Dashboard extends Component{

  constructor(){
    super()
    this.state = {
      data: {
  	labels: [
      'Sunday',
  		'Monday',
  		'Tuesday',
  		'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',


  	],
  	datasets: [{
  		data: [0, 0, 0, 0, 0, 0, 0],
  		backgroundColor: [
  		'#FF0000',
  		'#36A2EB',
  		'#FFCE56',
      '#FF66FF',
      '#33FFFF',
      '#FF3399',

  		],
  		hoverBackgroundColor: [
  		'#FF0000',
  		'#36A2EB',
  		'#FFCE56',
      '#FF66FF',
      '#33FFFF',
      '#FF3399',

  		]
  	}]
  }
    }
  }

  componentWillMount(){
    this.props.dispatch(getBookings()).then(() => {
      let days = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}
      this.props.bookings.forEach((booking) => {
        let date = new Date(booking.bookTiming)
        console.log(date)
        days[date.getDay()]++
      })
      let newData = [days[0], days[1], days[2], days[3], days[4], days[5], days[6]]
      this.setState({data:{datasets: [{
    		data: newData,
    		backgroundColor: [
    		'#FF0000',
    		'#36A2EB',
    		'#FFCE56',
        '#FF66FF',
        '#33FFFF',
        '#FF3399',

    		],
    		hoverBackgroundColor: [
    		'#FF0000',
    		'#36A2EB',
    		'#FFCE56',
        '#FF66FF',
        '#33FFFF',
        '#FF3399',

    		]
    	}]}})
    })
  }


  render(){


    return( <div>
    <h2>Daily Statistics</h2>
    <Pie data={this.state.data} />
    </div>);
  }

}
