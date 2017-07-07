import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BookingMap from './BookingMap.js';
import Booking from './Booking.js';
import axios from 'axios';
import {book} from '../actions/bookingActions';
import {connect} from 'react-redux'

@connect((store)=> {
  return {
    selectedResources: store.bookings.selectedResources
  }
})
export default class BookingMain extends Component {

  constructor() {
    super();
    this.state = {
      name: undefined,
      data: []
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Testing</h1>
            <div id="content-booking">
              <div>
                <BookingMap updateData={this.updateData.bind(this)}></BookingMap>
                <Booking text={"Name:"} inputId="id" onTextChange={this.onTextChange}></Booking>
                <button type="submit" className="btn btn-primary" onClick={this.handleClick}>
                  Book
                </button>
                <br/>
                <label htmlFor="result">
                  {this.state.result}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateData(value){
    this.setState({data:value})
  }

  onTextChange(value) {
    this.setState({name: value});
  }

  printResult(success) {
    if (success)
      this.setState({result: "Success"});
    else
      this.setState({result: "Failed"});
    }

  handleClick(e) {

    let selectedResource = this.props.selectedResources.filter(function(resource) {
      return resource.selected
    });
    this.props.dispatch(book({
      resourceId: selectedResource[0].resourceId,
      nameOfBooker: this.state.name,
      duration: 1})).then(() => console.log("Booked"), err => console.log(err))


    // $.ajax({
    //   url: "/api/book",
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function(data) {
    //     this.printResult(true);
    //     console.log(data);
    //   }.bind(this),
    //   error: function(request, status, error) {
    //     this.printResult(false);
    //     console.log(error);
    //   }.bind(this),
    //   data: JSON.stringify({
    //     resourceId: selectedResource[0].resourceId,
    //     nameOfBooker: this.state.name,
    //     duration: 1
    //
    //   })
    // });
  }
}
